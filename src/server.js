var app = require('./app');
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    var host = server.address().address;
    return console.log('Started at http://%s:%s', host, port);
});
