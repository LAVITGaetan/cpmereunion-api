const express = require('express')
const router = express.Router();
const verify = require('./verifyToken');
const Controller = require('../controllers/mandataire')
const Validate = require('./validate');
const verifyRole = require('./verifyRole')
const mandataireSchema = require('../validations/mandataire')

// MULTER Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `logo_${req.body.nom}_${req.body.prenom}_${file.originalname}`)
    }
})
const fileFilter = function (req, file, cb) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

// Retrieve all mandataires
router.get('/', verify, Controller.getMandataires)

// Retrieve one mandataire
router.get('/:id', verify, Controller.getMandataire)

// Add mandataire
router.post('/',
    verify,
    verifyRole,
    upload.single('mandataireLogo'),
    mandataireSchema,
    Validate,
    Controller.addMandataire)

// Update mandataire
router.patch('/:id', verify, upload.single('mandataireLogo'),
    mandataireSchema,
    Validate,
    Controller.editMandataire)

//  Delete mandataire
router.delete('/:id', verify, Controller.deleteMandataire)

// Delete representation and mandats related
router.delete('/:id/representations', Controller.deleteRepresentation)

module.exports = router;