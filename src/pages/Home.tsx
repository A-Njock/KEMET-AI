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
          <h1
            className="text-4xl md:text-5xl lg:text-5xl font-extrabold text-white mb-6 leading-[1.58] tracking-normal md:tracking-wide"
            style={{ fontFamily: 'Raleway, system-ui, sans-serif' }}
          >
            {t('hero_title_full')}
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
            <span className="text-gray-400">{t('plus_label')} </span>
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

