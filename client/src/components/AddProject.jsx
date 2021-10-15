import React, { useState } from 'react';
import AddProjectForm from './AddProjectForm.jsx';
import axios from 'axios';

const AddProject = ({ addProject, getProjectList }) => {
  const [displayForm, toggleDisplayForm] = useState(false);

  const submitProject = async projectName => {
    toggleDisplayForm(false)
    await axios.post('/projects/add_project', {name: projectName})
    getProjectList()
  }

  const closeDisplayForm = () => {
    toggleDisplayForm(false)
  }

  return (
    <div id="add-project">
      {!displayForm &&
        <p onClick={toggleDisplayForm}>+ Add Project</p>
      }
      {displayForm &&
        <AddProjectForm submitProject={submitProject} closeDisplayForm={closeDisplayForm}/>
      }
    </div>
  )
}

export default AddProject;
