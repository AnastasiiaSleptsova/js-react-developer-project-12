import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const useLanguage = (): {
  language: 'ru' | 'en'
  changeLanguage: (lng: 'ru' | 'en') => void
} => {
  const { i18n } = useTranslation()

  const changeLanguage = useCallback(
    (lng: 'ru' | 'en') => {
      if (i18n.language === lng) return
      void i18n.changeLanguage(lng)
    },
    [i18n],
  )

  const language = i18n.language.startsWith('en') ? 'en' : 'ru'

  return {
    language,
    changeLanguage,
  }
}
