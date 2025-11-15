import Card from '../components/Card';
import ConnectionsCounter from '../components/ConnectionsCounter';
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
    <div className="min-h-screen bg-black font-sans pb-10">
      <ConnectionsCounter />
      <Header />
      <main className="max-w-6xl mx-auto px-4">
        <section className="mt-12 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-gold mb-4">
            {t('hero_title')}
          </h1>
          <h2 className="text-2xl md:text-3xl text-white mt-2 mb-4">
            {t('hero_subhead')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mt-2">
            {t('hero_tagline')}
          </p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {cards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </section>
        
        <section className="mt-8 mb-6 text-center">
          <p className="text-sm italic text-gray-400">
            Plus: <Link className="underline text-gold hover:text-gold/80" to="/immobilier">{t('plus_immobilier')}</Link> Achetez, louez, trouvez vite.{' '}
            <Link className="underline text-gold hover:text-gold/80" to="/achat-vente">{t('plus_achat_vente')}</Link>-Achetez, vendez-marché intelligent.
          </p>
        </section>
        
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}

