const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');

const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');

const authMiddleware = require('./helpers/authHelper');

mongoose.connect(
    'mongodb://localhost:27017/taskManager',
    { useNewUrlParser: true },
    () => console.log(chalk.yellow('DB Connected!'))
);

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    if (req.session.user) {
        res.redirect('/tasks');
    } else {
        res.redirect('/login');
    }
});

app.use('/', authRoutes);
app.use('/tasks', [authMiddleware, taskRoutes]);

app.use('**', (req, res) => {
  res.render('shared/page-not-found', {
    projectName: 'Task Manager',
    title: '404 - Page Not Found',
    user: req.session.user
  });
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;