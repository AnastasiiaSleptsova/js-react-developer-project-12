import { useEffect } from 'react'

import { initAuthUnauthorizedHandler, resetAuthUnauthorizedHandler } from '@features/auth'

/**
 * Глобальные побочные эффекты приложения.
 * Размещаем здесь регистрацию обработчиков и другую одноразовую инициализацию.
 */
export const AppInitializer = () => {
  useEffect(() => {
    initAuthUnauthorizedHandler()
    return () => resetAuthUnauthorizedHandler()
  }, [])

  return null
}
