const express = require('express')
const router = express.Router();
const verify = require('./verifyToken')
const Controller = require('../controllers/log')

// GET ALL
router.get('/', verify, Controller.getLogs)

module.exports = router;