import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const content = t('about_content');
  const paragraphs = content.split('\n\n').filter((p: string) => p.trim());

  return (
    <div className="min-h-screen bg-ivory font-sans">
      <Header />

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 max-w-7xl mx-auto">
        <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">
          {isFr ? 'Notre Histoire' : 'Our Story'}
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy leading-tight">
          {t('about_title')}
        </h1>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <hr className="rule mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {paragraphs.map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="font-display text-xl md:text-2xl text-navy/80 leading-relaxed italic"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-16 pt-10 border-t border-[#DDE2EE]">
              <p className="font-display text-2xl font-semibold text-navy mb-1">
                {t('about_signature_name')}
              </p>
              <p className="text-royal text-sm font-medium tracking-wide">
                {t('about_signature_title')}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="luxury-card p-8 sticky top-28">
              <div className="mb-6 flex justify-center">
                <img src="/ganp-logo.svg" alt="GANP" className="w-24 h-24 opacity-80" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-navy text-center mb-2">GANP</h3>
              <p className="text-slate text-xs text-center tracking-widest uppercase mb-8">
                Generative AI for Next-gen Productivity
              </p>
              <hr className="rule mb-8" />
              <div className="space-y-5">
                {[
                  { value: '3+', label: isFr ? 'Années d\'expertise' : 'Years of expertise' },
                  { value: '50+', label: isFr ? 'Entreprises servies' : 'Businesses served' },
                  { value: 'FR/EN', label: isFr ? 'Bilingue' : 'Bilingual' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="text-slate text-sm">{label}</span>
                    <span className="font-display text-2xl font-semibold text-navy">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
