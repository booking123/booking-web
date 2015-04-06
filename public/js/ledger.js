//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/

(function( $ ) {

	$.fn.ledger = function(options) {

		var settings = $.extend( {
			pos: "",			// point of sale code
			error: false,		// include error messages
			fields: [
			          ["name","Account Name"],
			          ["subledger","Subsidiary Ledger"],
			          ["type","Account Type"],
			          ["notes","Notes"]
			         ]
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				if (settings.error) console.log("ledger " + settings.pos + ", " + settings.error);

				$.getJSON(jsonURL(), {
					service : "ledger",
					pos : settings.pos,
					productid : settings.productid,
					rows : settings.rows
				},
				function(data) {
					if (data.message) {if (settings.error) console.log(data.message);}
					else {
						var odd = true;
						var html = "<thead><tr>";
						for (var i = 0; i < settings.fields.length; i++) {html += "<th>" + settings.fields[i][1] + "</th>";}
						html += "</tr></thead><tbody>";
						$.each(data.items, function(i, item) {
							if (odd) {html += "<tr class='odd'>";}
							else {html += "<tr class='even'>";}
							odd = !odd;
							for (var i = 0; i < settings.fields.length; i++) {
								var value = eval("item." + settings.fields[i][0]);
								var format = settings.fields[i][2];
								html += "<td>" + formatted(value, format) + "</td>";
							}
							html += "</tr>";
						});
						$("#cbt_ledger").append(html);
					}
				})
				.error(function(data) {if (settings.error) console.log("ledger error");});
			});	
		});

	};

})( jQuery );
