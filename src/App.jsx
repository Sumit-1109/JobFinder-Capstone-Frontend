import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Login from './Components/Login/Login';
import UserRegister from './Components/Login/UserRegister';
import './App.css';

function App() {

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<UserRegister/>} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
