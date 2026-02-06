import { setUnauthorizedHandler } from '@shared/api/apiClient'

const LOGIN_PATH = '/login'

const clearAuthStorage = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('username')
}

export const initAuthUnauthorizedHandler = () => {
  setUnauthorizedHandler((error) => {
    const status = (error as { response?: { status?: number } })?.response?.status
    if (status === 401 && window.location.pathname !== LOGIN_PATH) {
      clearAuthStorage()
      window.location.href = LOGIN_PATH
    }
  })
}

export const resetAuthUnauthorizedHandler = () => setUnauthorizedHandler(null)
