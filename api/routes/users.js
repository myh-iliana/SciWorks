const express = require('express');
const router = express.Router();

const authenticateToken = require('../utils');
const User = require('../models').User;

/* GET users listing. */
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

module.exports = router;
