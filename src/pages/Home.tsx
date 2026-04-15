import Card from '../components/Card';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  };

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

        {/* Background: grid pattern + gradient orbs */}
        <div className="absolute inset-0 hero-grid-pattern" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-royal-pale via-transparent to-transparent opacity-70 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-[#EEF2FF] via-transparent to-transparent opacity-50 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-royal-pale border border-royal/20 rounded-full">
                <div className="w-1.5 h-1.5 bg-royal rounded-full animate-pulse" />
                <span className="text-royal text-xs font-semibold tracking-widest uppercase">
                  {isFr ? 'Generative AI for Next-gen Productivity' : 'Generative AI for Next-gen Productivity'}
                </span>
              </div>
            </div>

            {/* Main headline */}
            <h1
              className="font-display text-6xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] text-navy mb-6 animate-fade-in-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {isFr ? (
                <>
                  L'Intelligence<br />
                  <span className="italic text-royal">Artificielle</span><br />
                  De Confiance
                </>
              ) : (
                <>
                  Artificial<br />
                  <span className="italic text-royal">Intelligence</span><br />
                  You Can Trust
                </>
              )}
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-slate max-w-xl leading-relaxed mb-10 animate-fade-in-up"
              style={{ animationDelay: '0.35s', animationFillMode: 'both' }}
            >
              {t('hero_tagline')}
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <Link to="/solutions" className="btn-primary">
                {isFr ? 'Découvrir nos Solutions' : 'Explore Solutions'}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/chatbot" className="btn-secondary">
                {isFr ? 'Essayer GANP-chat' : 'Try GANP-chat'}
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div
            className="mt-20 pt-10 border-t border-[#DDE2EE] grid grid-cols-3 gap-8 max-w-lg animate-fade-in-up"
            style={{ animationDelay: '0.65s', animationFillMode: 'both' }}
          >
            {[
              { value: '3+', label: isFr ? 'Années d\'expertise' : 'Years of expertise' },
              { value: '50+', label: isFr ? 'Entreprises servies' : 'Businesses served' },
              { value: '2', label: isFr ? 'Langues' : 'Languages' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl font-semibold text-navy">{value}</p>
                <p className="text-slate text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating logo — decorative right side */}
        <div
          className="absolute right-8 lg:right-20 top-1/2 -translate-y-1/2 hidden lg:block opacity-10 float pointer-events-none"
          style={{ animationDelay: '1s' }}
        >
          <img src="/ganp-logo.svg" alt="" className="w-72 h-72" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-28">

        {/* Section header */}
        <section ref={(el) => addToRefs(el, 0)} className="reveal mb-16">
          <p className="text-royal text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            {isFr ? 'Ce que nous offrons' : 'What We Offer'}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy">
            {isFr ? 'Solutions IA sur mesure' : 'Tailored AI Solutions'}
          </h2>
        </section>

        {/* Cards */}
        <section ref={(el) => addToRefs(el, 1)} className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {cards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </section>

        {/* Secondary links */}
        <section ref={(el) => addToRefs(el, 2)} className="reveal mb-20 flex items-center gap-2 text-sm text-slate">
          <span className="font-medium">{t('plus_label')}</span>
          <Link className="text-royal hover:underline font-medium" to="/immobilier">
            {t('plus_immobilier')}
          </Link>
          <span className="text-[#DDE2EE]">•</span>
          <Link className="text-royal hover:underline font-medium" to="/achat-vente">
            {t('plus_achat_vente')}
          </Link>
        </section>

        {/* Gallery */}
        <section ref={(el) => addToRefs(el, 3)} className="reveal">
          <Gallery />
        </section>
      </main>

      <Footer />
    </div>
  );
}
