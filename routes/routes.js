// Boiler plate for router borrowed from a previous backend project that I had saved on my computer.
var express = require('express');
var router = express.Router();
var data = require('../data/data.json');
var geoJSON = require('geojson');

router.get('/', function(req, res){
  data = geoJSON.parse(data, {Point: ['lat', 'lng']});
  res.send(data);
});

module.exports = router;
