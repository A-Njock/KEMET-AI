import { useState, useRef, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { chatbot, submitFeedback } from '../lib/api';

interface Source {
  article: string;
  law: string;
  citation: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  showRating?: boolean;   // whether to display the thumbs prompt
  rated?: 'up' | 'down'; // locked once voted
}

// Simple markdown renderer: bold, bullet lists, numbered lists, line breaks
function renderMarkdown(text: string) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Bullet list
    if (/^[-*•]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*•]\s/, ''));
        i++;
      }
      elements.push(
        <ul key={i} className="list-disc list-inside space-y-1 my-2 pl-2">
          {items.map((it, j) => <li key={j}>{inlineFormat(it)}</li>)}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+[.)]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+[.)]\s/, ''));
        i++;
      }
      elements.push(
        <ol key={i} className="list-decimal list-inside space-y-1 my-2 pl-2">
          {items.map((it, j) => <li key={j}>{inlineFormat(it)}</li>)}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim())) {
      elements.push(<hr key={i} className="border-[#DDE2EE] my-3" />);
      i++;
      continue;
    }

    // Heading (# through ####)
    if (/^#{1,4}\s/.test(line)) {
      elements.push(
        <p key={i} className="font-semibold text-navy mt-3 mb-1">
          {inlineFormat(line.replace(/^#{1,4}\s/, ''))}
        </p>
      );
      i++;
      continue;
    }

    // Empty line → spacing
    if (!line.trim()) {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }

    // Normal paragraph
    elements.push(<p key={i} className="mb-1">{inlineFormat(line)}</p>);
    i++;
  }

  return elements;
}

function inlineFormat(text: string): React.ReactNode {
  // Bold **text** or __text__
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return parts.map((part, i) => {
    if (/^\*\*(.+)\*\*$/.test(part) || /^__(.+)__$/.test(part)) {
      const inner = part.replace(/^\*\*|\*\*$|^__|__$/g, '');
      return <strong key={i} className="font-semibold text-navy">{inner}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

// Show rating prompt on ~40% of responses, but never two in a row
function shouldShowRating(messages: Message[]): boolean {
  const lastRated = [...messages].reverse().findIndex(m => m.showRating);
  if (lastRated !== -1 && lastRated < 2) return false; // cooldown
  return Math.random() < 0.4;
}

export default function Chatbot() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const language = isFr ? 'fr' : 'en';

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const history = newMessages.map(m => ({ role: m.role, content: m.content }));
      const result = await chatbot(input.trim(), history, language);
      const showRating = shouldShowRating(newMessages);
      setMessages([...newMessages, {
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        showRating,
      }]);
    } catch {
      setMessages([...newMessages, {
        role: 'assistant',
        content: isFr ? 'Une erreur est survenue. Veuillez réessayer.' : 'An error occurred. Please try again.',
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleRate = useCallback(async (msgIdx: number, rating: 'up' | 'down') => {
    setMessages(prev => prev.map((m, i) =>
      i === msgIdx ? { ...m, rated: rating } : m
    ));
    const msg = messages[msgIdx];
    const userMsg = messages[msgIdx - 1];
    await submitFeedback(
      userMsg?.content ?? '',
      msg.content,
      rating,
      language
    );
  }, [messages, language]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const suggestedFr = [
    'Quels sont mes droits en cas de licenciement?',
    'Comment créer une SARL au Cameroun?',
    "Qu'est-ce que le code pénal prévoit pour le vol?",
  ];
  const suggestedEn = [
    'What are my rights if dismissed?',
    'How to create a company in Cameroon?',
    'What does the penal code say about theft?',
  ];

  return (
    <div className="min-h-screen bg-ivory font-sans flex flex-col">
      <Header simple={true} chatMode={true} />

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto pt-20 pb-4 px-4">

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto py-8">
          {messages.length === 0 && (
            <div className="text-center py-16 animate-fade-in-up">
              <h2 className="font-display text-4xl font-semibold text-navy mb-3">{t('chatbot_title')}</h2>
              <p className="text-slate max-w-sm mx-auto">{t('chatbot_start')}</p>

              <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                {(isFr ? suggestedFr : suggestedEn).map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="px-4 py-2 bg-white border border-[#DDE2EE] rounded-full text-sm text-slate hover:border-royal hover:text-royal transition-all duration-200 text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start'} animate-slide-up`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-royal flex items-center justify-center">
                    <img src="/ganp-logo.png" alt="GANP" className="w-5 h-5 invert brightness-0" />
                  </div>
                )}

                <div className="flex flex-col gap-2 max-w-xl">
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white border border-[#DDE2EE] text-navy shadow-card'
                        : 'bg-royal text-white'
                    }`}
                  >
                    {/* Rendered content */}
                    <div className="prose-sm">
                      {msg.role === 'assistant'
                        ? renderMarkdown(msg.content)
                        : <p>{msg.content}</p>
                      }
                    </div>

                    {/* Legal sources */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-[#DDE2EE]">
                        <p className="text-[10px] font-bold text-royal uppercase tracking-widest mb-3">
                          {isFr ? 'Sources juridiques' : 'Legal Sources'}
                        </p>
                        <div className="space-y-2">
                          {msg.sources.map((source, i) => (
                            <div key={i} className="flex flex-col px-3 py-2 bg-ivory rounded-lg border border-[#DDE2EE]">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-4 h-4 rounded-full bg-royal-pale flex items-center justify-center text-[9px] font-bold text-royal border border-royal/20">
                                  {i + 1}
                                </span>
                                <span className="text-xs font-semibold text-navy">{source.article}</span>
                              </div>
                              <span className="text-[10px] text-slate italic pl-6 truncate">{source.law}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rating prompt — shown on selected assistant messages */}
                  {msg.role === 'assistant' && msg.showRating && (
                    <div className="flex items-center gap-2 pl-1">
                      {msg.rated ? (
                        <span className="text-[11px] text-slate/60 italic">
                          {msg.rated === 'up'
                            ? (isFr ? 'Merci pour votre retour !' : 'Thanks for your feedback!')
                            : (isFr ? 'Noté — nous allons améliorer cela.' : 'Noted — we\'ll work on improving this.')}
                        </span>
                      ) : (
                        <>
                          <span className="text-[11px] text-slate/60">
                            {isFr ? 'Cette réponse vous a-t-elle aidé ?' : 'Was this response helpful?'}
                          </span>
                          <button
                            onClick={() => handleRate(idx, 'up')}
                            className="p-1.5 rounded-lg hover:bg-green-50 hover:text-green-600 text-slate/40 transition-colors"
                            title={isFr ? 'Utile' : 'Helpful'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRate(idx, 'down')}
                            className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-slate/40 transition-colors"
                            title={isFr ? 'Pas utile' : 'Not helpful'}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v2a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-navy flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-royal flex items-center justify-center">
                  <img src="/ganp-logo.png" alt="GANP" className="w-5 h-5 invert brightness-0 animate-pulse" />
                </div>
                <div className="bg-white border border-[#DDE2EE] rounded-2xl px-5 py-4 shadow-card flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-royal rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-royal rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <div className="w-2 h-2 bg-royal rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </div>
                  <span className="text-xs text-slate font-medium ml-1">
                    {isFr ? 'Analyse en cours...' : 'Analyzing...'}
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="pb-6">
          <p className="text-[10px] text-center text-slate/50 mb-3 max-w-lg mx-auto">
            {t('disclaimer_text')}
          </p>
          <form onSubmit={handleSubmit} className="bg-white border border-[#DDE2EE] rounded-2xl shadow-card flex items-end p-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
              }}
              onKeyDown={handleKeyDown}
              placeholder={t('chatbot_placeholder')}
              rows={1}
              className="flex-1 bg-transparent text-navy px-4 py-3 max-h-[150px] resize-none focus:outline-none placeholder-slate/40 text-sm"
              disabled={loading}
              style={{ minHeight: '48px' }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`flex-shrink-0 mb-1 mr-1 p-3 rounded-xl transition-all duration-200 ${
                loading || !input.trim()
                  ? 'bg-[#DDE2EE] text-slate/40 cursor-not-allowed'
                  : 'bg-royal text-white hover:bg-royal-light hover:shadow-btn'
              }`}
            >
              {loading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
