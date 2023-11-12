import { useAppSelector } from '../hook/redux'
import { Navigate } from 'react-router-dom'
import { TRequireAuth } from '../types/RequireAuth.types'

export const RequireAuth = ({ children }: TRequireAuth) => {
  const app = useAppSelector(state => state.app)

  if (!app.isSigned) {
    return <Navigate to="/login" />
  }

  return children
}
