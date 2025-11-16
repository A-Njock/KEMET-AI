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
  const { t, i18n } = useTranslation();
  const isFr = i18n.language === 'fr';
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
      // Build conversation history for context
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
        content: 'Erreur lors de la recherche. Veuillez réessayer.'
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
    <div className="min-h-screen bg-[#343541] font-sans flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col max-w-3xl w-full mx-auto">
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-20">
              <h2 className="text-2xl font-semibold text-white mb-2">Kemet-chat Loi Camerounaise</h2>
              <p className="text-sm">{isFr ? 'Posez une question juridique pour commencer' : 'Ask a legal question to begin'}</p>
            </div>
          )}
          
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">
                    AI
                  </div>
                )}
                <div className={`flex-1 ${msg.role === 'user' ? 'max-w-[85%]' : 'max-w-[90%]'}`}>
                  <div
                    className={`rounded-lg p-4 ${
                      msg.role === 'user'
                        ? 'bg-[#10a37f] text-white ml-auto'
                        : 'bg-[#444654] text-gray-100'
                    }`}
                  >
                    <div
                      className="prose prose-invert max-w-none text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: msg.content }}
                    />
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-600">
                        <p className="text-xs text-gray-400 font-medium mb-2">Sources:</p>
                        <ul className="list-disc list-inside text-xs text-gray-400 space-y-1">
                          {msg.sources.map((source, i) => (
                            <li key={i}>{source}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#10a37f] flex items-center justify-center text-white font-bold text-sm">
                    U
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black font-bold text-sm">
                  AI
                </div>
                <div className="flex-1 max-w-[90%]">
                  <div className="bg-[#444654] rounded-lg p-4">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div ref={messagesEndRef} />
        </div>

        {/* Disclaimers above the input */}
        <div className="px-4 pb-2">
          {isFr ? (
            <p className="text-[11px] italic text-gray-400">
              Avertissement : Ce contenu est fourni uniquement à des fins éducatives et peut contenir des inexactitudes ou des
              omissions. Il ne constitue pas un conseil professionnel. Pour toute décision ou action, veuillez consulter un
              professionnel qualifié possédant l&apos;expertise appropriée.
            </p>
          ) : (
            <p className="text-[11px] italic text-gray-400">
              Disclaimer: This generated content is provided for educational purposes only and may contain inaccuracies or
              omissions. It is not intended as professional advice. For any decisions or actions, please consult a qualified
              professional with relevant expertise.
            </p>
          )}
        </div>

        <div className="border-t border-gray-700 bg-[#343541] px-4 py-3">
          <form onSubmit={handleSubmit} className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
                }}
                onKeyDown={handleKeyDown}
                placeholder={t('chatbot_placeholder')}
                rows={1}
                className="w-full px-4 py-3 bg-[#40414f] text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-gold/50 max-h-[200px] overflow-y-auto"
                disabled={loading}
                style={{ minHeight: '48px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-[#10a37f] hover:bg-[#0d8f6e] text-white font-medium px-4 py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

