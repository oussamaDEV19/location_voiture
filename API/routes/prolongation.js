const router = require("express").Router();
const Prolongation = require("../models/Prolongation");
const Client = require("../models/Client");
const Voiture = require("../models/Voiture");
const Contrat = require("../models/Contrat");

// add prolongation
router.post("/add", async (req, res) => {
  const newProlongation = new Prolongation(req.body);
  try {

    const contrat = await Contrat.findById(req.body.contratId);
    const client = await Client.findById(contrat.clients[0]);
    const voiture = await Voiture.findById(contrat.voiture);
    const result = voiture.nom + " Par " + client.fullName ;
    
    newProlongation.data = result;

    const savedProlongation = await newProlongation.save();
    res.status(200).json(savedProlongation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete prolongation
router.delete("/:id", async (req, res) => {
    const prolongation = await Prolongation.findById(req.params.id);
    try {
        await prolongation.deleteOne();
        res.status(200).json("Prolongation has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
  });

    // get result
router.get("/result", async (req, res) => {
  try {

    Prolongation.countDocuments().then((count_documents) => {
      res.status(200).json(count_documents);
    })
    
  } catch (err) {
    return res.status(500).json(err);
  }
});

    // get all prolongations

router.get("/", async (req, res) => {
  try {
    const prolongations = await Prolongation.find();
    res.status(200).json(prolongations);
  } catch (err) {
    return res.status(500).json(err);
  }
});



module.exports = router;
