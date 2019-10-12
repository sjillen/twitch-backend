const mongoose = require('mongoose');
const keys = require('../config/keys');
const Snapshot = require('../models/Snapshot');
const TwitchClient = require('../services/twitch_client');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

class Daemon {
    constructor(io) {
        this.interval = null;
        this.io = io;
    }

    run() {
        this.interval = setInterval(() => {
            this.storeSnapshots();
        }, 4000);
    }

    async storeSnapshots() {
        const snapshots = await TwitchClient.getSnapshots();
        if (!snapshots || !snapshots.length) {
            console.warn('No Snapshot fetched!');
        }
        try {
            await this.deleteOldSnapshots();
            await Snapshot.insertMany(snapshots);
        } catch (e) {
            console.error(e);
            return;
        }
        this.io.emit('snapshots', snapshots);
    }

    async deleteOldSnapshots(limit = 15 * 60 * 48) {
        const total = await Snapshot.estimatedDocumentCount();
        if (total >= limit) {
            const oldSnaphots = await Snapshot.find({})
                .limit(limit / 2)
                .sort('timestamp')
                .select('_id');
            await Snapshot.deleteMany({ _id: { $in: oldSnaphots } });
        }
    }
}

module.exports = Daemon;
