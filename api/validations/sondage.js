const { body } = require('express-validator');

module.exports = [
    body('nom').escape(),
    body('titre').escape(),
    body('parution').escape(),
]
