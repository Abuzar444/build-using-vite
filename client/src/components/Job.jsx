import React from 'react'
import moment from 'moment'
import Wrapper from "../assets/wrappers/Job";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import JobInfo from './JobInfo';
import { useGlobalContext } from '../context/AppContext';


const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY');
  const { setEditJob, deleteJob } = useGlobalContext();


  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow/>} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt/>} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <div className="actions">
          <Link
            onClick={() => setEditJob(_id)}
            to="/add-job"
            className='btn edit-btn'
          >
            edit
          </Link>
          <button
            type='button'
            onClick={() => deleteJob(_id)}
            className="btn delete-btn">
            delete
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Job
