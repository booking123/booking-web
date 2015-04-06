//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	$.fn.option = function(options) {

		var settings = $.extend( {
			pos: "",				// point of sale code
			model: "",				// model type
			id: "",					// model ID
			error: true,			// include error messages
			fields: []
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				if (settings.error) console.log("option " + settings.pos + ", " + settings.reservationid + ", " + settings.type + ", " + settings.error);

				$.getJSON(jsonURL(), {
					service: settings.model,
					method: "option",
					pos: settings.pos,
					reservationid: settings.id
				},
				function(data) {
	                var html = this;
	                $.each(data, function(index, item) {
	                    var option = new Option(item.name, item.id);
	                    option.add(option);
	                });
	                log.console("option html " + html)
					$(e).append(html);
				})
				.error(function(data) {if (settings.error) console.log("option error");});
			});	
		});
	};

    $(e).change(function() {
        log.console('you selected ' + $(this).val());
    });

})( jQuery );
