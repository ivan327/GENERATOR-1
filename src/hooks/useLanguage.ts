import { useState, useEffect } from 'react';
import { translations, Language } from '../i18n/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

  return { language, changeLanguage, t };
};
