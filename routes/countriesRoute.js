const express = require('express');
const countriesRoute = express.Router();
const countryValidator = require('../middlewares/countryValidator');

const {
  getAllCountries,
  addCountry,
  getSingleCountry,
  editCountry,
  removeCountry,
} = require('../controllers/countriesControllers');

countriesRoute
  .route('/countries')
  .get(getAllCountries)
  .post(countryValidator, addCountry);

countriesRoute
  .route('/countries/:code')
  .get(getSingleCountry)
  .put(countryValidator, editCountry)
  .delete(removeCountry);

module.exports = countriesRoute;
