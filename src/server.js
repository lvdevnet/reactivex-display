var express = require('express');
var bodyParser = require('body-parser');
var pkg = require('../package.json');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var CBuffer = require('CBuffer');
var instagram = require('./instagram');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../bower_components'));
app.use(express.static(__dirname + '/../public'));

app.get('/', function(req, res) {
  res.send({version: pkg.version});
});


var pushes = new CBuffer(100);
var doPush = function(pic) {
  var exists = pushes.some(function(pushedPic) {
    return pushedPic.url === pic.url;
  });
  if (exists) {
    return;
  }
  console.log('[' + pic.participant + '] #' + pic.tag + ' ' + pic.url);
  pushes.unshift(pic);
  io.emit('in', pic);
};

var getMoreCats = function() {
  instagram.byTag('cat').then(function(pics) {
    pics.forEach(doPush);
  });
  setTimeout(getMoreCats, 5000);
};
getMoreCats();


app.get('/in', function(req, res) {
  res.send(pushes.toArray());
});

app.post('/in', function(req, res) {
  doPush(req.body);
  res.send(200);
});


var port = process.env.PORT || 3000;
server.listen(port, function() {
  var host = server.address().address;
  console.log('Started at http://%s:%s', host, port);
});
