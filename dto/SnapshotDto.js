class SnapshotDto {
    constructor(timestamp, gameId, viewers) {
        this.gameId = gameId;
        this.timestamp = timestamp;
        this.viewers = viewers;
    }
}

module.exports = SnapshotDto;
