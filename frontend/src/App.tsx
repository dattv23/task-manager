import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import Root from '~/routes/Root'
import { ErrorPage, LoadingPage } from './components/pages'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorPage /> }])

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
