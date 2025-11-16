import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { chatbot } from '../lib/api';

export default function Outils() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse('');
    setSources([]);

    try {
      const result = await chatbot(query, []);
      setResponse(result.answer);
      setSources(result.sources);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-6 text-center">
          Chatbot Loi Camerounaise
        </h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          Posez une question juridique et obtenez une réponse basée sur les documents légaux du Cameroun.
        </p>

        <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-gold/20 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('chatbot_placeholder')}
                className="w-full px-4 py-3 bg-black border border-gold/30 rounded-lg text-white focus:outline-none focus:border-gold"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-full bg-gold text-black font-bold py-3 rounded-lg hover:bg-gold/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Recherche...' : 'Poser la question'}
            </button>
          </form>
        </div>
        {/* Disclaimers */}
        <div className="mb-6">
          <p className="text-xs italic text-gray-500">
            Avertissement : Ce contenu est fourni uniquement à des fins éducatives et peut contenir des inexactitudes ou des omissions.
            Il ne constitue pas un conseil professionnel. Pour toute décision ou action, veuillez consulter un professionnel qualifié
            possédant l'expertise appropriée.
          </p>
          <p className="text-xs italic text-gray-500 mt-2">
            Disclaimer: This generated content is provided for educational purposes only and may contain inaccuracies or omissions.
            It is not intended as professional advice. For any decisions or actions, please consult a qualified professional with
            relevant expertise.
          </p>
        </div>

        {response && (
          <div className="bg-white/5 rounded-xl p-6 md:p-8 border border-gold/20 mb-6">
            <h3 className="text-xl font-heading font-bold text-gold mb-4">Réponse:</h3>
            <div
              className="text-gray-300 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: response }}
            />
            {sources.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gold/20">
                <p className="text-sm text-gold font-medium mb-2">Sources:</p>
                <ul className="list-disc list-inside text-gray-400 text-sm">
                  {sources.map((source, idx) => (
                    <li key={idx}>{source}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <Link
            to="/chatbot"
            className="inline-block bg-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-gold/80 transition-colors duration-200"
          >
            {t('chatbot_button')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

