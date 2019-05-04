const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.redirect('/tasks/list');
});

app.use('/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;