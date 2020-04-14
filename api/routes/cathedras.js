const express = require('express');
const router = express.Router();
const Cathedra = require('../models').Cathedra;
const User = require('../models').User;

router.get('/', function (req, res, next) {
  Cathedra.findAll({
    include: 'workers'
  })
    .then((cathedras) => res.send(cathedras))
    .catch((err) => console.log(err));
});

module.exports = router;
