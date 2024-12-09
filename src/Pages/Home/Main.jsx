import { useEffect, useState } from "react";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";

import styles from "./main.module.css";
import { getJobs } from "../../services";

function Main() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await getJobs();
      if (res.status === 200) {
        console.log(jobs);
        const data = await res.json();
        setJobs(data);
      }
      setLoading(false);
    }
    fetchJobs();
  }, []);
  return (
    <div className={styles.main}>
      <HeaderBar />
      {
        loading ? <h1>Loading...</h1> : jobs.map((job) => (
          <div key={job._id}>
            <h2>{job.companyName}</h2>
            <p>{job.companyDescription}</p>
          </div>
        ))
      }

    </div>
  );
}

export default Main;
