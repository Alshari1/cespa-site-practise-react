import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="section-pad text-center">Loading your account...</div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  return children
}


