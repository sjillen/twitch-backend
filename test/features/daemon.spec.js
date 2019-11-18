const mongoose = require('mongoose');
const Daemon = require('../../app/daemon');
const Snapshot = require('../../models/Snapshot');
const SnapshotDto = require('../../dto/SnapshotDto');
const keys = require('../../config/keys');

describe('Test the Daemon', () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    });

    afterEach(async () => {
        await Snapshot.deleteMany({});
    });

    test('it should delete half of the snapshots', async () => {
        const limit = 100;
        await seedSnapshots(limit);
        const daemon = new Daemon();

        await daemon.deleteOldSnapshots(limit);

        const count = await Snapshot.count();
        expect(count).toBe(limit / 2);
    });

    test('it should delete the oldest entries', async () => {
        const limit = 10;
        await seedSnapshots(limit);
        const daemon = new Daemon();
        const first = await Snapshot.find({});

        await daemon.deleteOldSnapshots(limit);

        const oldest_left = await Snapshot.find({});
        expect(oldest_left[0]).toEqual(first[first.length / 2]);
    });
});

const seedSnapshots = async limit => {
    let i = 0;
    const snapshots = [];
    while (i < limit) {
        s = new SnapshotDto(i, 1, 1);
        snapshots.push(s);
        i++;
    }
    await Snapshot.insertMany(snapshots);
};
