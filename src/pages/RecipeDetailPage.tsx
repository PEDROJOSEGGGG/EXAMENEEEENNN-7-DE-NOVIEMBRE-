import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useRecipe } from '../hooks/useRecipes'
import { getErrorMessage } from '../utils/errorHandler'
import { fichaText } from '../utils/ficha'
import type { Recipe } from '../types'

function triggerDownload(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  URL.revokeObjectURL(url)
}

async function downloadImage(item: Recipe) {
  try {
    const response = await axios.get<Blob>(item.image, { responseType: 'blob' })
    const extension = response.data.type.split('/')[1] ?? 'jpg'
    triggerDownload(response.data, `receta-${item.id}.${extension}`)
  } catch (err) {
    toast.error(getErrorMessage(err))
  }
}

function downloadFicha(item: Recipe) {
  const blob = new Blob([fichaText(item)], { type: 'text/plain' })
  triggerDownload(blob, `receta-${item.id}.txt`)
}

function RecipeDetailPage() {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useRecipe(Number(id))

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link to="/recetas" className="text-sm font-medium text-brand-700 hover:underline">
        ← Volver al listado
      </Link>

      {isLoading && <p className="mt-6 text-slate-500" role="status">Cargando…</p>}

      {isError && (
        <Alert variant="destructive" className="mt-6">
          <AlertDescription>{getErrorMessage(error)}</AlertDescription>
        </Alert>
      )}

      {data && (
          <article className="mt-4 grid gap-4 sm:grid-cols-2">
            <img src={data.image} alt={data.name} className="w-full rounded-xl bg-slate-100 object-cover" />
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-wide text-brand-700">{data.cuisine}</span>
              <h1 className="text-2xl font-bold">{data.name}</h1>
              <p className="text-sm">{data.difficulty} · Preparación {data.prepTimeMinutes} min · Cocción {data.cookTimeMinutes} min · {data.servings} porciones</p>
              <h2 className="font-semibold">Ingredientes</h2>
              <ul className="list-disc pl-5 text-sm text-slate-600">{data.ingredients.map((i) => <li key={i}>{i}</li>)}</ul>
              <h2 className="font-semibold">Instrucciones</h2>
              <ol className="list-decimal pl-5 text-sm text-slate-600">{data.instructions.map((i) => <li key={i}>{i}</li>)}</ol>
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => downloadImage(data)}>Descargar imagen</Button>
                <Button variant="outline" onClick={() => downloadFicha(data)}>Descargar ficha</Button>
              </div>
            </div>
          </article>
      )}
    </main>
  )
}

export default RecipeDetailPage
