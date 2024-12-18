import styles from './JobDetails.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobByID } from '../../services';
import HeaderBar from '../../Components/HeaderBar/HeaderBar';

function JobDetails() {

  const token = localStorage.getItem('token');

    const [jobDetails, setJobDetails] = useState('');


    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(() => {
        if (id) {
            const fetchJob = async () => {
                const res = await getJobByID(id);
                if (res.status === 200) {
                    const data = await res.json();
                    setJobDetails(data);
                } else {
                    console.log(res);
                };
            };
            fetchJob();
        }
    }, [id]);

  return (

    <div className={styles.JobDetailsContainer}>
    <HeaderBar/>
      {jobDetails.companyName}
      {jobDetails.location}
      


      {
        token && (
          <button onClick={() => navigate(`/editJob/${id}`)}>Edit</button>
        )
      }
    </div>
  )
}

export default JobDetails
