import styles from "./header.module.css";
import shape1 from "../../assets/shape1.png";
import shape2 from "../../assets/shape2.png";
import shape3 from "../../assets/shape3.png";
import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate('/home');
  }

  return (
    <div className={styles.headerBar}>
      <img src={shape1} className={styles.shape1} />
      <img src={shape2} className={styles.shape2} />
      <img src={shape3} className={styles.shape3} />
      <div className={styles.components}>
        <div className={styles.logo}>
          <h1 className="poppins-bold">Jobfinder</h1>
        </div>
        

        {
          localStorage.getItem('token') ? 
            <div className={styles.userLoggedIn}>
              <button onClick={handleLogOut}>Logout</button>
              <p>Hello! Recruiter</p>
            </div>
          :
          <div className={`poppins-medium ${styles.user}`}>
          <button className={styles.login} onClick={() => navigate("/login")}>
            Login
          </button>
          <button
            className={styles.register}
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
        }
      </div>
    </div>
  );
}

export default HeaderBar;
