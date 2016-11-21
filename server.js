var express = require('express'),
app = express(),
port = process.env.PORT || 4000;

const exec = require('child_process').exec;

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bundle.js', function(req, res) {
  res.sendFile(__dirname + '/bundle.js');
});

app.get('/bootstrap.css', function(req, res) {
  res.sendFile(__dirname + '/bootstrap.css');
});

app.get('/read_bci/', function(req, res) {
  exec('sudo python insight/read.py 5 | tee -a output', (error, stdout, stderr) => res.send(stdout))
});

app.listen(port);
