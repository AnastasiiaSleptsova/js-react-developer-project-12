// Типы для API авторизации
export type LoginRequest = {
  username: string
  password: string
}

export type AuthResponse = {
  token: string
  username: string
}

export type AuthError = {
  message: string
  status?: number
}
