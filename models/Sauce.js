const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({


    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    heat: { type: String, required: true },
    imageUrl: { type: String, required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },

    /* ,

        file: {
            fieldname: { type: String, required: true },
            originalname: { type: String, required: true },
            encoding: { type: String, required: true },
            mimetype: { type: String, required: true },
            destination: { type: String, required: true },
            filename: { type: String, required: true },
            path: { type: String, required: true },
            size: { type: Number, required: true }

        } */

});

module.exports = mongoose.model('Sauce', sauceSchema);