import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar.jsx';
import Navigation from './Navigation.jsx';
import Details from './Details.jsx';
import axios from 'axios';
import '../style.scss';

const App = () => {
  const [projects, setProjects] = useState('');
  const [activeProject, setActiveProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(null);
  const [descriptionView, toggleDescriptionView] = useState(false);


  useEffect(async () => {
    getProjectList()
  }, []);

  const getProjectList = async () => {
    const { data } = await axios.get('/projects/get_projects')
    setProjects(data);
    if (activeProject) {
      setSelectedProject(data[selectedProjectIndex])
    }
  }

  const addProject = async (projectName) => {
    await axios.post('/projects/add_project', {
      name: projectName
    })
    getProjectList();
  }

  const toggleActiveProject = () => {
    setActiveProject(true);
  }

  const selectProject = (clickedProject, index) => {
    setSelectedProject(clickedProject);
    setSelectedProjectIndex(index);
  }

  const resetSelectedProject = () => {
    setActiveProject(false)
    setSelectedProject({})
  }



  return (
    <>
      <TitleBar />
      <div id="wrapper">
        <Navigation
          projects={projects}
          addProject={addProject}
          getProjectList={getProjectList}
          toggleActiveProject={toggleActiveProject}
          selectProject={selectProject}
          selectedProjectIndex={selectedProjectIndex}
          setSelectedProjectIndex={setSelectedProjectIndex}
          toggleDescriptionView={toggleDescriptionView}
        />
        <Details
          activeProject={activeProject}
          selectedProject={selectedProject}
          getProjectList={getProjectList}
          resetSelectedProject={resetSelectedProject}
          setActiveProject={setActiveProject}
          descriptionView={descriptionView}
          toggleDescriptionView={toggleDescriptionView}
        />
      </div>
    </>
  )
}

export default App;

/*
App
- TitleBar
- Navigation
  - ProjectsList
  - AddProject
- Details
  - OpenTicket
  - CreateTicket
  - ClosedRickets



*/