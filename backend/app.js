const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');
const mongoKey = require('./mongoKey');

const heroesRoutes = require('./routes/heroes-routes');
const usersRoutes = require('./routes/users-routes');

const databaseUrl = mongoKey;

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// set routes for heroes
app.use("/api/heroes", heroesRoutes);

// set routes for users
app.use("/api/users", usersRoutes);


// set routes for errors
app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect(
   databaseUrl
).then(() => {
    console.log('Connected to database!');
    app.listen(3000);
}).catch((err) => {
    console.log('Connection failed!', err);
});
