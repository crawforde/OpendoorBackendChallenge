// Got started with boiler plate from https://github.com/expressjs/express.git under /examples/hello-world
var express = require('express');
var router = require('./routes/routes');

var app = express();

app.get('/', function(req, res, next){
  if(Object.keys(req.query).length > 0){
    next();
  }
  else{
    res.send("Please provide query parameters.");
  }

});

app.use(router);

app.listen(process.env.port || 3000);
console.log('Express started on port 3000');
