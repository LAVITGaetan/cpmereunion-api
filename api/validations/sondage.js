const { body } = require('express-validator');

module.exports = [
    body('nom').escape().isLength({min:3}),
    body('titre').escape(),
    body('parution').escape(),
]
