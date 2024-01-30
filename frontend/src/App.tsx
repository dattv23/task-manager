import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from '~/components/Root/Root'
import ErrorBoundary from '~/components/ErrorBoundary'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorBoundary /> }])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
