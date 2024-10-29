import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ru from "./ru/translation.json";
import en from "./en/translation.json";

export default i18next
  .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
  // .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере
  .init({
    resources: {
      ru: ru,
      en: en,
    },
    fallbackLng: "ru", // если переводы на языке пользователя недоступны, то будет использоваться язык, указанный в этом поле
    interpolation: {
      escapeValue: false, // экранирование уже есть в React, поэтому отключаем
    },
  });
