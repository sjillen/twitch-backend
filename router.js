const GameController = require('./controllers/GameController');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).json({Hi: "There"});
    });

    app.get('/games', async (req, res) => {
        const games = await GameController.index();
        if (!games.length) {
            res.status(404).json({message: "no game registered yet"});
        }

        res.status(200).json(games);
    });
};