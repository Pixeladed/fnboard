var fs = require('fs');
var http = require('http');
var port = process.env.PORT || 8000;
var express = require('express');
var app = express();


app.use(express.static(__dirname + '/client'));

var server = http.createServer(app);

server.listen(port);
console.log('LISTENING on ' + port);
var io = require('socket.io').listen(server);
io.configure(function() { 
	io.set("transports", ["xhr-polling"]); 
  	io.set("polling duration", 10); 
});
io.set('log level', 1);

io.sockets.on('connection',function(socket) {
	socket.on('upEC',function(data) {
		socket.broadcast.emit('upECTOUSE',data);
	});
	socket.on('neEC',function(data) {
		socket.broadcast.emit('neECTOUSE',data);
	});
});