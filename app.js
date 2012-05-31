var request = require('request'),
jsdom = require('jsdom');

exports.getWeather = function(params, cb){
  jsdom.env({
    html: 'http://www.met.ie/forecasts/',
    scripts: [
      'http://code.jquery.com/jquery-1.5.min.js'
    ],
    done: function(errors, window) {
      if (errors){
        return cb(errors);
      }

      var document = window.document,
      days = document.getElementsByClassName("daybox"),
      day,
      dayText,
      nextDay,
      sibling,
      forecast = {},
      index = 0;

      while(day = days[index++]) {
        nextDay = days[index];
        var dayForecast = "";
        sibling = day.nextSibling;

        while(sibling && sibling != nextDay ) {
          var append = sibling.textContent.trim();
          if (append!=""){
            dayForecast += append;
            dayForecast += '\n';
          }
          sibling = sibling.nextSibling;
        }
        forecast[day.textContent.trim()] = dayForecast;

      }
      return cb(null, forecast);



    }
  });



};

exports.getWeather( {}, function(err, weather){
  for (var d in weather){
    console.log(d);
    var fc = weather[d];
    fc = fc.split('\n');
    for (var i=0; i<fc.length; i++){
      console.log(fc[i]);
    }
  }
});
