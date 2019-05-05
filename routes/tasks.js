const express = require('express');
const tasksController = require('../controllers/tasksController');

const router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/tasks/list');
})

router.get('/list', tasksController.getTasks);

router.get('/add', tasksController.addTaskForm);

router.post('/add', tasksController.addTask);

router.get('/:id/details', tasksController.getTaskDetails);

router.get('/:id/delete', tasksController.deleteTask);

module.exports = router;