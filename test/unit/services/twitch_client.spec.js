const TwitchClient = require('../../../services/twitch_client');
const Snapshot = require('../../../models/Snapshot');
const keys = require('../../../config/keys');
const mongoose = require('mongoose');

describe('Test the Twitch Client', () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    });

    const streamList = [
        { game_id: 999, viewer_count: 50 },
        { game_id: 998, viewer_count: 100 },
        { game_id: 997, viewer_count: 10 },
        { game_id: 997, viewer_count: 10 },
        { game_id: 999, viewer_count: 20 },
    ];

    let snapshot1, snapshot2;
    beforeEach(async () => {
        snapshot1 = await Snapshot.create({
            gameId: 999,
            timestamp: Date.now(),
            viewers: 50,
        });
        snapshot2 = await Snapshot.create({
            gameId: 998,
            timestamp: Date.now(),
            viewers: 10000,
        });
    });

    afterEach(async () => {
        await Snapshot.deleteMany({});
    });

    test('it should return a list of with one element per gameId', () => {
        const snapshots = TwitchClient.buildSnapshots(streamList, [
            999,
            998,
            997,
        ]);

        expect(snapshots).toHaveLength(3);
    });

    test('it should sum the total amount of viewers for a gameId', () => {
        const snapshots = TwitchClient.buildSnapshots(streamList, [997]);
        expect(snapshots[0].viewers).toBe(20);
    });

    test('it should sum the viewers for each gameId', () => {
        const [snap1, snap2, snap3] = TwitchClient.buildSnapshots(streamList, [
            997,
            998,
            999,
        ]);
        expect(snap1.gameId).toBe(997);
        expect(snap1.viewers).toBe(20);
        expect(snap2.gameId).toBe(998);
        expect(snap2.viewers).toBe(100);
        expect(snap3.gameId).toBe(999);
        expect(snap3.viewers).toBe(70);
    });

    test('it should return an empty array if no gameId is specified', () => {
        const snapshots = TwitchClient.buildSnapshots(streamList, []);
        expect(snapshots).toHaveLength(0);
    });

    test('it should return the list of snapshots with no viewers if there is no streamList', () => {
        const snapshots = TwitchClient.buildSnapshots([], [997, 998, 999]);
        expect(snapshots[0].viewers).toEqual(0);
        expect(snapshots[1].viewers).toEqual(0);
        expect(snapshots[2].viewers).toEqual(0);
    });
});
