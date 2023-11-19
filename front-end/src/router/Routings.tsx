import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, routes } from './Routes'
import RequireAuth from '../components/Auth/RequireAuth'
import { NotFound } from '../pages'

export default function Routings() {
  return (
    <Suspense>
      <Routes>
        {routes.map((routeProps) => (
          <Route {...routeProps} key={routeProps.path as string} />
        ))}
        {privateRoutes.map(({ element, ...privateRouteProps }) => (
          <Route
            element={
              <RequireAuth
                redirectTo={`/login?redirectTo=${privateRouteProps.path}`}
              >
                {element}
              </RequireAuth>
            }
            {...privateRouteProps}
            key={`privateRoute-${privateRouteProps.path}`}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
