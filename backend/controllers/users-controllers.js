const HttpError = require('../models/http-error.js');
const User = require('../models/user.js');
const { v4: uuidv4 } = require('uuid');

let MOCK_USERS = [
    
]
let mockUser = new User({
    id: uuidv4(),
    name: 'Paul',
    email: 'paul@email.com',
    password: 'test',
})

MOCK_USERS.push(mockUser);

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    const hasUser = MOCK_USERS.find(u => {return u.email === email});
    if (hasUser) {
        let err = new HttpError('Could not create user, email already exists.', 422);
        try {
            throw err;
        }
        catch (err) {
            next(err);
        }
        return;
    }

    const createdUser = new User({
        id: uuidv4(),
        name,
        email,
        password,
    });
    try {
        MOCK_USERS.push(createdUser);
    } catch (err) {
        throw new HttpError('Creating user failed, please try again.', 500);
    }
    res.status(201).json({user: createdUser});
}

const getUsers = async (req, res, next) => {
    res.json({users: MOCK_USERS});
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = MOCK_USERS.find(u => {return u.email === email});
    if (!user || user.password !== password) {
        let err = new HttpError('Could not find a user for the provided email or the password is wrong.', 404);
        try {
            throw err;
        }
        catch (err) {
            next(err);
        }
        return;
    }
    res.json({message: 'Logged in!'});
};

exports.signup = signup;
exports.login = login;
exports.getUsers = getUsers;