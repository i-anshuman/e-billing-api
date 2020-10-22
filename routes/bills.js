'use strict';

const router = require('express').Router();
const { watchErrors } = require('../middlewares');
const { billSchema, billID } = require('../validators/bills');
const { create, list, view } = require('../controllers/bills');

router.post('/new', watchErrors(billSchema, "body"), (req, res) => {
  create(res.locals.user._id, req.body, (error, bill) => {
    error
      ? res.status(400).json({error})
      : res.status(201).json({bill});
  });
});

router.get('/list', (req, res) => {
  list(res.locals.user._id, {}, (error, bills) => {
    error
      ? res.status(400).json({error})
      : res.status(201).json({bills});
  });
});

router.get('/view/:billID',
  watchErrors(billID("billID"), "params"),
  (req, res) => {
    view(res.locals.user._id, req.params.billID, (error, bill) => {
      error
        ? res.status(400).json({error})
        : res.status(201).json({bill});
    });
  }
);

module.exports = router;
