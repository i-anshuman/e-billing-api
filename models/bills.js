'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Purchase = new Schema({
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  discount: String
});

const bills = new Schema({
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: String,
  contact: String,
  date: {
    type: Date,
    default: Date.now
  },
  purchase: [ Purchase ]
});

module.exports = mongoose.model('Bills', bills);
