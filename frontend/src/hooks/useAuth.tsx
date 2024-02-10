import Cookies from 'js-cookie'
import React, { createContext, useContext, useState } from 'react'
import { LoginResult } from '~/@types/api.type'
import { AuthContextType } from '~/@types/hook.type'
import { clearStore, setStore } from '~/utils'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const loginUser = (data: LoginResult) => {
    // Perform authentication logic
    const { accessToken, refreshToken, email, fullName } = data
    Cookies.set('refreshToken', refreshToken, { expires: 31 })
    setStore('accessToken', accessToken)
    setStore('email', email)
    setStore('fullName', fullName)
    setIsAuthenticated(true)
  }

  const logoutUser = () => {
    // Perform logout logic
    Cookies.remove('refreshToken')
    clearStore('accessToken')
    clearStore('email')
    clearStore('fullName')
    setIsAuthenticated(false)
  }

  return <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
