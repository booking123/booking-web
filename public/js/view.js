//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://code.google.com/p/jquery-ui-map/

(function( $ ) {

	var settings = {
			latitude: 0.0,		// latitude
			longitude: 0.0,		// longitude
			zoom: 1,			// zoom level 1 < zoom < 20
			heading: 34,		// heading direction 1 < heading < 360
			pitch: 10,			// pitch angle 1 < pitch < 90
			error: false		// show error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					refresh();
				});
			},
			latitude : function( latitude ) {
				if (settings.error) console.log("set latitude " + latitude);
				settings.latitude = latitude;
				refresh();
			},
			longitude : function( longitude ) {
				if (settings.error) console.log("set longitude " + longitude);
				settings.longitude = longitude;
				refresh();
			},
			heading : function( heading ) {
				if (settings.error) console.log("set heading " + heading);
				settings.heading = heading;
				refresh();
			},
			unitSystem : function( pitch ) {
				if (settings.error) console.log("set pitch " + pitch);
				settings.pitch = pitch;
				refresh();
			},
			zoom : function( zoom ) {
				if (settings.error) console.log("set zoom " + zoom);
				settings.zoom = zoom;
				refresh();
			}
	};

	$.fn.view = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {
		
		if (settings.error) console.log("view " + settings.latitude + ", " + settings.longitude + ", " + settings.zoom + ", " + settings.heading + ", " + settings.pitch + ", " + settings.error);

		if (!settings.zoom || settings.zoom < 1 || settings.zoom > 20) {if (settings.error) console.log("Invalid zoom parameter - must be in the range 1 <= wait <= 20");}

		var mapLatLng = new google.maps.LatLng(settings.latitude, settings.longitude);

		$("#cbt_view").gmap({
			//   ... insert other gmap options here,
			"center": mapLatLng,
			"zoom": settings.zoom,
			"callback": function() {
				var self = this;
				self.displayStreetView("cbt_view", { "position": mapLatLng, "pov": {"heading": settings.heading, "pitch": settings.pitch, "zoom": 1 } });
			}
		});
	}
})( jQuery );
