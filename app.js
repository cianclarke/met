var jsdom = require('jsdom');

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