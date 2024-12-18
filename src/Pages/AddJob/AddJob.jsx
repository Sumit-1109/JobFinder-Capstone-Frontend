import { useState } from "react";
import styles from "./addJob.module.css";
import addJobImage from "../../assets/addJobPage.png";
import { addJob } from "../../services";
import { useNavigate } from "react-router-dom";
import JobInputFields from "../../Components/JobInputField/JobInputFields";

function AddJob() {
  const navigate = useNavigate();


  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    logoUrl: "",
    jobPosition: "",
    salary: 0,
    jobType: "",
    remoteOffice: "",
    location: "",
    jobDescription: "",
    companyDescription: "",
    skillsRequired: [],
    additionalInfo: "",
    user: '',
  });



  const handleSubmit = async (e) => {

    e.preventDefault();

      const res = await addJob(jobDetails);

      console.log(jobDetails);

      if (res.status === 200) {
        setJobDetails({
          companyName: "",
          logoUrl: "",
          jobPosition: "",
          salary: 0,
          jobType: "",
          remoteOffice: "",
          location: "",
          jobDescription: "",
          companyDescription: "",
          skillsRequired: [],
          additionalInfo: "",
          user: '',
        });
        navigate("/home");
      } else {
        const data = res.json()
        console.log(res, data.message);
      }

  };

  const handleCancel = () => {
    setJobDetails({
      companyName: "",
      logoUrl: "",
      jobPosition: "",
      salary: 0,
      jobType: "",
      remoteOffice: "",
      location: "",
      jobDescription: "",
      companyDescription: "",
      skillsRequired: [],
      additionalInfo: "",
      user: "",
    });
    navigate("/home");
  };

  return (
    <div className={styles.addNewJob}>
      <form onSubmit={handleSubmit} className={styles.addJobArea}>
        <div className={styles.heading}>
          <h1 className="poppins-bold">Add job description</h1>
        </div>

        <JobInputFields setJobDetails={setJobDetails} jobDetails={jobDetails} />

        <button onClick={handleCancel}>Cancel</button>
        <button type="submit">+Add Job</button>
      </form>

      <div className={styles.imageArea}>
        <img src={addJobImage} alt="" />
      </div>
    </div>
  );
}

export default AddJob;
