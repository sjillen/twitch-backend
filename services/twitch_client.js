const TwitchGateway = require('./twitch_gateway');
const SnapshotDto = require('../dto/SnapshotDto');

const getSnapshots = async (
    gameIds = [497078, 506274, 460630],
    cursor = ''
) => {
    let streamList = [];
    try {
        streamList = await fetchAllStreams(gameIds, cursor);
    } catch (e) {
        throw new Error('Twitch client Error: Could not get Snapshots');
    }

    if (streamList && streamList.length) {
        const snapshots = buildSnapshots(streamList, gameIds);
        return snapshots;
    }
};

const fetchAllStreams = async (gameIds, cursor) => {
    let streamData;
    try {
        streamData = await TwitchGateway.getStreams(gameIds, cursor);
    } catch (e) {
        console.error(e);
        throw e;
    }

    const after = streamData.pagination.cursor;
    const streamList = streamData.data;
    if (after) {
        return streamList.concat(await fetchAllStreams(gameIds, after));
    } else {
        return streamList;
    }
};

const buildSnapshots = (streamList, gameIds) => {
    return feedSnapshots(streamList, buildList(gameIds));
};

const buildList = gameIds => {
    const timestamp = new Date();
    return gameIds.map(id => new SnapshotDto(timestamp, id, 0));
};

const feedSnapshots = (data, emptySnaps) => {
    return data.reduce((fill, row) => {
        for (let i = 0; i < fill.length; i++) {
            if (fill[i].gameId === Number(row.game_id)) {
                fill[i].viewers += row.viewer_count;
            }
        }
        return fill;
    }, emptySnaps);
};

module.exports = {
    fetchAllStreams,
    buildSnapshots,
    getSnapshots,
};
