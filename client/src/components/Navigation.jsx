import React from 'react';
import ProjectList from './ProjectList.jsx';
import axios from 'axios';

const Navigation = ({projects, addProject}) => {

  return (
    <div className="navigation">
      <ProjectList projects={projects}/>
      <AddProject addProject={addProject}/>
    </div>
  )
}

export default Navigation;