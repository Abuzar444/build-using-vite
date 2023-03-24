import React from 'react'
import { FormRow,FormRowSelect } from "../../components";
import { useGlobalContext } from '../../context/AppContext';
import { toast } from "react-toastify";
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useGlobalContext();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error('Please provide values');
      return;
    }

    if (isEditing) {
      editJob();
      toast.success('job updated!');
      return;
    }

    createJob();
  }

  const handleJobInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <Wrapper>
      <h3>{ 
        isEditing ? "Editing Job" : "Add Job"
      }</h3>
      <form onSubmit={onSubmit} className="form">
        <div className="form-center">
          {/* postion */}
          <FormRow
            type="text"
            name="position"
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type="text"
            name="company"
            value={company}
            handleChange={handleJobInput}
          />
          {/* jobLocation */}
          <FormRow
            type="text"
            labelName="job Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* jobType */}
          <FormRowSelect
            labelName="job type"
            name="jobType"
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* jobStatus */}
           <FormRowSelect
            name="status"
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
          <div className="btn-container">
            <button
              type='submit'
              className="btn btn-block submit-btn"
            >
              submit
            </button>
             <button
              type='button'
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault()
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob
