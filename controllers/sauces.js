const Sauce = require('../models/Sauce.js');
const fs = require('fs');



exports.createSauce = (req, res, next) => {

    const sauceObject = JSON.parse(req.body.sauce);
    //const sauceImage = req.file;
    const likes = 0;
    const dislikes = 0;
    const usersLiked = [];
    const usersDisliked = [];

    const sauce = new Sauce({

        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes,
        dislikes,
        usersLiked,
        usersDisliked

    });
    console.log(sauce)
    sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error, message: 'probleme enregistrement' }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
        _id: req.params.id
    }).then(
        (Sauce) => {
            res.status(200).json(Sauce);
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.Sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body }
    Sauce.updateOne({ _id: req.params.id }, {...sauceObject, _id: req.params.id }).then(
        () => {
            res.status(201).json({
                message: 'Sauce updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(Sauce => {
            const filename = Sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};


exports.getAllSauces = (req, res, next) => {

    Sauce.find().then(
        (Sauces) => {
            console.log(Sauces)
            res.status(200).json(Sauces);

        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};