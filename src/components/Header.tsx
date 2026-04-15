import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface HeaderProps {
  theme?: 'light' | 'dark';
  simple?: boolean;
}

export default function Header({ simple = false }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#DDE2EE] shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 flex-shrink-0">
            <img src="/ganp-logo.svg" alt="GANP" className="w-full h-full" />
          </div>
          <span className="font-display text-2xl font-semibold text-navy tracking-tight">GANP</span>
        </Link>

        {/* Desktop Navigation */}
        {!simple && (
          <nav className="hidden md:flex items-center gap-8">
            {[
              { to: '/solutions', label: t('nav_solutions') },
              { to: '/outils', label: t('nav_tools') },
              { to: '/formations', label: t('nav_trainings') },
              { to: '/about', label: t('nav_about') },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-slate hover:text-royal text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-royal group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* CTA Button — desktop */}
          {!simple && (
            <Link
              to="/chatbot"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-royal text-white text-sm font-semibold rounded-lg hover:bg-royal-light transition-all duration-200 shadow-btn hover:shadow-btn-hover"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              GANP-chat
            </Link>
          )}

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-1.5 border border-[#DDE2EE] rounded-full text-xs font-semibold text-slate hover:border-royal hover:text-royal transition-all duration-200 tracking-widest"
          >
            {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
          </button>

          {/* Mobile menu button */}
          {!simple && (
            <button
              className="md:hidden p-2 text-navy"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                {isMobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          )}
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-[#DDE2EE] shadow-card md:hidden animate-fade-in">
            <div className="flex flex-col px-6 py-6 gap-5">
              {[
                { to: '/solutions', label: t('nav_solutions') },
                { to: '/outils', label: t('nav_tools') },
                { to: '/formations', label: t('nav_trainings') },
                { to: '/about', label: t('nav_about') },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy text-base font-medium hover:text-royal transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/chatbot"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary w-full text-center justify-center"
              >
                GANP-chat
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
