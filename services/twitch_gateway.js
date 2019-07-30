const HTTP = require('./http_client');
const keys = require('../config/keys');
const buildUrl = require('../helpers/url_builder');

const headers = {
    'Client-Id': keys.twitchClientId,
    'Authorization': 'Bearer ' + keys.twitchOauthToken,
};

const baseGameUrl = 'https://api.twitch.tv/helix/games';
const baseStreamUrl = 'https://api.twitch.tv/helix/streams';
const baseOauthUrl = 'https://id.twitch.tv/oauth2/token';

const NB_OF_ITEMS = 100;

module.exports = {
    async getGames(
        names = [
            "assassin's creed odyssey",
            'far cry 5',
            "tom clancy's rainbow six siege",
        ]
    ) {
        const params = names.map(name => {
            return { key: 'name', value: name };
        });
        const url = buildUrl(baseGameUrl, params);
        const result = await HTTP.get(url, { headers });
        return result.data.data;
    },

    async getStreams(gameIds = [], cursor = '') {
        const initializer = [{ key: 'first', value: NB_OF_ITEMS }];
        if (cursor) initializer.push({ key: 'after', value: cursor });

        const params = gameIds.reduce((p, id) => {
            p.push({ key: 'game_id', value: id });
            return p;
        }, initializer);

        const url = buildUrl(baseStreamUrl, params);
        const result = await HTTP.get(url, { headers });
        return result.data;
    },

    async getOauthToken() {
        const params = [
            { key: 'client_id', value: keys.twitchClientId },
            { key: 'client_secret', value: keys.twitchSecret },
            { key: 'grant_type', value: 'client_credentials' },
        ];

        const url = buildUrl(baseOauthUrl, params);
        const result = await HTTP.post(url);
        return result;
    },
};
