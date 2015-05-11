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
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
  ca: fs.readFileSync('./keys/ca.crt'),
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

// Routes
/** ************************************************** */

app.get('/home', function(req, res) {
	res.render('Example.html');
});

app.get('/results', function(req, res) {
	console.log("Get Recieved ..");
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

/*
 * 
 * #junk -> name of this python file, not needed but automatically passed by interpreter 
	#srcTxt -> source text user translated
	#dstTxt -> translated text
	#srcLng -> language of source txt
	#dstTtxt -> language source text was translated to
	#srcTxt, dstTxt, srcLng, dstLng = loadData(argv[1], '../input', '\n', str); #use this interface for basic testing
	junk, srcTxt, dstTxt, srcLng, dstLng = argv; #use this interface for production
 * 
 * 
 * localhost:3000/results?srcTxt="hello"&dstTxt ="hello"&srcLang="English"&dstLang = "English"
 * */

function processResults(req, res, post) {

	console.log("Processing results..");
	var srcTxt = "";
	var dstTxt = "";
	var srcLang = "";
	var dstLang = "";
	if (post) {
		srcTxt = req.body.srcTxt;
		dstTxt = req.body.dstTxt;
		srcLang = req.body.srcLang;
		dstLang = req.body.dstLang;
	} else {
		srcTxt = req.query.srcTxt;
		dstTxt = req.query.dstTxt;
		if (typeof req.query.srcLang != 'undefined')
			srcLang = req.query.srcLang;
		else
			srcLang = "english";

		if (typeof req.query.dstLang != 'undefined')
			dstLang = req.query.dstLang;
		else
			dstLang = "russian";
	}
	
	console.log("Calling Engine with :" +srcTxt +" "+ dstTxt+" "+srcLang+" "+dstLang);


	var options = {
		mode : 'text',
		scriptPath : './',
		args : [ srcTxt, dstTxt,srcLang,dstLang]
	};

	var pyshell = new PythonShell('./engine.py', options);

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

	console.log("Post Recieved ..");
	processResults(req, res,true);

});

/** ************************************************** */

module.exports = app;

var secureServer = https.createServer(sslOptions,app).listen('3000', function(){
  console.log("Secure Express server listening on port 3000");
});


// server.listen(8080, '128.223.4.35');

