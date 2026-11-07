import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

function ProtectedRoute() {
  const hasSession = useAuthStore((store) => Boolean(store.accessToken))

  return hasSession ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
