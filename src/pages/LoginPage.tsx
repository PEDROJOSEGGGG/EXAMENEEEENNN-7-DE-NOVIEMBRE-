import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import { getErrorMessage } from '../utils/errorHandler'

const credentialsSchema = z.object({
  username: z.string().min(1, 'El usuario es obligatorio'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
})

type Credentials = z.infer<typeof credentialsSchema>

const inputClassName =
  'mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-brand-600'

function LoginPage() {
  const goTo = useNavigate()
  const isLoggedIn = useAuthStore((store) => Boolean(store.accessToken))
  const storeSession = useAuthStore((store) => store.setSession)
  const [loginError, setLoginError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Credentials>({
    resolver: zodResolver(credentialsSchema),
    mode: 'onSubmit',
  })

  if (isLoggedIn) {
    return <Navigate to="/recetas" replace />
  }

  async function handleLogin({ username, password }: Credentials) {
    setLoginError(null)
    try {
      const session = await authService.login(username, password)
      storeSession(session)
      goTo('/recetas', { replace: true })
    } catch (err) {
      setLoginError(getErrorMessage(err))
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center p-6">
      <h1 className="text-2xl font-bold text-slate-900">Iniciar sesión</h1>
      <form className="mt-4 space-y-3" noValidate onSubmit={handleSubmit(handleLogin)}>
        <div>
          <label htmlFor="username" className="text-sm font-medium">Usuario</label>
          <input id="username" autoComplete="username" className={inputClassName} {...register('username')} />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
          <input id="password" type="password" autoComplete="current-password" className={inputClassName} {...register('password')} />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        {loginError && (
          <Alert variant="destructive">
            <AlertDescription>{loginError}</AlertDescription>
          </Alert>
        )}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Ingresando…' : 'Ingresar'}
        </Button>
      </form>
    </main>
  )
}

export default LoginPage
