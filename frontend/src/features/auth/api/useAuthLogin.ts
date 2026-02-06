import { useMutation } from '@tanstack/react-query'

import { AuthService } from './authService'
import type { AuthResponse, LoginRequest } from './types'

export const useAuthLogin = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (payload) => AuthService.login(payload),
    networkMode: 'always',
    retry: false,
  })
}
