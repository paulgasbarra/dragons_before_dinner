
const Card = require('./card');

const bossSchema = new mongoose.Schema({
    bossPower: Number,
    bossWeakness: String
    // Any boss-specific fields can go here
}, options);

const Boss = Card.discriminator('Boss', bossSchema);