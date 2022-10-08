const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/sondage')

// Retrieve all sondages
router.get('/', verify, Controller.getSondages)

// Retrieve one sondage
router.get('/:id', verify, Controller.getSondage)

// Retrieve questions from one sondage
router.get('/:id/questions', verify, Controller.getQuestions)

// Retrieve reponses from one sondage
router.get('/:id/reponses', verify, Controller.getReponses)

// Add sondage
router.post('/', verify, Controller.addSondage)

// Update sondage
router.patch('/:id', verify, Controller.editSondage)

//  Delete sondage
router.delete('/:id', verify, Controller.deleteSondage)

module.exports = router;