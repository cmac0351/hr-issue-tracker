import React from 'react';

const ProjectList = ({ projects, toggleActiveProject, selectProject, selectedProjectIndex, toggleDescriptionView }) => {
  let activeProjectClassName = '';

  const handleProjectClick = (project, index) => {
    toggleActiveProject();
    toggleDescriptionView(false)
    selectProject(project, index);
  }

  const projectList = projects.length ?
  projects.map((project, index) => {
    const activeProjectClassName = index === selectedProjectIndex ? 'selected-project' : '';
    return <li className={activeProjectClassName} onClick={() => handleProjectClick(project, index)} key={project._id}>{project.name}</li>
  }) :
  ''


  return (
    <ul>
      {projectList}
    </ul>
  )
}

export default ProjectList