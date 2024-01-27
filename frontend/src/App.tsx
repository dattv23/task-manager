import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from '~/components/Root/Root'

const router = createBrowserRouter([{ path: '*', Component: Root }])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
