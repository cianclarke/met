met
===

Simple node module for retrieving Irish weather information from the MET Eireann service.
Screenscrapes the HTML using DOM parsing, as no API is available & returns JSON.

Installation (as a CLI)
======================

    $ npm install -g met
    $ met
    Today
    Tonight: Mild, cloudy and misty tonight with patches of rain, drizzle and fog. Temperatures not falling below 10 to 14 degrees. Light breezes or calm conditions.

    Tomorrow
    Friday: Some bright or sunny spells but overall a good deal of cloud with patches of mist, fog and drizzle.
    Rather warm and humid with highest temperatures 17 to 22 degrees in light breezes.

    Outlook
    Friday night will be mainly dry. It will be cooler in the North with temperatures dipping to 6 or 7 degrees but minimum temperatures will be closer to 12 degrees in the Southwest.
    Saturday will start mainly dry with some bright or sunny spells in the North. Rain will slowly spread into Southern and Western parts during the course of the day but elsewhere it should hold dry. Highest temperatures will range 17 to 21 degrees.
    The details for the rest of bank holiday weekend regarding rainfall look uncertain.
    At the moment it looks like during Saturday night the rain will spread further north to most remaining areas. Then Sunday and bank holiday Monday look like being noticeably cooler days than recently with outbreaks of rain affecting many places.
    Tuesday and  Wednesday next also look unsettled with rain at times but temperatures recovering a little. 


Usage (as a module)
===================

    var met = require('met'); 

    met.getWeather( {/* no params supported yet */}, function(err, weather){
      if (err){
        console.log(err);
        return;
      }
      for (var d in weather){
        console.log(d);
        var fc = weather[d];
        fc = fc.split('\n');
        for (var i=0; i<fc.length; i++){
          console.log(fc[i]);
        }
      }
    });
