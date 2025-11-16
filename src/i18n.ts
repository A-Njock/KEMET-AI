import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

const savedLang =
  (typeof window !== 'undefined' && window.localStorage.getItem('kemet_lang')) ||
  (typeof navigator !== 'undefined' && (navigator.language || navigator['userLanguage']))?.toLowerCase().startsWith('fr')
    ? 'fr'
    : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    lng: savedLang || 'fr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Persist selection and update <html lang="..">
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    try {
      window.localStorage.setItem('kemet_lang', lng);
    } catch {}
    try {
      document.documentElement.lang = lng;
    } catch {}
  });
  // initialize html lang
  try {
    document.documentElement.lang = i18n.language;
  } catch {}
}

export default i18n;

