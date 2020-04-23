const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models').User;

router.post('/register', [
  body('fullName').optional().isLength({ min: 3 }).withMessage('Must be at least 3 characters'),
  body('username')
    .isLength({ min: 4 }).withMessage('Must be at least 4 characters')
    .custom(value => {
    return User.findOne({ where: { username: value } }).then(user => {
      if (user) return Promise.reject('Username already in use');
    })
  }),
  body('email').isLength({ min: 4 })
    .isEmail().withMessage('Must be a valid email address')
    .custom(value => {
    return User.findOne({ where: { email: value } }).then(user => {
      if (user) return Promise.reject('E-mail already in use');
    })
  }),
  body('password').isLength({ min: 6 }).withMessage('Must have minimum 6 characters'),
  body('passConfirm').custom((value, { req }) => {
    console.log('===============', value, req.body);
    if (value !== req.body.password) throw new Error("Passwords don't match");
    return true;
  }),
], function (req, res, next) {
  const { fullName, username, email, password, isTeacher, cathedraId } = req.body;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    User.create({ fullName, username, email, password, isTeacher, isAdmin: false, cathedraId })
      .then(user => res.send({ user }))
      .catch(err => console.log('-------------------------------',err.message));
  } else {
    res.status(422).send({ error: errors.array() });
  }
});

module.exports = router;
