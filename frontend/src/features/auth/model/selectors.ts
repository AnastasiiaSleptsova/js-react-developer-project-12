import type { AuthState } from './authSlice'

type StateWithAuth = {
  auth: AuthState
}

export const selectAuthUsername = (state: StateWithAuth) => state.auth.username
export const selectAuthLoading = (state: StateWithAuth) => state.auth.loading
export const selectAuthError = (state: StateWithAuth) => state.auth.error
