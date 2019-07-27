const GameController = require('../controllers/game_controller');
const requireUniqueGame = require('../middlewares/requireUniqueGame');
const fetchTwitchGame = require('../middlewares/fetchTwitchGame');

module.exports = app => {
    app.get('/games', GameController.index);

    app.post(
        '/games',
        requireUniqueGame,
        fetchTwitchGame,
        GameController.store
    );
    app.get('/games/:twitchId', GameController.show);
    app.delete('/games/:twitchId', GameController.destroy);
};
