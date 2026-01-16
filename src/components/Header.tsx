import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

interface HeaderProps {
  theme?: 'light' | 'dark';
}

export default function Header({ theme = 'dark' }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

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
        ? 'bg-rich-black/90 backdrop-blur-lg border-b border-gold/10'
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

        {/* Navigation */}
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

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="ml-4 px-3 py-1.5 border border-gold/30 rounded-full text-xs text-gold hover:bg-gold/10 transition-all duration-300"
          >
            {i18n.language.startsWith('fr') ? 'EN' : 'FR'}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gold">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
