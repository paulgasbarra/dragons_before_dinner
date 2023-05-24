const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
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
}, {collection: 'heroes'});

module.exports = mongoose.model('Hero', heroSchema);