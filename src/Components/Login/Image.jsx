import styles from './image.module.css';
import LoginPageImage from '../assets/userLoginLogout.png'

function Image() {
  return (
    <div className={styles.imageArea}>
            <img src={LoginPageImage} alt="" />
    </div>
  )
}

export default Image
