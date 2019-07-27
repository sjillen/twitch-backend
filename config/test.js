require('dotenv').config();

module.exports = {
    mongoURI: 'mongodb://localhost:27017/ubisoft_test',
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchSecret: process.env.TWITCH_SECRET,
    twitchOauthToken: process.env.TWITCH_OAUTH_TOKEN,
};
