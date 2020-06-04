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
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/monograph/all', function (req, res, next) {
  Monograph.findAll()
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/monograph/:id', function (req, res, next) {
  Monograph.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/monograph/files', authenticateToken, function (req, res, next) {
  const { files } = req.body;

  Monograph.update({ files }, {
    where: { id: req.user.id },
  })
    .then((rows) => {
      if (rows[0] > 0) {
        return Monograph.findOne({ where: { id: req.user.id } });
      }

      return res.status(304).send({ error: 'Not edited' });
    })
    .then(post => {
      if (post) {
        return res.send(post.get());
      }

      return res.status(404).send({ error: 'User not found' });
    })
    .catch((err) => console.log(err));
});
// -------------------------------
// ------------ Thesis -----------
router.post('/thesis', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Thesis.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/thesis/all', function (req, res, next) {
  Thesis.findAll()
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/thesis/:id', function (req, res, next) {
  Thesis.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/thesis/files', authenticateToken, function (req, res, next) {
  const { files } = req.body;

  Thesis.update({ files }, {
    where: { id: req.user.id },
  })
    .then((rows) => {
      if (rows[0] > 0) {
        return Thesis.findOne({ where: { id: req.user.id } });
      }

      return res.status(304).send({ error: 'Not edited' });
    })
    .then(post => {
      if (post) {
        return res.send(post.get());
      }

      return res.status(404).send({ error: 'User not found' });
    })
    .catch((err) => console.log(err));
});
// -----------------------------
// ---------- Periodicity ------
router.post('/periodicity', authenticateToken, function (req, res, next) {
  const { subauthors, author, ...rest } = req.body;

  const { ids, subauthorsString } = userIds(author, subauthors);

  Periodicity.create({ subauthors: subauthorsString, author, ...rest })
    .then(post => {
      post.setUsers(ids);
      res.send(post.get());
    })
    .catch(err => {
      console.log('-----', err);
      res.send('Not created');
    });
});

router.get('/periodicity/all', function (req, res, next) {
  Periodicity.findAll()
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.get('/periodicity/:id', function (req, res, next) {
  Periodicity.findOne({
    where: { id: req.params.id },
    include: [{
      model: User,
      attributes: ['username', 'id'],
    }]
  })
    .then(post => res.send(post))
    .catch(err => {
      console.log('-----', err);
      res.send('Something went wrong');
    });
});

router.put('/periodicity', authenticateToken, function (req, res, next) {
  const { files } = req.body;

  Periodicity.update({ ...req.body }, {
    where: { id: req.user.id },
  })
    .then((rows) => {
      if (rows[0] > 0) {
        return Periodicity.findOne({ where: { id: req.user.id } });
      }

      return res.status(304).send({ error: 'Not edited' });
    })
    .then(post => {
      if (post) {
        return res.send(post.get());
      }

      return res.status(404).send({ error: 'User not found' });
    })
    .catch((err) => console.log(err));
});
// ----------------------------

module.exports = router;
