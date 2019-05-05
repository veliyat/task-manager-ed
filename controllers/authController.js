exports.loginForm = function (req, res) {
    const errors = req.session.errors ? req.session.errors : {};
    const user = req.session.user;
    res.render('auth/login', {
        projectName: 'Task Manager',
        title: 'Login',
        errors,
        user
    });
}

exports.login = function (req, res) {
    const data = req.body;
    let errors = {};

    if (data.username === 'admin' && data.password === 'admin123') {
        req.session.user = {
            username: data.username
        };
        res.redirect('/tasks');
    } else {
        errors.global = 'Invalid Credentials';
        req.session.errors = errors;
        res.redirect('/login');
    }
}

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect('/');
}