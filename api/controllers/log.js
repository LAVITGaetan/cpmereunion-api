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