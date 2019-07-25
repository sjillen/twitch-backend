const Game = require('../models/Game');

module.exports = {
    async index(req, res, next) {
        try {
            const results = await Game.find({}).lean();
            const games = results.map(({ name, twitchId, boxArtUrl }) => {
                return { name, twitchId, boxArtUrl };
            });
            res.status(200).json(games);
        } catch (e) {
            next(e);
        }
    },

    async store(req, res, next) {
        try {
            const { name, twitchId, boxArtUrl } = await Game.create(req.body);
            res.status(201).json({ name, twitchId, boxArtUrl });
        } catch (e) {
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
            next(e);
        }
    },
};
