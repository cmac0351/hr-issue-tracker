import React, { useState } from 'react';
import TitleBar from './TitleBar.jsx';
import Navigation from './Navigation.jsx';
import Details from './Details.jsx';
import '../style.scss'

const App = () => {




  return (
    <>
      <TitleBar />
      <div id="wrapper">
        <Navigation />
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