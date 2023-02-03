const { body, validationResult } = require('express-validator');

const checkErrors = (req, res, next) => {
  req.body.visited === 'true'
    ? (req.body.visited = true)
    : (req.body.visited = false);
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(500).json({ error: errors.array() });
};

const countryValidator = [
  body('id').isNumeric().withMessage('Id must be a number.'),
  body('name').isAlpha().withMessage('Name must contain only letters.'),
  body('alpha2Code')
    .isAlpha()
    .withMessage('Name must contain only letters.')
    .isLength({ min: 2, max: 2 })
    .withMessage('Alpha 2 code must be 2 characters long.'),
  body('alpha3Code')
    .isAlpha()
    .withMessage('Name must contain only letters.')
    .isLength({ min: 3, max: 3 })
    .withMessage('Alpha 3 code must be 3 characters long.'),
  body('visited')
    .isAlpha()
    .withMessage('Visited must contain only letters.')
    .isIn(['true', 'false'])
    .withMessage('Invalid option for visiting sent.'),
  checkErrors,
];

module.exports = countryValidator;
