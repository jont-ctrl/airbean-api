import express from 'express';

export function validateLogin(req, res, next) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (req.body.email && req.body.email != '') {
    if (!emailRegex.test(req.body.email)) {
      res
        .status(400)
        .send('The email address you entered is not a valid email');
    }
  } else {
    res.status(400).send('You need to enter an email');
  }

  if (req.body.password && req.body.password != '') {
    if (req.body.password.length <= 6) {
      res
        .status(400)
        .send('Password is invalid (it needs to be at least 6 characters)');
    }
  } else {
    res.status(400).send('You need to enter a password');
  }

  next();
}
