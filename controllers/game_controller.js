const Game = require('../models/Game');

module.exports = {
    async index(req, res, next) {
        const games = res.locals.games;
        res.status(200).json(games);
    },

    async store(req, res, next) {
        try {
            const { name, twitchId, boxArtUrl } = await Game.create(
                res.locals.games[0]
            );
            res.status(201).json({ name, twitchId, boxArtUrl });
        } catch (e) {
            console.error(e);
            next(e);
        }
    },

    async show(req, res, next) {
        try {
            const { name, twitchId, boxArtUrl } = await Game.findOne({
                twitchId: req.params.twitchId,
            });
            res.status(200).json({ name, twitchId, boxArtUrl });
        } catch (e) {
            console.error(e);
            next(e);
        }
    },

    async destroy(req, res, next) {
        try {
            const result = await Game.deleteOne({
                twitchId: req.params.twitchId,
            });
            res.status(204).json(result);
        } catch (e) {
            console.error(e);
            next(e);
        }
    },
};
