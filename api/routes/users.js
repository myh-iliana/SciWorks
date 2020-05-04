const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const authenticateToken = require('../utils');
const validations = require('./validations');
const User = require('../models').User;

/* GET main user. */
router.get('/account', authenticateToken, function (req, res, next) {
  User.findOne({
    where: { id: req.user.id },
  })
    .then((user) => {
      if (user === null) res.status(404).send('Cannot find user');
      const { password, ...rest } = user.get();
      res.send(rest);
    })
    .catch((err) => console.log('========', err));
});

// PUT edit user
router.put('/account', [
  validations.fullName,
  validations.username((value, { req }) => {
    if (value !== req.body.currentUsername) {
      return User.findOne({ where: { username: value } }).then(user => {
        if (user) return Promise.reject('Username already in use');
      })
    }
    return true;
  }),
  validations.email((value, { req }) => {
    if (value !== req.body.currentEmail) {
      return User.findOne({ where: { email: value } }).then(user => {
        if (user) return Promise.reject('E-mail already in use');
      })
    }
    return true;
  }),
], authenticateToken, async function (req, res, next) {
  const errors = validationResult(req);
  const { currentUsername, currentEmail, id, ...data } = req.body;

  if (errors.isEmpty()) {
    await User.update(data, {
      where: { id },
    })
      .then((rows) => {
        if (rows[0] > 0) {
          return User.findOne({
            where: { id },
          });
        }

        return res.status(304).send({ error: 'Not edited' });
      })
      .then(user => {
        if (user) {
          const { password, ...rest } = user.get();
          return res.send(rest);
        }

        return res.status(404).send({ error: 'User not found' });
      })
      .catch((err) => console.log(err));
  } else {
    res.status(422).send({ error: errors.array() });
  }
});

// GET user
router.get('/:username', authenticateToken, function (req, res, next) {
  User.findOne({
    where: { username: req.params.username },
  })
    .then((user) => {
      if (user === null) res.status(404).send('Cannot find user');
      const { password, ...rest } = user.get();
      res.send(rest);
    })
    .catch((err) => console.log('========', err));
});

module.exports = router;
