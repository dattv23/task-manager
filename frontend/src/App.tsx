import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Root, ErrorBoundary } from '~/components'
import Loader from './components/pages/Loader/Loader'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorBoundary /> }])

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
