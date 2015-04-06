//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://jqueryui.com/demos/datepicker/#date-range
//See http://docs.jquery.com/Plug-ins/Validation

(function( $ ) {

	var settings = {
			pos: "",						// point of sale code
			productid: "",					// account ID
			currency: "USD",				// quote in currency
			dateformat: "d",   				// date format
			numberformat: "c",				// number format
			is_available: "Available",		// is available flag
			not_available: "Not Available",	// not available flag
			changeMonth: true,				// show year list
			changeYear: true,				// show month list
			error: false					// include error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				return this.each(function(i, e) {
					localize(function() {

						var dates = $( "#cbt_fromdate, #cbt_todate" ).datepicker({
//							defaultDate: "+1",
							changeMonth: settings.changeMonth,
							changeYear: settings.changeYear,
							numberOfMonths: 1,
							dateFormat: dateFormat(settings.dateformat),
							onSelect: function( selectedDate ) {
								var option = this.id == "cbt_fromdate" ? "minDate": "maxDate",
										instance = $( this ).data( "datepicker" ),
										date = $.datepicker.parseDate(
												instance.settings.dateFormat ||	$.datepicker._defaults.dateFormat,
												selectedDate, instance.settings );
								dates.not( this ).datepicker( "option", option, date );
								var fromdate = format($("#cbt_fromdate").datepicker("getDate"));
								var todate = format($("#cbt_todate").datepicker("getDate"));
								quoted(fromdate, todate);
							}
						});
						$("#cbt_fromdate, #cbt_todate").val(null);
					});
				});


				function format(date) {      // convert date to ISO format
					return $.datepicker.formatDate("yy-mm-dd", date);
				}

				function quoted(fromdate, todate) {

					if (settings.error) console.log("quote " + settings.pos + ", " + settings.productid + ", " + settings.dateformat + ", " + settings.numberformat + ", " + settings.is_available + ", " + settings.not_available + ", " + settings.error + ", " + fromdate + ", " + todate);

					if (!fromdate || !todate) return;

					$.getJSON(jsonURL(), {
						service: "quote",
						pos: settings.pos,
						productid: settings.productid,
						currency: settings.currency,
						fromdate: fromdate,
						todate: todate
					},
					function(data) {
						if (data.message) {if (settings.error) console.log(data.message);}
						else {
							$("#cbt_price").empty();
							$("#cbt_price").append(formatted(data.price, settings.numberformat, culture(data.currency)));
							$("#cbt_quote").empty();
							$("#cbt_quote").append(formatted(data.quote, settings.numberformat, culture(data.currency)));
							$("#cbt_deposit").empty();
							$("#cbt_deposit").append(data.deposit.toFixed(0) + "%");
							$("#cbt_status").empty();
							if (data.available) {$("#cbt_status").append(settings.is_available);}
							else {$("#cbt_status").append(settings.not_available);}
						}
					})
					.error(function(data) {if (settings.error) console.log("quote error");});
				}
			},
			productid : function( productid ) {
				if (settings.error) console.log("set productid " + productid);
				settings.productid = productid;
			},
			currency : function( currency ) {
				if (settings.error) console.log("set currency " + currency);
				settings.currency = currency;
			}
	};

	$.fn.quote = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

})( jQuery );
