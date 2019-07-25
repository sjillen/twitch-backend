const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    twitchId: Number,
    name: String,
    boxArtUrl: String,
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
