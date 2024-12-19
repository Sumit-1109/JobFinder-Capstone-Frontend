import styles from './jobs.module.css';
import PropTypes from 'prop-types';
import ind from '../../assets/ind.png';
import age from '../../assets/age.png';
import rupee from '../../assets/rupee.png';
import { useNavigate } from 'react-router-dom';

function Jobs({job}) {

  const token = localStorage.getItem('token');

    const {_id,companyName, logoUrl, jobPosition, salary, jobType, remoteOffice, location, skillsRequired} = job;
    const navigate = useNavigate();
  return (
    <div className={styles.jobContainer}>
      <div className={styles.companyLogo}>
        <img src={logoUrl} alt={companyName} />
      </div>
      <div className={styles.jobInfo}>
        <div className={styles.leftInfo}>
        <h2 className={styles.jobPosition}>{jobPosition}</h2>
        <div className={styles.salaryLocation}>
            <div className={styles.aSL}>
            <img src={age} alt="rupee" />
            <p>11-50</p>
            </div>

            <div className={styles.aSL}>
            <img src={rupee} alt="rupee" />
            <p>{salary}</p>
            </div>
            <div className={styles.aSL}>
            <img src={ind} alt="rupee" />
            <p>{location}</p>
            </div>
            
        </div>
        <div className={styles.jobType}>
            <p>{remoteOffice}</p>
            <p>{jobType}</p>
        </div>
        </div>

        <div className={styles.rightInfo}>
            <div className={styles.skills}>
                {skillsRequired.map((skill) => (
                    <div key={skill} className={styles.skillNames}>
                        <p>{skill}</p>
                    </div>
                )) }
            </div>
            <div className={styles.viewEdit}>
            <div className={styles.viewDetails}>
                <button onClick={() => (navigate(`/jobDetails/${_id}`))}>View details</button>
            </div>
            {
              token &&
              <div className={styles.edit}>
                <button onClick={() => (navigate(`/editJob/${_id}`))}>Edit Details</button>
            </div>
            }
            </div>
        </div>
      </div>
    </div>
  )
}

export default Jobs

Jobs.propTypes = {
    job: PropTypes.shape({
      _id: PropTypes.string.isRequired,
        companyName: PropTypes.string.isRequired,
        logoUrl: PropTypes.string,
        jobPosition: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired,
        jobType: PropTypes.string.isRequired,
        remoteOffice: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        skillsRequired: PropTypes.arrayOf(PropTypes.string).isRequired,
        companyDescription: PropTypes.string.isRequired,
        jobDescription: PropTypes.string.isRequired,
        additionalInfo: PropTypes.string
    }).isRequired
}