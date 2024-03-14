const express = require('express');
const router = express.Router();
const EditeurModel = require('../moduls/EditeursModel');

router.get('/all', async (req, res) => {
    try {
        const editeurs = await EditeurModel.find();
        res.json(editeurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer les noms des éditeurs
router.get('/names', async (req, res) => {
    try {
        const editeurs = await EditeurModel.find({}, 'nom');
        res.json(editeurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un éditeur
router.post('/', async (req, res) => {
    const editeur = new EditeurModel({
        nom: req.body.nom
    });

    try {
        const newEditeur = await editeur.save();
        res.status(201).json(newEditeur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour modifier les informations d'un éditeur en se basant sur son nom
router.put('/:nom', async (req, res) => {
    try {
        const editeur = await EditeurModel.findOne({ nom: req.params.nom });

        if (editeur) {
            if (req.body.nom) editeur.nom = req.body.nom;

            const updatedEditeur = await editeur.save();
            res.json(updatedEditeur);
        } else {
            res.status(404).json({ message: "Editeur non trouvé" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un éditeur
router.delete('/:nom', async (req, res) => {
    try {
        const deletedEditeur = await EditeurModel.deleteOne({ nom: req.params.nom });
        res.json(deletedEditeur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
