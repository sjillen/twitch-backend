const TwitchGateway = require('../services/twitch_gateway');
const GameDto = require('../dto/GameDto');

module.exports = (req, res, next) => {
    console.log(req.body.name);
    TwitchGateway.getGames([req.body.name])
        .catch(e => res.status(400).json({ error: e.message }))
        .then(games => {
            if (!games.length) {
                res.status(404).json({
                    error: 'Game not referenced on Twitch',
                });
            } else {
                res.locals.games = games.map(
                    ({ id, name, box_art_url }) =>
                        new GameDto(id, name, box_art_url)
                );
                next();
            }
        });
};
