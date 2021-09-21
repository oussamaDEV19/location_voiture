const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    fullName: {
        type: "string"
    },
    id: {
        type: "string",
        max: 50,
        unique: true,
    },
    lieuNaissance: {
        type: "string",
        max: 50,
    },
    dateNaissance: {
        type: "string",
        max: 50,
    },
    idCard: {
        type: "string",
        max: 50,
    },
    valable: {
        type: "string",
        max: 50,
    },
    passport: {
        type: "string",
        max: 50,
    },
    passportLe: {
        type: "string",
        max: 50,
    },
    passportA: {
        type: "string",
        max: 50,
    },
    permit: {
        type: "string",
        max: 50,
        unique: true,
    },
    permitLe: {
        type: "string",
        max: 50,
    },
    permitA: {
        type: "string",
        max: 50,
    },
    tel: {
        type: "string",
        max: 50,
        unique: true,
    },
    email: {
        type: "string",
        max: 50,
        unique: true,
    },
    profilePicture: {
        type: "string",
        default: "",
      },
    note: {
        type: "string",
        default: "",
    }
})

module.exports = mongoose.model("Client", ClientSchema);