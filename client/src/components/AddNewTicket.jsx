import React, { useState } from 'react';
import axios from 'axios';

const AddNewTicket = ({ getProjectList, selectedProject }) => {

  const [displayNewTicketForm, toggleDispalyNewTicketForm] = useState(false);
  const [ticketDescription, setTicketDescription] = useState('')

  const submitTicket = async (projectID, description) => {
    await axios.post(`/tickets/add_ticket/${projectID}`, {
      description
    })
  }

  const handleTicketFormChange = (e) => {
    setTicketDescription(e.target.value)
  }

  const handleNewTicketSubmit = async (e) => {
    e.preventDefault()
    await submitTicket(selectedProject._id, ticketDescription)
    getProjectList()
    toggleDispalyNewTicketForm(false)
    setTicketDescription('')
  }

  return (
    <div id="add-new-ticket">
      {!displayNewTicketForm &&
        <p onClick={() => toggleDispalyNewTicketForm(true)}>+ Add New Ticket</p>
      }
      {displayNewTicketForm &&
        <form className="submit-ticket" onSubmit={handleNewTicketSubmit}>
          <label className="ticket-label">Enter ticket description:</label>
          <div id="new-ticket-input">
            <input autoFocus className="ticket-input" onChange={handleTicketFormChange} type="text"></input>
            <input className="submit" type="submit"></input>
            <button className="cancel" type="button" onClick={() => toggleDispalyNewTicketForm(false)}>Cancel</button>
          </div>
        </form>
      }
    </div>
  )
}

export default AddNewTicket;
