const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true
    },
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auteur' 
    },
    editeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editeur' 
    },
    date_publication: {
        type: Date
    }
});

const LivreModel = mongoose.model('Livre', livreSchema);

module.exports = LivreModel;
