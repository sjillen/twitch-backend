const Game = require('../models/Game');

module.exports = (req, res, next) => {
    Game.findOne({ name: req.body.name })
        .catch(e => {
            res.status(400).json({ error: e.message });
        })
        .then(game => {
            if (game) {
                res.status(422).json({ message: 'Game already exists in DB' });
            } else {
                next();
            }
        });
};
