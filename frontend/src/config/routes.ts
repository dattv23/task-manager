import { RoutesType } from '~/@types/route.type'

const routes: RoutesType = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  notFound: '*',
  dashboard: '/dashboard',
  tasks: '/tasks',
  settings: '/settings'
} as const

export default routes
