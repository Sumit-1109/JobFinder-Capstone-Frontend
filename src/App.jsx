import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Main from './Pages/Home/Main';
import Login from  './Pages/User/Login/Login';
import UserRegister from './Pages/User/Register/UserRegister';



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Main/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<UserRegister/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
