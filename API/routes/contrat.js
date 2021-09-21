const router = require("express").Router();
const Contrat = require("../models/Contrat");
const Voiture = require("../models/Voiture");
const Client = require("../models/Client");

// add contrat
router.post("/add", async (req, res) => {
  const newContrat = new Contrat(req.body);
  try {
    const client = await Client.findById(req.body.clients[0]);
    const voiture = await Voiture.findById(req.body.voiture);
    if (req.body.clients[1]) {
      const client2 = await Client.findById(req.body.clients[1]);
      newContrat.nomClient = client.fullName + " avec " + client2.fullName;
    } else {
      newContrat.nomClient = client.fullName;
    }
    newContrat.nomVoiture = voiture.nom;

    const savedContrat = await newContrat.save();
    res.status(200).json(savedContrat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete contrat

router.delete("/:id", async (req, res) => {
  const contrat = await Contrat.findById(req.params.id);
  try {
    await contrat.deleteOne();
    res.status(200).json("Contrat has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get result
router.get("/result", async (req, res) => {
  try {
    Contrat.countDocuments().then((count_documents) => {
      res.status(200).json(count_documents);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});
// get all contrats

router.get("/", async (req, res) => {
  try {
    const contrats = await Contrat.find();
    res.status(200).json(contrats);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get data of contrat

router.get("/data", async (req, res) => {
  try {
    const contrats = await Contrat.find();
    var jsons = new Array();
    contrats.forEach(async (contrat, idx) => {
      const client = await Client.findById(contrat.clients[0]);
      const voiture = await Voiture.findById(contrat.voiture);
      if (contrat.clients[1]) {
        const client2 = await Client.findById(contrat.clients[1]);
        var result = {
          data: `${voiture.nom} Par ${client.fullName} et ${client2.fullName}`,
          id: contrat._id,
        };
        jsons.push(result);
        if (idx === contrats.length - 1) {
          setTimeout(() => {
            res.status(200).json(jsons);
          }, 500);
        }
      } else {
        var result = {
          data: `${voiture.nom} Par ${client.fullName}`,
          id: contrat._id,
        };
        jsons.push(result);
        if (idx === contrats.length - 1) {
          setTimeout(() => {
            res.status(200).json(jsons);
          }, 500);
        }
      }
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// mark as payed

router.put("/payed/:id", async (req, res) => {
  const contrat = await Contrat.findById(req.params.id);

  try {
    await contrat.updateOne({
      $set: req.body,
    });
    res.status(200).json("Contrat has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// get contrat
router.get("/:id", async (req, res) => {
  try {
    const contrat = await Contrat.findById(req.params.id);
    res.status(200).json(contrat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
