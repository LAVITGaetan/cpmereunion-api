const Adherent = require('../models/adherent');
const Contact = require('../models/contact');
const Log = require('../models/log');
const jwt = require('jsonwebtoken');

exports.getAdherents = async (req, res) => {
    try {
        const adherents = await Adherent.find().sort({ createdAt: -1 });
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
        const log = new Log({
            auteur: req.user.nom + ' ' + req.user.prenom,
            method: 'POST',
            ressource: 'Adherents',
            date: new Date(),
            heure: new Date().getHours(),
            minute: new Date().getMinutes(),
            id_ressource: adherent._id
        })
        await log.save()
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
        res.status(404).send({ message: error.message })
    }
}

exports.deleteAdherent = async (req, res) => {
    try {
        await Adherent.findByIdAndRemove(req.params.id)
        await Contact.deleteMany({ id_adherent: req.params.id })
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

exports.login = async (req, res) => {
    try {
        // Check if email exist
        const adherent = await Adherent.findOne({ email: req.body.email })
        if (!adherent) {
            return res.send({ message: 'Identifiant ou mot de passe incorrect' })
        }
        if (adherent.status) {
            if (req.body.identifiant === adherent.identifiant) {
                const token = jwt.sign({ role: 'repondant' }, process.env.SECRET_TOKEN, { expiresIn: "1h" });
                res.cookie("token", token, {
                    secure: true,
                    httpOnly: true,
                    maxAge: 3600 * 1000
                })
                return res.send({ token: token })
            }
            return res.send({ message: 'Identifiant ou mot de pass incorrect' })
        }
        return res.send({ message: 'Adhérent inactif' })
    } catch (err) {
        console.log(err);
        res.send({ message: 'Une erreur est survenue' })
    }
}