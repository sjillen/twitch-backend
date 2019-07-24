const GameController = require("./controllers/game_controller");

module.exports = app => {
    app.get("/", (req, res) => {
        res.status(200).json({ Hi: "There" });
    });

    app.get("/games", GameController.index);

    app.post("/games", GameController.store);

    app.delete("/games/:twitch_id", GameController.destroy);
};
