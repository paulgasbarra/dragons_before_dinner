const mongoose = require('mongoose');

// Base Card Schema
const options = { discriminatorKey: 'kind', collection: 'cards' };

const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    card_type: {
        type: String,
        enum: ['hero', 'challenge', 'boss', 'treasure'],
        required: true
    },
}, options);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

// Challenge Model
const challengeSchema = new mongoose.Schema({
    challengeLevel: Number,
    challengeReward: String
    // Any challenge-specific fields can go here
}, options);

const Challenge = Card.discriminator('Challenge', challengeSchema);

// Boss Model
const bossSchema = new mongoose.Schema({
    bossPower: Number,
    bossWeakness: String
    // Any boss-specific fields can go here
}, options);

const Boss = Card.discriminator('Boss', bossSchema);

// Treasure Model
const treasureSchema = new mongoose.Schema({
    treasureValue: Number,
    treasureType: String
    // Any treasure-specific fields can go here
}, options);

const Treasure = Card.discriminator('Treasure', treasureSchema);

// Deck Model stays the same as before
