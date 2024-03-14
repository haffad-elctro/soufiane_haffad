const express = require('express');
const router = express.Router();
const LivreModel = require('../moduls/LivresModel');
const AuteurModel = require('../moduls/AuteurModel');
const EditeurModel = require('../moduls/EditeursModel');

// Route pour récupérer tous les livres
router.get('/all', async (req, res) => {
    try {
        const livres = await LivreModel.find();
        res.json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer toutes les informations sur les auteurs d'un livre
router.get('/auteurs/:livrename', async (req, res) => {
    try {
        const livre = await LivreModel.findOne({ nom: req.params.livrename });
        if (livre) {
            const auteurs = await AuteurModel.find({ _id: { $in: livre.auteurs } });
            res.json(auteurs);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer toutes les informations sur les éditeurs d'un livre
router.get('/editeurs/:livrename', async (req, res) => {
    try {
        const livre = await LivreModel.findOne({ nom: req.params.livrename });
        if (livre) {
            const editeurs = await EditeurModel.find({ _id: { $in: livre.editeurs } });
            res.json(editeurs);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer la liste de tous les livres d'une catégorie
router.get('/listCategorie/:category', async (req, res) => {
    try {
        const livres = await LivreModel.find({ categorie: req.params.category });
        res.json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer les livres publiés entre deux années
router.get('/:annee1/:annee2', async (req, res) => {
    try {
        const livres = await LivreModel.find({
            annee_publication: { $gte: req.params.annee1, $lte: req.params.annee2 }
        });
        res.json(livres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un livre
router.post('/', async (req, res) => {
    const livre = new LivreModel({
        nom: req.body.nom,
        auteurs: req.body.auteurs,
        editeurs: req.body.editeurs,
        categorie: req.body.categorie,
        annee_publication: req.body.annee_publication
    });

    try {
        const newLivre = await livre.save();
        res.status(201).json(newLivre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour modifier les informations d'un livre en se basant sur son nom
router.put('/:name', async (req, res) => {
    try {
        const livre = await LivreModel.findOne({ nom: req.params.name });

        if (livre) {
            livre.nom = req.body.nom;
            livre.auteurs = req.body.auteurs;
            livre.editeurs = req.body.editeurs;
            livre.categorie = req.body.categorie;
            livre.annee_publication = req.body.annee_publication;

            const updatedLivre = await livre.save();
            res.json(updatedLivre);
        } else {
            res.status(404).json({ message: "Livre non trouvé" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un livre
router.delete('/:name', async (req, res) => {
    try {
        const deletedLivre = await LivreModel.deleteOne({ nom: req.params.name });
        res.json(deletedLivre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
