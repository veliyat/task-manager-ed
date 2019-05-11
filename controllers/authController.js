const bcrypt = require('bcryptjs');
const User = require('../models/User');
const chalk = require('chalk');

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

    User.findOne({ 
      email: data.username
    })
    .then(user => {
      const valid = bcrypt.compareSync(data.password, user.passwordHash);

      if(valid) {
        req.session.errors = {};
        req.session.user = {
          username: data.username
        };
        res.redirect('/tasks');
      } else {
        errors.global = 'Invalid Credentials';
        req.session.errors = errors;
        res.redirect('/login');
      }
    });

    // if (data.username === 'admin' && data.password === 'admin123') {
    //     req.session.user = {
    //         username: data.username
    //     };
    //     res.redirect('/tasks');
    // } else {
    //     errors.global = 'Invalid Credentials';
    //     req.session.errors = errors;
    //     res.redirect('/login');
    // }
}

exports.logout = function (req, res) {
    req.session.user = null;
    res.redirect('/');
}

exports.registerForm = function (req, res) {
  const errors = req.session.errors ? req.session.errors : {};
  const data = req.session.data ? req.session.data : {};
  const user = req.session.user;
  res.render('auth/register', {
      projectName: 'Task Manager',
      title: 'Register',
      errors,
      user,
      data
  });
}

exports.register = function (req, res) {
  const data = req.body;
  let errors = {};

  //Form Validations would go here. TODO

  const salt = bcrypt.genSaltSync(10);
  data.passwordHash = bcrypt.hashSync(data.password, salt);

  delete data.confirmPassword;
  delete data.password;

  const user = new User(data);

  // User.insertMany([data]).then((user) => {
  user.save().then((user) => {
    console.log(chalk.yellow(user._id + ' User Added'));
    req.session.data = {};
    req.session.errors = {};
    res.redirect('/login');
  }).catch(err => {
    console.log(err.errmsg);
    req.session.data = data;
    req.session.errors = {
      email: 'Duplicate Email!'
    }
    res.redirect('/register');
  });
  
}