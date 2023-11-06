import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </Router>
  )
}
