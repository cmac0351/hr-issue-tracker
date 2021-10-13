import React from 'react';
import AddNewTicket from './AddNewTicket.jsx';
import axios from 'axios';

// add feature to hide closed tickets
// add feature to update ticket status


const Details = ({ activeProject, selectedProject, getProjectList }) => {
  let openTickets = '';
  let closedTickets = '';
  let statusDropDown = '';
  const ticketStatusChoices = ['open', 'closed', 'in progress'];

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

  if (activeProject) {
    const { name, tickets } = selectedProject;
    openTickets = tickets.map(ticket => {
      statusDropDown = ticketStatusChoices.map(choice => {
        return <option key={choice} value={choice} >{choice}</option>
      })
      if (ticket.status != 'closed') {
        return <tr key={ticket._id}>
          <td>{ticket.description}</td>
          <td>
            <select
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
        return <tr>
          <td>{ticket.description}</td>
          <td>{ticket.status}</td>
          <td><button onClick={() => handleDeleteTicketClick(ticket._id)}>Delete Ticket</button></td>
        </tr>
      }
    })
  }

  return (
    <div className="details">
      {!activeProject &&
        <div>
          <h3>Please choose a project from the list</h3>
          <h3>or add a project to get started</h3>
        </div>
      }
      {activeProject &&
      <>
        <h3>{selectedProject.name}</h3>
        <h4>OPEN TICKETS</h4>
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
        <AddNewTicket getProjectList={getProjectList} selectedProject={selectedProject}/>

        <h4>CLOSED TICKETS</h4>
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
      </>
      }
    </div>
  )
}

export default Details;