import { useCallback, useEffect, useRef, useState } from "react";
import HeaderBar from "../../Components/HeaderBar/HeaderBar";

import styles from "./main.module.css";
import { getJobs } from "../../services";
import Jobs from "../../Components/Jobs/Jobs";
import SearchAndFilter from "../../Components/SearchAndFilter/SearchAndFilter";



function Main() {

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('')

  const debounceTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    jobPosition: "",
    skills: [],
    jobType: "",
    remoteOffice: "",
  });
  
    const fetchJobs = useCallback(async () => {
      try{
        setLoading(true);
        const res = await getJobs({ limit, offset: offset * limit, search, filters });

        if (res.status === 200) {
          const data = await res.json();
          setJobs(data.jobs);
          setCount(data.count);
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log('Error Fetching Jobs', err);
      } finally {
        setLoading(false);
      }
      
    }, [limit, offset, search, filters]);


  const debouncedFetchJobs = useCallback(() => {
    if (debounceTimerRef.current){
      clearTimeout(debounceTimerRef.current);
    };

    debounceTimerRef.current = setTimeout(() => {
      fetchJobs();
    }, 500);
  }, [fetchJobs]);


    useEffect(() => {
      debouncedFetchJobs();

      return () => {
        if (debounceTimerRef.current){
          clearTimeout(debounceTimerRef.current);
        }
      }
    }, [limit, offset, search, filters]);

     


  return (
    <div className={styles.main}>
    
      <HeaderBar />

      <SearchAndFilter setSearch={setSearch} search={search} setFilters={setFilters}  />
      
      <div className={styles.jobSection}>
      {
        loading ? <h1>Loading...</h1> : jobs.map((job) => (
          <Jobs key={job._id} job={job} />
        ))
      }
      </div>
      <div className={styles.pagination}>
        <select value={limit} onChange={(e) => setLimit(e.target.value)} name="limit" id="limit" className={styles.limit}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
        </select> 
        <div className={styles.paginationButtons}>
        <button onClick={() => {setOffset((offset) => offset - 1)}} disabled={offset === 0}>Previous</button>
        <button onClick={() => {setOffset((offset) => offset + 1)}} disabled={((offset * limit) + limit) >= count} >Next</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
