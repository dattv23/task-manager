import React from 'react'
import { NonIndexRouteObject, RouteObject } from 'react-router-dom'
import DashboardTemplate from '~/components/templates'
import { routes } from '~/configs'

const HomePage = React.lazy(() => import('~/components/pages/common/HomePage'))
const LoginPage = React.lazy(() => import('~/components/pages/auth/LoginPage'))
const RegisterPage = React.lazy(() => import('~/components/pages/auth/RegisterPage'))
const VerifyEmailPage = React.lazy(() => import('~/components/pages/auth/VerifyEmailPage'))
const ForgotPasswordPage = React.lazy(() => import('~/components/pages/auth/ForgotPasswordPage'))
const NotFoundPage = React.lazy(() => import('~/components/pages/common/NotFoundPage'))
const DashboardPage = React.lazy(() => import('~/components/pages/main/DashboardPage'))
const TasksPage = React.lazy(() => import('~/components/pages/main/TaskPage'))
const TaskDetailPage = React.lazy(() => import('~/components/pages/main/TaskDetailPage'))
const SettingsPage = React.lazy(() => import('~/components/pages/main/SettingPage'))
const WorkspacePage = React.lazy(() => import('~/components/pages/main/WorkspacePage'))
const OAuthPage = React.lazy(() => import('~/components/pages/auth/OAuthPage'))

const publicRoute: RouteObject[] = [
  { path: routes.notFound, Component: NotFoundPage },
  { path: routes.home, Component: HomePage },
  { path: routes.login, Component: LoginPage },
  { path: routes.register, Component: RegisterPage },
  { path: routes.verifyEmail, Component: VerifyEmailPage },
  { path: routes.forgotPassword, Component: ForgotPasswordPage },
  { path: routes.oauth, Component: OAuthPage }
]

interface PrivateRoute extends NonIndexRouteObject {
  Layout?: React.FC
}

const privateRoute: PrivateRoute[] = [
  { path: routes.dashboard, Component: DashboardPage, Layout: DashboardTemplate },
  { path: routes.tasks, Component: TasksPage, Layout: DashboardTemplate },
  { path: routes.taskDetail, Component: TaskDetailPage, Layout: DashboardTemplate },
  { path: routes.settings, Component: SettingsPage, Layout: DashboardTemplate },
  { path: routes.workspace, Component: WorkspacePage }
]

export { publicRoute, privateRoute }
