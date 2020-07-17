const express = require('express');
const bodyParser = require('body-parser');
// const Images = require('../database-mongodb/Images.js');
const connect = require('../database-mongodb/connect.js')
const cors = require('cors');
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../react-client/dist'));
