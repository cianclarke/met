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

		for (var i in images){
			console.log('\tWeather: ' + images[i].weather.blue.underline + '\n\tWind: ' + images[i].wind.blue.underline + '\n\tTemp: ' + images[i].temp.blue.underline);
		}

		forecast = forecast.split('\n').map(function (el) {
			if (el === "Today" || el === "Tomorrow" || el === "Outlook") {
				return '\n  ' + el.green.underline + '\n';
			} else {
				return el;
			}
		});

		var header = '\n' + forecast.splice(0, 3).join(' ').underline.bold;
		forecast = forecast.join('');

		console.log(header);
		console.log(forecast);
	});
})()
