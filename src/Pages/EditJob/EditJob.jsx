import { useEffect, useState } from "react";
import styles from './editJob.module.css';
import {useNavigate, useParams } from "react-router-dom";
import { getJobByID, updateJob } from "../../services";
import JobInputFields from "../../Components/JobInputField/JobInputFields";
import addJobImage from '../../assets/addJobPage.png';
import { jwtDecode } from "jwt-decode";


function EditJob() {

  const token = localStorage.getItem('token');
  const user = jwtDecode(token);
  const userId = user.id;

    const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);
  const [updateJobDetails, setUpdateJobDetails] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    salary: "",
    jobType: "",
    remoteOffice: "",
    location: "",
    jobDescription: "",
    companyDescription: "",
    skillsRequired: [],
    additionalInfo: "",
    user: userId,
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setIsEdit(true);
    }
  }, [id]);

  useEffect(() => {
    if (isEdit && id) {
      const fetchJob = async () => {
        const res = await getJobByID(id);
        if (res.status === 200) {
          const data = await res.json();
          setUpdateJobDetails(data);
        } else {
          console.log(res);
        }
      };
      fetchJob();
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res =await updateJob(id, updateJobDetails);

    if (res.status === 200) {
      console.log(updateJobDetails)
        const data = await res.json()
        console.log(data.message);
        navigate('/home');
    }
  }

  const handleCancel = (e) =>{
    e.preventDefault();
    setUpdateJobDetails()
    navigate('/home')
  }

  return (
    <div className={styles.editJob}>
      <form onSubmit={handleSubmit} className={styles.editJobArea}>
        <div className={styles.heading}>
          <h1 className="poppins-bold">Add job description</h1>
        </div>

        <JobInputFields setJobDetails={setUpdateJobDetails} jobDetails={updateJobDetails} />


        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">Update Job</button>
      </form>

      <div className={styles.imageArea}>
            <img src={addJobImage} alt="" />
    </div>
    </div>
  );
}

export default EditJob;
