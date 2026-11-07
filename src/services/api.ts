import axios from 'axios'
import { API_URL } from '../config'
import { useAuthStore } from '../store/authStore'
import { authService } from './authService'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const failedRequest = error.config
    const isAuthError = error.response?.status === 401

    if (!isAuthError || !failedRequest || failedRequest._retry) {
      return Promise.reject(error)
    }

    failedRequest._retry = true

    try {
      const { refreshToken } = useAuthStore.getState()
      if (!refreshToken) {
        throw new Error('No existe refresh token')
      }

      const refreshed = await authService.refresh(refreshToken)
      useAuthStore.getState().setTokens(refreshed.accessToken, refreshed.refreshToken)

      failedRequest.headers = failedRequest.headers ?? {}
      failedRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`

      return api(failedRequest)
    } catch (refreshFailure) {
      useAuthStore.getState().logout()
      window.location.assign('/login')
      return Promise.reject(refreshFailure)
    }
  },
)
