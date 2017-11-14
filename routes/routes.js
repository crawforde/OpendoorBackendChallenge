// Boiler plate for router borrowed from a previous backend project that I had saved on my computer.
var express = require('express');
var router = express.Router();

router.get('/test', function(req, res){
  res.send('Test succeeded.');
});

module.exports = router;
