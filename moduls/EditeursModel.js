const mongoose = require('mongoose');
const editeurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String
    },
    livres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Livre' }]
});
const EditeurModel = mongoose.model('Editeur', editeurSchema);

module.exports = EditeurModel;
