import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Boards, Home, Login, NotFound, Register } from './pages'
import { useAppSelector } from './hook/redux'
import { RequireAuth } from './components/RequireAuth'
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
        <Route path='/boards' element={<RequireAuth children={<Boards />} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
