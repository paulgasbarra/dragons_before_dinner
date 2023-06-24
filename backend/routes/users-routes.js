const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controllers');

router.get('/', usersControllers.getUsers);

router.post('/signup', [
    check('user_name').notEmpty(), 
    check('email').notEmpty(), 
    check('password').notEmpty() 
], usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;