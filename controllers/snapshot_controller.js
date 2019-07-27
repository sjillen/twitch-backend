const Snapshot = require('../models/Snapshot');
const TwitchClient = require('../services/twitch_client');

module.exports = {
    async index(req, res, next) {
        try {
            const snapshots = await Snapshot.find({});
            res.status(200).json(snapshots);
        } catch (e) {
            console.error(e);
            next(e);
        }
    },

    async show(req, res, next) {
        const snapshots = await Snapshot.find({
            gameId: req.params.gameId,
        });
        if (!snapshots || !snapshots.length) {
            res.status(404).json('No snapshot found');
        }
        res.status(200).json(snapshots);
    },

    async store(req, res, next) {
        const snapshots = await TwitchClient.getSnapshots();
        if (!snapshots || !snapshots.length) {
            throw new Error('No Snapshot fetched!');
        }

        try {
            await Snapshot.insertMany(snapshots);
        } catch (e) {
            if (res) {
                res.status(400).json({ error: e.message });
                return;
            } else {
                throw e;
            }
        }

        if (res) {
            res.status(201).json(snapshots);
        } else {
            return snapshots;
        }
    },
};
