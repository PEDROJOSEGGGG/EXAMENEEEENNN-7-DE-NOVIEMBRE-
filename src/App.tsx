import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import RecipesPage from './pages/RecipesPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/recetas" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/recetas" element={<RecipesPage />} />
        <Route path="/recetas/:id" element={<RecipeDetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
