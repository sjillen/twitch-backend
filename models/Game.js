const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    id: Number,
    name: String,
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;