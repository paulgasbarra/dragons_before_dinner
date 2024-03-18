const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HttpError = require("./models/http-error");
const mongoKey = require("./mongoKey");

const heroesRoutes = require("./routes/heroes-routes");
const usersRoutes = require("./routes/users-routes");
const cardsRoutes = require("./routes/cards-routes");

const databaseUrl = mongoKey;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// enable CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow any domain to send requests
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // allow these headers
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE"); // allow these methods
  next();
});

// set routes for heroes
app.use("/api/heroes", heroesRoutes);

// set routes for users
app.use("/api/users", usersRoutes);

// set routes for cards
app.use("/api/cards", cardsRoutes);

// set routes for errors
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(databaseUrl)
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("Connection failed!", err);
  });

module.exports = app;
