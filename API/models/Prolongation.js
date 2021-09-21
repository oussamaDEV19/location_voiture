const mongoose = require('mongoose');

const ProlongationSchema = new mongoose.Schema({
    debut: {
        type: String
    },
    fin: {
        type: String
    },
    avance: {
        type: String
    },
    contratId: {
        type: String
    },
    data: {
        type: String
    }
})

module.exports = mongoose.model("Prolongation", ProlongationSchema);