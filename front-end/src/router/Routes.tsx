import type { PathRouteProps } from 'react-router-dom'
import { Home, MyProfile, Overview, Settings, Tasks, Workspace } from '../pages'
import { Login, Register, VerifyEmail } from '../pages/Auth'

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  }
]

export const privateRoutes: Array<PathRouteProps> = [
  {
    path: '/workspace',
    element: <Workspace />
  },
  {
    path: '/overview',
    element: <Overview />
  },
  {
    path: '/tasks',
    element: <Tasks />
  },
  {
    path: '/settings',
    element: <Settings />
  },
  {
    path: '/my-profile',
    element: <MyProfile />
  }
]