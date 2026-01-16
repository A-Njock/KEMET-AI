import Card from '../components/Card';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Scroll reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

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
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: t('outils_card'),
      desc: t('outils_card_desc'),
      to: '/outils',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    },
    {
      title: t('formations_card'),
      desc: t('formations_card_desc'),
      to: '/formations',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path d="M12 14l9-5-9-5-9 5 9 5zM12 14v7" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-[#151520] font-sans overflow-x-hidden">
      <Header />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-africa.png"
            alt=""
            className="w-full h-full object-cover object-center opacity-60"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 1.5}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          {/* Eyebrow */}
          <p className="text-gold/80 text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
            {i18n.language.startsWith('fr') ? 'Bienvenue chez' : 'Welcome to'}
          </p>

          {/* Main Headline */}
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
            {i18n.language.startsWith('fr') ? (
              <>
                <span className="gradient-text">Intelligence Artificielle</span>
                <br />
                <span className="text-white/90">Bâtir la Confiance</span>
              </>
            ) : (
              <>
                <span className="gradient-text">Artificial Intelligence</span>
                <br />
                <span className="text-white/90">Building Trust</span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t('hero_tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/solutions" className="btn-primary">
              {i18n.language.startsWith('fr') ? 'Découvrir nos Solutions' : 'Explore Solutions'}
            </Link>
            <Link to="/outils" className="btn-secondary">
              {i18n.language.startsWith('fr') ? 'Essayer Kemet AI' : 'Try Kemet AI'}
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        {/* Section Header */}
        <section
          ref={(el) => addToRefs(el, 0)}
          className="reveal text-center mb-16"
        >
          <p className="text-gold text-sm tracking-[0.2em] uppercase mb-4">
            {i18n.language.startsWith('fr') ? 'Ce que nous offrons' : 'What We Offer'}
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
            {i18n.language.startsWith('fr') ? 'Solutions IA sur mesure' : 'Tailored AI Solutions'}
          </h2>
        </section>

        {/* Cards Section */}
        <section
          ref={(el) => addToRefs(el, 1)}
          className="reveal grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {cards.map((props, idx) => (
            <Card key={idx} {...props} />
          ))}
        </section>

        {/* Secondary Links */}
        <section
          ref={(el) => addToRefs(el, 2)}
          className="reveal mb-16 text-center"
        >
          <p className="text-sm text-gray-500">
            <span className="text-gray-400">{t('plus_label')} </span>
            <Link className="text-gold hover:text-gold-light transition-colors font-medium" to="/immobilier">
              {t('plus_immobilier')}
            </Link>
            <span className="text-gray-600 mx-3">•</span>
            <Link className="text-gold hover:text-gold-light transition-colors font-medium" to="/achat-vente">
              {t('plus_achat_vente')}
            </Link>
          </p>
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
