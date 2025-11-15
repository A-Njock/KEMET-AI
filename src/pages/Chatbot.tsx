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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const result = await chatbot(input);
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.answer,
        sources: result.sources
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Erreur lors de la recherche. Veuillez réessayer.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-gold mb-6 text-center">
          Chatbot Loi Camerounaise
        </h1>

        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 py-12">
              <p className="text-lg mb-2">Bienvenue au Chatbot Loi Camerounaise</p>
              <p className="text-sm">Posez une question juridique pour commencer</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  msg.role === 'user'
                    ? 'bg-gold text-black'
                    : 'bg-white/10 text-gray-300 border border-gold/20'
                }`}
              >
                <div
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: msg.content }}
                />
                {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gold/20">
                    <p className="text-xs text-gold font-medium mb-1">Sources:</p>
                    <ul className="list-disc list-inside text-xs">
                      {msg.sources.map((source, i) => (
                        <li key={i}>{source}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-lg p-4 border border-gold/20">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatbot_placeholder')}
            className="flex-1 px-4 py-3 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-gold/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Envoyer
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

