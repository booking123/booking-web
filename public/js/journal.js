//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/

(function( $ ) {

	var settings = {
			pos: "",				// point of sale code
			accountid: "",			// account ID
			entityid: "0",   		// subsidiary account ID
			fromdate: "1970-01-01",	// from date
			todate: "2020-12-31",	// to date
			currency: "USD", 		// currency code
			rows: 50, 				// maximum number of rows
			error: true,			// include error messages
			fields: [
			         ["date","Date","d"],
			         ["name","Reference"],
			         ["description","Description",50],
			         ["debitamount","Debit","c0"],
			         ["creditamount","Credit","c0"]
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
			accountid : function( accountid ) {
				if (settings.error) console.log("set accountid " + accountid);
				settings.accountid = accountid;
				refresh();
			},
			entityid : function( entityid ) {
				if (settings.error) console.log("set entityid " + entityid);
				settings.entityid = entityid;
				refresh();
			},
			fromdate : function( fromdate ) {
				if (settings.error) console.log("set fromdate " + fromdate);
				settings.fromdate = fromdate;
				refresh();
			},
			todate : function( todate ) {
				if (settings.error) console.log("set todate " + todate);
				settings.todate = todate;
				refresh();
			},
			currency : function( currency ) {
				if (settings.error) console.log("set currency " + currency);
				settings.currency = currency;
				refresh();
			}
	};

	$.fn.journal = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh(e) {
		if (settings.error) console.log("account " + settings.pos + ", " + settings.accountid + ", " + settings.entityid + ", " + settings.fromdate + ", " + settings.todate+ ", " + settings.currency + ", " + settings.rows + ", " + settings.error);
		$.getJSON(jsonURL(), {
			service : "journal",
			pos : settings.pos,
			accountid : settings.accountid,
			entityid : settings.entityid,
			fromdate : settings.fromdate,
			todate : settings.todate,
			currency : settings.currency,
			rows: settings.rows
		},
		function(data) {
			if (data.message != undefined) {if (settings.error) console.log(data.message);}
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
						if (settings.fields[i][0] == "process") {value = process(value);}
						var format = settings.fields[i][2];
						html += "<td>" + formatted(value, format, culture(item.currency)) + "</td>";
					}
					html += "</tr>";
				});
				html += "</tbody>";
				//console.log(html)
				$(e).append(html);
			}
		})
		.error(function(data) {if (settings.error) console.log("journal error");});
	}

	function subaccount(entityname) {
		return entityname ? entityname : "";
	}

	function process(data) {
		switch (data){
		case "Payment": return "Pmt";
		case "Purchase": return "Pch";
		case "PurchaseSale": return "Inv";
		case "Receipt": return "Rct";
		case "ReservationSale": return "Inv";
		case "Sale": return "Inv";
		default : return "Jnl";
		}
	}

})( jQuery );
