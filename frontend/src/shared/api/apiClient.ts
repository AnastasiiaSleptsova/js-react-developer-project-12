import axios from 'axios'

export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 8000, // ограничиваем ожидание, чтобы не зависать при отсутствии сети
})

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
    // Если это 401 на странице, отличной от логина, редиректим
    if (error.response?.status === 401 && window.location.pathname !== '/login') {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      window.location.href = '/login'
    }
    const reason = error instanceof Error ? error : new Error('Request failed')
    return Promise.reject(reason)
  },
)
