const request = require('supertest');
const app = require('../../app');
const Game = require('../../models/Game');
const keys = require('../../config/keys');
const mongoose = require('mongoose');

describe('Test the API routes for the Game Resource', () => {

    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
    });

    let game1, game2;

    beforeEach(async () => {
        game1 = await Game.create({name: 'MyFirstGame'});
        game2 = await Game.create({name: 'MySecondGame'});        
    });

    afterEach(async () => {
        await Game.deleteMany({});
    });

    test('it should get a list of games', async () => {
         const response = await request(app).get('/games');
         expect(response.statusCode).toBe(200);
    });
});