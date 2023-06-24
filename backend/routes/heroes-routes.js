const express  = require('express');
const { check } = require('express-validator');

const heroesControllers = require('../controllers/heroes-controllers');

const router = express.Router();

router.get('/', heroesControllers.getHeroes);

router.get('/:hid', heroesControllers.getHeroById);

router.get('/user/:uid', heroesControllers.getHeroesByUserId);

router.post('/', [check('name').notEmpty(), check('description').notEmpty()], heroesControllers.createHero);

router.patch('/:hid', heroesControllers.updateHero);

router.delete('/:hid', heroesControllers.deleteHero);

module.exports = router;