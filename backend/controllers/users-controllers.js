const HttpError = require('../models/http-error.js');
const User = require('../models/user.js');
const { v4: uuidv4 } = require('uuid');

let MOCK_USERS = [
    {
        "id": "1",
        "name": "Paul"
    }
]

const signup = async (req, res, next) => {
    const { name, email } = req.body;
    const createdUser = new User({
        id: uuidv4(),
        name,
        email,
        password: 'test',
    });
    try {
        MOCK_USERS.push(createdUser);
    } catch (err) {
        const error = new HttpError('Creating user failed, please try again.', 500);
        return next(error);
    }
    res.status(201).json({user: createdUser});
}

const getUsers = async (req, res, next) => {
    res.json({users: MOCK_USERS});
};

const login = async (req, res, next) => {
    const { id, name } = req.body;
    const user = MOCK_USERS.find(u => {return u.id === id});
    if (!user) {
        throw new HttpError('Could not find a user for the provided id.', 404);
    }
    res.json({user});
};

exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;