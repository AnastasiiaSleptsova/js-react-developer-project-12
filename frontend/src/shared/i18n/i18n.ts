import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ru from './locales/ru.json'

export const DEFAULT_LOCALE = 'ru'

const resources = {
  ru: { translation: ru },
  en: { translation: en },
} as const

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE, // фиксированная дефолтная локаль; авто-детект не используем (чтобы тесты от Hexlet проходили)
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: ['ru', 'en'],
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
