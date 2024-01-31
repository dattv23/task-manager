import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from '~/components/Root/Root'
import ErrorBoundary from '~/components/ErrorBoundary'
import { Suspense } from 'react'
import { Spin } from 'antd'

const router = createBrowserRouter([{ path: '*', Component: Root, errorElement: <ErrorBoundary /> }])

const App = () => {
  return (
    <Suspense fallback={<Spin size='large' tip='Loading...' />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}

export default App
