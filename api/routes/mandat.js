const express = require('express')
const router = express.Router();
const Controller = require('../controllers/mandat')
const verify = require('./verifyToken')


// Retrieve all mandats
router.get('/', verify, Controller.getMandats)

// Retrieve one mandat
router.get('/:id', verify, Controller.getMandat)

// Add mandat
router.post('/', verify, Controller.addMandat)


// Update mandat
router.patch('/:id', verify, Controller.editMandat)

//  Delete mandat
router.delete('/:id', verify, Controller.deleteMandat)

// Delete mandat and representations related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;