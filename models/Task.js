const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
    resourceURL: String
}, {
        timestamps: true
    });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;