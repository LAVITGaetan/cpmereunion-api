const Representation = require('../models/representation');

exports.getRepresentations = async (req, res) => {
    try {
        const representations = await Representation.find();
        res.send(representations)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getRepresentation = async (req, res) => {
    try {
        const representation = await Representation.findById(req.params.id)
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.addRepresentation = async (req, res) => {
    const representation = new Representation({
        titre: req.body.titre,
        id_mandat: req.body.id_mandat,
        id_mandataire: req.body.id_mandataire,
    });
    try {
        await representation.save();
        res.send(representation)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editRepresentation = async (req, res) => {
    try {
        const representation = await Representation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ representation })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.deleteRepresentation = async (req, res) => {
    try {
        await Representation.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Representation supprimé' })
    } catch (error) {
        res.send({ message: error.message })
    }
}

exports.deleteRepresentationsFromMandat = async (req, res) => {
    try {
        await Representation.deleteMany({id_mandat: req.params.id})
        res.status(200).send({ message: 'Representations supprimées' })
    } catch (error) {
        res.send({ message: error.message })
        console.log(error.message);
    }
}

exports.deleteRepresentationsFromMandataire = async (req, res) => {
    try {
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.status(200).send({ message: 'Representations supprimées' })
    } catch (error) {
        res.send({ message: error.message })
        console.log(error.message);
    }
}