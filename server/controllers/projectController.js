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

const deleteProject = async (req, res) => {
  try {
    const { projectID } = req.params
    await Project.findByIdAndDelete(projectID)
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(404)
  }
}

module.exports = {
  getProjects,
  addProject,
  deleteProject
}