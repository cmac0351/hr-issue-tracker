const { Ticket } = require('../../db/models/ticket.js');
const Project = require('../../db/models/project.js');



const addTicket = async (req, res) => {
  // const currentProject = await Project.findOne({
  //   name: 'Test Project'
  // })

  // await currentProject.tickets.push({
  //   number: 2,
  //   description: 'new issue',
  //   status: 'open',
  //   notes: '',
  // })
  // currentProject.save()
}

module.exports = addTicket