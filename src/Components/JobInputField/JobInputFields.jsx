import {PropTypes} from 'prop-types'
import styles from './jobInputField.module.css';
import { useState } from 'react';

function JobInputFields({jobDetails, setJobDetails}) {

  const [skillInput, setSkillInput] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;
        setJobDetails((prev) => ({
            ...prev,
            [name]: name === 'salary' ? Number(value) : value
        }))
  };
  const handleSkillsChange = (e) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput && !jobDetails.skillsRequired.includes(skillInput)){
      setJobDetails((prev) => ({
        ...prev,
        skillsRequired:[...prev.skillsRequired, skillInput]
      }));
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (removeSkill) => {
    setJobDetails((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== removeSkill)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div>
      <div className={styles.inputArea}>
          <div className={styles.companyName}>
            <label htmlFor="companyName">Company Name</label>
            <input
              name="companyName"
              id="companyName"
              type="text"
              placeholder="Enter your company name here"
                value={jobDetails.companyName}
                onChange={handleChange}
            />
          </div>
          <div className={styles.logoUrl}>
            <label htmlFor="logoUrl">Add logo URL</label>
            <input
              id="logoUrl"
              name="logoUrl"
              type="text"
              placeholder="Enter the link"
              value={jobDetails.logoUrl}
                onChange={handleChange}
            />
          </div>
          <div className={styles.jobPosition}>
            <label htmlFor="jobPosition">Job position</label>
            <input
              id="jobPosition"
              name="jobPosition"
              type="text"
              placeholder="Enter job position"
              value={jobDetails.jobPosition}
                onChange={handleChange}
            />
          </div>
          <div className={styles.salary}>
            <label htmlFor="salary">Monthly salary</label>
            <input
              name="salary"
              id="salary"
              type="text"
              placeholder="Enter Amount in rupees"
              value={jobDetails.salary}
                onChange={handleChange}
            />
          </div>
          <div className={styles.jobType}>
            <label htmlFor="jobType">Job Type</label>
            <select value={jobDetails.jobType} onChange={handleChange} name="jobType" id="jobType">
            <option  disabled>Select</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div className={styles.remoteOffice}>
            <label htmlFor="remoteOffice">Remote/Office</label>
            <select value={jobDetails.remoteOffice} onChange={handleChange} name="remoteOffice" id="remoteOffice">
                <option value="" disabled>Select</option>
              <option value="remote">Remote</option>
              <option value="office">Office</option>
            </select>
          </div>
          <div className={styles.location}>
            <label  htmlFor="location">Location</label>
            <input
              name="location"
              id="location"
              type="text"
              placeholder="location" value={jobDetails.location} onChange={handleChange}
            />
          </div>
          <div className={styles.jobDescription}>
            <label  htmlFor="jobDescription">Job Description</label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              type="text"
              placeholder="Type the job description"
              value={jobDetails.jobDescription} onChange={handleChange}
            />
          </div>
          <div className={styles.companyDescription}>
            <label htmlFor="companyDescription">About Company</label>
            <textarea
              name="companyDescription"
              id="companyDescription"
              type="text"
              placeholder="Type about your company"
              value={jobDetails.companyDescription} onChange={handleChange}
            />
          </div>
          <div className={styles.skillsRequired}>
            <label htmlFor="skillsRequired">Skills Required</label>
            <div className={styles.skillsInputContainer}>
            <input
              name="skillsRequired"
              id="skillsRequired"
              placeholder="Enter the must have skills"
              value={skillInput}
              onChange={handleSkillsChange}
              onKeyDown={handleKeyPress}
            />
            <button type='button' onClick={handleAddSkill} disabled={!skillInput}>
              +
            </button>
            </div>
            <div className={styles.skillsList}>
            {jobDetails.skillsRequired.map((skill,index) => (
              <div key={index} className={styles.skillName}>
                {skill}
                <button type='button' onClick={() => handleRemoveSkill(skill)}>x</button>
              </div>
            ))}
          </div>
          </div>
          
          <div className={styles.additionalInfo}>
            <label htmlFor="additionalInfo">Information</label>
            <textarea
              name="additionalInfo"
              id="additionalInfo"
              type="text"
              placeholder="Enter the additional information"
              value={jobDetails.additionalInfo} onChange={handleChange}
            />
          </div>
        </div>
    </div>
  )
}

export default JobInputFields


JobInputFields.propTypes = {
    setJobDetails: PropTypes.func,
    jobDetails: PropTypes.shape({
      companyName: PropTypes.string,
      logoUrl: PropTypes.string,
      jobPosition: PropTypes.string,
      salary: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      jobType: PropTypes.string,
      remoteOffice: PropTypes.string,
      location: PropTypes.string,
      skillsRequired: PropTypes.arrayOf(PropTypes.string),
      companyDescription: PropTypes.string,
      jobDescription: PropTypes.string,
      additionalInfo: PropTypes.string
    })
}
