import { Link, useParams } from 'react-router-dom'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useRecipe } from '../hooks/useRecipes'
import { getErrorMessage } from '../utils/errorHandler'
import type { Recipe } from '../types'

// TODO 3.2 (Detalle): descargue la ficha como archivo receta-{id}.json.
// Use un Blob con JSON.stringify(item, null, 2), URL.createObjectURL, un <a download> temporal
// y libere la URL con URL.revokeObjectURL al terminar.
function downloadFile(item: Recipe) {
  void item
}

function RecipeDetailPage() {
  const { id } = useParams()
  // TODO 3.1: useRecipe(Number(id)) ya devuelve los datos cuando complete el hook.
  const { data, isLoading, isError, error } = useRecipe(Number(id))

  return (
    <main className="mx-auto max-w-3xl p-4">
      <Link to="/recetas" className="text-sm font-medium text-brand-700 hover:underline">
        ← Volver al listado
      </Link>

      {isLoading && <p className="mt-6 text-slate-500" role="status">Cargando…</p>}

      {/* TODO 3.1: si el id no existe (404) debe verse un mensaje claro con getErrorMessage. */}
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
              <Button onClick={() => downloadFile(data)}>Descargar receta</Button>
            </div>
          </article>
      )}
    </main>
  )
}

export default RecipeDetailPage
