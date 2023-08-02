const mongoose = require('mongoose');
const Card = require('./card');

const heroSchema = new mongoose.Schema({
    id: {type: String, required: true},
    creator: {type: mongoose.Types.ObjectId, required: true, ref: "User"},
    name: {type: String, required: true},
    archetype: {type: String, required: true},
    attributes: {
        stealth: {type: Number, required: true},
        wisdom: {type: Number, required: true},
        intelligence: {type: Number, required: true},
        magic: {type: Number, required: true},
        strength: {type: Number, required: true},
        charm: {type: Number, required: true},
        stamina: {type: Number, required: true},
        luck: {type: Number, required: true},
        hitPoints: {type: Number, required: true},
    },
    description: {type: String, required: true},
    selected: {type: Boolean, required: true},
    treasures: [{type: Object, required: true}],
});


const Hero = Card.discriminator('Hero', heroSchema);

module.exports = Hero;