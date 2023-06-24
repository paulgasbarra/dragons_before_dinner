const HttpError = require('../models/http-error.js');
const Hero = require('../models/hero.js');
const { validationResult } = require('express-validator');

const createHero = async (req, res, next) => {
    // this is missing all the validation and you may want to break out the attributes into their own schema
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
 
    try {
        await createdHero.save();
    } catch (err) {
        const error = new HttpError('Creating hero failed, please try again.', 500);
        return next(error);
    }

    res.status(201).json({hero: createdHero});
}

const getHeroes = async (req, res, next) => {
    let heroes;
    try {
        heroes = await Hero.find({});
    } 
    catch (err) {
        const error = new HttpError('Fetching heroes failed, please try again later.', 500);
        return next(error);
    }
    res.json({heroes: heroes.map(hero => hero.toObject({getters: true}))});
}

const getHeroById = async (req, res, next) => {
    const heroId = req.params.hid;
    let hero;
    try {
        hero = await Hero.findById(heroId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find hero.', 500);
        return next(error);
    }
    if (!hero) {
        const error = new HttpError('Could not find a hero for the provided id.', 404);
        return next(error);
    }
    res.json( { hero: hero.toObject({getters: true}) });
};

const getHeroesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    let hero
    try {
        heroes = await Hero.find({creator: userId});
        console.log(heroes);
    }
    catch (err) {
        const error = new HttpError('Fetching heroes failed, please try again later.', 500);
        return next(error);
    }
    if (!heroes || heroes.length === 0) {
       return next(new HttpError('Could not find a hero for the provided user id.', 404));
    }
    res.json({heroes: heroes.map(hero => hero.toObject({getters: true}))});
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
    return next();
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
