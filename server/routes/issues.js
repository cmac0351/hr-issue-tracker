const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')

router.get('/projects/get_projects', projectController.getProjects)

module.exports = router;