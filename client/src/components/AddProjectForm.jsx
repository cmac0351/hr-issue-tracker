import React, { useState } from 'react';

const AddProjectForm = ({ submitProject, closeDisplayForm }) => {
  const [projectName, setProjectName] = useState('')

  const handleChange = (e) => {
    setProjectName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    submitProject(projectName)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    closeDisplayForm()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter the Name of the Project:
          <input value={projectName} onChange={handleChange} type="text"></input>
        </label>
        <input type="submit"></input>
        <button onClick={handleCancel} type="cancel">Cancel</button>
      </form>
    </div>
  )
}

export default AddProjectForm;
