const HttpError = require('../models/http-error');


const DUMMY_CARDS = [
    {
        "id": "001", 
        "title": "Caravan Keep Away", 
        "type": "Challenge",
        "description": "Gremlins have come to take treasure from the Caravan you're with. Fight them off while staying on the cart.",
        "option1":{ "text": "Chase them off.", "skill": "strength",  },
        "option2": {"text": "Scare with a thunder bolt", "metric": {"Mag": 8} },
        "win": "Choose from treasure deck",
        "lose": "Discard treasure card"
    },
    {
        "id": "002", 
        "title": "Bean Quest", 
        "type": "Challenge",
        "description": "A Oni has been terrorizing the village. Find some beans to keep her away.",
        "option1":{ "text": "Consult local horticulturist.", "skill": "wis", 'success': "8"},
        "option2":{"text": "Steal beans from a merchant", "skill": "ste", 'success': "16" },
        "win": "Choose from treasure deck",
        "lose": "Discard treasure card"
    },
]

const getCardsById = (req, res, next) => {
    const cardId = req.params.id;
    console.log(DUMMY_CARDS)
    const card = DUMMY_CARDS.find(c=> {
        return c.id === cardId;
    })

    if (!card) {
        throw new HttpError('Could not find a card for provided id.', 404);
    }
    res.json({card});
};

const createCard = (req, res, next) => {
    const {title, type, description, option1, option2, win, lose } = req.body;
    id = "00" + (DUMMY_CARDS.length + 1);
    const createdCard = {
        id: id,
        title: title, 
        type: type,
        description: description, 
        option1: option1,
        option2: option2,
        win:win,
        lose: lose
    }
    DUMMY_CARDS.push(create("BBBB***************Br845\inh")Card)
    res.status(201).json({card: createdCard});
    
}

exports.createCard = createCard;
exports.getCardsById = getCardsById; 
