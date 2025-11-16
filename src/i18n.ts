import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import fr from './locales/fr.json';
import en from './locales/en.json';

const getInitialLang = (): 'fr' | 'en' => {
  try {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('kemet_lang');
      if (stored === 'fr' || stored === 'en') return stored;
    }
  } catch {}
  const browserLang =
    typeof navigator !== 'undefined' && typeof navigator.language === 'string'
      ? navigator.language.toLowerCase()
      : 'en';
  return browserLang.startsWith('fr') ? 'fr' : 'en';
};

const initialLang = getInitialLang();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en }
    },
    lng: initialLang,
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

