import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { chatbot } from '../lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
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
    <div className="min-h-screen bg-[#151520] font-sans flex flex-col relative overflow-hidden">
      {/* Background Particles */}
      {/* Background Particles & Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Colorful Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-gold/5 rounded-full blur-[80px] animate-pulse-slow" />

        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle absolute bg-gold/20 rounded-full"
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

      <Header />

      <main className="flex-1 flex flex-col max-w-4xl w-full mx-auto relative z-10">
        <div className="flex-1 overflow-y-auto px-4 py-6 pt-32 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold-dark rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-gold/20 animate-pulse-slow">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-white mb-3">{t('chatbot_title')}</h2>
              <p className="text-white/60 max-w-md mx-auto">{t('chatbot_start')}</p>
            </div>
          )}

          <div className="space-y-8">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start items-start'} animate-slide-up`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                )}

                <div className={`max-w-[85%] lg:max-w-[75%]`}>
                  <div
                    className={`rounded-2xl p-5 shadow-lg backdrop-blur-sm border ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30 text-white ml-auto rounded-tr-sm'
                      : 'bg-white/5 border-white/10 text-gray-100 rounded-tl-sm hover:border-purple-500/30 transition-colors duration-300'
                      }`}
                  >
                    <div
                      className="prose prose-invert max-w-none text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <p className="text-xs text-gold/80 font-medium mb-2 uppercase tracking-wide">Sources Verified:</p>
                        <ul className="space-y-1">
                          {msg.sources.map((source, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-white/50 bg-black/20 rounded px-2 py-1">
                              <span className="w-1 h-1 bg-gold rounded-full"></span>
                              {source}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
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
        <div className="p-4 mb-4">
          <div className="max-w-3xl mx-auto">
            {/* Disclaimers */}
            <p className="text-[10px] text-center text-white/30 mb-2">
              {t('disclaimer_text')}
            </p>

            <form onSubmit={handleSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-gold-dark/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-[#1a1a25] rounded-2xl border border-white/10 flex items-end p-2 shadow-2xl">
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
                  className="flex-1 bg-transparent text-white px-4 py-3 max-h-[150px] resize-none focus:outline-none placeholder-white/30 text-base"
                  disabled={loading}
                  style={{ minHeight: '52px' }}
                />

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className={`
                    flex-shrink-0 mb-1 mr-1 p-3 rounded-xl transition-all duration-300
                    ${loading || !input.trim()
                      ? 'bg-white/5 text-white/20 cursor-not-allowed'
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
