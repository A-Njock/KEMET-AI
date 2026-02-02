import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
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
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
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
      const conversationHistory = newMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const result = await chatbot(input.trim(), conversationHistory);
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources
      };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: t('error_generic') || 'Erreur lors de la recherche.'
      };
      setMessages([...newMessages, errorMessage]);
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
    <div className="min-h-screen bg-gradient-to-br from-[#1c1917] via-[#292524] to-[#1c1917] font-sans flex flex-col relative overflow-hidden">
      {/* Background Particles & Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Colorful Blobs - Dark Gold / Amber Theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-gold/10 rounded-full blur-[90px] animate-pulse-slow" />
        <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px]" />

        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bg-gold/40 rounded-full"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      <Header theme="dark" simple={true} />

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto relative z-10 pt-24">
        <div className="flex-1 overflow-y-auto px-4 py-6 pb-24 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-24 h-24 bg-gradient-to-br from-gold via-orange-400 to-amber-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-gold/30 animate-pulse-slow p-1">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                  <svg className="w-12 h-12 text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange-500" fill="none" stroke="url(#gradient)" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4af37" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold via-orange-500 to-amber-600 mb-4">{t('chatbot_title')}</h2>
              <p className="text-gray-300 max-w-md mx-auto text-lg">{t('chatbot_start')}</p>
            </div>
          )}

          <div className="space-y-8">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start'} animate-slide-up`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold via-orange-400 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-gold/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 rounded-2xl text-sm ${msg.role === 'assistant'
                    ? 'bg-white/10 text-gray-100 border border-white/10 shadow-sm backdrop-blur-md'
                    : 'bg-gold text-black border border-gold/40 shadow-sm'
                    }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none">
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3 opacity-80 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-gold opacity-50"></span>
                        {t('sources_title') || 'SOURCES JURIDIQUES'}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {msg.sources.map((source, i) => (
                          <div key={i} className="group flex flex-col p-2.5 bg-black/40 rounded-xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="flex-shrink-0 w-4 h-4 rounded-full bg-gold/20 flex items-center justify-center text-[8px] font-bold text-gold border border-gold/30">
                                {i + 1}
                              </span>
                              <span className="text-[11px] font-semibold text-gray-200">
                                {source.article}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-400 italic pl-6 truncate group-hover:text-gray-300 transition-colors">
                              {source.law}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {
                  msg.role === 'user' && (
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black shadow-sm">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )
                }
              </div>
            ))}

            {loading && (
              <div className="flex gap-4 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-black shadow-lg shadow-gold/10">
                  <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                  <span className="text-xs text-gold/70 font-medium ml-2 uppercase tracking-wider">Analyzing & Thinking</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 mb-24">
          <div className="max-w-3xl mx-auto">
            {/* Disclaimers */}
            <p className="text-[10px] text-center text-gray-500 mb-2">
              {t('disclaimer_text')}
            </p>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-gold-dark/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-[#292524] rounded-2xl border border-white/10 flex items-end p-2 shadow-xl">
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
                  className="flex-1 bg-transparent text-gray-200 px-4 py-3 max-h-[150px] resize-none focus:outline-none placeholder-gray-500 text-base"
                  disabled={loading}
                  style={{ minHeight: '52px' }}
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`
                    flex-shrink-0 mb-1 mr-1 p-3 rounded-xl transition-all duration-300
                    ${loading || !input.trim()
                      ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-br from-gold to-gold-dark text-black hover:scale-105 hover:shadow-lg hover:shadow-gold/20'
                    }
                  `}
                >
                  {loading ? (
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
