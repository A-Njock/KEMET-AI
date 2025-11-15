import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function Immobilier() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-black font-sans">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-gold mb-6">
          {t('immobilier_title')}
        </h1>
        <p className="text-lg text-gray-300">
          {t('immobilier_text')}
        </p>
        <div className="mt-8">
          <a
            href="https://github.com/kemet-ai/immobilier"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold/80 underline"
          >
            Voir le repo GitHub
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}

