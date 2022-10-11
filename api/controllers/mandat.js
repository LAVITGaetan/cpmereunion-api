const Mandat = require('../models/mandat')
const Representation = require('../models/representation');

exports.getMandats = async (req, res) => {
    try {
        const mandats = await Mandat.find();
        res.send(mandats)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getMandat = async (req, res) => {
    try {
        const mandat = await Mandat.findById(req.params.id)
        res.send(mandat)
    } catch (error) {
        res.status(404).send({ message: 'Mandat introuvable' })
    }
}

exports.addMandat = async (req, res) => {
    const mandat = new Mandat({
        label: req.body.label,
        nom: req.body.nom,
        categorie: req.body.categorie,
        mission: req.body.mission,
        composition: req.body.composition,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: req.body.logo
    });
    try {
        await mandat.save();
        res.send(mandat)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editMandat = async (req, res) => {
    const mandat = {
        label: req.body.label,
        nom: req.body.nom,
        categorie: req.body.categorie,
        mission: req.body.mission,
        composition: req.body.composition,
        duree: req.body.duree,
        renouvellement: req.body.renouvellement,
        logo: req.body.logo
    };
    try {
        const updatedMandat = await Mandat.findByIdAndUpdate(req.params.id, mandat, { new: true });
        res.send({ updatedMandat })
    } catch (error) {
        res.status(404).send({ message: 'Mandat introuvable' })
    }
}

exports.deleteMandat = async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        res.status(200).send({ message: 'Mandat supprimé' })
    } catch (error) {
        res.status(404).send({ message: 'Mandat introuvable' })
    }
}
exports.deleteRepresentation = async (req, res) => {
    try {
        await Mandat.findByIdAndRemove(req.params.id)
        await Representation.deleteMany({id_mandat: req.params.id})
        res.send({message: 'Mandat et representations liées au mandat supprimé'})
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}