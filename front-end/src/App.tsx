import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import { NotFound } from './pages/not-found'
import { RequireAuth } from './components/RequireAuth'
import { Dashboard } from './pages/dashboard'
export default function App() {
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
