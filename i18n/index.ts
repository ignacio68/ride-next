import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// import { getLanguage } from "@/utils/localization";

import translationEn from "./locales/en-US/translation.json";
import translationEs from "./locales/es-ES/translation.json";

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
};

// const savedLanguage = getLanguage();

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    compatibilityJSON: "v4",
    resources,
    supportedLngs: ["en", "es"],
    // lng: savedLanguage,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
