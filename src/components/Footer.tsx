import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f14]/95 backdrop-blur-xl border-t border-gold/10 transition-transform duration-500 ease-in-out transform translate-y-[calc(100%-48px)] hover:translate-y-0 group shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {/* Handle / Always Visible Strip */}
      <div className="h-12 flex items-center justify-center cursor-pointer group-hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-2">
          <div className="w-12 h-1 bg-gold/50 rounded-full group-hover:w-16 transition-all duration-300"></div>
          <span className="text-xs text-gold/60 uppercase tracking-widest font-heading group-hover:opacity-0 transition-opacity absolute">Kemet AI</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 pb-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="font-heading text-2xl font-bold text-gold">Kemet</span>
              <span className="font-display text-2xl font-light text-white">AI</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {i18n.language.startsWith('fr')
                ? "Intelligence Artificielle de confiance. Solutions innovantes, formations d'élite, et transfert de compétences technologiques."
                : "Artificial Intelligence you can trust. Innovative solutions, elite training, and real transfer of technological skills."
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              {i18n.language.startsWith('fr') ? 'Navigation' : 'Navigation'}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/solutions" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  {t('nav_solutions')}
                </Link>
              </li>
              <li>
                <Link to="/outils" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  {t('nav_tools')}
                </Link>
              </li>
              <li>
                <Link to="/formations" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  {t('nav_trainings')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  {t('nav_about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-white mb-4 tracking-wide uppercase">
              {i18n.language.startsWith('fr') ? 'Contact' : 'Contact'}
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                Douala, Cameroun
              </li>
              <li>
                <a href="mailto:contact@kemetai.cm" className="text-gray-400 hover:text-gold transition-colors text-sm">
                  contact@kemetai.cm
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {currentYear} Kemet AI. {i18n.language.startsWith('fr') ? 'Tous droits réservés.' : 'All rights reserved.'}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-gold transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
