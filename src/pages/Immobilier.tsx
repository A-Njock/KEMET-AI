import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function Immobilier() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-6 pt-40 pb-24 text-center">
        <div className="w-16 h-16 bg-royal-pale border border-royal/20 rounded-2xl mx-auto mb-8 flex items-center justify-center">
          <svg className="w-8 h-8 text-royal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
        </div>
        <span className="inline-block px-3 py-1 bg-[#DDE2EE] text-slate text-xs font-semibold tracking-widest uppercase rounded-full mb-6">
          {isFr ? 'Bientôt' : 'Coming Soon'}
        </span>
        <h1 className="font-display text-5xl font-semibold text-navy mb-5">{t('immobilier_title')}</h1>
        <p className="text-slate text-lg leading-relaxed">{t('immobilier_text')}</p>
      </main>
      <Footer />
    </div>
  );
}
