import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import React, { Suspense } from 'react'
import Root from '~/routes/Root'

const ErrorPage = React.lazy(() => import('~/components/pages/common/ErrorPage'))
const LoadingPage = React.lazy(() => import('~/components/pages/common/LoadingPage'))

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorPage /> }])

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
