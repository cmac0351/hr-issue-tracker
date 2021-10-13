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

const updateTicket = async (req, res) => {
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
  updateTicket,
  deleteTicket
}