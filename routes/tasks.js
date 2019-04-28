const express = require('express');
const router = express.Router();
let tasks = require('../data/tasks');

router.get('/list', function (req, res) {
    res.render('tasks/list', {
        projectName: 'Task Manager',
        title: 'Task List',
        tasks: tasks
    });
});

router.get('/add', function (req, res) {
    res.render('tasks/add', {
        projectName: 'Task Manager',
        title: 'Add Task'
    });
});

router.get('/details/:id', function (req, res) {
    const id = Number(req.params.id);

    let task = null;

    for (var i = 0; i < tasks.length; i++) {
        if (id === tasks[i].id) {
            task = tasks[i];
            break;
        }
    }

    res.render('tasks/details', {
        projectName: 'Task Manager',
        title: 'Task Details',
        task: task
    });
});

// router.get('/tasks', function (req, res) {
//     res.json(tasks);
// });

// router.get('/get-random-task', function (req, res) {
//     const randomTask = tasks[Math.floor(Math.random() * tasks.length) + 1];
//     res.send(randomTask);
// });

module.exports = router;