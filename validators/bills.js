'use strict';

const Joi = require('joi');

const purchase = Joi.object({
  item: Joi.string().regex(/^[A-Za-z]([ ]?[A-Za-z0-9.,-]+)+$/).required(),
  price: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
  discount: Joi.string()
});

const billSchema = Joi.object({
  name: Joi.string().regex(/^[A-Za-z]([ ]?[A-Za-z]+)+$/).required(),
  address: Joi.string().regex(/^[a-zA-Z0-9\s.,'-]*$/),
  contact: Joi.string().regex(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6-9]\d{9}$/),
  purchase: Joi.array().items(purchase).min(1).required()
});

const billID = (...IDs) => {
  const schema = {};
  IDs.forEach(ID => {
    schema[ID] = Joi.string().hex().length(24).required();
  });
  return Joi.object(schema);
};

const filterBillsSchema = Joi.object({
  _id: Joi.string().hex().length(24),
  name: Joi.string().regex(/^[A-Za-z]([ ]?[A-Za-z]+)+$/),
  date: Joi.alternatives(
    Joi.date(),
    Joi.object().keys({
      lt: Joi.date(),
      gt: Joi.date()
    }).unknown(false)
  )
});

module.exports = { billSchema, billID, filterBillsSchema };
