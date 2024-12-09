import styles from './login.module.css';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Image from '../Image/Image';
import { login } from '../../../services';

function Login() {
    const navigate = useNavigate();

    if (localStorage.getItem('token')){
        alert("Already Logged in");
        navigate('/home');
    }

    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: ''
    });


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const res = await login(loginDetails)
            if (res.status === 200) {
                setLoginDetails({
                    email: '',
                    password: ''
                });
                const token = await res.json;
                localStorage.setItem('token', token.token);
                navigate('/home');
            }
        } catch (err) {
            console.log(err);
        }
    }

  return (
    <div className={styles.loginPage}>
        <form className={styles.loginArea} onSubmit={handleSubmit} >
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
        </form>

        <Image/>
    </div>
  )
}

export default Login
