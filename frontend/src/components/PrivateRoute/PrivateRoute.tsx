import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
