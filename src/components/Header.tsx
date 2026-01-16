import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface HeaderProps {
  theme?: 'light' | 'dark';
  simple?: boolean;
}

export default function Header({ theme = 'dark', simple = false }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll for header background
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`fixed w-full py-5 px-6 lg:px-8 z-50 transition-all duration-500 ${isScrolled
        ? (theme === 'light' ? 'bg-white/90 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-rich-black/90 backdrop-blur-lg border-b border-gold/10')
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-2"
        >
          <span className="font-heading text-2xl font-bold text-gold group-hover:text-gold-light transition-colors duration-300">
            Kemet
          </span>
          <span className={`font-display text-2xl font-light transition-colors duration-300 ${theme === 'light' ? 'text-gray-900 group-hover:text-black' : 'text-white group-hover:text-gray-200'}`}>
            AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!simple && (
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/solutions"
              className={`${theme === 'light' ? 'text-gray-600 hover:text-gold' : 'text-gray-300 hover:text-gold'} transition-colors duration-300 text-sm font-medium tracking-wide`}
            >
              {t('nav_solutions')}
            </Link>
            <Link
              to="/outils"
              className={`${theme === 'light' ? 'text-gray-600 hover:text-gold' : 'text-gray-300 hover:text-gold'} transition-colors duration-300 text-sm font-medium tracking-wide`}
            >
              {t('nav_tools')}
            </Link>
            <Link
              to="/formations"
              className={`${theme === 'light' ? 'text-gray-600 hover:text-gold' : 'text-gray-300 hover:text-gold'} transition-colors duration-300 text-sm font-medium tracking-wide`}
            >
              {t('nav_trainings')}
            </Link>
            <Link
              to="/about"
              className={`${theme === 'light' ? 'text-gray-600 hover:text-gold' : 'text-gray-300 hover:text-gold'} transition-colors duration-300 text-sm font-medium tracking-wide`}
            >
              {t('nav_about')}
            </Link>
          </nav>
        )}

        {/* Mobile Actions (Lang + Menu) */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Always Visible */}
          <button
            onClick={toggleLanguage}
            className={`px-3 py-1.5 border rounded-full text-xs transition-all duration-300 font-medium tracking-wide ${theme === 'light'
              ? 'border-gray-200 text-gray-700 hover:bg-gray-100'
              : 'border-gold/30 text-gold hover:bg-gold/10'
              }`}
          >
            {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
          </button>

          {/* Mobile Menu Button */}
          {!simple && (
            <button
              className={`md:hidden p-2 transition-colors ${theme === 'light' ? 'text-gray-900' : 'text-gold'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0a0a0f] border-b border-gold/10 shadow-xl md:hidden animate-fade-in-down">
            <div className="flex flex-col p-6 space-y-6">
              <Link
                to="/solutions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-gold transition-colors text-lg font-medium"
              >
                {t('nav_solutions')}
              </Link>
              <Link
                to="/outils"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-gold transition-colors text-lg font-medium"
              >
                {t('nav_tools')}
              </Link>
              <Link
                to="/formations"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-gold transition-colors text-lg font-medium"
              >
                {t('nav_trainings')}
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-gold transition-colors text-lg font-medium"
              >
                {t('nav_about')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
