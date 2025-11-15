import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  return (
    <button
      className="bg-black border border-gold rounded px-3 py-2 text-gold text-sm hover:bg-gold hover:text-black transition-colors duration-200"
      onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
    >
      {i18n.language === 'fr' ? 'Français' : 'English'} | {i18n.language === 'fr' ? 'English' : 'Français'}
    </button>
  );
}

