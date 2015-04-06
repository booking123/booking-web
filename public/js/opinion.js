//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	$.fn.opinion = function(options) {

		var settings = $.extend( {
			pos: "",				// point of sale code
			reservationid: "",		// reservation ID
	        type : "opinion",		// type of opinion
	        legend: "Legend",		// legend of opinion
			error: true,			// include error messages
			fields: []
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				if (settings.error) console.log("opinion " + settings.pos + ", " + settings.reservationid + ", " + settings.type + ", " + settings.error);

				$.getJSON(jsonURL(), {
					service: "rate",
					pos: settings.pos,
					reservationid: settings.reservationid,
					type: settings.type
				},
				function(data) {
						var html = "<fieldset id=" + settings.type + ">";
						if (settings.legend) {html += "<legend>"+ settings.legend + "</legend>";}
						for (var i = 0; i < settings.fields.length; i++) {
							var value = settings.fields[i];
							html += "<div>" + "<input type='checkbox' name='" + settings.type + "' value='" + value + "'/>" + value + "</div>";
						}
						html += "</fieldset>";
						if (data.message) {if (settings.error) console.log(data.message);}
						else {
							$.each(data.items, function(i, item) {
								//TODO:
								console.log("opinion " + item)
							});													
						}
						$(e).append(html);
				})
				.error(function(data) {if (settings.error) console.log("opinion error");});
			});	
		});
	};

	function val() {
		for (var i = 0; i < settings.fields.length; i++) {
			var value = settings.fields[i][0];
			for (var j = 0; j < settings.ratings; j++) {
				var x=4(e).getElementById("'" + value + "-" + j + "'").value;
				console.log(x);
			}
		}
	}

})( jQuery );
