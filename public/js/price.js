//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	var settings = {
			pos: "",			// point of sale code
			model: "",			// model type
			id: "",				// model ID
			date: "", 			// get prices at or from date
			currency: "",		// currency code
			type: null,			// price type where all = null
			start: 0, 			// start at this row of results
			rows: 6, 			// show number of rows
			error: false,		// include error messages
			fields: [
			         ]
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					localize(function() {
						refresh(e);
					});	
				});
			},
			id : function( id ) {
				if (settings.error) console.log("set id " + id);
				settings.id = id;
				refresh();
			},
			date : function( date ) {
				if (settings.error) console.log("set date " + date);
				settings.date = date;
				refresh();
			},
			currency : function( currency ) {
				if (settings.error) console.log("set currency " + currency);
				settings.currency = currency;
				refresh();
			}
	};

	$.fn.price = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh(e) {

		if (settings.error) console.log("price " + settings.pos + ", " + settings.model + ", " + settings.id + ", " + settings.date + ", " + settings.currency + ", " + settings.type + ", " + settings.start + ", " + settings.rows + ", " + settings.error);

		$.getJSON(jsonURL(), {
			service : "price",
			pos : settings.pos,
			model : settings.model,
			id : settings.id,
			date : settings.date,
			currency : settings.currency,
			type : settings.type,
			start : settings.start,
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
					for (var j = 0; j < settings.fields.length; j++) {
						var value = eval("item." + settings.fields[j][0]);
						var format = settings.fields[j][2];
						html += "<td>" + formatted(value, format, culture(item.currency)) + "</td>";
					}
					html += "</tr>";
				});
				$(e).append(html);
			}
		})
		.error(function(data) {if (settings.error) console.log("price error");});
	}
})( jQuery );
