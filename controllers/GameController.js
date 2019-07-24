const Game = require('../models/Game');

class GameController {

    static async index() {
        const games = await Game.find({});
        return games;
    }
}

module.exports = GameController;