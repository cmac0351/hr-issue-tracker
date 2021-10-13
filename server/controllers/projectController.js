const Project = require('../../db/models/project.js');

const getProjects = async (req, res) => {
  const allProjects = await Project.find()
  res.send(allProjects)
}

const addProject = async (req, res) => {
  const { name } = req.body
  const project = new Project({
    name
  })
  await project.save();
  res.sendStatus(201)
}

module.exports = {
  getProjects,
  addProject
}