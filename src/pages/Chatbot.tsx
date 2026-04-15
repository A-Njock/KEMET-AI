import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import { useTranslation } from 'react-i18next';
import { chatbot } from '../lib/api';

interface Source {
  article: string;
  law: string;
  citation: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
}

export default function Chatbot() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
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
      const history = newMessages.map(msg => ({ role: msg.role, content: msg.content }));
      const result = await chatbot(input.trim(), history);
      setMessages([...newMessages, { role: 'assistant', content: result.answer, sources: result.sources }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: t('error_generic') }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="min-h-screen bg-ivory font-sans flex flex-col">
      <Header simple={true} />

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto pt-20 pb-4 px-4">

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto py-8">
          {messages.length === 0 && (
            <div className="text-center py-16 animate-fade-in-up">
              <div className="w-20 h-20 mx-auto mb-6 bg-royal-pale border border-royal/20 rounded-2xl flex items-center justify-center">
                <img src="/ganp-logo.png" alt="GANP" className="w-12 h-12" />
              </div>
              <h2 className="font-display text-4xl font-semibold text-navy mb-3">{t('chatbot_title')}</h2>
              <p className="text-slate max-w-sm mx-auto">{t('chatbot_start')}</p>

              {/* Suggested questions */}
              <div className="mt-10 flex flex-wrap justify-center gap-3 max-w-lg mx-auto">
                {(isFr
                  ? ['Quels sont mes droits en cas de licenciement?', 'Comment créer une SARL au Cameroun?', 'Qu\'est-ce que le code du travail prévoit?']
                  : ['What are my rights if dismissed?', 'How to create a company in Cameroon?', 'What does the labor code say?']
                ).map((q) => (
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

                <div
                  className={`max-w-xl rounded-2xl px-5 py-4 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'bg-white border border-[#DDE2EE] text-navy shadow-card'
                      : 'bg-royal text-white'
                  }`}
                >
                  <div>
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-1.5 last:mb-0">{line}</p>
                    ))}
                  </div>

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
