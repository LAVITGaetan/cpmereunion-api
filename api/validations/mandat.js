const { body } = require('express-validator');

module.exports = [
    body('label').escape(),
    body('nom').escape(),
    body('categorie').escape(),
    body('mission').escape(),
    body('composition').escape(),
    body('renouvellement').escape(),
    body('duree').escape(),
]
