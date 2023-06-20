const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    id: {type: String, required: true},
    creator: {type: String, required: true},
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
}, {collection: 'heroes'});

module.exports = mongoose.model('Hero', heroSchema);

/*
type Hero {
    name: string
    archetype: string
    image: string
    attributes: {
      stealth: number
      wisdom: number
      intelligence: number
      magic: number
      strength: number
      charm: number
      stamina: number
      luck: number
      hitPoints: number
    }
    description: string
    selected: boolean
    treasures: [
        Treasure[]
    ]
  }
  */