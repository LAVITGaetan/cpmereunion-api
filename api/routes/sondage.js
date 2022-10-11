const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const verifyRole = require('./verifyRole')
const Controller = require('../controllers/sondage')
const ValidateSchema = require('./validate');
const sondageSchema = require('../validations/sondage');

// Retrieve all sondages
router.get('/', verify, Controller.getSondages)

// Retrieve one sondage
router.get('/:id', verify, Controller.getSondage)

// Retrieve questions from one sondage
router.get('/:id/questions', verify, Controller.getQuestions)

// Retrieve reponses from one sondage
router.get('/:id/reponses', verify, Controller.getReponses)

// Add sondage
router.post('/', verify, sondageSchema, ValidateSchema, Controller.addSondage)

// Update sondage
router.patch('/:id', sondageSchema, ValidateSchema, verify, Controller.editSondage)

//  Delete sondage
router.delete('/:id', verify, verifyRole, Controller.deleteSondage)

module.exports = router;