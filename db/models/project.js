const mongoose = require('mongoose');
const { ticketSchema } = require('./ticket')

const projectSchema = new mongoose.Schema({
  name: String,
  tickets: [ticketSchema],
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;