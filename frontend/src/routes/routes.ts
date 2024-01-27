import React from 'react'
import { RouteObject } from 'react-router-dom'
import config from '~/config'

const HomePage = React.lazy(() => import('~/container/Home'))
const LoginPage = React.lazy(() => import('~/container/Auth/Login'))
const RegisterPage = React.lazy(() => import('~/container/Auth/Register'))
const NotFoundPage = React.lazy(() => import('~/container/NotFound'))

const publicRoute: RouteObject[] = [
  { path: config.routes.notFound, Component: NotFoundPage },
  { path: config.routes.home, Component: HomePage },
  { path: config.routes.login, Component: LoginPage },
  { path: config.routes.register, Component: RegisterPage }
]

export { publicRoute }
