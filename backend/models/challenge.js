const mongoose = require('mongoose');
const Card = require('./card');

const challengeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    shortName: {type: String, required: true},
    status: {type: String, required: true},
    description: {type: String, required: true},
    options: [{type: Object, required: true}],
}, {collection: 'challenges'});

const Challenge = Card.discriminator('Challenge', challengeSchema);

module.exports = Challenge;

/*

    {
             "name":"Goblin Encampment",
             "shortName":"goblinEncampment",
             "status": "unselected",
             "description":"Maniacal laughter and the faint odor of dung reveal a gaggle of goblins nearby.",
              "image": goblin_encampment,
              "options": [
                {"description": "Raid the camp", "shortName": "raid", "attribute": "strength", "threshold": 10, "reward": {"name": "Lion Skin Trousers", "attribute":"strength", "value": 3}, "penalty": {"name": "Lose Health", "value": 20}},
                {"description": "Sneak past the camp", "shortName": "sneak", "attribute": "stealth", "threshold": 10, "reward": "poo", "penalty": {"name": "Lose Health", "value": 20}},
              ] 
          },
*/

/*Challenge schema
type Challenge {
  name: string
  shortName: string
  status: string
  description: string
  image: string
  options: Option[]
}
*/
