//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/

(function( $ ) {

	var settings = {
			pos: "",		// point of sale code
			model: "",		// model type
			id: "",			// model ID
			language: "en",	// language code of text
			type: "Public", // text type which is one of:
			// Contents = contents included
			// Condition = terms and conditions
			// Contract = contract 
			// Options = options included
			// Public = model description
			error: false	// include error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					refresh(e);
				});
			},
			id : function( id ) {
				if (settings.error) console.log("set id " + id);
				settings.id = id;
				refresh();
			},
			language : function( language ) {
				if (settings.error) console.log("set language " + language);
				settings.language = language;
				refresh();
			},
			type : function( type ) {
				if (settings.error) console.log("set type " + type);
				settings.type = type;
				refresh();
			}
	};

	$.fn.info = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh(e) {
		if (settings.error) console.log("text " + settings.pos + ", " + settings.model + ", " + settings.id + ", " + settings.language + ", " + settings.type + ", " + settings.error);

		$.getJSON(jsonURL(), {
			service: "text",
			pos: settings.pos,
			model: settings.model,
			id: settings.id,
			language: settings.language,
			type: settings.type
		},
		function(data) {$(e).append(data.message);})
		.error(function(data) {if (settings.error) console.log("text error");});
	}
})( jQuery );
