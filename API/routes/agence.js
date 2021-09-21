const router = require("express").Router();
const Agence = require("../models/Agence");

// add agence
router.post("/add", async (req, res) => {
  const newAgence = new Agence(req.body);
  try {
    const savedAgence = await newAgence.save();
    res.status(200).json(savedAgence);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update Agence
router.put("/:id", async (req, res) => {
    const agence = await Agence.findById(req.params.id);

    try {
    await agence.updateOne({
        $set: req.body,
    });
    res.status(200).json("Agence has been updated");
    } catch (err) {
    return res.status(500).json(err);
    }

  });


  // get result
router.get("/result", async (req, res) => {
  try {

    Agence.countDocuments().then((count_documents) => {
      res.status(200).json(count_documents);
    })
    
  } catch (err) {
    return res.status(500).json(err);
  }
});

  
// get agence
router.get("/:id", async (req, res) => {
  try {
    const agence = await Agence.findById(req.params.id);
    res.status(200).json(agence);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// login 

router.post("/login", async (req, res) => {
  try {
    const agence = await Agence.findOne({ email: req.body.email });
    !agence && res.status(404).json("Agence not found");

    const validPassword = req.body.password === agence.password;

    !validPassword && res.status(400).json("wrong password");

    res.status(200).json(agence);
  } catch (error) {
    res.status(500).json(error);
  }
})



module.exports = router;
