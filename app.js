var jsdom = require('jsdom');

exports.getWeather = function(params, cb){
  jsdom.env({
    html: 'http://www.met.ie/forecasts/',
    scripts: [],
    done: function(errors, window) {
      if (errors){
        return cb(errors);
      }

      var forecast = getForecasts(window);
      var images = getWeatherImages(window);

      return cb(null, {forecast: forecast, images: images});
    }
  });
};


/*
 Get the weather images from the dom
 @author @danielconnor
 */
function getWeatherImages(window) {
  // this private switch is from the met.ie website
  function _GetTypeToName(MapType) {
    switch (MapType)
    {
      case 1:
        return "weather" ;
      case 2:
        return "wind" ;
      case 3:
        return "temp";
      case 0:
        return "temp";
    }
  }


  var location = "http://www.met.ie/weathermaps/",
  images = {},
  mapType;

  for(var i = 0; i<3; i++) {
    images[i] = {};

    for(var j = 0; j<3; j++) {

      mapType = _GetTypeToName(j)

      images[i][mapType] = location + 'nat0' + i + '_' + mapType + '.png';

    }
  }
  return images;
}

/*
 Get the forecast from the DOM
 @author @danielconnor
 */
function getForecasts(window){
// Thanks to @danielconnor for the parser code!
  var document = window.document,
  days = document.getElementsByClassName("daybox"),
  day,
  dayText,
  nextDay,
  sibling,
  forecast = {},
  images = {},
  index = 0;

  while(day = days[index++]) {
    nextDay = days[index];
    var dayForecast = "";
    sibling = day.nextSibling;

    while(sibling && sibling != nextDay ) {
      var append = sibling.textContent.trim();
      if (append!==""){
        dayForecast += append;
        dayForecast += '\n';
      }
      sibling = sibling.nextSibling;
    }
    forecast[day.textContent.trim()] = dayForecast;

  }
  return forecast;
}
