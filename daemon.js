const mongoose = require('mongoose');
const keys = require('./config/keys');
const SnapshotController = require('./controllers/snapshot_controller');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const start = () => {
    const interval = setInterval(() => {
        SnapshotController.store()
            .catch(e => {
                console.error(e);
                clearInterval(this);
            })
            .then(snapshots => {
                console.log(`Timestamp: ${snapshots[0].timestamp}`);
                snapshots.forEach(s => {
                    console.log(
                        `Game ID: ${s.gameId} has ${s.viewers} viewers`
                    );
                });
            });
    }, 4000);

    process.on('beforeExit', () => {
        console.log('exit signal received, clearing interval...');
        clearInterval(interval);
        console.log('daemon stopped');
    });
};

start();
