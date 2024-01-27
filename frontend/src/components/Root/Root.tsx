import { Route, Routes } from 'react-router-dom'
import { publicRoute } from '~/routes'

const Root = () => {
  return (
    <Routes>
      {publicRoute.map((route, id) => {
        const { path, Component } = route
        return <Route key={id} path={path} Component={Component} />
      })}
    </Routes>
  )
}

export default Root
