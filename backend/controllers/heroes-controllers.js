const HttpError = require('../models/http-error.js');
const Hero = require('../models/hero.js');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');

const createHero = async (req, res, next) => {
    // this is missing all the validation and you may want to break out the attributes into their own schema
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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
        image_url: req.body.image_url,
        card_type: req.body.card_type,
        name: req.body.name,
        type: req.body.type,
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
        id: uuidv4(),
        selected: req.body.selected || false,
        treasures: req.body.treasures || []
    });

    let user;
    try {
        user = await User.findById(req.body.creator);
    } catch (err) {
        const error = new HttpError('Creating hero failed, please try again.', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided id.', 404);
        return next(error);
    }
 
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdHero.save({session: session});
        user.cards.push(createdHero);
        await user.save({session: session});
        await session.commitTransaction();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Creating hero failed, please try again. Session', 500);
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
    let heroes;
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let err = new HttpError('Invalid inputs passed, please check your data.', 422);
        try {
            throw err;
        }
        catch (err) {
            next(err);
        }
        return;
    }
    
    const heroId = req.params.hid;
    const { name, archetype, attributes, description } = req.body;
    let hero;
    try { 
        hero = await Hero.findById(heroId);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not update hero.', 500);
        return next(error);
    }
    
    hero.name = name || hero.name;

    
    try {
        await hero.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Something went wrong, could not update hero.', 500);
        return next(error);
    }

    res.status(200).json({hero: hero.toObject({getters: true})});
}

const deleteHero = async (req, res, next) => {
   let hero
   try {
    hero = await Hero.findById(req.params.hid).populate('creator');
    } catch (err) {
        const error = new HttpError('Something went wrong, could not delete hero.', 500);
        return next(error);
    }

    if (!hero) {
        const error = new HttpError('Could not find hero for this id.', 404);
        return next(error);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await hero.deleteOne({session: session});
        hero.creator.heroes.pull(hero);
        await hero.creator.save({session: session})
        await session.commitTransaction();
    } catch (err) {
        console.log(err)
        const error = new HttpError('Something went wrong, could not delete hero.', 500);
        return next(error);
    }
    res.status(200).json({message: 'Deleted hero.'});   
}

exports.getHeroes = getHeroes;
exports.getHeroById = getHeroById;
exports.getHeroesByUserId = getHeroesByUserId;
exports.updateHero = updateHero;
exports.deleteHero = deleteHero;
exports.createHero = createHero;
