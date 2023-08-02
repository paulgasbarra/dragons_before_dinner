// Deck Model
const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
    }],
}, {collection: 'decks'});

const Deck = mongoose.model('Deck', deckSchema);