const Game = require("../models/Game");

module.exports = {
    async index(req, res, next) {
        try {
            const results = await Game.find({}).lean();
            const games = results.map(({ name, twitch_id, box_art_url }) => {
                return { name, twitch_id, box_art_url };
            });
            res.status(200).json(games);
        } catch (e) {
            next(e);
        }
    },

    async store(req, res, next) {
        try {
            const { name, twitch_id, box_art_url } = await Game.create(
                req.body
            );
            res.status(201).json({ name, twitch_id, box_art_url });
        } catch (e) {
            next(e);
        }
    },

    async show(req, res, next) {
        try {
            const { name, twitch_id, box_art_url } = await Game.findOne({
                twitch_id: req.params.twitch_id,
            });
            res.status(200).json({ name, twitch_id, box_art_url });
        } catch (e) {
            next(e);
        }
    },

    async destroy(req, res, next) {
        try {
            const result = await Game.deleteOne({
                twitch_id: req.params.twitch_id,
            });
            res.status(204).json(result);
        } catch (e) {
            next(e);
        }
    },
};
