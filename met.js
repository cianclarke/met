#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode
  var met = require('./app.js');

  met.getWeather( {}, function(err, weather){
    for (var d in weather){
      console.log(d);
      var fc = weather[d];
      fc = fc.split('\n');
      for (var i=0; i<fc.length; i++){
        console.log(fc[i]);
      }
    }
  });
})()
