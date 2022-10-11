const { body } = require('express-validator');

module.exports = [
    body('titre').escape().isLength({min:3}),
    body('id_mandataire').escape(),
    body('id_mandat').escape(),
]
