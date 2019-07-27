const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SnapshotSchema = new Schema({
    gameId: { type: Number, index: true },
    timestamp: Date,
    viewers: Number,
});

const Snapshot = mongoose.model('snapshot', SnapshotSchema);

module.exports = Snapshot;
