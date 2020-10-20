'use strict';

const { verify } = require('../controllers/jwt');

const notFound = (req, res) => {
  res.status(404).json({ error: "404 Not Found!!" });
};

const watchErrors = (schema, request) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };
  return async (req, res, next) => {
    try {
      await schema.validateAsync(req[request], validationOptions);
      next();
    }
    catch (error) {
      const customErrors = {};
      error.details.map(({ message, context }) => {
        customErrors[context.key] = message;
      });
      return res.status(422).json({ errors: customErrors });
    }
  };
};

const ensureAuthenticated = (req, res, next) => {
  req.signedCookies.token
    ? verify(req.signedCookies.token)
        .then(data => {
          res.locals.user = data;
          next();
        })
        .catch(error => res.status(401).json({ error: "Unauthenticated", desc: error }))
    : res.status(401).json({ error: "Unauthenticated" });
};

module.exports = { notFound, watchErrors, ensureAuthenticated };
