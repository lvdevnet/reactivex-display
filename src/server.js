var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var CBuffer = require('CBuffer');
var picSchema = require('./pic.json');
var tv4 = require('tv4');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/../public'));


var pushes = new CBuffer(20);
var doPush = function(pic) {
  var exists = pushes.some(function(pushedPic) {
    return pushedPic.url === pic.url;
  });
  if (exists) {
    return;
  }
  console.log('[' + pic.participant + '] #' + pic.tag + ' ' + pic.url);
  pushes.push(pic);
  io.emit('in', pic);
};


app.get('/in', function(req, res) {
  res.send(pushes.toArray());
});

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
