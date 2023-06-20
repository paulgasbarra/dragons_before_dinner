const express  = require('express');
const router = express.Router();
const heroesControllers = require('../controllers/heroes-controllers');

router.get('/', heroesControllers.getHeroes);

router.get('/:hid', heroesControllers.getHeroById);

router.get('/user/:uid', heroesControllers.getHeroesByUserId);

router.post('/', heroesControllers.createHero);

router.patch('/:hid', heroesControllers.updateHero);

router.delete('/:hid', heroesControllers.deleteHero);

module.exports = router;