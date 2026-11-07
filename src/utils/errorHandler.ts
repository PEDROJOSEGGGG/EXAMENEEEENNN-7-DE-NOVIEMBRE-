import axios from 'axios'

export function getErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return 'Ocurrió un error'
  }

  if (!error.response) {
    return 'Sin conexión. Verifique su internet e intente de nuevo.'
  }

  const data = error.response.data as { message?: string } | undefined
  const serverText = data?.message

  switch (error.response.status) {
    case 400:
      return serverText ?? 'La solicitud tiene datos inválidos.'
    case 401:
      return serverText ?? 'Usuario o contraseña incorrectos.'
    case 403:
      return serverText ?? 'No tiene permisos para realizar esta acción.'
    case 404:
      return serverText ?? 'No se encontró el recurso solicitado.'
    default:
      if (error.response.status >= 500) {
        return 'Error del servidor. Intente más tarde.'
      }
      return serverText ?? 'Ocurrió un error'
  }
}
