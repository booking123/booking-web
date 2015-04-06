//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/

(function( $ ) {

	var settings = {
			pos: "",			// point of sale code
			productid: "",		// property ID
			rows: 6, 			// number of rows in table
			error: false,		// include error messages
			fields: [
			         ["date","Date","d"],
			         ["rating","Rating","n1"],
			         ["notes","Review"]
			         ]
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					localize(function() {
						refresh();
					});	
				});
			},
			productid : function( productid ) {
				if (settings.error) console.log("set productid " + productid);
				settings.productid = productid;
				refresh();
			}
	};

	$.fn.review = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {

		if (settings.error) console.log("review " + settings.pos + ", " + settings.productid + ", " + settings.rows + ", " + settings.error);

		$.getJSON(jsonURL(), {
			service : "review",
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
				$("#cbt_review").append(html);
			}
		})
		.error(function(data) {if (settings.error) console.log("review error");});
	}
})( jQuery );
