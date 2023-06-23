const HttpError = require('../models/http-error.js');
const mongoose = require('mongoose');
const Hero = require('../models/hero.js');
const { validationResult } = require('express-validator');

let MOCK_HEROES = [
    {
    "id": "1",
    "creator": "Paul",
    "name": "Monk",
    "archetype": "monk",
    "image": "urlForMonk",
    "attributes": {
        "stealth": 0,
        "wisdom": 10,
        "intelligence": 5,
        "magic": 0,
        "strength": 5,
        "charm": 2,
        "stamina": 5,
        "luck": 10,
        "hitPoints": 16
    },    
    "description": "Experience and divine intervention are the tools of the venerable monk.",
    "selected": false,
    "treasures": []
    },
    {
    "id": "2",
    "creator": "Paul",
    "name": "Rogue",
    "archetype": "rogue",
    "image": 'urlforRogue',
    "attributes": {
        "stealth": 10,
        "wisdom": 0,
        "intelligence": 5,
        "magic": 2,
        "strength": 2,
        "charm": 10,
        "stamina": 0,
        "luck": 5,
        "hitPoints": 12
    },
    "description": "If the rogue can't sneak past, they'll charm their way through.",
    "selected": false,
    "treasures": [],
    },
    {
    "id": "3",
    "creator": "Paul",
    "name": "Warrior",
    "archetype": "warrior",
    "image": "urlforWarrior",
    "attributes": {
        "stealth": 5,
        "wisdom": 5,
        "intelligence": 2,
        "magic": 0,
        "strength": 10,
        "charm": 5,
        "stamina": 10,
        "luck": 2,
        "hitPoints": 20
    },
    "description": "If it needs to be smashed or outlasted, the warrior is up for the job.",
    "selected": false,
    "treasures": [],
    },
    {
    "id": "4",
    "creator": "Pablo",
    "name": "Wizard",
    "archetype": "wizard",
    "image": "urlforWizard",
    "attributes": {
        "stealth": 2,
        "wisdom": 2,
        "intelligence": 10,
        "magic": 10,
        "strength": 0,
        "charm": 3,
        "stamina": 2,
        "luck": 0,
        "hitPoints": 8
    },
    "description": "Great for solving difficult puzzles or bending reality to your will.",
    "selected": false,
    "treasures": []
    }
]

const createHero = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        let err = new HttpError('Invalid inputs passed, please check your data.', 422);
        try {
            throw err;
        }
        catch (err) {
            next(err);
        }
        return;
    }
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
        creator: req.body.creator,
        id: req.body.id,
        selected: req.body.selected || false,
        treasures: req.body.treasures || []
    });
    MOCK_HEROES.push(createdHero);
    // const result = await createdHero.save();

    res.status(201).json({hero: createdHero});
}

const getHeroes = async (req, res, next) => {
    res.json({heroes: MOCK_HEROES});
}

const getHeroById = (req, res, next) => {
    const heroId = req.params.hid;
    const hero = MOCK_HEROES.find(h => {return h.id === heroId});
    if (!hero) {
        throw new HttpError('Could not find a hero for the provided id.', 404);
    }
    res.json({hero});
};

const getHeroesByUserId = (req, res, next) => {
    const userId = req.params.uid;
    const heroes = MOCK_HEROES.filter(h => {return h.creator === userId});
    if (!heroes || heroes.length === 0) {
       return next(new HttpError('Could not find a hero for the provided user id.', 404));
    }
    res.json({heroes});
};

const updateHero = async (req, res, next) => {
    const heroId = req.params.hid;
    try {
        const updatedHero = {...MOCK_HEROES.find((a) => a.id === heroId)};
        const heroIndex = MOCK_HEROES.findIndex((a) => a.id === heroId); 
        const { name, archetype, attributes, description, creator, selected, treasures } = req.body;
        updatedHero.name = name ? name : updatedHero.name;
        updatedHero.archetype = archetype ? archetype : updatedHero.archetype;
        updatedHero.attributes = attributes ? attributes : updatedHero.attributes;
        updatedHero.description = description ? description : updatedHero.description;
        updatedHero.creator = creator ? creator : updatedHero.creator;
        updatedHero.selected = selected ? selected : updatedHero.selected;
        updatedHero.treasures = treasures ? treasures : updatedHero.treasures;
        MOCK_HEROES[heroIndex] = updatedHero;
        
        res.status(200).json({ hero: updatedHero });
    
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update hero.', 500);
        return next(error);
    }
}

const deleteHero = async (req, res, next) => {
    const heroId = req.params.hid;
    if (!MOCK_HEROES.find(h => {return h.id === heroId})) {
        return next(new HttpError('Could not find a hero for the provided id.', 404));
    }
    MOCK_HEROES = MOCK_HEROES.filter(h => {return h.id !== heroId});
    res.status(200).json({message: 'Deleted hero.', MOCK_HEROES});
}


exports.getHeroes = getHeroes;
exports.getHeroById = getHeroById;
exports.getHeroesByUserId = getHeroesByUserId;
exports.updateHero = updateHero;
exports.deleteHero = deleteHero;
exports.createHero = createHero;
