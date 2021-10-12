import React from 'react';

const ProjectList = ({ projects }) => {

  const projectList = projects.length ?
  projects.map(project => {
    return <li key={project._id}>{project.name}</li>
  }) :
  ''


  return (
    <ul>
      {projectList}
    </ul>
  )
}

export default ProjectList