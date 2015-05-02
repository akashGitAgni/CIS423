//Imports .....
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var http = require('http');
var fs = require('fs');
var app = express();

var server = http.createServer(app);

app.set('views', path.join(path.resolve(path.dirname()), 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));

// Routes
/** ************************************************** */

app.get('/home', function(req, res) {
	res.render('Example.html');
});


app.get('/results', function(req, res) {
	processResults(req,res);
});


function writeOuputFile(text) {

	fs.writeFile("python/test-input.txt", text, function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});

}


function processResults(req,res)
{

	console.log("in app post");
	var first = req.body.first;
	var second = req.body.second;
	var path = "test-input.txt";
	var string = first + "\n" + second;
	// writeOuputFile(string);

	var options = {
		mode : 'text',
		scriptPath : './',
		args : [ second, first ]
	};

	var pyshell = new PythonShell('engine.py', options);

	pyshell.on('message', function(message) {
		console.log("---------------------");
		console.log(message);
		res.end(message);
	});

	pyshell.end(function(err) {
		if (err)
			throw err;
		console.log('finished');
	});

}


app.post('/run', function(req, res) {

	

});

/** ************************************************** */

app.listen(3000, function() {
	console.log('Listening on port 3000...');
});

// server.listen(8080, '128.223.4.35');

module.exports = app;