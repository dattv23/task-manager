import { Suspense } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Root from '~/routes/Root'

import ErrorPage from './components/pages/common/ErrorPage'
import LoadingPage from './components/pages/common/LoadingPage'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorPage /> }])

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
