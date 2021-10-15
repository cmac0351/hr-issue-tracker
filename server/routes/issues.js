const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const ticketController = require('../controllers/ticketController');

router.get('/projects/get_projects', projectController.getProjects);
router.post('/projects/add_project', projectController.addProject);
router.delete('/projects/delete/:projectID', projectController.deleteProject);
router.post('/tickets/add_ticket/:projectID', ticketController.addTicket);
router.put('/tickets/update_status/:ticketID', ticketController.updateTicket);
router.delete('/tickets/delete/:ticketID', ticketController.deleteTicket);

module.exports = router;