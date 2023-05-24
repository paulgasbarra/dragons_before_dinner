const mongoose = require('mongoose');

const Hero = require('./models/hero.js');

mongoose.connect(
    'mongodb+srv://paulgasbarra:databasesarehard@cluster0.ecrx2eu.mongodb.net/cards?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});


const createHero = async (req, res, next) => {
    const createdHero = new Hero({
        name: req.body.name,
        archetype: req.body.archetype,
        attributes: {
            stealth: req.body.attributes.stealth,
            wisdom: req.body.attributes.wisdom,
            intelligence: req.body.attributes.intelligence,
            magic: req.body.attributes.magic,
            strength: req.body.attributes.strength,
            charm: req.body.attributes.charm,
            stamina: req.body.attributes.stamina,
            luck: req.body.attributes.luck,
            hitPoints: req.body.attributes.hitPoints,
        },
        description: req.body.description,
    });
    const result = await createdHero.save();

    res.json(result);
}

const getHeroes = async (req, res, next) => {
    const heroes = await Hero.find().exec();
    res.json(heroes);
}

exports.createHero = createHero;
exports.getHeroes = getHeroes;