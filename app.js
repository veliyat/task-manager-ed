const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.redirect('/tasks/list');
});

app.use('/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;