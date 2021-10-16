import axios from 'axios';

export default {
  updateTicketStatus: async (ticketId, newStatus) => {
    return await axios.put(`/tickets/update_status/${ticketId}`, {
      newStatus,
    })
  },

  updateTicketNotes: async (ticketId, newNotes) => {
    return await axios.put(`/tickets/update_notes/${ticketId}`, {
      newNotes
    })
  },

  updateTicketDescription: async (ticketId, newDescription) => {
    return await axios.put(`/tickets/update_description/${ticketId}`, {
      newDescription
    })
  }
}

