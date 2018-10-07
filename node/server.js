'use strict'

var express = require('express');
var jwt = require('jwt-simple');
var lodash = require('lodash')
var bodyParser = require('body-parser')


var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.listen(3050, function() {
    console.log('aOne listening on port 3050')
});
require('./scripts/api/itemAPI')(app);
require('./scripts/api/commentAPI')(app);
require('./scripts/api/offerAPI')(app);
require('./scripts/api/userAPI')(app);
app.get('/', function(req, res) {
    res.sendfile('index.html')
});
