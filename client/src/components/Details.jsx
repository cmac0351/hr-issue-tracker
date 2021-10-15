import React, { useState } from 'react';
import AddNewTicket from './AddNewTicket.jsx';
import axios from 'axios';


const Details = ({ activeProject, selectedProject, getProjectList }) => {
  let openTickets = '';
  let closedTickets = '';
  let statusDropDown = '';
  const ticketStatusChoices = ['open', 'in progress', 'closed'];

  const handleTicketUpdate = async (ticketId, newStatus) => {
    await axios.put(`/tickets/update_status/${ticketId}`, {
      newStatus,
    })
    getProjectList()
  }

  const handleDeleteTicketClick = async (ticketId) => {
    await axios.delete(`/tickets/delete/${ticketId}`)
    getProjectList()
  }

  let openTicketCount = 0;
  let closedTicketCount = 0;

  if (activeProject) {
    const { name, tickets } = selectedProject;
    openTickets = tickets.map(ticket => {
      statusDropDown = ticketStatusChoices.map(choice => {
        return <option key={choice} value={choice} >{choice}</option>
      })
      if (ticket.status != 'closed') {
        openTicketCount++
        let className = `status status-${ticket.status}`
        if (className === 'status status-in progress') {
          className = 'status status-in-progress'
        }
        return <tr key={ticket._id}>
          <td>{ticket.description}</td>
          <td>
            <select
              className={className}
              onChange={(e) => handleTicketUpdate(ticket._id, e.target.value)}
              defaultValue={ticket.status}
            >
              {statusDropDown}
            </select>
          </td>
          <td>
              <button onClick={() => handleDeleteTicketClick(ticket._id)}>Delete Ticket</button>
          </td>
        </tr>
      }
    })

    closedTickets = tickets.map(ticket => {
      if (ticket.status === 'closed') {
        closedTicketCount++
        return <tr>
          <td>{ticket.description}</td>
          <td>{ticket.status}</td>
          <td><button onClick={() => handleDeleteTicketClick(ticket._id)}>Delete Ticket</button></td>
        </tr>
      }
    })
  }
  console.lo
  return (
    <div id="details">
      <div id="details-content">
        {!activeProject &&
          <div>
            <h3>Please choose a project from the list</h3>
            <h3>or add a project to get started</h3>
          </div>
        }
        {activeProject &&
        <>
          <h1>{selectedProject.name.toUpperCase()}</h1>
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
      </div>
    </div>
  )
}

export default Details;