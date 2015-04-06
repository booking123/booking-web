//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/

(function( $ ) {

	var directionsService = new google.maps.DirectionsService();

	var settings = {
			latitude: 0.0,		// latitude
			longitude: 0.0,		// longitude
			origin: "",			// address of origin of route
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			plain: false,		// plain directions
			error: true			// show error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					localize();
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
			origin : function( origin ) {
				if (settings.error) console.log("set origin " + origin);
				settings.origin = origin;
				refresh();
			},
			travelMode : function( travelMode ) {
				if (settings.error) console.log("set travelMode " + travelMode);
				settings.travelMode = travelMode;
				refresh();
			},
			unitSystem : function( unitSystem ) {
				if (settings.error) console.log("set unitSystem " + unitSystem);
				settings.unitSystem = unitSystem;
				refresh();
			}
	};

	$.fn.route = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {

		if (settings.error) console.log("route " + settings.latitude + ", " + settings.longitude + ", " + settings.origin + ", " + settings.travelMode + ", " + settings.unitSystem + ", " + settings.plain + ", " + settings.error);

		if (!settings.origin && settings.error) console.log("Invalid address of the origin of a route to the property");

		var mapLatLng = new google.maps.LatLng(settings.latitude, settings.longitude);

		$("#cbt_route").gmap({
//			... insert other gmap options here,
			"center": mapLatLng,
			"zoom": settings.zoom,
			"callback": function() {
				var self = this;

//				self.addMarker({
//					"position": mapLatLng,
//					"bounds": false
//				}).click(function() {
//					self.openInfoWindow({"content": data.productid}, this);
//				});

				self.displayDirections({ 
					"origin": settings.origin, 
					"destination": mapLatLng, 
					"travelMode": settings.travelMode
				},
				{ "cbt_route": document.getElementById("cbt_route")}, 
				function(result, status) {
	                if (status != "OK" && settings.error) console.log("route not found");
				}
				); 
			}
		});

		popup(mapLatLng, settings.origin, settings.travelMode, settings.unitSystem, settings.plain);

	}

	function popup(mapLatLng, origin, travelMode, unitSystem, plain) {

		var request = {
				origin: origin,
				destination: mapLatLng, //latitude + "," + longitude,
				travelMode: travelMode,
				unitSystem: unitSystem,
				region: Globalize.culture().language
		};
		directionsService.route(request, function(result, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				var route = result.routes[0].legs[0];
				$("#cbt_route_distance").append(route.distance.text);
				$("#cbt_route_duration").append(route.duration.text);
				$("#cbt_route_start").append(route.start_address);
				$("#cbt_route_end").append(route.end_address);
				var html = "";
				for (var i = 0; i < route.steps.length; i++) {
					html += "<tr>";
					var instructions = route.steps[i].instructions;
					if (plain) {instructions = instructions.replace(new RegExp("<b>", 'g'),"");}
					html += "<td>" + instructions + "</td>";
					html += "<td>" + route.steps[i].distance.text + "</td>";
					html += "<td>" + route.steps[i].duration.text + "</td>";
					//console.log(route.steps[i].instructions)
					html += "</tr>";
				}
				$("#cbt_route_directions").append(html);
			}
		});
	};

})( jQuery );
