const chalk = require('chalk');
const Task = require('../models/Task');

exports.getTasks = function (req, res) {
    const user = req.session.user;    
    Task.find().then(function (tasks) {
        res.render('tasks/list', {
            projectName: 'Task Manager',
            title: 'Task List',
            tasks,
            user
        });
    });
}

exports.addTaskForm = function (req, res) {
    const errors = req.session.errors ? req.session.errors : {};
    const user = req.session.user;

    res.render('tasks/add', {
        projectName: 'Task Manager',
        title: 'Add Task',
        errors,
        user
    });
}

exports.addTask = function (req, res) {
    const data = req.body;
    let valid = true;
    let errors = {};

    if (data.title === '') {
        errors.title = 'Title can not be blank.';
        valid = false;
    }

    if (data.description === '') {
        errors.description = 'Description can not be blank.';
        valid = false;
    }

    if (data.resourceURL === '') {
        data.resourceURL = 'http://textiletrends.in/gallery/1547020644No_Image_Available.jpg';
    }

    if (valid) {
        req.session.errors = {};
        
        data.completed = false;

        Task.insertMany([data]).then((task) => {
          console.log(chalk.blue(task._id + ' Added!'));
          res.redirect('/tasks');
        }).catch((err) => console.log(err));

    } else {
        req.session.errors = errors;
        res.redirect('/tasks/add');
    }
}

exports.getTaskDetails = function (req, res) {
    const id = req.params.id;
    const user = req.session.user;

    Task.findById(id).then(function (task) {
        res.render('tasks/details', {
            projectName: 'Task Manager',
            title: 'Task Details',
            task,
            user
        });
    });
}

exports.deleteTask = function (req, res) {
    const id = req.params.id;

    Task.findByIdAndDelete(id)
      .then((data) => {
        console.log(chalk.blue(data._id + ' Deleted!'));
        res.redirect('/tasks');
      })
      .catch(err => console.log(err));
}