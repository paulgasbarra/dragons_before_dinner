const HttpError = require('../models/http-error.js');
const Card = require('../models/card.js');
const mongoose = require('mongoose');

const getCards = async (req, res, next) => {    
    let cards;
    try {
        cards = await Card.find({});
    } 
    catch (err) {
        const error = new HttpError('Fetching cards failed, please try again later.', 500);
        return next(error);
    }
    res.json({cards: cards.map(card => card.toObject({getters: true}))});
}

exports.getCards = getCards;

