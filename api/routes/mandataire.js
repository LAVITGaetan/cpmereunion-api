const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Controller = require('../controllers/mandataire');
const Validate = require('./validate');
const verifyRole = require('./verifyRole');
const mandataireSchema = require('../validations/mandataire');

// Retrieve all mandataires
router.get('/', verify, Controller.getMandataires)

// Retrieve one mandataire
router.get('/:id', verify, Controller.getMandataire)

// Add mandataire
router.post('/',
    verify,
    verifyRole,
    mandataireSchema,
    Validate,
    Controller.addMandataire)

// Update mandataire
router.patch('/:id', 
    verify,
    mandataireSchema,
    Validate,
    Controller.editMandataire)

//  Delete mandataire
router.delete('/:id', verify, Controller.deleteMandataire)

// Delete representation and mandats related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;