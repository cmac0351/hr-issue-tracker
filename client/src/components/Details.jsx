import React from 'react';
import AddNewTicket from './AddNewTicket.jsx';

// add feature to hide closed tickets
// add feature to update ticket status


const Details = ({ activeProject, selectedProject, getProjectList }) => {
  let openTickets = '';
  let closedTickets = '';
  let statusDropDown = '';
  const ticketStatusChoices = ['open', 'closed', 'in progress'];

  const handleTicketUpdate = (ticketId, newStatus) => {
    console.log('ticketId:', ticketId)
    console.log('newStatus:', newStatus)
  }

  if (activeProject) {
    const { name, tickets } = selectedProject;
    openTickets = tickets.map(ticket => {
      statusDropDown = ticketStatusChoices.map(choice => {
        return <option value={ticket.status} >{choice}</option>
      })
      if (ticket.status != 'closed') {
        return <tr>
          <td>{ticket.description}</td>
          <td>
            <select
              onChange={(e) => handleTicketUpdate(ticket._id, e)}
              defaultValue={ticket.status}
            >
              {statusDropDown}
            </select>
          </td>
        </tr>
      }
    })

    closedTickets = tickets.map(ticket => {
      if (ticket.status === 'closed') {
        return <tr>
          <td>{ticket.description}</td>
          <td>{ticket.status}</td>
        </tr>
      }
    })
  }

  return (
    <div className="details">
      {!activeProject &&
        <h3>Please choose a project from the list</h3>
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