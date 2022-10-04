const Reponse = require('../models/reponse')

exports.getReponses = async (req, res) => {
    try {
        const reponses = await Reponse.find();
        res.send(reponses)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getReponse = async (req, res) => {
    try {
        const reponse = await Reponse.findById(req.params.id)
        res.status(200).send(reponse)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addReponse = async (req, res) => {
    const reponse = new Reponse(req.body);
    try {
        await reponse.save();
        res.send(reponse)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editReponse = async (req, res) => {
    try {
        const reponse = await Reponse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ reponse })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteReponse = async (req, res) => {
    try {
        await Reponse.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Reponse supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}