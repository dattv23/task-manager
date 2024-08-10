import { RoutesType } from '~/@types/route.type'

const routes: RoutesType = {
  home: '/',
  login: '/login',
  register: '/register',
  verifyEmail: '/verify-email',
  forgotPassword: '/forgot-password',
  notFound: '*',
  dashboard: '/dashboard',
  tasks: '/tasks',
  taskDetail: 'tasks/:id',
  settings: '/settings',
  workspace: '/workspace',
  oauth: '/oauth/:token'
} as const

export default routes
