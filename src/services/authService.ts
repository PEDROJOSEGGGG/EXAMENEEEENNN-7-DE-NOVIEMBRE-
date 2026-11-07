import axios from 'axios'
import { API_URL } from '../config'
import type { LoginResponse } from '../types'

type TokenPair = { accessToken: string; refreshToken: string }

// Cliente sin interceptores: login y refresh no deben pasar por la lógica de renovación.
const plain = axios.create({ baseURL: API_URL, timeout: 15000 })

async function login(username: string, password: string): Promise<LoginResponse> {
  const response = await plain.post<LoginResponse>('/auth/login', {
    username,
    password,
    expiresInMins: 1,
  })
  return response.data
}

async function refresh(refreshToken: string): Promise<TokenPair> {
  const response = await plain.post<TokenPair>('/auth/refresh', {
    refreshToken,
    expiresInMins: 1,
  })
  return response.data
}

export const authService = { login, refresh }
