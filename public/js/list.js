//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	$.fn.list = function(options) {

		var settings = $.extend( {
			pos: "",				// point of sale code
			model: "",				// model type
			id: "",					// model ID
			type: "",				// list type
			error: true			// include error messages
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				if (settings.error) console.log("list " + settings.pos + ", " + settings.reservationid + ", " + settings.type + ", " + settings.error);

//				$.getJSON(jsonURL(), {
//					service: settings.model,
//					method: "list",
//					pos: settings.pos,
//					reservationid: settings.id
//				},
//				function(data) {
//					var html = '<ul>';
//	                $.each(data, function(index, item) {
//	                	html += '<li>' + item + '</li>';
//	                });
//	                html += '</ul>';
//	                log.console("list html " + html)
//					$(e).append(html);
//				})
//				.error(function(data) {if (settings.error) console.log("list error");});
				$(e).append("<ul><li>One</li><li>Two</li><li>Three</li><li>Four</li><li>Five</li></ul>")
			});	
		});
	};

//    $(e).change(function() {
//        log.console('you selected ' + $(this).val());
//    });

})( jQuery );
