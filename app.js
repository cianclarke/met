var jsdom = require('jsdom');

exports.getWeather = function(params, cb){
  jsdom.env('http://www.met.ie/forecasts/', ["http://code.jquery.com/jquery.js"], function(errors, window) {
      if (errors){
        return cb(errors);
      }

      var forecast = getForecasts(window);
      var images = getWeatherImages(window);

      return cb(null, {forecast: forecast, images: images});
    }
  );
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

function getForecasts (window) {
	var forecast_text = window.$('.maincontent').text();
	return forecast_text.split('\n').map(function (el) {
		return el.trim();
	}).filter(function (el) {
		return el != '';
	}).join('\n');
}

