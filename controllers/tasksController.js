let tasks = require('../models/tasks');
const Task = require('../models/Task');

exports.getTasks = function (req, res) {
    res.render('tasks/list', {
        projectName: 'Task Manager',
        title: 'Task List',
        tasks: tasks
    });
}

exports.addTaskForm = function (req, res) {
    res.render('tasks/add', {
        projectName: 'Task Manager',
        title: 'Add Task'
    });
}

exports.addTask = function (req, res) {
    const data = req.body;

    const newTask = new Task(
        tasks.length + 1,
        data.title,
        data.description,
        data.resourceURL
    );

    tasks.push(newTask);

    res.redirect('/');

}

exports.getTaskDetails = function (req, res) {
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
}

exports.deleteTask = function (req, res) {
    const id = Number(req.params.id);

    tasks.forEach((task, i) => {
        if (id === task.id) {
            tasks.splice(i, 1);
            res.redirect('/');
        }
    });
}