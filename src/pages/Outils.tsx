import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Outils() {
  const { t } = useTranslation();

  const tools = [
    {
      title: t('kemet_chat_title'),
      description: t('kemet_chat_desc'),
      details: t('kemet_chat_details'),
      link: '/chatbot',
      linkText: t('use_kemet_chat'),
    },
    // More tools can be added here in the future
  ];

  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gold mb-6">
            {t('outils_title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {t('outils_sub')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,160,23,0.15)] hover:-translate-y-1"
            >
              {/* Tool Title */}
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-gold mb-4">
                {tool.title}
              </h2>

              {/* Tool Description */}
              <p className="text-gray-300 mb-4 leading-relaxed">
                {tool.description}
              </p>

              {/* Tool Details */}
              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                {tool.details}
              </p>

              {/* Access Link */}
              <Link
                to={tool.link}
                className="inline-block w-full text-center bg-gold text-black font-bold py-3 px-6 rounded-lg hover:bg-gold/80 transition-all duration-200 hover:shadow-[0_0_15px_rgba(212,160,23,0.4)]"
              >
                {tool.linkText}
              </Link>
            </div>
          ))}
        </div>

        {/* Coming Soon Message for Future Tools */}
        {tools.length === 1 && (
          <div className="mt-16 text-center">
            <p className="text-gray-500 italic">
              {t('more_tools_coming') || 'Plus d\'outils à venir...'}
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
