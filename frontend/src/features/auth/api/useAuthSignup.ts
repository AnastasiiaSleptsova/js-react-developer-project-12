import { useMutation } from '@tanstack/react-query'

import { AuthService } from './authService'
import type { AuthResponse, LoginRequest } from './types'

export const useAuthSignup = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (payload) => AuthService.signup(payload),
    networkMode: 'always',
    retry: false,
  })
}
