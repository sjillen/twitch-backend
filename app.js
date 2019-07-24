const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const keys = require("./config/keys");

const swaggerDocument = YAML.load("./swagger.yaml");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require("./router")(app);

module.exports = app;
