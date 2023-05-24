const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./mongoose');


const app = express();

app.use(bodyParser.json());

//app.post('/cards', mongoPractice.createCard);
app.post('/heroes', mongoose.createHero);


//app.get('/cards', mongoPractice.getCard);
app.get('/heroes', mongoose.getHeroes);

app.listen(3000);

// Learn how to create and read heroes from the database using Mongoose.