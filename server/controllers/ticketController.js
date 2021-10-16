const { Ticket } = require('../../db/models/ticket.js');
const Project = require('../../db/models/project.js');



const addTicket = async (req, res) => {
  const { description } = req.body;
  const { projectID } = req.params;

  const selectedProject = await Project.findById({
    _id: projectID
  })
  selectedProject.tickets.push({
    description,
    status: 'open'
  })

  await selectedProject.save()
  res.sendStatus(201)
}

const updateTicketStatus = async (req, res) => {
  const { newStatus } = req.body
  const { ticketID } = req.params

  const currentProject = await Project.updateOne(
    {
      "tickets._id": ticketID
    },
    {
      $set: {
        "tickets.$.status": newStatus
      }
    }
  )
  res.sendStatus(201)
}

const updateTicketDescription = async (req, res) => {
  const { newDescription } = req.body
  const { ticketID } = req.params

  const currentProject = await Project.updateOne(
    {
      "tickets._id": ticketID
    },
    {
      $set: {
        "tickets.$.description": newDescription
      }
    }
  )
  res.sendStatus(201)
}

const updateTicketNotes = async (req, res) => {
  const { newNotes } = req.body
  const { ticketID } = req.params

  const currentProject = await Project.updateOne(
    {
      "tickets._id": ticketID
    },
    {
      $set: {
        "tickets.$.notes": newNotes
      }
    }
  )
  res.sendStatus(201)
}

const deleteTicket = async (req, res) => {
  const { newStatus } = req.body
  const { ticketID } = req.params

  const currentProject = await Project.updateOne(
    {
      "tickets._id": ticketID
    },
    {
      $pull: {
        tickets: {_id: ticketID}
      }
    }
  )
  res.sendStatus(201)
}

module.exports = {
  addTicket,
  updateTicketStatus,
  updateTicketDescription,
  updateTicketNotes,
  deleteTicket
}