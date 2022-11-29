import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/signin';
import MainPage from './pages/signin';
import SignUp from './pages/signup';



function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />} />
      <Route path='/registration' element={<SignUp />} />
    </Routes>
  )
}

export default App
