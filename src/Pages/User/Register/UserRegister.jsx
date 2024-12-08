import styles from './register.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Image from '../Image/Image';
import axios from 'axios';

function UserRegister() {

    const navigate = useNavigate();

    const [registerDetails, setRegisterDetails] = useState({
        name: '',
        email: '',
        mobile: '',
        password: ''
    });


    const handleSubmit = async (e) => {
      e.preventDefault();
      try{
        const res = await axios.post('https://jobfinder-capstone-backend.onrender.com/api/user/register', registerDetails);
        if (res.status === 200) {
          setRegisterDetails({
            name: '',
            email: '',
            mobile: '',
            password: ''
          })
          navigate('/login');
        } else{
          console.log("Error")
        }
      } catch (err) {
          console.log(err)
      }
    }

  return (
    <div className={styles.registerPage}>
        <form className={styles.registerArea} onSubmit={handleSubmit}>
        <div className={styles.heading}>
            <h1 className='poppins-bold'>
            Create an account
            </h1>
            <p className='poppins-medium'>
            Your personal job finder is here
            </p>
        </div>

        <div className={styles.inputArea}>
            <input type="name" placeholder='Name' name='name' id='name' value={registerDetails.name} className={styles.name} onChange={(e) => setRegisterDetails((prev)=> ({...prev, name: e.target.value}))} />
            <input type="email" placeholder='Email' className={styles.email} name='email' id='email' value={registerDetails.email} onChange={(e) => setRegisterDetails(prev => ({...prev, email: e.target.value}))} />
            <input type="tel" placeholder='Mobile' className={styles.mobile} name='mobile' id='mobile' value={registerDetails.mobile} onChange={(e) => setRegisterDetails(prev => ({...prev, mobile: Number(e.target.value)}))} />
            <input type="password" placeholder='Password' className={styles.password} name='password' id='password' value={registerDetails.password} onChange={(e) => setRegisterDetails(prev => ({...prev, password: e.target.value}))} />

        </div>

        <div className={styles.buttonBox}>
            <button type='submit'>Create Account</button>
        </div>
        <div className={styles.toSignUp}>
            <p>
            Already have an account
            </p>
            <NavLink to='/login'>Sign In</NavLink>
        </div>
        </form>

        <Image/>
    </div>
  )
}

export default UserRegister
