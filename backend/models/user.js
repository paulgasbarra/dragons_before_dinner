const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {type: String, required: true},
    email: {type: String, required: true},
    password: { type: String, required: true},
    //eventually replace with a superclass of card
    cards: [{type: mongoose.Types.ObjectId, required: true, ref: "Card"}],
    decks: [{type: mongoose.Types.ObjectId, required: true, ref: "Deck"}], 
});

module.exports = mongoose.model('User', userSchema);