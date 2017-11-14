// Borrowed async csv read setup from a previous project on my computer.

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var parse = Promise.promisify(require('csv-parse'));
// var models = require('../models');
// var City = models.City;

fs.readFileAsync(`${__dirname}/testData.csv`,'utf8')
  .then((input,readErr)=>{
    if(readErr){
      throw("can't read data: " + readErr);
    }
    return parse(input,{comment: '#', delimiter: ',', quote: ''});
  })
  .then((data,parseErr)=>{
    if(parseErr){
      throw("can't parse data: " + parseErr);
    }
    var propertyNames = data.splice(0,1)[0];
    console.log(propertyNames);
  })
  .catch((error)=>{
    console.log('Error: ' + error);
  });
