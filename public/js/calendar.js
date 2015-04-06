//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://docs.jquery.com/UI/Datepicker

(function( $ ) {

	var settings = {
		pos: "",						// point of sale code
		productid: "",					// product ID
		dateformat: "d",   				// date format
		numberformat: "c",				// number format
		is_available: "Available",		// is available flag
		not_available: "Not Available",	// not available flag
		date: "1970-01-01", 			// from date
		changeMonth: true,				// show year list
		changeYear: true,				// show month list
		wait: 30000,					// refresh cycle in milliseconds
		error: true						// show error messages
	};
	var fromdate;
	var todate;
	var firstdate = true;
	
	var methods = {
		init : function(options) {

			settings = $.extend(settings, options);

			localize(function(data) {
				$("#cbt_fromdate").datepicker({ dateFormat: dateFormat(settings.dateformat) });
				$("#cbt_todate").datepicker({ dateFormat: dateFormat(settings.dateformat) });
			});

			return this.each(function(i, e) {

				localize(function(data) {
					if (settings.error && settings.wait < 5000) console.log("Refresh wait must be at least 5 seconds (5000 milliseconds)");
					else refresh();
				});
			});
		},
		productid : function( productid ) {
			if (settings.error) console.log("set productid " + productid);
			settings.productid = productid;
			refresh();
		}
	};

	$.fn.calendar = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else if (settings.error) {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh() {
		
		if (settings.error) console.log("calendar " + settings.pos + ", " + settings.productid + ", " + settings.date + ", " + jsonURL());

		$.getJSON(jsonURL(), {
			service : "calendar",
			pos : settings.pos,
			productid : settings.productid,
			date : settings.date
		},
		function(data) {
			var dates = [];
			var states = [];
			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				$.each(data.items, function(i, item) {
					dates.push(item.date);
					states.push(item.state);
				});

				$("#cbt_calendar").datepicker({
					//   ... insert datepicker options here,
					changeMonth: settings.changeMonth,
					changeYear: settings.changeYear,
					onSelect: function(dateText, inst) {
						if (firstdate) {
							fromdate = $.datepicker.formatDate("yy-mm-dd", new Date(dateText));
							todate = fromdate;
						}
						else {todate = $.datepicker.formatDate("yy-mm-dd", new Date(dateText));}
						firstdate = !firstdate;
						quote(fromdate, todate);
					},
					beforeShowDay : function(thedate) {
						var date = $.datepicker.formatDate("yy-mm-dd", thedate);
						var day = $.inArray(date, dates);
						if (day == -1) return [true, ""];
						else return [false, states[day]];
					}
				});
			}
		})
		.error(function(data) {if (settings.error) console.log("calendar error");});
		timerID = setTimeout(refresh, settings.wait);
	}

	function quote(  	// get quoted price for stay
			fromdate, 	// arrival date
			todate  	// last date
	) {

		var nd = new Date(todate);
		nd.setDate(nd.getDate() + 1);
		todate = $.datepicker.formatDate("yy-mm-dd", nd);
		
		if (settings.error) console.log("quote " + settings.pos + ", " + settings.productid + ", " + settings.dateformat + ", " + settings.numberformat + ", " + settings.is_available + ", " + settings.not_available + ", " + settings.error + ", " + fromdate + ", " + todate);

		if (!fromdate || !todate) return;

		$.getJSON(jsonURL(), {
			service : "quote",
			pos : settings.pos,
			productid : settings.productid,
			fromdate : fromdate,
			todate : todate
		},
		function(data) {
			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				$("#cbt_fromdate").html(formatted(fromdate, settings.dateformat, culture(data.currency)));
				$("#cbt_fromdate_readonly").html(formatted(fromdate, settings.dateformat, culture(data.currency)));
				$("#cbt_todate").html(formatted(todate, settings.dateformat, culture(data.currency)));
				$("#cbt_todate_readonly").html(formatted(todate, settings.dateformat, culture(data.currency)));
				$("#cbt_price").html(formatted(data.price, settings.numberformat, culture(data.currency)));
				$("#cbt_quote").html(formatted(data.quote, settings.numberformat, culture(data.currency)));
				$("#cbt_deposit").html(data.deposit.toFixed(0) + "%");
				if (data.available) {$("#cbt_status").html(settings.is_available);}
				else {$("#cbt_status").html(settings.not_available);}
				$("#cbt_quote_popup").dialog("open");
			}
		})
		.error(function(data) {if (settings.error) console.log("quote error");});
	}
	
})( jQuery );
