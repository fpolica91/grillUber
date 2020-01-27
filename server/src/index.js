const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth");

app.use(express());
app.use(cors());
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/nodeJWTServer", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// app.use(authMiddleware(router));

app.use(router);

app.listen(3333);
