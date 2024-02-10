import React from 'react'
import { RouteObject } from 'react-router-dom'
import config from '~/config'

const HomePage = React.lazy(() => import('~/container/Home/pages/MainHome'))
const LoginPage = React.lazy(() => import('~/container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('~/container/Auth/pages/Register'))
const ForgotPasswordPage = React.lazy(() => import('~/container/Auth/pages/ForgotPassword'))
const NotFoundPage = React.lazy(() => import('~/components/NotFound'))
const DashboardPage = React.lazy(() => import('~/container/Dashboard/pages/MainDashboard'))
const TasksPage = React.lazy(() => import('~/container/Dashboard/pages/Tasks'))
const SettingsPage = React.lazy(() => import('~/container/Dashboard/pages/Settings'))

const publicRoute: RouteObject[] = [
  { path: config.routes.notFound, Component: NotFoundPage },
  { path: config.routes.home, Component: HomePage },
  { path: config.routes.login, Component: LoginPage },
  { path: config.routes.register, Component: RegisterPage },
  { path: config.routes.forgotPassword, Component: ForgotPasswordPage }
]

const privateRoute: RouteObject[] = [
  { path: config.routes.dashboard, Component: DashboardPage },
  { path: config.routes.tasks, Component: TasksPage },
  { path: config.routes.settings, Component: SettingsPage }
]

export { publicRoute, privateRoute }
