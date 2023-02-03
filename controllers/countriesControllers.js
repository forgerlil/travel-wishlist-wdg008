const data = require('../data.js');
const { validationResult } = require('express-validator');

const getAllCountries = (req, res) => {
  const { sort } = req.query;
  if (sort)
    return res.json([...data].sort((a, b) => (a.name > b.name ? 1 : -1)));

  return res.render('index', { data });
};

/* -------------------------------------------------- */

const addCountry = (req, res) => {
  try {
    const { id, name, alpha2Code, alpha3Code, visited } = req.body;

    for (let country of data) {
      if (
        country.alpha2Code === alpha2Code ||
        country.alpha3Code === alpha3Code
      )
        throw new Error('Country already exists.');
    }

    data.push({
      id,
      name,
      alpha2Code: alpha2Code.toUpperCase(),
      alpha3Code: alpha3Code.toUpperCase(),
      visited,
    });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* -------------------------------------------------- */

const getSingleCountry = (req, res) => {
  try {
    const { code } = req.params;

    const findCountry = data.find(
      (country) =>
        country.alpha2Code === code.toUpperCase() ||
        country.alpha3Code === code.toUpperCase()
    );

    if (!findCountry) throw new Error('Country not found.');

    return res.json(findCountry);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* -------------------------------------------------- */

const editCountry = (req, res) => {
  try {
    const { name, alpha2Code, alpha3Code, visited } = req.body;
    const { code } = req.params;

    let countryIndex;
    const findCountry = data.find((country, index) => {
      countryIndex = index;
      return (
        country.alpha2Code === code.toUpperCase() ||
        country.alpha3Code === code.toUpperCase()
      );
    });

    if (!findCountry) throw new Error('Country not found.');

    data[countryIndex] = {
      id: findCountry.id,
      name,
      alpha2Code: alpha2Code.toUpperCase(),
      alpha3Code: alpha3Code.toUpperCase(),
      visited,
    };

    return res.json(data[countryIndex]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

/* -------------------------------------------------- */

const removeCountry = (req, res) => {
  try {
    const { code } = req.params;

    let countryIndex;
    const findCountry = data.find((country, index) => {
      countryIndex = index;
      return (
        country.alpha2Code === code.toUpperCase() ||
        country.alpha3Code === code.toUpperCase()
      );
    });

    if (!findCountry) throw new Error('Country not found.');

    // data.splice(countryIndex, 1);
    // return res.json(data);

    if (findCountry.visited) throw new Error('Country already visited.');

    data[countryIndex] = {
      ...findCountry,
      visited: true,
    };

    return res.json(data[countryIndex]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCountries,
  addCountry,
  getSingleCountry,
  editCountry,
  removeCountry,
};
