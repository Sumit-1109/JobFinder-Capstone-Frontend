import styles from './login.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Image from './Image';

function Login() {

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });


  return (
    <div className={styles.loginPage}>
        <div className={styles.loginArea}>
        <div className={styles.heading}>
            <h1 className='poppins-bold'>
            Already have an account?
            </h1>
            <p className='poppins-medium'>
            Your personal job finder is here
            </p>
        </div>

        <div className={styles.inputArea}>
            <input type="email" placeholder='Email' name='email' id='email' value={loginDetails.email} className={styles.email} onChange={(e) => setLoginDetails((prev)=> ({...prev, email: e.target.value}))} />
            <input type="password" placeholder='Password' className={styles.password} name='password' id='password' value={loginDetails.password} onChange={(e) => setLoginDetails(prev => ({...prev, password: e.target.value}))} />
        </div>

        <div className={styles.buttonBox}>
            <button>Sign in</button>
        </div>
        <div className={styles.toSignUp}>
            <p>
            Don’t have an account?
            </p>
            <NavLink to='/register'>Sign Up</NavLink>
        </div>
        </div>

        <Image/>
    </div>
  )
}

export default Login
