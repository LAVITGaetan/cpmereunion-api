const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/reponse')

// GET ALL
router.get('/', verify, Controller.getReponses)

// GET ONE
router.get('/:id', verify, Controller.getReponse)

// ADD ONE
router.post('/', verify, Controller.addReponse)

// UPDATE ONE
router.patch('/:id', verify, Controller.editReponse)

// DELETE ONE
router.delete('/:id', verify, Controller.deleteReponse)
module.exports = router;