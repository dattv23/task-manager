import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Login, Register } from './pages';
import { useAppSelector } from './hook/redux';
import { NotFound } from './pages/not-found';
export default function App() {
  const app = useAppSelector(state => state.app);
  console.log(app.isSigned);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}
