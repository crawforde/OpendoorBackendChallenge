// File contains tools for checking listings against query parameters.

var _ = require('underscore');

// Object with keynames corresponding to meaningful query parameters.
// Values are functions that take the value of the query parameter and a potential listing.
// The function returns true if the listing meets the restriction imposed by the query
// parameter.
const checkFeatures = {
  min_price: (min,listing)=>(listing.price >= min),
  max_price: (max,listing)=>(listing.price <= max),
  min_bed: (min,listing)=>(listing.bedrooms >= min),
  max_bed: (max,listing)=>(listing.bedrooms <= max),
  min_bath: (min,listing)=>(listing.bathrooms >= min),
  max_bath: (max,listing)=>(listing.bathrooms <= max),
};

// Takes a query object (as req.query) and returns an array of ordered pairs
// in the format [queryParameterName, value]. Only query parameters with names
// that appear in checkFeatures will be included.
const formatQuery = function(query){
  var newQuery = _.pairs(query);
  newQuery = newQuery.filter((pair)=>{
    return checkFeatures.hasOwnProperty(pair[0]);
  });
  return newQuery;
};

// Takes a listing and an array of ordered pairs corresponding to query parameters.
// Returns true if the listing meets all of the restrictions imposed by the query
// parameters, and false otherwise. Assumption: query contains only query parameters
// that appear in checkFeatures.
const checkListing = function(query,listing){
  try{
    query.forEach((requirement)=>{
      if(!checkFeatures[requirement[0]](requirement[1],listing)){
        throw("Not a match.");
      }
    })
  } catch(err){
    if(err==="Not a match."){
      return false;
    }
    throw(err);
  }
  return true;
};

module.exports = {
  formatQuery,
  checkListing
};
