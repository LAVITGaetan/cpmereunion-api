const express = require('express')
const router = express.Router();
const Controller = require('../controllers/user');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken')
const ValidateSchema = require('./validate');
const userSchema = require('../validations/user');

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
})

// Get all users
router.get('/', verify, Controller.getUsers)

// Get one user
router.get('/:id', verify, Controller.getUser)

// Add user
router.post('/', verify, userSchema, ValidateSchema, async (req, res) => {

    // Check if email is already existing
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) {
        res.send('Un compte avec cette adresse e-mail éxiste déjà')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.identifiant, salt)

    // Define and send User
    let user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        identifiant: hashPassword,
        role: req.body.role,
    });
    try {
        await user.save();
        res.send({ user: user._id })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// Login
router.post('/login', limiter, async (req, res) => {
    try {
        // Check if email exist
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.send({ message: 'Identifiant ou mot de passe incorrect' })
        }
        // Check if passwords match
        const validPassword = await bcrypt.compare(req.body.identifiant, user.identifiant)
        if (!validPassword) return res.send({ message: 'Identifiant ou mot de passe incorrect' })

        // Set token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_TOKEN, { expiresIn: "24h" });
        res.cookie("token", token, {
            secure: true,
            httpOnly: true,
            maxAge: 86400 * 1000
        })
        return res.header('auth-token', token).send({ token: token });
    } catch (err) {
        res.send({ message: 'Une erreur est survenue' })
    }
})

// Update user
router.patch('/:id', verify, userSchema, ValidateSchema, Controller.editUser)

// Delete user
router.delete('/:id', verify, Controller.deleteUser)

module.exports = router;