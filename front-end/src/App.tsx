import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Boards, Home, Login, NotFound, Register } from './pages'
import { RequireAuth } from './components/RequireAuth'
import { VerifyEmail } from './pages/Auth/VerifyEmail'
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/boards' element={<RequireAuth children={<Boards />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
