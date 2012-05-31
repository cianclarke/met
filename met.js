#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode
  var met = require('./app.js');
  var colors = require('colors');

  met.getWeather( {}, function(err, weather){
    if (err){
      console.log(err);
      return;
    }

    var forecast = weather.forecast,
    images = weather.images;

    var i=0;
    for (var d in forecast){
      console.log(d.green.bold);
      if (images && images[i]){
        console.log('Weather: ' + images[i].weather.blue.underline + '      Wind: ' + images[i].wind.blue.underline + '      Temp: ' + images[i].temp.blue.underline);
        i++;
      }

      var fc = forecast[d];
      fc = fc.split('\n');
      for (var j=0; j<fc.length; j++){
        console.log(fc[j]);
      }
    }
  });
})()
