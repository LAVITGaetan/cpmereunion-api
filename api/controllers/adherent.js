const Adherent = require('../models/adherent')
const Contact = require('../models/contact')

exports.getAdherents = async (req, res) => {
    try {
        const adherents = await Adherent.find();
        res.status(200).send(adherents)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.getAdherent = async (req, res) => {
    try {
        const adherent = await Adherent.findById(req.params.id)
        res.status(200).send(adherent)
    } catch (error) {
        res.status(404).send({ message: 'Adhérent introuvable' })
    }
}

exports.addAdherent = async (req, res) => {
    const adherent = new Adherent({
        entreprise: req.body.entreprise,
        section: req.body.section,
        adresse: req.body.adresse,
        activite: req.body.activite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        identifiant: req.body.identifiant,
        siteweb: req.body.siteweb,
        logo: req.body.logo,
        parution: req.body.parution,
        status: req.body.status,
    });
    try {
        await adherent.save();
        res.send(adherent)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

exports.editAdherent = async (req, res) => {
    const adherent = {
        entreprise: req.body.entreprise,
        section: req.body.section,
        adresse: req.body.adresse,
        activite: req.body.activite,
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        identifiant: req.body.identifiant,
        siteweb: req.body.siteweb,
        logo: req.body.logo,
        parution: req.body.parution,
        status: req.body.status,
    };
    try {
        const updatedAdherent = await Adherent.findByIdAndUpdate(req.params.id, adherent, { new: true });
        res.send({ updatedAdherent })
    } catch (error) {
        res.status(404).send({ message: 'Adhérent introuvable' })
    }
}

exports.deleteAdherent = async (req, res) => {
    try {
        await Adherent.findByIdAndRemove(req.params.id)
        await Contact.deleteMany({ id_adherent: req.params.id})
        res.status(200).send({ message: 'Adhérent supprimé' })
    } catch (error) {
        res.status(404).send({ message: 'Adhérent introuvable' })
    }
}

exports.editStatus = async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        status: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
}

exports.editParution = async (req, res) => {
    const adherent = await Adherent.findByIdAndUpdate(req.params.id, {
        parution: req.params.boolean
    })
    if (!adherent) res.status(404).send({ message: `Cannot get adherent with id : ${req.params.id}` })
    res.send(adherent);
}