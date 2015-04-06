//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html

(function( $ ) {

	var settings = {
			pos: "",			// point of sale code
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

	$.fn.value = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh(e) {
		
		if (settings.error) console.log("value " + settings.pos + ", " + settings.model + ", " + settings.id + settings.error);

		$.getJSON(jsonURL(), {
			service : "value",
			pos : settings.pos,
			model : settings.model,
			id : settings.id
		},
		function(data) {
			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				var odd = true;
				var html = "<tbody><tr>";
				$.each(data.items, function(i, item) {
					if (odd) {html += "<tr class='odd'>";}
					else {html += "<tr class='even'>";}
					odd = !odd;
					if (settings.fields.length > 0) {
						for (var j = 0; j < settings.fields.length; j++) {				
							var key = settings.fields[j][0];
							if (item.key.toLowerCase() == key.toLowerCase()) {
								var name = settings.fields[j][1];
								var format = settings.fields[j][2];
								html += "<td>" + name + "</td>";
								html += "<td>" + formatted(item.value, format, "en-US") + "</td>";
							}
						}
					}
					else {
						html += "<td>" + item.key + "</td>";
						html += "<td>" + item.value + "</td>";
					}
					html += "</tr>";
				});
				html += "</tbody>";
				$(e).append(html);
			}
		})
		.error(function(data) {if (settings.error) console.log("value error");});
	}
	
	$.fn.value_set = function(options) {

		var settings = $.extend( {
			pos: "",			// point of sale code
			model: "",			// model type
			id: "",				// model ID
			error: false,		// include error messages
			fields: [ ]
		}, options);

		return this.each(function(i, e) {
			localize(function() {

				var kvs = "";
				var i = 0;
				for (i; i < settings.fields.length; i++) {kvs += (settings.fields[i][0] + ":" + settings.fields[i][1] + ",");}

				console.log("value_set " + settings.pos + ", " + settings.model + ", " + settings.id + ", " + kvs + ", " + settings.error)
//				var params = {};
//				params.service = "value";
//				params.method = "set";
//				params.pos = settings.pos;
//				params.model = settings.model;
//				params.id = settings.id;
//				params.kvs = new Array();
//				var i = 0;
//				for (i; i < settings.fields.length; i++) {
//				params.kvs[i] = "{" + settings.fields[i][0] + ":" + settings.fields[i][1] +"},";
//				}

				$.getJSON(jsonURL(), {
					service : "value",
					method : "set",
					pos : settings.pos,
					model : settings.model,
					id : settings.id,
					kvs: kvs
						},
						function(data) {
							if (data.message) {if (settings.error) console.log(data.message);}
							else {


							}
						})
						.error(function(data) {if (settings.error) console.log("value_set error");});
			});	
		});
	};

	$.fn.keyvalue = function (kvs, key) {
		var i = 0;
		for (i; i < kvs.length; i++) {
			if (kvs[i].key == key) {return kvs.value;}
		}
		return null;
	};

})( jQuery );
