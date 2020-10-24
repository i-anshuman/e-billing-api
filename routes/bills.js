'use strict';

const router = require('express').Router();
const { watchErrors } = require('../middlewares');
const { create, list, view } = require('../controllers/bills');
const { billSchema, billID, filterBillsSchema } = require('../validators/bills');

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

router.get('/find', watchErrors(filterBillsSchema, "body"), (req, res) => {
  const filters = { ...req.body };
  const { date } = filters;
  if (date) {
    const d = {};
    switch (typeof(date)) {
      case "object":
        for (const key in date) {
          d[`$${key}`] = date[key];
        }
        break;
      case "string":
        const gt = new Date(date);
        d[`$gt`] = gt;
        d[`$lt`] = new Date(date).setDate(gt.getDate()+1);
        break;
    }
    filters.date = d;
  }
  list(res.locals.user._id,
    filters,
    (error, bills) => {
      error
        ? res.status(400).json({error})
        : res.status(201).json({bills});
    }
  );
});

module.exports = router;
