const express = require('express');
const path = require('path');

const app = express();

let tasks = require('./data/tasks');

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/tasks', function (req, res) {
    res.json(tasks);
});

app.get('/get-random-task', function (req, res) {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length) + 1];
    res.send(randomTask);
});

module.exports = app;