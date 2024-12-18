import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

import Main from './Pages/Home/Main';
import Login from  './Pages/User/Login/Login';
import UserRegister from './Pages/User/Register/UserRegister';
import AddJob from './Pages/AddJob/AddJob';
import EditJob from './Pages/EditJob/EditJob';
import JobDetails from './Pages/JobDetails/JobDetails';



function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login/>} />
          <Route path='/home' element={<Main/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<UserRegister/>} />
          <Route path='/newJob' element={<AddJob/>} />
          <Route path='/editJob/:id' element={<EditJob/>} />
          <Route path='/jobDetails/:id' element={<JobDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
