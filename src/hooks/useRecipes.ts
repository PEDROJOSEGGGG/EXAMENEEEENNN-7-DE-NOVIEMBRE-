import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { recipeService } from '../services/recipeService'
import type { ListFilters } from '../types'
import { getErrorMessage } from '../utils/errorHandler'

const RECIPES_KEY = 'recipes'

export function useRecipes(filters: ListFilters) {
  return useQuery({
    queryKey: [RECIPES_KEY, filters],
    queryFn: () => recipeService.list(filters),
    placeholderData: (prev) => prev,
  })
}

export function useRecipe(id: number) {
  const isValidId = Number.isFinite(id) && id > 0

  return useQuery({
    queryKey: ['recipe', id],
    queryFn: () => recipeService.getById(id),
    enabled: isValidId,
    retry: false,
  })
}

export function useCreateRecipe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => recipeService.create(formData),
    onSuccess: () => {
      toast.success('Receta creada con éxito')
      return queryClient.invalidateQueries({ queryKey: [RECIPES_KEY] })
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}

export function useDeleteRecipe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (recipeId: number) => recipeService.remove(recipeId),
    onSuccess: () => {
      toast.success('Receta eliminada')
      return queryClient.invalidateQueries({ queryKey: [RECIPES_KEY] })
    },
    onError: (err) => toast.error(getErrorMessage(err)),
  })
}
