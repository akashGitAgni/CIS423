//Imports .....
//cis423#2!
//server#2!
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var http = require('http');
var fs = require('fs');
var app = express();



var https = require('https');

var sslOptions = {
  key: fs.readFileSync('./server.key'),
  cert: fs.readFileSync('./server.crt'),
  ca: fs.readFileSync('./ca.crt'),
  requestCert: true,
  rejectUnauthorized: false
};


app.set('views', path.join(path.resolve(path.dirname()), 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : false
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Routes
/** ************************************************** */

app.get('/home', function(req, res) {
	res.render('Example.html');
});

app.get('/results', function(req, res) {
	processResults(req, res,false);
});

function writeOuputFile(text) {

	fs.writeFile("python/test-input.txt", text, function(err) {
		if (err) {
			return console.log(err);
		}

		console.log("The file was saved!");
	});

}

function processResults(req, res, post) {

	var fist = ""
	var second = "";
	if (post) {
		first = req.body.first;
		second = req.body.second;
	} else {
		first = req.query.first;
		second = req.query.second;
	}

	var path = "test-input.txt";
	var string = first + "\n" + second;
	// writeOuputFile(string);
	console.log("-" + first + " -" + second);
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

	processResults(req, res,true);

});

/** ************************************************** */

module.exports = app;

var secureServer = https.createServer(sslOptions,app).listen('3000', function(){
  console.log("Secure Express server listening on port 3000");
});


// server.listen(8080, '128.223.4.35');

