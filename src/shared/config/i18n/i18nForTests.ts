import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: { translation: { Язык: "EN" } },
  ru: { translation: { Язык: "RU" } },
  kr: { translation: { Язык: "KR" } },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  fallbackLng: "ru",
  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },
});

export { i18n as i18nForTest };
