import React from 'react'
import { RouteObject } from 'react-router-dom'
import config from '~/config'

const HomePage = React.lazy(() => import('~/container/Home/pages/MainHome'))
const LoginPage = React.lazy(() => import('~/container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('~/container/Auth/pages/Register'))
const ForgotPasswordPage = React.lazy(() => import('~/container/Auth/pages/ForgotPassword'))
const NotFoundPage = React.lazy(() => import('~/components/NotFound'))

const publicRoute: RouteObject[] = [
  { path: config.routes.notFound, Component: NotFoundPage },
  { path: config.routes.home, Component: HomePage },
  { path: config.routes.login, Component: LoginPage },
  { path: config.routes.register, Component: RegisterPage },
  { path: config.routes.forgotPassword, Component: ForgotPasswordPage }
]

export { publicRoute }
