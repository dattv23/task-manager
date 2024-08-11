import { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { publicRoutes, privateRoutes } from '~/routes'
import { ErrorPage, LoadingPage } from '~/components/pages/common'
import DashboardTemplate from '~/components/templates/DashboardTemplate'

const router = createBrowserRouter([
  // Public Routes
  ...publicRoutes,

  // Private Routes
  {
    element: <DashboardTemplate />,
    children: [...privateRoutes]
  },

  // Fallback for undefined routes
  { path: '*', element: <ErrorPage /> }
])

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
