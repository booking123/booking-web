//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://code.google.com/p/jquery-ui-map/
//Documentation: http://code.google.com/p/jquery-ui-map/wiki/Overview
//Demo: http://code.google.com/p/jquery-ui-map/
//Issues: http://code.google.com/p/jquery-ui-map/issues/list
//Discuss at: http://groups.google.com/group/jquery-ui-map-discuss

(function( $ ) {

	var settings = {
			latitude: 0.0,		// latitude of centre
			longitude: 0.0,		// longitude of centre
			zoom: 15,			// zoom level 1 < zoom < 20
			content: "",		// content when marker is clicked
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
			zoom : function( zoom ) {
				if (settings.error) console.log("set zoom " + zoom);
				settings.zoom = zoom;
				refresh();
			},
			content : function( content ) {
				if (settings.error) console.log("set content " + content);
				settings.content = content;
				refresh();
			}
	};

	$.fn.map = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {
		
		if (settings.error) console.log("map " + settings.latitude + ", " + settings.longitude + ", " + settings.zoom + ", " + settings.content + ", " + settings.error);

		if (!settings.zoom || settings.zoom < 1 || settings.zoom > 20) {if (settings.error) console.log("Invalid zoom parameter - must be in the range 1 <= wait <= 20");}

		var mapLatLng = new google.maps.LatLng(settings.latitude, settings.longitude);
		$("#cbt_map").gmap({
			//   ... insert other gmap options here,
			"center": mapLatLng,
			"zoom": settings.zoom,
			"callback": function() {
				var self = this;
				self.addMarker({
					"position": mapLatLng,
					"bounds": false
				}).click(function() {
					self.openInfoWindow({"content": settings.content}, this);
				});
			}
		});
	}
	
})( jQuery );
