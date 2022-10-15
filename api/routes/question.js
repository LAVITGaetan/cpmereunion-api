const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/question')

// Retrieve all questions
router.get('/', verify, Controller.getQuestions)

// Retrieve all reponse from one question
router.get('/:id/reponses', verify, Controller.getReponses)

// Retrieve one question
router.get('/:id', verify, Controller.getQuestion)

// Add question
router.post('/', verify, Controller.addQuestion)

// Update question
router.patch('/:id', verify, Controller.editQuestion)

//  Delete question
router.delete('/:id', verify, Controller.deleteQuestion)

//  Delete questions
router.delete('/all/:form', verify, Controller.deleteQuestions)

module.exports = router;