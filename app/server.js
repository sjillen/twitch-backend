const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const mongoose = require('mongoose');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const keys = require('../config/keys');

const swaggerDocument = YAML.load('./swagger.yaml');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
});

const app = express();
const appLogStream = fs.createWriteStream('logs/server.log', { flags: 'a' });

app.use(helmet());
app.use(cors());
app.use(morgan('combined', { stream: appLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

require('../routes/game_routes')(app);
require('../routes/snapshot_routes')(app);

module.exports = app;
