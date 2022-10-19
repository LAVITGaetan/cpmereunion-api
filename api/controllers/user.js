const User = require('../models/user')

// Retrieve all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Retrieve one user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Add user
exports.addUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send(user)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Edit user
exports.editUser = async (req, res) => {
    try {
        let payload = {
            nom: req.body.nom,
            prenom: req.body.prenom,
            email: req.body.email,
            identifiant: req.body.identifiant,
            role: req.body.role,
        }
        const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true });
        res.send({ user })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Adhérent supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}