const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/reponse')
const verifyRepondant = require('./verifyRepondant')

// GET ALL
router.get('/', verify, Controller.getReponses)

// GET ONE
router.get('/:id', verify, Controller.getReponse)

// ADD ONE
router.post('/', verifyRepondant, Controller.addReponse)

// UPDATE ONE
router.patch('/:id', verify, Controller.editReponse)

// DELETE ONE
router.delete('/:id', verify, Controller.deleteReponse)

//  Delete MULTIPLE
router.delete('/all/:form', verify, Controller.deleteReponses)

module.exports = router;