import { routeTypes } from '~/@types/route.type'

const routes: routeTypes = {
  home: '/',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  notFound: '*'
} as const

export default routes
