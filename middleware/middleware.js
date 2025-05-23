import express from 'express';

function validateLogin(req, res, next) {
  if (!req.body.username || req.body.username === '') {
    res.status(400).send('Username invalid');
  }

  if (req.body.password && req.body.password != '') {
    if (req.body.password.length < 6) {
      res
        .status(400)
        .send('Password is invalid (it needs to be at least 6 characters)');
    }
  } else {
    res.status(400).send('You need to enter a password');
  }

  next();
}

export default validateLogin;
