//Imports .....
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var PythonShell = require('python-shell');
var http = require('http');

var app = express();

var server = http.createServer(app);

app.set('views', path.join(path.resolve(path.dirname()), 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
/*****************************************************/

app.get('/home', function(req, res) {
        res.render('home.html');
});

app.post('/run', function(req, res) {

        var first = req.body.first;
        var second = req.body.second;

        var pyshell = new PythonShell('test.py', {mode: 'text'});

        pyshell.send(first);
        pyshell.send(second);

        pyshell.on('message', function(message) {
                console.log(message);
                res.end(message);
        });

        pyshell.end(function(err) {
                if(err) throw err;
                console.log('finished');
        });

});

/*****************************************************/

app.listen(3000, function() {
        console.log('Listening on port 3000...');
});

//server.listen(8080, '128.223.4.35');

module.exports = app;