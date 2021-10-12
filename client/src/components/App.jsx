import React, { useState, useEffect } from 'react';
import TitleBar from './TitleBar.jsx';
import Navigation from './Navigation.jsx';
import Details from './Details.jsx';
import axios from 'axios';
import '../style.scss'

const App = () => {
  const [projects, setProjects] = useState('');

  const getProjectList = async () => {
    const { data } = await axios.get('/projects/get_projects')
    setProjects(data)
  }

  const addProject = async (projectName) => {
    await axios.post('/projects/add_project', {
      name: projectName
    })
    getProjectList()
  }

  useEffect(async () => {
    getProjectList()
  }, [])



  return (
    <>
      <TitleBar />
      <div id="wrapper">
        <Navigation projects={projects} addProject={addProject}/>
        <Details />
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