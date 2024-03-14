const express = require('express');
const router = express.Router();
const UserModel = require('../moduls/UserModel');

// Route pour récupérer tous les utilisateurs
router.get('/all', async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour récupérer les noms des utilisateurs
router.get('/:nom', async (req, res) => {
    try {
        const users = await UserModel.find({}, 'nom_complet');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour ajouter un utilisateur
router.post('/', async (req, res) => {
    const user = new UserModel({
        email: req.body.email,
        nom_complet: req.body.nom_complet,
        username: req.body.username,
        mdp: req.body.mdp
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour modifier les informations d'un utilisateur en se basant sur son nom
router.put('/:nom', async (req, res) => {
    try {
        const user = await UserModel.find({ nom_complet: req.params.nom });

        if (user) {
            if (req.body.email) user.email = req.body.email;
            if (req.body.username) user.username = req.body.username;
            if (req.body.mdp) user.mdp = req.body.mdp;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour supprimer un utilisateur
router.delete('/:nom', async (req, res) => {
    try {
        const deletedUser = await UserModel.deleteOne({ nom_complet: req.params.name });
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
