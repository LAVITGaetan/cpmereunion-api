const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/contact')
const ValidateSchema = require('./validate');
const contactSchema = require('../validations/contact');

// GET ALL
router.get('/', verify, Controller.getContacts)

// GET ONE
router.get('/:id', verify, Controller.getContact)

// GET related contact from adhérent
router.get('/adherent/:id', verify, Controller.getContactFromAdherent)

// ADD ONE
router.post('/', verify, contactSchema, ValidateSchema, Controller.addContact)

// UPDATE ONE
router.patch('/:id', contactSchema, ValidateSchema, verify, Controller.editContact)

// DELETE ONE
router.delete('/:id', verify, Controller.deleteContact)

module.exports = router;