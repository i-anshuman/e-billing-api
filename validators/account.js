'use strict';

const Joi = require('joi');

const signinSchema = Joi.object({
     email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signupSchema = signinSchema.keys({
  fullname: Joi.string().regex(/^[A-Za-z]([ ]?[A-Za-z]+)+$/).required(),
   profile: Joi.string().uri()
});

module.exports = { signinSchema, signupSchema };
