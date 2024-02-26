import Cookies from 'js-cookie'
import React, { createContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginResult } from '~/@types/api.type'
import { AuthContextType } from '~/@types/hook.type'
import { useToasts } from '~/hooks/useToasts'
import { RootState } from '~/redux/config'
import { authAction } from '~/redux/reducers/auth.reducers'
import { clearStore, setStore } from '~/utils'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const { addToast, clearToasts } = useToasts()

  const loginUser = (data: LoginResult) => {
    // Perform authentication logic
    const { accessToken, refreshToken, email, fullName } = data
    Cookies.set('refreshToken', refreshToken, { expires: 31 })
    setStore('accessToken', accessToken)
    setStore('email', email)
    setStore('fullName', fullName)
    dispatch(authAction(true))
    addToast({ title: 'Login', message: 'Login successfully', type: 'success', progress: true, timeOut: 5 })
  }

  const logoutUser = () => {
    // Perform logout logic
    Cookies.remove('refreshToken')
    clearStore('accessToken')
    dispatch(authAction(false))
  }

  useEffect(() => {
    return () => {
      clearToasts()
    }
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}

export default AuthProvider