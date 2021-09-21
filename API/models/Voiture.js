const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema({
    matricule: {
        type: String,
        unique: true,
    },
    nom: {
        type: "string",
        max: 50,
    },
    model: {
        type: "string",
        max: 50,
    },
    color: {
        type: "string",
        max: 50,
    },
    boiteVitess: {
        type: "string",
        max: 50,
    },
    image: {
        type: "string",
        default: "",
    },
} , { timestamps: true })

module.exports = mongoose.model("Voiture", VoitureSchema);