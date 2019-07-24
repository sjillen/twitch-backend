const GameController = require("./controllers/game_controller");

module.exports = app => {
    app.get("/", (req, res) => {
        res.status(200).json({ Hi: "There" });
    });

    app.get("/games", GameController.index);

    app.post("/games", GameController.store);

    app.get("/games/:twitch_id", GameController.show);

    app.delete("/games/:twitch_id", GameController.destroy);
};
