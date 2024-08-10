import { useContext } from 'react'
import { AuthContextType } from '~/@types/hook.type'
import { AuthContext } from '~/providers/AuthProvider'

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
