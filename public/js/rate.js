//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	$.fn.rate = function(options) {

		var settings = $.extend( {
			pos: "",				// point of sale code
			reservationid: "",		// reservation ID
	        ratings: 5,				// number of rating options
			error: true,			// include error messages
			fields: []
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				if (settings.error) console.log("rate " + settings.pos + ", " + settings.reservationid  + ", Rating, " + settings.error);

				$.getJSON(jsonURL(), {
					service: "rate",
					pos: settings.pos,
					reservationid: settings.reservationid,
					type: "Rating"
				},
				function(data) {
					var odd = true;
					var html = "";
					for (var i = 0; i < settings.fields.length; i++) {
						if (odd) {html += "<tr class='odd'>";}
						else {html += "<tr class='even'>";}
						odd = !odd;
						var value = settings.fields[i][0];
						var label = settings.fields[i][1];
						html += "<td>" + label + "</td>";
						for (var j = 0; j < settings.ratings; j++) {
							html += "<td>" + "<input type='radio' name='cbt_rate_" + value + "' value='" + value + "-" + j + "'/></td>";
						}
						html += "</tr>";
					}
					$("#cbt_rate").append(html);
					if (data.message) {if (settings.error) console.log(data.message);}
					else {
						$.each(data.items, function(i, item) {
							//TODO:
							console.log("cbt_rate " + item)
						});						
					}
				})
				.error(function(data) {if (settings.error) console.log("rate error");});
			});	
		});
	};

	function result() {
		for (var i = 0; i < settings.fields.length; i++) {
			var value = settings.fields[i][0];
			for (var j = 0; j < settings.ratings; j++) {
				var x=4(e).getElementById("'" + value + "-" + j + "'").value;
				console.log(x);
			}
		}
	}
	
})( jQuery );
