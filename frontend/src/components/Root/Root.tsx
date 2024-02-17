import { Route, Routes } from 'react-router-dom'
import { privateRoute, publicRoute } from '~/routes'
import PrivateRoute from '../PrivateRoute'

const Root: React.FC = () => {
  return (
    <Routes>
      {publicRoute.map((route, id) => {
        const { path, Component } = route
        return <Route key={id} path={path} Component={Component} />
      })}
      <Route path='/' element={<PrivateRoute />}>
        {privateRoute.map((route, id) => {
          const { path, Component, Layout } = route
          return (
            <Route key={id} element={Layout ? <Layout /> : null}>
              <Route path={path} Component={Component} />
            </Route>
          )
        })}
      </Route>
    </Routes>
  )
}

export default Root
