const SnapshotController = require('../controllers/snapshot_controller');

module.exports = app => {
    app.get('/snapshots', SnapshotController.index);
    app.get('/snapshots/:gameId', SnapshotController.show);
};
