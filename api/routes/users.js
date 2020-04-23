const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils');
const User = require('../models').User;

/* GET main user. */
router.get('/account', authenticateToken, function (req, res, next) {
  User.findOne({
    where: { username: req.user.name },
  })
    .then((user) => {
      if (user === null) res.send('Cannot find user');
      const { password, ...rest } = user.get();
      res.send(rest);
    })
    .catch((err) => console.log('========', err));
});

// PUT edit user
router.put('/account', authenticateToken, async function (req, res, next) {
  await User.update(req.body, {
    where: { username: req.user.name },
  })
    .then((rows) => {
      if (rows[0] > 0) {
        return User.findOne({
          where: { username: req.user.name },
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
});

// GET user
router.get('/:username', authenticateToken, function (req, res, next) {
  User.findOne({
    where: { username: req.params.username },
  })
    .then((user) => {
      if (user === null) res.send('Cannot find user');
      const { password, ...rest } = user.get();
      res.send(rest);
    })
    .catch((err) => console.log('========', err));
});

module.exports = router;
