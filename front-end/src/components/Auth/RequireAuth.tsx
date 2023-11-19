import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';

type PrivateRouteProps = {
  children: React.ReactNode;
  redirectTo?: string;
};

const RequireAuth = ({
  children,
  redirectTo = '/login'
}: PrivateRouteProps) => {
  // add your own authentication logic here
  const app = useAppSelector(state => state.app)
  const isAuthenticated = app.isSigned

  return isAuthenticated ? (
    (children as React.ReactElement)
  ) : (
    <Navigate to={redirectTo} />
  )
}

export default RequireAuth