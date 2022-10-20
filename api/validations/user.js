const { body } = require('express-validator');

module.exports = [
    body('nom').escape(),
    body('prenom').escape(),
    body('role').escape(),
    body('email').escape(),
]
