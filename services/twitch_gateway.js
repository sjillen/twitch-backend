const HTTP = require('./http_client');
const keys = require('../config/keys');
const buildUrl = require('../helpers/url_builder');
const GameDto = require('../dto/GameDto');

const headers = {
    'Client-Id': keys.twitchClientId,
};

const baseUrl = 'https://api.twitch.tv/helix/games';

module.exports = {
    async getGames(
        names = ["assassin's creed odyssey", 'far cry 5', 'rainbow six siege']
    ) {
        const params = names.map(name => {
            return { key: 'name', value: name };
        });
        const url = buildUrl(baseUrl, params);
        const result = await HTTP.get(url, { headers });
        return result.data.data;
    },
};
