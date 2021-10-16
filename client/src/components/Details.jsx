import React, { useState } from 'react';
import AddNewTicket from './AddNewTicket.jsx';
import TicketDetails from './TicketDetails.jsx';
import StatusDropDown from './StatusDropDown.jsx';
import API from './utils.jsx'
import axios from 'axios';


const Details = ({ activeProject, selectedProject, getProjectList, resetSelectedProject, setActiveProject, descriptionView, toggleDescriptionView }) => {
  const [activeTicket, setActiveTicket] = useState({});

  let openTickets = '';
  let closedTickets = '';
  let statusDropDown = '';
  const ticketStatusChoices = ['open', 'in progress', 'closed'];

  const openTicketDetails = () => {
    setActiveProject(!activeProject);
  }

  const handleDeleteProjectClick = async () => {
    await axios.delete(`/projects/delete/${selectedProject._id}`);
    resetSelectedProject();
    getProjectList();
  }

  const handleTicketUpdate = async (ticketId, newStatus) => {
    await API.updateTicketStatus(ticketId, newStatus)
    getProjectList()
  }

  const handleDeleteTicketClick = async (ticketId) => {
    await axios.delete(`/tickets/delete/${ticketId}`)
    getProjectList()
  }

  const handleTicketDescriptionClick = (ticketIndex) => {
    const { tickets } = selectedProject;
    setActiveTicket(tickets[ticketIndex]);
    toggleDescriptionView(true);
  }

  const handleBackToProjectsClick = () => {
    setActiveTicket({});
    toggleDescriptionView(false);
  }

  let openTicketCount = 0;
  let closedTicketCount = 0;

  if (activeProject) {
    const { name, tickets } = selectedProject;
    openTickets = tickets.map((ticket, index) => {
      if (ticket.status != 'closed') {
        openTicketCount++
        let className = `status status-${ticket.status}`
        if (className === 'status status-in progress') {
          className = 'status status-in-progress'
        }
        return <tr key={ticket._id}>
          <td className="ticket-description" onClick={() => handleTicketDescriptionClick(index)}>{ticket.description}</td>
          <td>
            <select
              className={className}
              onChange={(e) => handleTicketUpdate(ticket._id, e.target.value)}
              defaultValue={ticket.status}
            >
              <StatusDropDown ticketStatusChoices={ticketStatusChoices}/>
            </select>
          </td>
          <td>
              <button onClick={() => handleDeleteTicketClick(ticket._id)}>delete ticket</button>
          </td>
        </tr>
      }
    })

    closedTickets = tickets.map((ticket, index) => {
      if (ticket.status === 'closed') {
        closedTicketCount++
        return <tr key={ticket._id}>
          <td className="ticket-description" onClick={() => handleTicketDescriptionClick(index)}>{ticket.description}</td>
          <td className="status-closed">{ticket.status}</td>
          <td><button onClick={() => handleDeleteTicketClick(ticket._id)}>delete Ticket</button></td>
        </tr>
      }
    })
  }

  return (
    <div id="details">
      <div id="details-content">
        {!activeProject &&
          <div>
            <h3>Please choose a project from the list</h3>
            <h3>or add a project to get started</h3>
          </div>
        }
        {activeProject && !descriptionView &&
        <>
          <div className="project-title">
            <h1>{selectedProject.name.toUpperCase()}</h1>
            <p className="delete-project" onClick={handleDeleteProjectClick}>delete project</p>
          </div>
          <h2>OPEN TICKETS</h2>
          {openTicketCount > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {openTickets}
              </tbody>
            </table>
          }
          <AddNewTicket getProjectList={getProjectList} selectedProject={selectedProject}/>

          <h2>CLOSED TICKETS</h2>
          {closedTicketCount > 0 &&
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {closedTickets}
              </tbody>
            </table>
          }
        </>
        }
        {activeProject && descriptionView &&
          <div>
            <div className="project-title">
              <h1>{selectedProject.name.toUpperCase()}</h1>
              <p className="delete-project" onClick={handleDeleteProjectClick}>delete project</p>
            </div>
            <p className="back-to-project" onClick={handleBackToProjectsClick}>back to project view</p>
            <TicketDetails
              activeTicket={activeTicket}
              ticketStatusChoices={ticketStatusChoices}
              getProjectList={getProjectList}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default Details;