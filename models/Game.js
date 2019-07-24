const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    twitch_id: Number,
    name: String,
    box_art_url: String,
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
