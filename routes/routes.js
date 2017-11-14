
// Set up Express Router endpoints for querying the listing data.
var express = require('express');
var router = express.Router();
var data = require('../data/data.json');
var geoJSON = require('geojson');
var { checkListing, formatQuery } = require('./query');


// This route queries the listing data based on parameters provided in req.query
// and sends back a FeatureCollection of listings that match query restrictions.
router.get('/', function(req, res){
  var newData = [];
  var query = formatQuery(req.query);
  newData = data.filter((listing)=>checkListing(query,listing));
  newData = geoJSON.parse(newData, {Point: ['lat', 'lng']});
  res.send(newData);
});

module.exports = router;

// CITATION: Boiler plate for express router borrowed from a previous backend project that I wrote.
