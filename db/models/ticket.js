const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  number: Number,
  description: String,
  status: String,
  notes: String,
})

const Ticket = mongoose.model('Ticket', ticketSchema);


module.exports = {
  ticketSchema,
  Ticket
}
