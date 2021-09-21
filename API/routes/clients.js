const router = require("express").Router();
const Client = require("../models/Client");

// add client
router.post("/add", async (req, res) => {
  const newClient = new Client(req.body);
  try {
    const savedClient = await newClient.save();
    res.status(200).json(savedClient);
  } catch (err) {
    res.status(500).json(err);
  }
});
// delete client
router.delete("/:id", async (req, res) => {
    const client = await Client.findById(req.params.id);
    try {
        await client.deleteOne();
        res.status(200).json("Client has been deleted");
    } catch (err) {
        return res.status(500).json(err);
    }
  });


    // get result
router.get("/result", async (req, res) => {
  try {

    Client.countDocuments().then((count_documents) => {
      res.status(200).json(count_documents);
    })
    
  } catch (err) {
    return res.status(500).json(err);
  }
});


// get all clients

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// mauvaise client

router.put("/mauvaise/:id", async (req, res) => {
  const client = await Client.findById(req.params.id);

  try {
  await client.updateOne({
      $set: req.body,
  });
  res.status(200).json("Client has been updated");
  } catch (err) {
  return res.status(500).json(err);
  }
});

// get client
router.get("/:id", async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    res.status(200).json(client);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
