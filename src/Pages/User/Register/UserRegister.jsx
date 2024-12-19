import styles from "./register.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Image from "../../../Components/Image/Image";
import { register } from "../../../services";

function UserRegister() {
  const navigate = useNavigate();

  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const [registerDetails, setRegisterDetails] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    continueToggle: false,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(registerDetails);
      if (res.status === 200) {
        setRegisterDetails({
          name: "",
          email: "",
          mobile: "",
          password: "",
          continueToggle: false,
        });
        navigate("/login");
      } if (res.status === 208) {
        setWarningMessage("Mobile already exists");
        setWarning(true);
      } else {
        const errorMessage = await res.json();
        setError(errorMessage.message);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={styles.registerPage}>
      <form className={styles.registerArea} onSubmit={handleSubmit}>
        <div className={styles.heading}>
          <h1 className="poppins-bold">Create an account</h1>
          <p className="poppins-medium">Your personal job finder is here</p>
        </div>

        <div className={styles.inputArea}>
          <input
            type="name"
            placeholder="Name"
            name="name"
            id="name"
            value={registerDetails.name}
            className={styles.name}
            onChange={(e) =>
              setRegisterDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <input
            type="email"
            placeholder="Email"
            className={styles.email}
            name="email"
            id="email"
            value={registerDetails.email}
            onChange={(e) =>
              setRegisterDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <input
            type="tel"
            placeholder="Mobile"
            className={styles.mobile}
            name="mobile"
            id="mobile"
            value={registerDetails.mobile}
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                mobile: Number(e.target.value),
              }))
            }
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.password}
            name="password"
            id="password"
            value={registerDetails.password}
            onChange={(e) =>
              setRegisterDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />

          <div className={styles.backupError}>
            {warning ? (
              <p className={styles.warning}>
                {warningMessage} <button onClick={() => {
                  setRegisterDetails(prev => ({
                    ...prev,
                    continueToggle: true
                  }));
                  setWarning(false)
                  }}>Yes</button> 
                  <button onClick={() => {
                    setRegisterDetails(prev => ({...prev, mobile: '', continueToggle: false}));
                    setWarning(false);
                    }}>No</button>
            </p>
            ) : (
              <p className={styles.error}>
            {error}
            </p>
            )}
          </div>
        </div>

        <div className={styles.buttonBox}>
          <button type="submit">Create Account</button>
        </div>
        <div className={styles.toSignUp}>
          <p>Already have an account</p>
          <NavLink to="/login">Sign In</NavLink>
        </div>
        <div className={styles.toHome}>
          <p>Continue without signing in?</p>
          <NavLink to="/home">Home</NavLink>
        </div>
      </form>

      <Image />
    </div>
  );
}

export default UserRegister;
