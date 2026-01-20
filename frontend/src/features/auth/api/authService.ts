import { apiClient } from '@/shared/api/apiClient'
import { LoginRequest, AuthResponse } from './types'

// Сервис для работы с авторизацией
export class AuthService {
  // Авторизация пользователя
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/login', {
      username: credentials.username,
      password: credentials.password,
    })
    return response.data
  }

  // Регистрация нового пользователя
  static async signup(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/v1/signup', {
      username: credentials.username,
      password: credentials.password,
    })
    return response.data
  }
}
