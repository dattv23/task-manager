import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import { useAppSelector } from './hook/redux'
import { NotFound } from './pages/not-found'
import { RequireAuth } from './components/RequireAuth'
import { Dashboard } from './pages/dashboard'
export default function App() {
  const app = useAppSelector(state => state.app)
  // eslint-disable-next-line no-console
  console.log(app.isSigned)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<RequireAuth children={<Dashboard />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
