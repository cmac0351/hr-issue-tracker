import React from 'react';
import ProjectList from './ProjectList.jsx';
import AddProject from './AddProject.jsx';
import axios from 'axios';

const Navigation = ({projects, addProject, getProjectList, toggleActiveProject, selectProject, selectedProjectIndex, toggleDescriptionView }) => {

  return (
    <div id="navigation">
      <h2>Projects</h2>
      <ProjectList
        projects={projects}
        toggleActiveProject={toggleActiveProject}
        selectProject={selectProject}
        selectedProjectIndex={selectedProjectIndex}
        toggleDescriptionView={toggleDescriptionView}
      />
      <AddProject
        addProject={addProject}
        getProjectList={getProjectList}
      />
    </div>
  )
}

export default Navigation;