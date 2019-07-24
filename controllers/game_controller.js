const Game = require("../models/Game");

module.exports = {
    /**
     * @swagger
     *
     * definitions:
     *   NewGame:
     *     type: object
     *     required:
     *       - name
     *       - twitch_id
     *     properties:
     *       name:
     *         type: string
     *       twitch_id:
     *         type: integer
     *       box_art_url:
     *         type: string
     *   Game:
     *     allOf:
     *       - $ref: '#/definitions/NewGame'
     *     required:
     *       - twitch_id
     *     properties:
     *       twitch_id:
     *         type: integer
     *       name:
     *         type: string
     */

    /**
     * @swagger
     * /games:
     *   get:
     *     description: Returns all the games persisted inside the database
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: Fetched the list of Games from the database
     *         schema:
     *           type: array
     *           items:
     *             $ref: '#/definitions/Game'
     */
    async index(req, res, next) {
        try {
            const games = await Game.find({});
            res.status(200).json(games);
        } catch (e) {
            next(e);
        }
    },

    /**
     * @swagger
     *
     * /games:
     *   post:
     *     description: Creates a game
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: game
     *         description: Game object
     *         in:  body
     *         required:
     *           - twitch_id: integer
     *           - name: string
     *         schema:
     *           $ref: '#/definitions/NewGame'
     *     responses:
     *       201:
     *         description: The Game has been successfully created
     *         schema:
     *           $ref: '#/definitions/Game'
     */
    async store(req, res, next) {
        try {
            const game = await Game.create(req.body);
            res.status(201).json(game);
        } catch (e) {
            next(e);
        }
    },

    /**
     * @swagger
     *
     * /games/:id:
     *   delete:
     *     description: Deletes a game
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: id
     *         description: id of the game to delete
     *         in:  url
     *         required: true
     *         type: integer
     *     responses:
     *       204:
     *         description: The Game has been succesfully deleted from the database
     *         schema:
     *           type: object
     */
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
