import { setUnauthorizedHandler } from '@shared/api/apiClient'
import { routePaths } from '@shared/config/routes'

const clearAuthStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

export const initAuthUnauthorizedHandler = () => {
  setUnauthorizedHandler((error) => {
    const status = (error as { response?: { status?: number } })?.response?.status
    if (status === 401 && window.location.pathname !== routePaths.login) {
      clearAuthStorage()
      window.location.href = routePaths.login
    }
  })
}

export const resetAuthUnauthorizedHandler = () => setUnauthorizedHandler(null)
