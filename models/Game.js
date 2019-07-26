const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    twitchId: { type: Number, default: 1, index: true },
    name: String,
    boxArtUrl: String,
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
