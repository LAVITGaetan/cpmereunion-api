const Log = require('../models/log')

exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find().sort({ createdAt: -1 });
        res.send(logs)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}


exports.addLog = async (req, res) => {
    const log = new Log({
        auteur: req.body.auteur,
        method: req.body.method,
        ressource: req.body.ressource,
        date: req.body.date,
        heure: req.body.heure,
        minute: req.body.minute,
        id_ressource: req.body.id_ressource
    });
    try {
        await log.save();
        res.send(log)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}