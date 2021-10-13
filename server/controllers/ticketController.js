const { Ticket } = require('../../db/models/ticket.js');
const Project = require('../../db/models/project.js');



const addTicket = async (req, res) => {

  const selectedProject = await Project.findById({
    _id: req.params.projectID
  })
  selectedProject.tickets.push({
    description: req.body.description,
    status: 'open'
  })

  await selectedProject.save()
  res.sendStatus(201)
}

module.exports = {
  addTicket,
}