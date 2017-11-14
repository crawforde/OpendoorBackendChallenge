// Set up an express server.

var express = require('express');
var router = require('./routes/routes');

var app = express();

// Default '/' route for testing that the server is running.
app.get('/', function(req, res, next){
    res.send("Welcome.");
});

//Include routes for data querying
app.use('/listings', router);

// Listen on port 3000 or process.env.port, if it is available.
app.listen(process.env.port || 3000);
console.log('Express started on port 3000');


// CITATION: started with boiler plate from https://github.com/expressjs/express.git under /examples/hello-world
