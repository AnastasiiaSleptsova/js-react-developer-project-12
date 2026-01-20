import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  username: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  username: localStorage.getItem('username') || null,
  loading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setAuthUser: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.username = action.payload.username
      state.error = null
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('username', action.payload.username)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null
    },
    logout: (state) => {
      state.username = null
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
})

export const { setLoading, setAuthUser, setError, clearError, logout } = authSlice.actions
export default authSlice.reducer
