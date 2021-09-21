const mongoose = require('mongoose');

const AgenceSchema = new mongoose.Schema({
    email: {
        type: "string",
        unique: true,
    },
    password: {
        type: "string",
        max: 50,
    },
    address: {
        type: "string",
        max: 50,
    },
    address2: {
        type: "string",
        max: 50,
    },
    nom: {
        type: "string",
        max: 50,
    },
    sarl: {
        type: "string",
        max: 50,
    },
    rc: {
        type: "string",
        max: 50,
    },
    pat: {
        type: "string",
        max: 50,
    },
    if: {
        type: "string",
        max: 50,
    },
    cnss: {
        type: "string",
        max: 50,
    },
    tel: {
        type: "string",
        max: 50,
    },
    fax: {
        type: "string",
        max: 50,
    },
    gsm: {
        type: "string",
        max: 50,
    },
    logo: {
        type: "string",
        default: "",
      },
    profileImg: {
        type: "string",
        default: "",
      },
})

module.exports = mongoose.model("Agence", AgenceSchema);