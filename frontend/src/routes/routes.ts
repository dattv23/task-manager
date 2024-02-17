import React from 'react'
import { NonIndexRouteObject, RouteObject } from 'react-router-dom'
import config from '~/config'
import DashboardLayout from '~/layout/Dashboard/DashboardLayout'

const HomePage = React.lazy(() => import('~/container/Home/pages/MainHome'))
const LoginPage = React.lazy(() => import('~/container/Auth/pages/Login'))
const RegisterPage = React.lazy(() => import('~/container/Auth/pages/Register'))
const VerifyEmailPage = React.lazy(() => import('~/container/Auth/pages/VerifyEmail'))
const ForgotPasswordPage = React.lazy(() => import('~/container/Auth/pages/ForgotPassword'))
const NotFoundPage = React.lazy(() => import('~/components/NotFound'))
const DashboardPage = React.lazy(() => import('~/container/Dashboard/pages/MainDashboard'))
const TasksPage = React.lazy(() => import('~/container/Dashboard/pages/Tasks'))
const SettingsPage = React.lazy(() => import('~/container/Dashboard/pages/Settings'))
const WorkspacePage = React.lazy(() => import('~/container/Home/pages/Workspace'))

const publicRoute: RouteObject[] = [
  { path: config.routes.notFound, Component: NotFoundPage },
  { path: config.routes.home, Component: HomePage },
  { path: config.routes.login, Component: LoginPage },
  { path: config.routes.register, Component: RegisterPage },
  { path: config.routes.verifyEmail, Component: VerifyEmailPage },
  { path: config.routes.forgotPassword, Component: ForgotPasswordPage }
]

interface PrivateRoute extends NonIndexRouteObject {
  Layout?: React.FC
}

const privateRoute: PrivateRoute[] = [
  { path: config.routes.dashboard, Component: DashboardPage, Layout: DashboardLayout },
  { path: config.routes.tasks, Component: TasksPage, Layout: DashboardLayout },
  { path: config.routes.settings, Component: SettingsPage, Layout: DashboardLayout },
  { path: config.routes.workspace, Component: WorkspacePage }
]

export { publicRoute, privateRoute }
