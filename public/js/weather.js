//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://www.mywebs.biz/Gadgets/Weather/Location-ID.php
//See http://developer.yahoo.com/weather/
//See http://developer.yahoo.com/yql/console/#h=select%20*%20from%20weather.forecast%20where%20woeid%3D2502265
//See http://www.yqlblog.net/blog/2010/03/12/avoiding-rate-limits-and-getting-banned-in-yql-and-pipes-caching-is-your-friend/
//See http://en.wikipedia.org/wiki/WOEID
//Create Yahoo Weather feed API address with Yahoo! weather location or WOEID code or lat/lng

(function( $ ) {

	var settings = {
			wid: 1591691,	// weather location identifier (yahoo! or WOEID)
			unit: 'c',		// c = Centigrade, f = Farenheit
			image: true,	// include background image
			range: true,	// include high and low temperatures
			wind: true,		// include wind speed and direction
			link: true,		// include URL of full forecast
			date: true,		// include date
			error: false	// include error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					refresh(e);
				});
			},
			wid : function( wid ) {
				if (settings.error) console.log("set wid " + wid);
				settings.wid = wid;
				refresh();
			},
			unit : function( unit ) {
				if (settings.error) console.log("set unit " + unit);
				settings.unit = unit;
				refresh();
			}
	};

	$.fn.weather = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh(e) {
		var date = new Date();
		var query = "";
		if (isNaN(settings.wid)) {query = "select * from weather.forecast where location in ('"+ settings.wid + "') and u='"+ settings.unit +"'";}
		else {query = "select * from weather.forecast where woeid in (" + settings.wid + ") and u='"+ settings.unit +"'";}
		var api = "http://query.yahooapis.com/v1/public/yql?q="+ encodeURIComponent(query) +"&rnd=" + date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() +"&format=json&callback=?";

		$.ajax({
			type: "GET",
			url: api,
			dataType: "json",
			success: function(data) {
				var feed = data.query.results.channel;

				wpd = feed.item.pubDate;
				n = wpd.indexOf(":");
				tpb = getTimeAsDate(wpd.substr(n-2,8));
				tsr = getTimeAsDate(feed.astronomy.sunrise);
				tss = getTimeAsDate(feed.astronomy.sunset);

				if (tpb>tsr && tpb<tss) { daynight = "d"; } else { daynight = "n"; }

				var html = "<div";
				if (settings.image) html += " style='background-image: url(http://l.yimg.com/a/i/us/nws/weather/gr/"+ feed.item.condition.code + daynight +".png); background-repeat: no-repeat;'";
				html += ">";
				html += "<div class='cbt_city'>"+ feed.location.city +"</div>";
				html += "<div class='cbt_temp'>"+ feed.item.condition.temp +"&deg;</div>";
				html += "<div class='cbt_note'>"+ feed.item.condition.text +"</div>";
				if (settings.range) html += "<div class='cbt_range'>Today's High: " + feed.item.forecast[0].high + "&deg; Low: " + feed.item.forecast[0].low + "&deg;</div>";
				if (settings.range) html += "<div class='cbt_range'>Tomorrow's High: " + feed.item.forecast[1].high + "&deg; Low: " + feed.item.forecast[1].low + "&deg;</div>";
				if (settings.wind) html += "<div class='cbt_wind'>Wind: " + wd(feed.wind.direction) +" "+ feed.wind.speed + feed.units.speed + "</div>";
				if (settings.link) html += "<div class='cbt_link'><a href='" + feed.item.link + "'>Full forecast</a></div>";
				if (settings.date) html += "<div class='cbt_note'>"+ date.toString().substring(0,10); +"</div>";
				html += "</div>";
				$(e).append(html);
			},
			error: function(data) {if (settings.error) $(e).append("<div>weather error</div>");}
		});
	}
	// Get wind direction
	function wd(wd) {
		if (wd>=348.75 && wd <=360) {return "N";}
		if (wd >=0 && wd <11.25) {return "N";}
		if (wd >=11.25 && wd <33.75) {return "NNE";}
		if (wd >=33.75 && wd <56.25) {return "NE";}
		if (wd >=56.25 && wd <78.75) {return "ENE";}
		if (wd >=78.75 && wd <101.25) {return "E";}
		if (wd >=101.25 && wd <123.75) {return "ESE";}
		if (wd >=123.75 && wd <146.25) {return "SE";}
		if (wd >=146.25 && wd <168.75) {return "SSE";}
		if (wd >=168.75 && wd <191.25) {return "S";}
		if (wd >=191.25 && wd<213.75) {return "SSW";}
		if (wd >=213.75 && wd <236.25) {return "SW";}
		if (wd >=236.25 && wd <258.75) {return "WSW";}
		if (wd >=258.75 && wd<281.25) {return "W";}
		if (wd >=281.25 && wd <303.75) {return "WNW";}
		if (wd >=303.75 && wd <326.25) {return "NW";}
		if (wd >=326.25 && wd <348.75) {return "NNW";}
		return "??";
	};

	// Get time string as date
	var getTimeAsDate = function(t) {
		d = new Date();
		r = new Date(d.toDateString() +" "+ t);
		return r;
	};

	var addDaysToDate = function(t, days) {
		d = new Date();
		d.setTime(t.getTime() + days * 1000 * 60 * 60 * 24);
		return d;
	};

})( jQuery );
