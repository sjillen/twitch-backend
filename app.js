const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const keys = require('./config/keys');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
.then(() => {
    console.log("MongoDB is connected");
})
.catch(error => {
    console.log("Connection failed!", error);
});

const app = express();

const swaggerOptions = {
    definition: {
        info: {
            title: 'Twitch Viewers Track API',
            version: '1.0'
        },
    },
    apis: ['./controllers/game_controller.js']
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json({type: 'application/json'}));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./router')(app);

module.exports = app;