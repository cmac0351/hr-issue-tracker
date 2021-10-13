import React from 'react';
import ProjectList from './ProjectList.jsx';
import AddProject from './AddProject.jsx';
import axios from 'axios';

const Navigation = ({projects, addProject, getProjectList, toggleActiveProject, selectProject }) => {

  return (
    <div className="navigation">
      <h3>Projects</h3>
      <ProjectList projects={projects} toggleActiveProject={toggleActiveProject} selectProject={selectProject}/>
      <AddProject addProject={addProject} getProjectList={getProjectList}/>
    </div>
  )
}

export default Navigation;