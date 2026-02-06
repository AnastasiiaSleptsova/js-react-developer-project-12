import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000, // ограничиваем ожидание, чтобы не зависать при отсутствии сети
})

type UnauthorizedHandler = (error: unknown) => void
let unauthorizedHandler: UnauthorizedHandler | null = null

export const setUnauthorizedHandler = (handler: UnauthorizedHandler | null) => {
  unauthorizedHandler = handler
}

// Добавляем токен в заголовки запроса
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      unauthorizedHandler?.(error)
    }
    const reason = error instanceof Error ? error : new Error('Request failed')
    return Promise.reject(reason)
  },
)
