import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Suspense } from 'react'
import { Spin } from 'antd'
import { Root, ErrorBoundary } from '~/components'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorBoundary /> }])

const App = () => {
  return (
    <Suspense fallback={<Spin size='large' />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
