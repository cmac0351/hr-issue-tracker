const Project = require('../../db/models/project.js');

const getProjects = async (req, res) => {
  const allProjects = await Project.find()
  res.send(allProjects)
}

const addProject = async (req, res) => {
  // const project = new Project({
  //   name: 'Test Project'
  // })

  // await project.save();
}

module.exports = {
  getProjects,
  addProject
}