const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');

const heroesRoutes = require('./routes/heroes-routes');

const databaseUrl = 'mongodb+srv://paulgasbarra:databasesarehard@cluster0.ecrx2eu.mongodb.net/cards?retryWrites=true&w=majority'



// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// set routes for heroes
app.use("/api/heroes", heroesRoutes);


// set routes for errors
app.use((req, res, next) => {
    const errror = new HttpError('Could not find this route.', 404);
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
}).catch(() => {
    console.log('Connection failed!');
});

// add server to listen on port 3000
app.listen(3000);