var express = require('express');
var bodyParser = require('body-parser');
var requestHandler = require('./server/request_handler.js');
require('dotenv').config();

var app = express();
app.set('port', (process.env.PORT || 8000));
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  console.log('\nindex.js app.post request made to "/"');//, res.data: \n', res.data);
});

app.post('/places', function(req, res) {
    console.log('index.js request made to /places');
    requestHandler(req, res);
});

var server = app.listen(app.get('port'), function () {
  var port = server.address().port;
    console.log('bae-synchronous is running on port', port);
});

module.exports = server;
