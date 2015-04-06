//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	var settings = {
			pos : "",			// point of sale code
			model: "",			// model type
			id: "",				// model ID
			error: true,		// include error messages
			fields: []
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					localize(function() {refresh(e);});	
				});
			},
			id : function( id ) {
				if (settings.error) console.log("set id " + id);
				settings.id = id;
				refresh();
			}
	};

	$.fn.reservation = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh (e) {
		
		if (settings.error) console.log("reservation " + settings.pos + ", " + settings.model + ", " + settings.id + ", " + settings.error);

		$.getJSON(jsonURL(), {
			service : settings.model,
			pos : settings.pos,
			id : settings.id
		},
		function(data) {
			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				var odd = true;
				var html = "<tbody>";
				for (var i = 0; i < settings.fields.length; i++) {
					if (odd) {html += "<tr class='odd'>";}
					else {html += "<tr class='even'>";}
					odd = !odd;
					var value = eval("data." + settings.fields[i][0]);
					var label = settings.fields[i][1];
					var format = settings.fields[i][2];
					html += "<td>" + label + "</td><td>" + formatted(value, format, culture(data.currency)) + "</td>";
					html += "</tr>";
				}
				html += "</tbody>";
				$(e).append(html);
			}
		})
		.error(function(data) {if (settings.error) console.log("reservation error");});
	}
})( jQuery );
