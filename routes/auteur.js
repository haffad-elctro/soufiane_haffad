const express = require('express');
const router = express.Router();
const AuteurModel = require('../moduls/AuteurModel');
const EditeurModel = require('../moduls/EditeursModel');

// Route pour récupérer tous les auteurs
router.get('/all', async (req, res) => {
    try {
        const auteurs = await AuteurModel.find();
        res.json(auteurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/:nom', async (req, res) => {
    try {
        const auteurs = await AuteurModel.find({}, 'nom');
        res.json(auteurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer le nombre d'éditeurs par auteur
router.get('/editeurs', async (req, res) => {
    try {
        const editeursCountByAuteur = await EditeurModel.aggregate([
            {
                $group: {
                    _id: "$auteur",
                    totalEditeurs: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "auteurs",
                    localField: "_id",
                    foreignField: "_id",
                    as: "auteur_info"
                }
            },
            {
                $project: {
                    _id: 0,
                    auteur: "$auteur_info.nom",
                    totalEditeurs: 1
                }
            }
        ]);
        res.json(editeursCountByAuteur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const auteur = new AuteurModel({
        nom: req.body.nom
    });

    try {
        const newAuteur = await auteur.save();
        res.status(201).json(newAuteur);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour modifier les informations d'un auteur en se basant sur son nom
router.put('/:nom', async (req, res) => {
    try {
        const auteur = await AuteurModel.findOne({ nom: req.params.name });

        if (auteur) {
            if (req.body.nom) auteur.nom = req.body.nom;

            const updatedAuteur = await auteur.save();
            res.json(updatedAuteur);
        } else {
            res.status(404).json({ message: "Auteur non trouvé" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/:nom', async (req, res) => {
    try {
        const deletedAuteur = await AuteurModel.delete({ nom: req.params.nom });
        res.json(deletedAuteur);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
