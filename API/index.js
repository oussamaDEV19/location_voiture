const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const clientRoute = require("./routes/clients");
const voitureRoute = require("./routes/voitures");
const agenceRoute = require("./routes/agence");
const prolongationRoute = require("./routes/prolongation");
const contratRoute = require("./routes/contrat");
const path = require("path");
const multer = require("multer");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/api/clients" ,clientRoute);
app.use("/api/voitures" ,voitureRoute);
app.use("/api/agences" ,agenceRoute);
app.use("/api/prolongations" ,prolongationRoute);
app.use("/api/contrats" ,contratRoute);



app.listen(8800, () => {
  console.log("backend server is runing!!");
});


