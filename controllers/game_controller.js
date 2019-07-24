const Game = require('../models/Game');

module.exports = {
    /**
     * @swagger
     *
     * definitions:
     *   NewGame:
     *     type: object
     *     required:
     *       - name
     *     properties:
     *       name:
     *         type: string
     *   Game:
     *     allOf:
     *       - $ref: '#/definitions/NewGame'
     *     required:
     *       - id
     *     properties:
     *       id:
     *         type: integer
     *       name:
     *         type: string
     */

    /**
     * @swagger
     * /games:
     *   get:
     *     description: Returns games
     *     produces:
     *      - application/json
     *     responses:
     *       200:
     *         description: games
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
     *         required: true
     *         type: string
     *         schema:
     *           $ref: '#/definitions/NewGame'
     *     responses:
     *       201:
     *         description: games
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
     *         in:  body
     *         required: true
     *         type: integer
     *         schema:
     *           $ref: '#/definitions/NewGame'
     *     responses:
     *       204:
     *         description: empty body if success
     */
    async destroy(req ,res, next) {
        console.log(req.params);
        try {
            const result = await Game.deleteOne({id: req.params.id});
            console.log(result);
            res.status(204).json(result);
        } catch (e) {
            
            next(e);
        }
    },
}

