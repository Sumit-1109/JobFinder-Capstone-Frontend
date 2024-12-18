import styles from "./SearchAndFilter.module.css";
import PropTypes from "prop-types";
import searchImg from "../../assets/search.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJobPositions, getSkills } from "../../services";
import { useRef } from "react";

function SearchAndFilter({ search, setSearch, setFilters }) {

  const [finalFilters, setFinalFilters] = useState({
    jobPosition: "",
    skills: [],
    jobType: "",
    remoteOffice: "",
  });

  const applyFilters = () => {
    setFilters(finalFilters);
  };
  

  const navigate = useNavigate();

  const [showSkillsDropDown, setShowSkillsDropDown] = useState(false);

  const skillsRef = useRef(null);

  const [options, setOptions] = useState({
    skillsOptions: [],
    jobPositionsOptions: [],
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        if (response.status === 200) {
          const data = await response.json();
          const skills = data.skills.map((skillObj) => skillObj.skills);
          setOptions((prevOptions) => ({
            ...prevOptions,
            skillsOptions: skills,
          }));
        } else {
          console.error("Failed to fetch skills:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    const fetchJobPositions = async () => {
      try {
        const response = await getJobPositions();
        if (response.status === 200) {
          const data = await response.json();
          const jobPositions = data.map(
            (positionObj) => positionObj.positionNames
          );
          setOptions((prevOptions) => ({
            ...prevOptions,
            jobPositionsOptions: jobPositions,
          }));
        } else {
          console.error("Failed to fetch skills:");
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();
    fetchJobPositions();
  }, []);

  const handleSkillCheckBoxChanges = (e) => {
    const { value, checked } = e.target;
    setFinalFilters((prevFilters) => {
      const selectedSkills = checked
        ? [...prevFilters.skills, value]
        : prevFilters.skills.filter((skill) => skill !== value);
      return { ...prevFilters, skills: selectedSkills };
    });
  };

  const handleJobPositionChange = (e) => {
    setFinalFilters((prevFilters) => ({
      ...prevFilters,
      jobPosition: e.target.value,
    }));
  };

  const toggleSkillDropdown = () => {
    setShowSkillsDropDown((prev) => !prev);
  };

  const handleRemoteOfficeFilterChange = (e) => {
    setFinalFilters((prev) => ({
      ...prev,
      remoteOffice: e.target.value,
    }));
  };

  const handleJobTypeChange = (e) => {
    setFinalFilters((prev) => ({
      ...prev,
      jobType: e.target.value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        skillsRef.current &&
        !skillsRef.current.contains(e.target) &&
        e.target.closest(`.${styles.skillsDropBtn}`) === null
      ) {
        setShowSkillsDropDown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleRemoveFilter = (key, value = null) => {
    setFinalFilters((prevFilters) => {
      if (key === "skills") {
        return {
          ...prevFilters,
          skills: prevFilters.skills.filter((skill) => skill !== value)
        };
      }
      return {...prevFilters, [key]: ""};
    })
  }

  return (
    <div className={styles.SearchAndFilter}>
      <div className={styles.searchBarContainer}>
        <img src={searchImg} alt="Search" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type any job filter"
        />
      </div>
      <div className={styles.FilterAndButtons}>
        <div className={styles.Filters}>
          <div className={styles.allfilters}>
            <div className={styles.skillsFilter}>
              <button
                className={styles.skillDropBtn}
                onClick={toggleSkillDropdown}
              >
                Skills
              </button>

              {showSkillsDropDown && (
                <div
                  className={`${styles.dropBtnContent} ${
                    showSkillsDropDown ? styles.active : ""
                  }`}
                  ref={skillsRef}
                  onClick={(e) => e.stopPropagation()}
                >
                  {options.skillsOptions.map((skill, index) => (
                    <div key={index} className={styles.dropItem}>
                      <input
                        type="checkbox"
                        id={`skill-${index}`}
                        value={skill}
                        checked={finalFilters.skills.includes(skill)}
                        onChange={handleSkillCheckBoxChanges}
                      />
                      <label htmlFor={`skill-${index}`}>{skill}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.jobPositionFilter}>
              <select
                name="jobPosition"
                id="JobPosition"
                onChange={handleJobPositionChange}
                className={styles.dropDown}
              >
                <option value="">Job Position</option>
                {options.jobPositionsOptions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.jobType}>
              <select
                name="jobType"
                id="jobType"
                value={finalFilters.jobType}
                onChange={handleJobTypeChange}
                className={styles.dropDown}
              >
                <option value="">Job Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div className={styles.remoteOffice}>
              <select
                name="remote/office"
                id="remote/office"
                value={finalFilters.remoteOffice}
                onChange={handleRemoteOfficeFilterChange}
                className={styles.dropDown}
              >
                <option value="" disabled={finalFilters.remoteOffice === ""}>
                  Remote/Office
                </option>
                <option value="Remote">Remote</option>
                <option value="Office">Office</option>
              </select>
            </div>
          </div>
          <div className={styles.selectedFilters}>
            {Object.entries(finalFilters).map(([key,value]) => {
              if (!value || (Array.isArray(value) && value.length === 0)) return null;

              if (key === 'skills') {
                return value.map((skill, index) => (
                  <div key={index} className={styles.filterValue}>
                    <span>{skill}</span>
                    <button onClick={() => handleRemoveFilter(key, skill)}>x</button>
                  </div>
                ));
              }

              return (
                <div key={key} className={styles.filterValue}>
                  <span>{value}</span>
                  <button onClick={() => handleRemoveFilter(key)}>x</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.Buttons}>
          {Object.keys(finalFilters).length > 0 ? (
            <button onClick={applyFilters}>Apply Filter</button>
          ) : (
            <button onClick={() => navigate("/newJob")}>Add Job</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchAndFilter;

SearchAndFilter.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    jobType: PropTypes.string,
    remoteOffice: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    jobPosition: PropTypes.string,
  }),
  setFilters: PropTypes.func.isRequired,
};
