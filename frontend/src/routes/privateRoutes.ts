import React from 'react'
import { NonIndexRouteObject } from 'react-router-dom'
import { routes } from '~/configs'

import PrivateRoute from './PrivateRoute'

const DashboardPage = React.lazy(() => import('~/components/pages/main/DashboardPage'))
const TasksPage = React.lazy(() => import('~/components/pages/main/TaskPage'))
const TaskDetailPage = React.lazy(() => import('~/components/pages/main/TaskDetailPage'))
const SettingsPage = React.lazy(() => import('~/components/pages/main/SettingPage'))
const WorkspacePage = React.lazy(() => import('~/components/pages/main/WorkspacePage'))

interface IPrivateRoute extends NonIndexRouteObject {
  Layout?: React.FC
}

export const privateRoutes: IPrivateRoute[] = [
  { path: routes.dashboard, Component: DashboardPage, Layout: PrivateRoute },
  { path: routes.tasks, Component: TasksPage, Layout: PrivateRoute },
  { path: routes.taskDetail, Component: TaskDetailPage, Layout: PrivateRoute },
  { path: routes.settings, Component: SettingsPage, Layout: PrivateRoute },
  { path: routes.workspace, Component: WorkspacePage }
]
