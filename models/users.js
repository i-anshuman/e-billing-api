'use strict';

const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const users = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profile: {
    type: String,
    default: "https://userphotourl.com"
  },
  joinedOn: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', users);
