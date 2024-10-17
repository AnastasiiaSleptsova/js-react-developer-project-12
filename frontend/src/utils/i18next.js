import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ru from "./ru/translation.json";
import en from "./en/translation.json";

export default i18next
  .use(initReactI18next) // передаем экземпляр i18n в react-i18next, который сделает его доступным для всех компонентов через context API.
  .use(LanguageDetector) // с помощью плагина определяем язык пользователя в браузере
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

  
/* 
{
        translation: {
          enter: "Войти",
          buttonExit: "Выйти",
          notAccount: "Нет аккаунта?",
          signup: "Регистрация",
          buttonSignup: "Зарегестрироваться",
          password: "Пароль",
          repeatPassword: "Подтвердитье пароль",
          userName: "Ваш ник",
          newUserName: "Имя пользователя",
          buttonSend: "Отправить",
          logoText: "Hexlet Chat",
          footer: "by Nastya Sleptsova",
          error401Signup: "Пользователя с таким логином уже существует",
          error404Login: "Страница не найдена",
          error401Login: "Логин или пароль некорректные",
          error500: "Внутренняя ошибка сервера",
          smthError: "Упс. Что-то пошло не так",
          enterMessage: "Введите сообщение...",
          channels: "Каналы",
          rename: "Переименовать",
          delete: "Удалить",
          loading: "Загрузка...",
          requiredField: "Обязательное поле",
          passwordDontToch: "Ваши пароли не совпадают",
          minSymbol_one: "Минимум {{count}} символ",
          minSymbol_few: "Минимум {{count}} символа",
          minSymbol_many: "Минимум {{count}} символов",
          maxSymbol_few: "Максимум {{count}} символа",
          maxSymbol_many: "Максимум {{count}} символов",
          channelNameBusy: "Чат с таким названием уже существует",
          areYouSure: "Вы действительно хотите удалить канал",
          cancel: "Отмена",
        },
      },
      */