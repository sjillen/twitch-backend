const request = require('supertest');
const app = require('../../app/server');
const Game = require('../../models/Game');
const keys = require('../../config/keys');
const mongoose = require('mongoose');

describe('Test the API routes for the Game Resource', () => {
    let game1, game2;

    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });
    });

    beforeEach(async () => {
        game1 = await Game.create({ name: 'MyFirstGame', twitchId: 900 });
        game2 = await Game.create({ name: 'MySecondGame', twitchId: 901 });
    });

    afterEach(async () => {
        await Game.deleteMany({});
    });

    test('it should get a list of games', async () => {
        const { statusCode, body } = await request(app).get('/games');

        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].name).toBe(game1.name);
        expect(body[1].name).toBe(game2.name);
    });

    test('it should not create a game that already exists', async () => {
        const createdGame = {
            name: game1.name,
        };

        const { statusCode } = await request(app)
            .post('/games')
            .send(createdGame);

        expect(statusCode).toBe(422);
    });

    test("it should get a game's details", async () => {
        const { statusCode, body } = await request(app).get(
            '/games/' + game1.twitchId
        );

        expect(statusCode).toBe(200);
        expect(body.name).toBe(game1.name);
    });

    test('it should delete a game', async () => {
        const game = await Game.create({
            twitchId: 999,
            name: 'gameToDelete',
        });

        const { statusCode } = await request(app).delete(
            '/games/' + game.twitchId
        );

        expect(statusCode).toBe(204);

        const deleteGame = await Game.findOne({ twitchId: game.twitchId });
        expect(deleteGame).toBeNull();
    });
});
