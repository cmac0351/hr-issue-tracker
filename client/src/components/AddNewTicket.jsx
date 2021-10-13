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
    <div>
      {!displayNewTicketForm &&
        <p onClick={() => toggleDispalyNewTicketForm(true)}>+ Add New Ticket</p>
      }
      {displayNewTicketForm &&
        <form onSubmit={handleNewTicketSubmit}>
          <label>
            Enter ticket description
            <input onChange={handleTicketFormChange} type="text"></input>
          </label>
          <input type="submit"></input>
          <button type="button" onClick={() => toggleDispalyNewTicketForm(false)}>Cancel</button>
        </form>
      }
    </div>
  )
}

export default AddNewTicket;
