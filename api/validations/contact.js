const { body } = require('express-validator');

module.exports = [
    body('titre').escape(),
    body('nom').escape(),
    body('prenom').escape(),
    body('email').escape(),
    body('telephone').escape(),
    body('linkedin').escape(),
    body('id_adherent').escape(),
]
