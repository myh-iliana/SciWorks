const express = require('express');
const router = express.Router();

const Monograph = require('../models').Monograph;
const Thesis = require('../models').Thesis;
const Periodicity = require('../models').Periodicity;
const authenticateToken = require('../utils');

router.post('/monograph', authenticateToken, function (req, res, next) {
  Monograph.create(req.body)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.post('/thesis', authenticateToken, function (req, res, next) {
  Thesis.create(req.body)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.post('/periodicity', authenticateToken, function (req, res, next) {
  Periodicity.create(req.body)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

module.exports = router;
