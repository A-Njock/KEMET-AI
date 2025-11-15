import Card from '../components/Card';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Home() {
  const { t } = useTranslation();
  
  const cards = [
    {
      title: t('solutions_card'),
      desc: t('solutions_card_desc'),
      to: '/solutions'
    },
    {
      title: t('outils_card'),
      desc: t('outils_card_desc'),
      to: '/outils'
    },
    {
      title: t('formations_card'),
      desc: t('formations_card_desc'),
      to: '/formations'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0a0a] to-black font-sans">
      <Header />
      <main className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mt-20 md:mt-32 text-center mb-20">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-gold/10 border border-gold/20">
            <span className="text-gold text-sm font-medium">IA pour l'Afrique</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-tight">
            {t('hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {t('hero_tagline')}
          </p>
        </section>
        
        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {cards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </section>
        
        {/* Secondary Links */}
        <section className="mb-16 text-center">
          <p className="text-sm text-gray-500">
            <span className="text-gray-400">Plus: </span>
            <Link className="text-gold hover:text-gold-light transition-colors font-medium" to="/immobilier">
              {t('plus_immobilier')}
            </Link>
            <span className="text-gray-500"> • </span>
            <Link className="text-gold hover:text-gold-light transition-colors font-medium" to="/achat-vente">
              {t('plus_achat_vente')}
            </Link>
          </p>
        </section>
        
        {/* Gallery */}
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

