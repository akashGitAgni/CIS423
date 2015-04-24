//Imports .....
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var os = require('os');
var bodyParser = require('body-parser');
var fs = require('fs');
var querystring = require('querystring');
// Variables ......
var my_ip = "";
var port = "4000";
// get my ip
var PythonShell = require('python-shell');
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function(ifname) {
	var alias = 0;

	ifaces[ifname].forEach(function(iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			return;
		}

		if (alias >= 1) {
			my_ip = iface.address;
		} else {
			my_ip = iface.address;
		}
	});
});

app.use(bodyParser.urlencoded());
console.log("Server Started-------");
app.set('port', process.env.PORT || port);
// function for UI ..

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/factory.html');
});

app.get('/getResult', function(req, res) {
	res.sendFile(__dirname + '/factory.html');
	console.log("Getting acuracy");

	var pyshell = new PythonShell('myscript.py');

	// sends a message to the Python script via stdin
	pyshell.send('hello');

	pyshell.on('message', function(message) {
		// received a message sent from the Python script (a simple "print"
		// statement)
		console.log(message);
	});

	// end the input stream and allow the process to exit
	pyshell.end(function(err) {
		if (err)
			throw err;
		console.log('finished');
	});

});

var socketobj;
io.on('connection', function(socket) {
	socketobj = socket;
	socket.emit('connect', {
		hello : 'world'
	});

	// reply from the page ...
	socket.on('AddTask', function(data) {
	});

	socket.on('AddSensorTask', function(data) {
	});

});

function updateBag(msg) {
	if (socketobj == undefined)
		return;

	socketobj.emit('Bag', {
		msg : msg
	});

}

http.listen(3000, function() {
});

app.post('/do_post', function(req, res) {
	var the_body = req.body;
	res.json({
		"body" : the_body,
		"ip" : JSON.stringify(my_ip)
	});

});

app.post('/getAccuracy', function(req, res) {
	// get the bay id for this sensor
	var the_body = req.body;
	console.log("Getting acuracy");

});

process.on('uncaughtException', function(err) {
	console.log('Caught exception: ' + err);
});