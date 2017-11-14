// Got started with boiler plate from https://github.com/expressjs/express.git under /examples/hello-world
var express = require('express');
var router = require('./routes/routes');

var app = express();

app.get('/', function(req, res){
  res.send('Hello World');
});

app.use(router);

app.listen(process.env.port || 3000);
console.log('Express started on port 3000');
