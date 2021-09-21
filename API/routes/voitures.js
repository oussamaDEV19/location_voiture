const router = require("express").Router();
const Voiture = require("../models/Voiture");

// add voiture
router.post("/add", async (req, res) => {
  const newVoiture = new Voiture(req.body);
  try {
    const savedVoiture = await newVoiture.save();
    res.status(200).json(savedVoiture);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete voiture
router.delete("/:id", async (req, res) => {
    const voiture = await Voiture.findById(req.params.id);
    try {
        await voiture.deleteOne();
        res.status(200).json("Voiture has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
  });

    // get result
router.get("/result", async (req, res) => {
  try {

    Voiture.countDocuments().then((count_documents) => {
      res.status(200).json(count_documents);
    })
    
  } catch (err) {
    return res.status(500).json(err);
  }
});

      // get all prolongations

router.get("/", async (req, res) => {
  try {
    const voitures = await Voiture.find();
    res.status(200).json(voitures);
  } catch (err) {
    return res.status(500).json(err);
  }
});


// get voiture
router.get("/:id", async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id);
    res.status(200).json(voiture);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// update voiture

module.exports = router;
