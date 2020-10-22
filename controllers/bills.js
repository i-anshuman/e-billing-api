'use strict';

const ObjectID = require('mongoose').Types.ObjectId;
const Bills    = require('../models/bills');
const Users    = require('../models/users');

const create = (userID, data, callback) => {
  Users.findOne(
    { _id: new ObjectID(userID) },
    (error, user) => {
      if (error) {
        callback(error);
      }
      if (!user) {
        callback("Invalid user id.");
      }
      else {
        const bill = new Bills({userID, ...data});
        bill.save((error, newBill) => {
          callback(error, newBill);
        });
      }
    }
  );
};

const list = (userID, filter, callback) => {
  Bills.find(
    { userID: new ObjectID(userID), ...filter },
    null, { sort: '-date' },
    (error, bills) => {
      callback(error, bills);
    }
  );
};

const view = (userID, billID, callback) => {
  Bills.findOne(
    {
      _id: new ObjectID(billID),
      userID: new ObjectID(userID)
    }, 
    (error, bill) => {
      callback(error, bill);
    }
  );
};

module.exports = { create, list, view };
