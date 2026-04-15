import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimateIn from '../components/AnimateIn';
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
        <motion.p
          className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {isFr ? 'Notre Histoire' : 'Our Story'}
        </motion.p>
        <motion.h1
          className="font-display text-5xl md:text-6xl font-semibold text-navy leading-tight"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {t('about_title')}
        </motion.h1>
      </div>

      <main className="max-w-7xl mx-auto px-6 pb-24">
        <hr className="rule mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {paragraphs.map((paragraph: string, index: number) => (
                <AnimateIn key={index} delay={index * 0.1}>
                  <p className="font-display text-xl md:text-2xl text-navy/80 leading-relaxed italic">
                    {paragraph}
                  </p>
                </AnimateIn>
              ))}
            </div>

            {/* Signature */}
            <AnimateIn delay={0.3} className="mt-16 pt-10 border-t border-[#DDE2EE]">
              <p className="font-display text-2xl font-semibold text-navy mb-1">
                {t('about_signature_name')}
              </p>
              <p className="text-royal text-sm font-medium tracking-wide">
                {t('about_signature_title')}
              </p>
            </AnimateIn>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <AnimateIn direction="right" delay={0.2}>
              <div className="luxury-card p-8 sticky top-28">
                <div className="mb-6 flex justify-center">
                  <img src="/ganp-logo.png" alt="GANP" className="w-20 h-20 opacity-70" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-navy text-center mb-1">GANP</h3>
                <p className="text-slate text-xs text-center tracking-widest uppercase mb-8">
                  Generative AI for Next-gen Productivity
                </p>
                <hr className="rule mb-8" />
                <div className="space-y-6">
                  {[
                    { value: '3+', label: isFr ? 'Années d\'expertise' : 'Years of expertise' },
                    { value: '50+', label: isFr ? 'Entreprises servies' : 'Businesses served' },
                  ].map(({ value, label }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-slate text-sm">{label}</span>
                      <span className="font-display text-2xl font-semibold text-navy">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
