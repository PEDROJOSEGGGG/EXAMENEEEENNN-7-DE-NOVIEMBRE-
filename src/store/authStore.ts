import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthUser, LoginResponse } from '../types'

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  refreshToken: string | null
  setSession: (response: LoginResponse) => void
  setTokens: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
} satisfies Pick<AuthState, 'user' | 'accessToken' | 'refreshToken'>

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: (response) =>
        set({
          user: response,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set(initialState),
    }),
    { name: 'auth-storage' },
  ),
)
