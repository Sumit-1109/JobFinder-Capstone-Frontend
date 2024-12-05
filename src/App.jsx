import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import UserRegister from './Components/Login/UserRegister';
import './App.css';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<UserRegister/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
