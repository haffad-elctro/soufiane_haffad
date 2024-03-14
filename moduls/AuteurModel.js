const mongoose = require('mongoose');
const auteurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    nationalite: {
        type: String
    },
    livres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livre' }]
});

const AuteurModel = mongoose.model('Auteur', auteurSchema);

module.exports = AuteurModel;
