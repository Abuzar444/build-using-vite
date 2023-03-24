import React from 'react'

const FormRow = ({handleChange,labelName,name,value,type}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelName || name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        className="form-input"
        onChange={handleChange}
        />
    </div>
  )
}

export default FormRow
