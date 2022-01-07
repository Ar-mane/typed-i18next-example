import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  defaultLanguage,
  defaultNameSpace,
  keySeparator,
  nameSpaceNames,
  resources,
} from "~/localization/translations";

import LanguageDetector from "i18next-browser-languagedetector";

export function initI18n(locale?: string): void {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      ns: nameSpaceNames,
      defaultNS: defaultNameSpace,
      lng: locale,
      resources,
      // if you don't have plural polyfill installed already
      compatibilityJSON: "v3",
      fallbackLng: defaultLanguage,
      keySeparator: keySeparator,
      // TECHNICAL DEBT : used to avoid character codes in texts -> user values have to be escaped manually to mitigate XSS attacks
      interpolation: { escapeValue: false },
    });
}
