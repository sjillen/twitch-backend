const request = require('supertest');
const app = require('../../app/server');
const Snapshot = require('../../models/Snapshot');
const keys = require('../../config/keys');
const mongoose = require('mongoose');

describe('Test the API routes for the Snapshot Resource', () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    });

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

    test('it should get the full list of snapshots', async () => {
        const { statusCode, body } = await request(app).get('/snapshots');
        expect(statusCode).toBe(200);
        expect(body).toHaveLength(2);
        expect(body[0].gameId).toBe(snapshot1.gameId);
        expect(body[1].gameId).toBe(snapshot2.gameId);
    });
});
