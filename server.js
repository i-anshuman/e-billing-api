'use strict';

const express  = require('express');
const morgan   = require('morgan');
const helmet   = require('helmet');
const cookie   = require('cookie-parser');
const mongoose = require('mongoose');
const app = express();
if (process.env.NODE_ENV === "dev") {
  require('dotenv').config()
}
const { notFound, ensureAuthenticated } = require('./middlewares');
const account = require('./routes/account');
const billing = require('./routes/bills');
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookie(process.env.COOKIE_SECRET));
mongoose.connect(process.env.DATABASE, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}, error => { if (error) console.error(error); });

const db = mongoose.connection;
db.on('open', () => {
  app.use('/account', account);
  app.use('/bills', ensureAuthenticated, billing);
  app.get('/', (req, res) => {
    res.json({ api: "e-billing API" });
  });
  app.use('*', notFound);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`e-Billing is running on http://localhost:${port}`);
});
