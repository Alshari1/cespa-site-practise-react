import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function AdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()
  const location = useLocation()

  if (loading) return <div className="section-pad text-center">Checking access...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (isAdmin) return <Navigate to="/profile" replace />

  return children
}


