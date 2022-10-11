const Mandataire = require('../models/mandataire')
const Representation = require('../models/representation');

exports.getMandataires = async (req, res) => {
    try {
        const mandataires = await Mandataire.find();
        res.send(mandataires)
    } catch (error) {
        res.status(500).send({ message: 'Accès refusé' })
    }
}

exports.getMandataire = async (req, res) => {
    try {
        const mandataire = await Mandataire.findById(req.params.id)
        res.send(mandataire)
    } catch (error) {
        res.status(404).send({ message: 'Mandataire introuvable' })
    }
}

exports.addMandataire = async (req, res) => {
    const mandataire = new Mandataire({
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: req.body.logo
    });
    try {
        await mandataire.save();
        res.send(mandataire)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editMandataire = async (req, res) => {
    const mandataire = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        description: req.body.description,
        logo: req.body.logo
    };
    try {
        const updatedMandataire = await Mandataire.findByIdAndUpdate(req.params.id, mandataire, { new: true });
        res.send({ updatedMandataire })
    } catch (error) {
        res.status(404).send({ message: 'Mandataire introuvable' })
    }
}

exports.deleteMandataire = async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.status(200).send({ message: 'Mandataire supprimé' })
    } catch (error) {
        res.status(404).send({ message: 'Mandataire introuvable' })
    }
}

exports.deleteRepresentation = async (req, res) => {
    try {
        await Mandataire.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandataire: req.params.id})
        res.send({message: 'Mandataire et representations liées au mandataire supprimé'})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}