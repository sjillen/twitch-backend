const TwitchGateway = require('../services/twitch_gateway');
const Game = require('../models/Game');
const GameDto = require('../dto/GameDto');

module.exports = async (req, res, next) => {
    let games = await Game.find({});
    console.log(games);
    if (!games.length) {
        const results = await TwitchGateway.getGames();
        console.log(results);
        const gamesDto = results.map(
            ({ id, name, box_art_url }) => new GameDto(id, name, box_art_url)
        );
        await Game.insertMany(gamesDto);
        res.locals.games = gamesDto;
        console.log(res.locals.games);
    } else {
        res.locals.games = games.map(
            ({ twitchId, name, boxArtUrl }) =>
                new GameDto(twitchId, name, boxArtUrl)
        );
    }

    next();
};
