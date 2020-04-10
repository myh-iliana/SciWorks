const express = require('express');
const router = express.Router();

const Cathedra = require('../models').Cathedra;

router.get('/', function (req, res, next) {
  Cathedra.findAll()
    .then((cathedras) => res.send(cathedras))
    .catch((err) => console.log(err));
});

module.exports = router;
