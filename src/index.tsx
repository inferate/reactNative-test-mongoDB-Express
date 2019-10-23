require("./modules/User");
require("./modules/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./auth/authRoutes");
const trackRoutes = require("./auth/trackRoutes");
const requireAuth = require("./auth/requireAuth");

const app = express();
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  "mongodb+srv://admin:admin@testrepo-qmi8q.azure.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
  console.log("There is connection");
});
mongoose.connection.on("error", err => {
  console.log("Error connecting to mongo ", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email is: ${req.user.email}`);
});
app.listen(3000, () => {
  console.log("I am listening");
});
