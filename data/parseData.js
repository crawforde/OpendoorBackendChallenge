// Borrowed async csv read setup from a previous project on my computer.
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var parse = Promise.promisify(require('csv-parse'));
var testingMode = false;


fs.readFileAsync(`${__dirname}/${testingMode ? 'testData.csv' : 'backendChallengeData.csv'}`,'utf8')
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
    data = data.map((arr)=>{
      var objRepresentation = {};
      arr.forEach((feature,index)=>{
        objRepresentation[propertyNames[index]]=feature;
      });
      return objRepresentation;
    });
    data = JSON.stringify(data);
    return fs.writeFile(`${__dirname}/data.json`, data);
  })
  .then((data,writeErr)=>{
    if(writeErr){
      throw("can't write data to file: " + writeErr);
    }
    console.log('Success');
  })
  .catch((error)=>{
    console.log('Error: ' + error);
  });

// var geoJSON = require('geojson');
// data = geoJSON.parse(data, {Point: ['lat', 'lng']});
