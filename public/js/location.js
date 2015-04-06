//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://code.google.com/p/jquery-ui-map/
//See examples http://code.google.com/p/jquery-ui-map/wiki/jquery_ui_map_v_3_sample_code
//See map options https://developers.google.com/maps/documentation/javascript/reference?hl=sv-SE#MapOptions

(function( $ ) {

	var settings = {
			pos: "", 			// point of sale code
			model: "",			// model type
			id: "",				// model ID
			origin: "",			// address of origin of route
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.IMPERIAL,
			plain: false,		// plain directions
			zoom: 15,			// zoom level 1 < zoom < 20
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
			id : function( id ) {
				if (settings.error) console.log("set id " + id);
				settings.id = id;
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
			},
			zoom : function( zoom ) {
				if (settings.error) console.log("set zoom " + zoom);
				settings.zoom = zoom;
				refresh();
			}
	};

	$.fn.location = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {
		
		if (settings.error) console.log("location " + settings.pos + ", " + settings.model + ", " + settings.id + ", "  + settings.origin + ", " + settings.travelMode + ", " + settings.unitSystem + ", " + settings.plain + ", " + settings.zoom + ", " + settings.heading + ", " + settings.pitch + ", " + settings.error);

		if (!settings.zoom || settings.zoom < 1 || settings.zoom > 20) {if (settings.error) console.log("Invalid zoom parameter - must be in the range 1 <= wait <= 20"); return;}

		$.getJSON(jsonURL(), {
			service : settings.model,
			pos : settings.pos,
			id : settings.id
		},
		function(data) {

			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				$("#cbt_map").map({
					latitude : data.latitude, 
					longitude : data.longitude, 
					zoom : settings.zoom, 
					content : data.name + "\n" + data.physicaladdress,
					error : settings.error
				});

				$("#cbt_view").view({
					latitude : data.latitude, 
					longitude : data.longitude, 
					zoom : settings.zoom, 
					heading: settings.heading,
					pitch: settings.pitch,
					error : settings.error
				});					

				$("#cbt_route").route({
					latitude :  data.latitude, 
					longitude : data.longitude, 
					//origin : settings.origin,
					travelMode : settings.travelMode,
					unitSystem : settings.unitSystem,
					plain : true, 
					error : settings.error
				});

				$("#cbt_route").route("origin", settings.origin);

				$("#cbt_route_popup").dialog({
					autoOpen: false
				});

				$("#cbt_route_click").click(function routePopup() {
					$( "#cbt_route_popup" ).dialog({ width: 700 });
					$("#cbt_route_popup").dialog("open");
				});

			}
		}).error(function(data) {if (settings.error) console.log("location error");});
	}
})( jQuery );
