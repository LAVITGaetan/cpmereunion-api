const express = require('express')
const router = express.Router();
const Controller = require('../controllers/representation')
const verify = require('./verifyToken')
const ValidateSchema = require('./validate');
const representationSchema = require('../validations/representation');

// Retrieve all representations
router.get('/', verify, Controller.getRepresentations)

// Retrieve one representation
router.get('/:id', verify, Controller.getRepresentation)

// Add representation
router.post('/', verify, representationSchema, ValidateSchema, Controller.addRepresentation)

// Update representation
router.patch('/:id', verify, representationSchema, ValidateSchema, Controller.editRepresentation)

//  Delete representation
router.delete('/:id', verify, Controller.deleteRepresentation)

//  Delete representations from mandat
router.delete('/:id/mandats', verify, Controller.deleteRepresentationsFromMandat)

//  Delete representations from mandataire
router.delete('/:id/mandataires', verify, Controller.deleteRepresentationsFromMandataire)
module.exports = router;