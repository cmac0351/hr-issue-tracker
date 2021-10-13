import React from 'react';

const ProjectList = ({ projects, toggleActiveProject, selectProject }) => {

  const handleProjectClick = (project, index) => {
    toggleActiveProject();
    selectProject(project, index)
  }

  const projectList = projects.length ?
  projects.map((project, index) => {
    return <li onClick={() => handleProjectClick(project, index)} key={project._id}>{project.name}</li>
  }) :
  ''


  return (
    <ul>
      {projectList}
    </ul>
  )
}

export default ProjectList