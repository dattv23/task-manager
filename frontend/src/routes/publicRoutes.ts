import React from 'react'
import { RouteObject } from 'react-router-dom'

import { routes } from '~/configs'

const HomePage = React.lazy(() => import('~/components/pages/common/HomePage'))
const LoginPage = React.lazy(() => import('~/components/pages/auth/LoginPage'))
const RegisterPage = React.lazy(() => import('~/components/pages/auth/RegisterPage'))
const VerifyEmailPage = React.lazy(() => import('~/components/pages/auth/VerifyEmailPage'))
const ForgotPasswordPage = React.lazy(() => import('~/components/pages/auth/ForgotPasswordPage'))
const NotFoundPage = React.lazy(() => import('~/components/pages/common/NotFoundPage'))
const OAuthPage = React.lazy(() => import('~/components/pages/auth/OAuthPage'))

export const publicRoutes: RouteObject[] = [
  { path: routes.notFound, Component: NotFoundPage },
  { path: routes.home, Component: HomePage },
  { path: routes.login, Component: LoginPage },
  { path: routes.register, Component: RegisterPage },
  { path: routes.verifyEmail, Component: VerifyEmailPage },
  { path: routes.forgotPassword, Component: ForgotPasswordPage },
  { path: routes.oauth, Component: OAuthPage }
]
