import { motion, type Variants } from 'framer-motion';
import Card from '../components/Card';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import AnimateIn from '../components/AnimateIn';
import Counter from '../components/Counter';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.12 } },
  hidden: {},
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Home() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const cards = [
    {
      title: t('solutions_card'),
      desc: t('solutions_card_desc'),
      to: '/solutions',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('outils_card'),
      desc: t('outils_card_desc'),
      to: '/outils',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: t('formations_card'),
      desc: t('formations_card_desc'),
      to: '/formations',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-ivory font-sans overflow-x-hidden">
      <Header />

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern" />
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(250,244,230,0.7) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(250,244,230,0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Background logo — shifted right */}
        <motion.div
          className="absolute inset-0 flex items-center pointer-events-none"
          style={{ justifyContent: 'flex-end', paddingRight: '20%' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.07 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <motion.img
            src="/ganp-logo.png"
            alt=""
            className="w-[480px] h-[480px] object-contain"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left: text content */}
            <motion.div
              className="flex-1 max-w-xl"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] text-navy mb-6"
              >
                {isFr ? (
                  <>IA<br /><span className="italic text-royal">Générative</span><br />Nouvelle Génération</>
                ) : (
                  <>Generative AI<br />for <span className="italic text-royal">Next-gen</span><br />Productivity</>
                )}
              </motion.h1>

              {/* Subheadline */}
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-slate max-w-xl leading-relaxed mb-10">
                {t('hero_tagline')}
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/solutions" className="btn-primary">
                  {isFr ? 'Découvrir nos Solutions' : 'Explore Solutions'}
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/chatbot" className="btn-secondary">
                  {isFr ? 'Essayer Ganp-Chat' : 'Try Ganp-Chat'}
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={fadeUp}
                className="mt-16 pt-10 border-t border-[#DDE2EE] grid grid-cols-2 gap-8 max-w-xs"
              >
                {[
                  { to: 3, suffix: '+', label: isFr ? "Années d'expertise" : 'Years of expertise' },
                  { to: 50, suffix: '+', label: isFr ? 'Entreprises servies' : 'Businesses served' },
                ].map(({ to, suffix, label }) => (
                  <div key={label}>
                    <p className="font-display text-4xl font-semibold text-navy">
                      <Counter to={to} suffix={suffix} duration={1.6} />
                    </p>
                    <p className="text-slate text-sm mt-1">{label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg className="w-6 h-6 text-slate/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== SERVICES ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-28">

        <AnimateIn className="mb-16">
          <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {isFr ? 'Ce que nous offrons' : 'What We Offer'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy">
            {isFr ? 'Solutions IA sur mesure' : 'Tailored AI Solutions'}
          </h2>
        </AnimateIn>

        {/* Cards with stagger */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {cards.map((props, idx) => (
            <motion.div key={idx} variants={fadeUp} className="h-full">
              <Card {...props} />
            </motion.div>
          ))}
        </motion.div>

        {/* Specialty areas */}
        <AnimateIn className="mb-20">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-slate text-xs font-semibold tracking-widest uppercase">{t('plus_label')}</span>
            <Link
              to="/immobilier"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#DDE2EE] rounded-full text-sm font-medium text-navy hover:border-royal hover:text-royal transition-all duration-200"
            >
              {t('plus_immobilier')}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link
              to="/achat-vente"
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#DDE2EE] rounded-full text-sm font-medium text-navy hover:border-royal hover:text-royal transition-all duration-200"
            >
              {t('plus_achat_vente')}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </AnimateIn>

        {/* Gallery */}
        <AnimateIn>
          <Gallery />
        </AnimateIn>
      </main>

      <Footer />
    </div>
  );
}
