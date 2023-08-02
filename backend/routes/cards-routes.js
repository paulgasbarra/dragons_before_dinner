const express  = require('express');

const cardsControllers = require('../controllers/cards-controllers');

const router = express.Router();

router.get('/', cardsControllers.getCards);

module.exports = router;