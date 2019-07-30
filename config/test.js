require('dotenv').config();

module.exports = {
    mongoURI: process.env.MONGO_URI + '_test',
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchSecret: process.env.TWITCH_SECRET,
    twitchOauthToken: process.env.TWITCH_OAUTH_TOKEN,
};
