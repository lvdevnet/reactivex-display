var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var picSchema = require('./pic.json');
var tv4 = require('tv4');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/../public'));


var doPush = function(pic) {
  console.log('[' + pic.participant + '] #' + pic.tag + ' ' + pic.url);
  io.emit('in', pic);
};

app.post('/in', function(req, res) {
  if (tv4.validate(req.body, picSchema)) {
    doPush(req.body);
    res.sendStatus(200);
  } else {
    res.status(400).send(tv4.error);
  }
});


var port = process.env.PORT || 3000;
server.listen(port, function() {
  var host = server.address().address;
  console.log('Started at http://%s:%s', host, port);
});
