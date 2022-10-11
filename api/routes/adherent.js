const express = require('express')
const router = express.Router();
const Controller = require('../controllers/adherent');
const verifyRole = require('./verifyRole');
const verify = require('./verifyToken')

// Get all adhérents
router.get('/', verify, Controller.getAdherents)

// Get one adhérent
router.get('/:id', verify, Controller.getAdherent)

// Add adhérent
router.post('/', verify, Controller.addAdherent)

// Update adhérent
router.patch('/:id', verify, Controller.editAdherent)

// Delete adhérent
router.delete('/:id', verify, verifyRole, Controller.deleteAdherent)

// PATCH status
router.patch('/status/:id/:boolean', verify, Controller.editStatus)

// PATCH parution
router.patch('/parution/:id/:boolean', verify, Controller.editParution)

module.exports = router;