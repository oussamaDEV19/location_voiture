const mongoose = require("mongoose");

const ContratSchema = new mongoose.Schema(
  {
    clients: {
      type: Array,
      default: [],
    },
    voiture: {
      type: String,
      max: 50,
    },
    carburantDepart: {
      type: "string",
      max: 50,
    },
    kmDepart: {
      type: "string",
      max: 50,
    },
    NbreJour: {
      type: "string",
      max: 50,
    },
    PU: {
      type: "string",
      max: 50,
    },
    prixLocation: {
      type: "string",
      max: 50,
    },
    assurance: {
      type: "string",
      max: 50,
    },
    frais: {
      type: "string",
      max: 50,
    },
    montantHT: {
      type: "string",
      max: 50,
    },
    montantTTC: {
      type: "string",
      max: 50,
    },
    carburant: {
      type: "string",
      max: 50,
    },
    depot: {
      type: "string",
      max: 50,
    },
    solde: {
      type: "string",
      max: 50,
    },
    statut: {
      type: "string",
      max: 50,
    },
    nomVoiture: {
      type: "string",
      max: 50,
    },
    nomClient: {
      type: "string",
      max: 50,
    },
    jourDepart: {
        type: "string",
        max: 50,
    },
    agenceDepart: {
        type: "string",
        max: 50,
    },
    agenceReteur: {
        type: "string",
        max: 50,
    },
    reteurPrevu : {
        type: "string",
        max: 50,
    },
    mode : {
        type: "string",
        max: 50,
    },
    franchise : {
        type: "string",
        max: 50,
    },
    caution : {
        type: "string",
        max: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contrat", ContratSchema);
