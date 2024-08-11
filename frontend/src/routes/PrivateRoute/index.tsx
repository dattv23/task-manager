import { Outlet, Navigate, NonIndexRouteObject } from 'react-router-dom'
import { useAuth } from '~/hooks/useAuth'

interface PrivateRoute extends NonIndexRouteObject {
  Layout?: React.FC
}

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoute
