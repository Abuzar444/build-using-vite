import React from 'react'

const FormRowSelect = ({ handleChange, labelName, name, value, list }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelName || name}
      </label>
      <select
        name={name}
        className="form-select"
        value={value}
        onChange={handleChange}
      >
        {
          list.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            )
          })
        }
      </select>
    </div>
  );
};

export default FormRowSelect
