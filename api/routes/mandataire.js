const express = require('express');
const router = express.Router();
const verify = require('./verifyToken');
const Controller = require('../controllers/mandataire');
const ValidateSchema = require('./validate');
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
    ValidateSchema,
    Controller.addMandataire)

// Update mandataire
router.patch('/:id', 
    verify,
    mandataireSchema,
    ValidateSchema,
    Controller.editMandataire)

//  Delete mandataire
router.delete('/:id', verify, verifyRole, Controller.deleteMandataire)

// Delete representation and mandats related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;