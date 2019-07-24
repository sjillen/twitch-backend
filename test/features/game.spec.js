const request = require("supertest");
const app = require("../../app");
const Game = require("../../models/Game");
const keys = require("../../config/keys");
const mongoose = require("mongoose");

describe("Test the API routes for the Game Resource", () => {
    beforeAll(async () => {
        mongoose.Promise = global.Promise;
        await mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
    });

    let game1, game2;

    beforeEach(async () => {
        game1 = await Game.create({ name: "MyFirstGame", twitch_id: 900 });
        game2 = await Game.create({ name: "MySecondGame", twitch_id: 901 });
    });

    afterEach(async () => {
        await Game.deleteMany({});
    });

    test("it should get a list of games", async () => {
        const { statusCode, body } = await request(app).get("/games");

        expect(statusCode).toBe(200);
        expect(body.length).toBe(2);
        expect(body[0].name).toBe(game1.name);
        expect(body[1].name).toBe(game2.name);
    });

    test("it should create a game", async () => {
        const createdGame = {
            id: 999,
            name: "indieGame",
        };

        const { statusCode, body } = await request(app)
            .post("/games")
            .send(createdGame);

        expect(statusCode).toBe(201);
        expect(body.name).toBe(createdGame.name);
    });

    test("it should delete a game", async () => {
        const game = await Game.create({
            twitch_id: 999,
            name: "gameToDelete",
        });

        const { statusCode } = await request(app).delete(
            "/games/" + game.twitch_id
        );

        expect(statusCode).toBe(204);

        const deleteGame = await Game.findOne({ twitch_id: game.twitch_id });
        expect(deleteGame).toBeNull();
    });
});
