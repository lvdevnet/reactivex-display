var express = require('express');
var bodyParser = require('body-parser');
var pkg = require('../package.json');
var app = module.exports = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/../public'));

app.get('/api', function(req, res) {
    return res.send({version: pkg.version});
});
