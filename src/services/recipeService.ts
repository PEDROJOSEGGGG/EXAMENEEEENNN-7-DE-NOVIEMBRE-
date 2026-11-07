import { api } from './api'
import type { Recipe, ListFilters, RecipesResponse } from '../types'

export const PAGE_SIZE = 8

function buildPagination(page: number) {
  return { limit: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }
}

async function list({ page, q }: ListFilters): Promise<RecipesResponse> {
  const query = q.trim()
  const pagination = buildPagination(page)

  const endpoint = query ? '/auth/recipes/search' : '/auth/recipes'
  const params = query ? { q: query, ...pagination } : pagination

  const { data } = await api.get<RecipesResponse>(endpoint, { params })
  return data
}

async function getById(id: number): Promise<Recipe> {
  const { data } = await api.get<Recipe>(`/auth/recipes/${id}`)
  return data
}

async function create(formData: FormData): Promise<Recipe> {
  // Sin header manual: el navegador debe fijar el Content-Type con el boundary del FormData.
  const { data } = await api.post<Recipe>('/recipes/add', formData)
  return data
}

async function remove(id: number): Promise<Recipe> {
  const { data } = await api.delete<Recipe>(`/recipes/${id}`)
  return data
}

export const recipeService = { list, getById, create, remove }
