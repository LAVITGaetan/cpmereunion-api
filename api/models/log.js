const mongoose = require('mongoose');

// Logs Schema
const LogSchema = new mongoose.Schema({
    auteur: {
        type: String,
    },
    method: {
        type: String,
    },
    ressource: {
        type: String,
    },
    date: {
        type: String,
    },
    heure: {
        type: String,
    },
    minute: {
        type: String,
    },
    id_ressource: {
        type: String,
    }
});

module.exports = new mongoose.model('Logs', LogSchema);