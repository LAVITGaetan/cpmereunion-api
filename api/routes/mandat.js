const express = require('express')
const router = express.Router();
const Controller = require('../controllers/mandat')
const verify = require('./verifyToken')
const ValidateSchema = require('./validate');
const mandatSchema = require('../validations/mandat');


// Retrieve all mandats
router.get('/', verify, Controller.getMandats)

// Retrieve one mandat
router.get('/:id', verify, Controller.getMandat)

// Add mandat
router.post('/', verify, mandatSchema, ValidateSchema, Controller.addMandat)

// Update mandat
router.patch('/:id', verify, mandatSchema, ValidateSchema, Controller.editMandat)

//  Delete mandat
router.delete('/:id', verify, Controller.deleteMandat)

// Delete mandat and representations related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;