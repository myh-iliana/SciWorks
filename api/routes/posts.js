const express = require('express');
const router = express.Router();

const Monograph = require('../models').Monograph;
const Thesis = require('../models').Thesis;
const Periodicity = require('../models').Periodicity;
const User = require('../models').User;
const authenticateToken = require('../utils');

function userIds(author, subauthors) {
  let authorIds, subauthorsString = null;

  if (subauthors) {
    subauthorsString = subauthors.join();
    authorIds = [...subauthors, author];

    // User.findAll({
    //   where: { id: authorIds },
    // }).then(users => {
    //
    // });

    return { ids: authorIds, subauthorsString };
  } else {
    authorIds = [author];

    return { ids: authorIds, subauthorsString }
  }
}

// ------------ Monograph ----------
router.post('/monograph', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Monograph.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send({ post: post.get() });
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/monograph/all', authenticateToken, function (req, res, next) {
  Monograph.findAll()
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/monograph/:id', authenticateToken, function (req, res, next) {
  Monograph.findByPk(req.params.id)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});
// -------------------------------
// ------------ Thesis -----------
router.post('/thesis', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Thesis.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send({ post: post.get() });
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/thesis/all', authenticateToken, function (req, res, next) {
  Thesis.findAll()
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/thesis/:id', authenticateToken, function (req, res, next) {
  Thesis.findByPk(req.params.id)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});
// -----------------------------
// ---------- Periodicity ------
router.post('/periodicity', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Periodicity.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send({ post: post.get() });
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/periodicity/all', authenticateToken, function (req, res, next) {
  Periodicity.findAll()
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/periodicity/:id', authenticateToken, function (req, res, next) {
  Periodicity.findByPk(req.params.id)
    .then(post => res.send({ post }))
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});
// ----------------------------

module.exports = router;
