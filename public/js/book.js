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
			productid: "",					// product ID
			dateformat: "d",   				// date format
			numberformat: "c",				// number format
			is_available: "Available",		// is available flag
			not_available: "Not Available",	// not available flag
			welcome: "Welcome back",		// welcome flag
			changeMonth: true,				// show year list
			changeYear: true,				// show month list
			notowner: true,					// true if guest is not the owner
			error: true						// include error messages
	};
	var dates = [];
	var states = [];

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);

				localize(function(data) {
					$("#cbt_fromdate, #cbt_todate").datepicker({
						//   ... insert datepicker options here,
						changeMonth: settings.changeMonth,
						changeYear: settings.changeYear,
						dateFormat: dateFormat(settings.dateformat),
						onSelect: function(dateText, inst) {
							quote($("#cbt_fromdate").datepicker("getDate"), $("#cbt_todate").datepicker("getDate"), data.currency);
						},
						beforeShowDay : function(thedate) {
							var date = $.datepicker.formatDate("yy-mm-dd", thedate);
//							var day = dates.indexOf(date);
							var day = $.inArray(date, dates);
							if (day == -1) return [true, ""];
							else return [false, states[day]];
						}
					});
				});

				return this.each(function(i, e) {

					var date = $.datepicker.formatDate("yy-mm-01", new Date());

					if (settings.error) console.log("book " + settings.pos + ", " + settings.productid + ", " + date + ", " + settings.dateformat + ", " + settings.numberformat);

					$("#cbt_loader").show();
					$.getJSON(jsonURL(), {
						service : "calendar",
						pos : settings.pos,
						productid : settings.productid,
						date : date
					},
					function(data) {
						$("#cbt_loader").hide();
						if (data.message) {if (settings.error) console.log(data.message);}
						else {
							$.each(data.items, function(i, item) {
								dates.push(item.date);
								states.push(item.state);
							});
						}
					})
					.error(function(data) {if (settings.error) console.log("calendar error");});

					var validator = $("#cbt_book_form").validate({	// validate form using jQuery validation plugin

						debug: false,       						// true for debugging

						invalidHandler: function(form, validator) {	// handle invalid fields
							message(validator.numberOfInvalids());
						},

						ignore: ".ignore",              			// ignore validation of fields with this class

						rules: {                					// validation rules
							cbt_fromdate: {
								required: true,
								date: true
							},
							cbt_todate: {
								required: true,
								date: true
							},
							cbt_emailaddress: {
								required: true,
								email: true
							},
							cbt_familyname: {
								required: true
							},
							cbt_cardholder: {
								required: "#cbt_cardholder:visible",
								minlength: 5
							},
							cbt_cardnumber: {
								required: "#cbt_cardnumber:visible",
								creditcard: "#cbt_cardnumber:visible"
							},
							cbt_cardcode: {
								required: "#cbt_cardcode:visible",
								minlength: 3
							},
//							cbt_notes: {
//								required: settings.notowner,
//								minlength: 10
//							},
							cbt_payment: {
								required: "#cbt_payment:visible",
								number: true,
								min: 0,
								max: 1000000
							}
						},

						messages: {              					// validation messages
							cbt_fromdate: {
								required: "Set the arrival date",
								date: "Enter a valid date"
							},
							cbt_todate: {
								required: "Set the arrival date",
								date: "Enter a valid date"
							},
							cbt_emailaddress: {
								required: "Enter an email address",
								email: "Enter a valid address"
							},
							cbt_familyname: {
								required: "Enter the family or company name"
							},
							cbt_cardholder: {
								required: "Enter the card holder",
								minlength: "Minimum {0} characters"
							},
							cbt_cardnumber: {
								required: "Enter the card number",
								creditcard: "Enter a valid card number"
							},
							cbt_cardcode: {
								required: "Enter the security code",
								minlength: "Minimum {0} characters"
							},
//							cbt_notes: {
//								required: "Enter reservation notes",
//								minlength: "Minimum {0} characters"
//							},
							cbt_payment: {
								required: "Enter payment amount",
								number: "Must be a number",
								min: "Minimum of {0}",
								max: "Maximum of {0}"
							}
						},

						submitHandler: function(form) { // overrides the default form submit event

							if (settings.error) console.log("book submitted " + jsonURL() + ", " + settings.pos + ", " + settings.productid + ", " + format($("#cbt_fromdate").datepicker("getDate")) + ", " + format($("#cbt_todate").datepicker("getDate")));

							$("#cbt_loader").show();
							$.getJSON(jsonURL(), {
								service : "book",
								pos : settings.pos,
								productid : settings.productid,
								fromdate : format($("#cbt_fromdate").datepicker("getDate")),
								todate : format($("#cbt_todate").datepicker("getDate")),
								emailaddress : $("#cbt_emailaddress").val(),
								familyname : $("#cbt_familyname").val(),
								firstname : $("#cbt_firstname").val(),
								notes : $("#cbt_notes").val(),
								cardholder : $("#cbt_cardholder").val(),
								cardnumber : $("#cbt_cardnumber").val(),
								cardmonth : $("#cbt_cardmonth").val(),
								cardyear : $("#cbt_cardyear").val(),
								cardcode : $("#cbt_cardcode").val(),
								amount : $("body").data("amount")
							},
							function (data) {
								$("#cbt_loader").hide();
								
								$("#cbt_book_form").get(0).reset();
								
								if (data.message) {
									$("#cbt_message").dialog("open");
									$("#cbt_message").html(data.message);
								}
								else {
									$("#cbt_popup").dialog("open");
									$("#cbt_reservationid").html(data.name);
								}
							}
						).error(function(data) {if (settings.error) console.log("book error");});
					
						
//						},
//						success: function(label) {                     // handles field success events
//							message(validator.numberOfInvalids());
						}
					});

					$("#cbt_emailaddress").change(function() {       // check if email address exists
						party($("#cbt_emailaddress").val());
					});

				});

				function message(errors) {
					if (errors) {
						$("#cbt_error").html("Please enter the highlighted field(s)");
						$("#cbt_error").show();
					} 
					else {$("#cbt_error").hide();}
				}

			},
			productid : function( productid ) {
				if (settings.error) console.log("productid " + productid);
				settings.productid = productid;
				cbt_reset();
			}
	};

	$.fn.book = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function format(date) {	// convert date to ISO format
		return $.datepicker.formatDate("yy-mm-dd", date);
	}

	function quote(			// get quoted price for stay
			fromdate,		// arrival date
			todate,			// departure date
			currency		// currency for formatting
	) {

		if (settings.error) console.log("quote " + jsonURL() + ", " + settings.pos + ", " + settings.productid + ", " + fromdate + ", " + todate);

		if (!fromdate || !todate) return;

		todate = new Date(todate.getFullYear(), todate.getMonth(), todate.getDate() + 1);
		$("#cbt_todate").val(formatted(todate, settings.dateformat, culture(currency)));

		$("#cbt_loader").show();
		$.getJSON(jsonURL(), {
			service : "quote",
			pos : settings.pos,
			productid : settings.productid,
			fromdate : format(fromdate),
			todate : format(todate)
		},
		function(data) {
			$("#cbt_loader").hide();
			if (data.message != undefined) console.log(data.message);
			$("#cbt_price").html(formatted(data.price, settings.numberformat, culture(data.currency)));
			$("#cbt_quote").html(formatted(data.quote, settings.numberformat, culture(data.currency)));
			$("#cbt_deposit").html(data.deposit.toFixed(0) + "%");
			if (data.available) {
				$("#cbt_status").html(settings.is_available);
				var amount = (data.quote * data.deposit / 100.0);
				$("#cbt_payment").html(formatted(amount, settings.numberformat, culture(data.currency)));
				$("body").data("amount", amount);
			}
			else {$("#cbt_status").html(settings.not_available);}
		})
		.error(function(data) {if (settings.error) console.log("quote error");});
	}

	function party(emailaddress) {		// get party using email address

		if (settings.error) console.log("party " + jsonURL() + ", " + settings.pos + ", " + emailaddress);

		$("#cbt_loader").show();
		$.getJSON(jsonURL(), {
			service : "party",
			method : "exists",
			pos : settings.pos,
			emailaddress : emailaddress,
			productid : settings.productid
		},
		function(data) {
			$("#cbt_loader").hide();
			if (data.name) {
				var names = data.name.split(",");
				var familyname = names[0];
				var firstname = (names.length < 2) ? "" : names[1] + " ";
				$("#cbt_familyname").val(familyname);
				$("#cbt_firstname").val(firstname);
				$("#cbt_cardholder").val(firstname + familyname);
				if (settings.welcome && firstname) {$("#cbt_notes").val("Welcome back " + firstname);}
				if (data.owner) {
					settings.notowner = false;
					$("#cbt_price").hide();
					$("#cbt_quote").hide();
					$("#cbt_deposit").hide();
					$("#cbt_payment").hide();
					$("#cbt_cardholder").hide();
					$("#cbt_cardnumber").hide();
					$("#cbt_cardmonth").hide();
					$("#cbt_cardyear").hide();
					$("#cbt_cardcode").hide();
					$("#cbt_notes").val("");
				}
				else {settings.notowner = true;}
			}
		})
		.error(function(data) {if (settings.error) console.log("email address error");});
	};

})( jQuery );
