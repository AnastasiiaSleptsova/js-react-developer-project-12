// Типы для API авторизации
export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  username: string
}

export interface AuthError {
  message: string
  status?: number
}
