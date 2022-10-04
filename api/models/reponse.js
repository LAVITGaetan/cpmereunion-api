const mongoose = require('mongoose');

// Reponse Schema
const ReponseSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },  
    question_id: {
        type: String,
        required: true
    },
    form_id: {
        type: String,
        required: true,
    },
    auteur: {
        type: String,
    }
});

module.exports = new mongoose.model('Reponse', ReponseSchema);