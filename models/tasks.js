const Task = require('./Task');

module.exports = [
    new Task(
        1,
        'Learn NodeJS',
        'This is new Desc',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1200px-Node.js_logo.svg.png'
    ),
    new Task(
        2,
        'Learn MongoDB',
        'This is for learning MongoDB',
        'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png'
    ),
    new Task(
        3,
        'Learn JavaScript',
        'This is for learning JS',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
    )
];