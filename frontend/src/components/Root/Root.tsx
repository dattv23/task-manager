import { Route, Routes } from 'react-router-dom'
import { publicRoute } from '~/routes'
import PrivateRoute from '../PrivateRoute'
import { privateRoute } from '~/routes/routes'

const Root: React.FC = () => {
  return (
    <Routes>
      {publicRoute.map((route, id) => {
        const { path, Component } = route
        return <Route key={id} path={path} Component={Component} />
      })}
      <Route path='/' element={<PrivateRoute />}>
        {privateRoute.map((route, id) => {
          const { path, Component } = route
          return <Route key={id} path={path} Component={Component} />
        })}
      </Route>
    </Routes>
  )
}

export default Root
