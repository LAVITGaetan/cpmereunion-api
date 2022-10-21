const Log = require('../models/logs')

exports.getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.send(logs)
    } catch (error) {
        res.status(500).send({ message: error.message })
        console.log(error.message);
    }
}