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
        <label className="new-project-label">Enter New Project Name:</label>
        <div>
          <input className="new-project-text" value={projectName} onChange={handleChange} type="text" autoFocus></input>
        </div>
        <input className="button submit-button" type="submit"></input>
        <button className="button cancel-button" onClick={handleCancel} type="cancel">Cancel</button>
      </form>
    </div>
  )
}

export default AddProjectForm;
