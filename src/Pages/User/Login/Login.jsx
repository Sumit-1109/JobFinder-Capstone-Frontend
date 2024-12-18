import styles from "./login.module.css";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Image from "../../../Components/Image/Image";
import { login } from "../../../services";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    };
  }, []);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState('');

  const handleEmailInput = (e) => {
    setError("" );
    setLoginDetails((prev) => ({ ...prev, email: e.target.value }));
  };

  const handlePasswordInput = (e) => {
    setError("");
    setLoginDetails((prev) => ({ ...prev, password: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(loginDetails);
      if (res.status === 200) {
        setLoginDetails({
          email: "",
          password: "",
        });
        const userToken = await res.json();
        localStorage.setItem("token", userToken.token);
        navigate("/home");
      } else {
        const errorMessage = await res.json();
        setError(errorMessage.message);
      }
    } catch (err) {
        setError(err);
    }
  };

  return (
    <div className={styles.loginPage}>
      <form className={styles.loginArea} onSubmit={handleSubmit}>
        <div className={styles.heading}>
          <h1 className="poppins-bold">Already have an account?</h1>
          <p className="poppins-medium">Your personal job finder is here</p>
        </div>

        <div className={styles.inputArea}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            value={loginDetails.email}
            className={styles.email}
            onChange={(e) => handleEmailInput(e)}
          />


          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            name="password"
            id="password"
            value={loginDetails.password}
            onChange={(e) => handlePasswordInput(e)}
          />
        
        <div className={styles.backupError}>
          <p className={styles.error}>{error}</p>
        </div>

        </div>
        
        <div className={styles.buttonBox}>
          <button>Sign in</button>
        </div>
        <div className={styles.toSignUp}>
          <p>Don’t have an account?</p>
          <NavLink to="/register">Sign Up</NavLink>
        </div>
      </form>

      <Image />
    </div>
  );
}

export default Login;
