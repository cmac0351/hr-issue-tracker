require('dotenv').config();
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log('connected to database')
}

const projectSchema = new mongoose.Schema({
  name: String,

})

const ticketSchema = new mongoose.Schema({
  number: Number,
  description: String,
  status: String,
  notes: String,
})

const Project = mongoose.model('Project', projectSchema);
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
  Project,
  Ticket
}