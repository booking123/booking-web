//-------------------------------------------------------------------------------------------------------
//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.10
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://docs.jquery.com/UI/Datepicker
//See API libraries at http://code.google.com/apis/libraries/devguide.html#jquery
//See CSS themes at http://the-xavi.com/articles/jquery-ui-css-themes-hosted-on-cdn
//-------------------------------------------------------------------------------------------------------
//This application is intended to illustrate how the jQuery plug-ins are used and is not intended for production use.
//It includes the jQuery Theme Switcher to preview the application with different themes. 
//Other themes can be created by editing the CSS classes in guest.css or with the jQuery ThemeRoller.
//Notes in the JavaScript below attempt to explain the purpose of each function.
//-------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
//Ensures that the HTML form is fully loaded before executing ang JavaScript.
//-------------------------------------------------------------------------------------------------------
$(document).ready(function() {

	//-------------------------------------------------------------------------------------------------------
	// The jQuery tabs function to lay out the application tabs. 
	//-------------------------------------------------------------------------------------------------------
	//$("#tabs").tabs();

	//-------------------------------------------------------------------------------------------------------
	// The parameters passed in the application URL.
	// Usage example is: http://razor-cloud.com/guest.html?pos=5e7e3a77b3714ea2&reservationid=100062
	// Test flag is typically true for development, false for deployment
	//-------------------------------------------------------------------------------------------------------
	var pos = "5e7e3a77b3714ea2"; //getURLParameter("pos");
	var reservationid =  "100062"; //getURLParameter("reservationid");
	var test =  true;

	$("#cbt_productname").val("Pezula Resort Hotel &amp; Spa");

	//-------------------------------------------------------------------------------------------------------
	// Reads the basic reservation data in JSON format using an AJAX call to the server.
	// Populates the fields using "cbt_..." tags to map from JSON data to HTML divisions.
	//-------------------------------------------------------------------------------------------------------
	if (test) console.log("reservation " + pos + "," + reservationid);

	$.getJSON(jsonURL(), {
		service: "reservation",
		pos: pos, 
		id: reservationid
	},
	function(reservation) {

		if (test) console.log("reservation data " + reservation.name + "," + reservation.fromdate + "," + reservation.todate + "," + reservation.notes);

		$("#cbt_reservationname").append(reservation.name);
		$("#cbt_customername").text(reservation.customername);
		$("#cbt_guestname_1").text(reservation.customername);
		$("#cbt_rate_customer").text(reservation.customername);		
		$("#cbt_productname").append(reservation.productname);
		$("#cbt_rate_product").append(reservation.productname);
		$("#cbt_emailaddress").append(reservation.emailaddress);
		$("#cbt_emailaddress_input").append(reservation.emailaddress);
		$("#cbt_mobilephone").append(reservation.mobilephone);

		$("#cbt_fromdate_readonly").html(formatted(reservation.fromdate, "d", culture(reservation.currency)));
		$("#cbt_todate_readonly").html(formatted(reservation.todate, "d", culture(reservation.currency)));
		$("#cbt_notes").val(reservation.notes);

		$("#cbt_price").append(formatted(reservation.price, "c", culture(reservation.currency)));
		$("#cbt_quote").append(formatted(reservation.quote, "c", culture(reservation.currency)));
		$("#cbt_balance").append(formatted(reservation.balance, "c", culture(reservation.currency)));
		$("#cbt_outstanding").append(formatted(reservation.balance, "c", culture(reservation.currency)));


		//-------------------------------------------------------------------------------------------------------
		// Reads the description of the property in JSON format using an AJAX call to the server.
		// Populates a division in the HTML document.
		// Note that the language can be specified using the appropriate ISO language code.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_description " + pos + "," + reservation.productid);

		$("#cbt_description").info({
			pos: pos, 
			model: "Product", 
			id: reservation.productid, 
			language: "en", 
			type: "Public"
		});

		//-------------------------------------------------------------------------------------------------------
		// Reads the image gallery of the property in JSON format using an AJAX call to the server.
		// Populates a division and navigator bar in the HTML document.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_image " + pos + "," + reservation.productid);

		$(".ui-icon-triangle-1-w").click(function() {
			prevImage('image');
			clearTimeout(timerID);
		});

		$(".ui-icon-triangle-1-e").click(function() {
			change('image');
			clearTimeout(timerID);
		});

		$(".ui-icon-play").click(function() {
			change('image');
		});

		$(".ui-icon-pause").click(function() {
			clearTimeout(timerID);
		});

		$("#cbt_image").image({
			pos: pos,
			model: "Product",
			id: reservation.productid,
			wait: 3000,
			sequence:1,
			error: true
		});


		//-------------------------------------------------------------------------------------------------------
		// Reads the description of the property in JSON format using an AJAX call to the server.
		// Populates a division in the HTML document.
		// Note that the language can be specified using the appropriate ISO language code.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_productlist " + pos + "," + reservation.productid);

		$("#cbt_productlist").list({
			pos: pos, 
			model: "Product", 
			id: reservation.productid, 
			type: "Public"
		});

		//-------------------------------------------------------------------------------------------------------
		// Uses the latitude and longitude of the booked property to display its position on a map.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_map " + "," + reservation.latitude + "," + reservation.longitude);

		var mapLatLng = new google.maps.LatLng(reservation.latitude, reservation.longitude);

		$("#cbt_map").gmap({
			//   ... insert other gmap options here,
			center: mapLatLng,
			zoom: 12,
			callback: function() {
				var self = this;
				self.addMarker({
					position: mapLatLng,
					bounds: false
				}).click(function() {
					self.openInfoWindow({content: "Test Description"}, this);
				});
			}
		});

		//-------------------------------------------------------------------------------------------------------
		// Uses the latitude and longitude of the booked property to display a route from another location.
		// The example shows a fixed origin but it may also be entered via a text or list field.
		// Change the origin with: $("#cbt_route").route("origin", "new_origin");
		// The route popup and button are to display the route text in a pop up window.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route " + "," + reservation.latitude + "," + reservation.longitude);

		$("#cbt_route").route({
			latitude :  reservation.latitude,
			longitude : reservation.longitude,
			origin : "Raleigh-Durham International Airport",
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			plain : true, 
			error : true
		});

		//-------------------------------------------------------------------------------------------------------
		// Sets the initial origin of the route.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route origin ");

		$("#cbt_route").route("origin","Raleigh-Durham International Airport");

		//-------------------------------------------------------------------------------------------------------
		// Changes the origin of the route when the text is changed.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route_origin");

		$("#cbt_route_origin").blur(function () {
			$("#cbt_route").route("origin", $("input#cbt_route_origin").val());
		});

		//-------------------------------------------------------------------------------------------------------
		// Prevents the display of the text of the route in a pop up panel.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route_popup ");

		$("#cbt_route_popup").dialog({
			autoOpen: false
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays the terms and conditions to rent the property in JSON format using an AJAX call to the server.
		// Populates a division in the HTML document.
		// Note that the language can be specified using the appropriate ISO language code.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_terms " + reservation.organizationid);
		
		$("#cbt_terms").info({
			pos: pos, 
			model: "Party",
			id: reservation.organizationid, 
			language: "en", 
			type: "Contract"
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays the text of the route in a pop up panel when a button is clicked.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route_click ");

		$("#cbt_route_click").click(function routePopup() {
			$( "#cbt_route_popup" ).dialog({ width: 700 });
			$("#cbt_route_popup").dialog("open");
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays the standard rates of the property in a table using an AJAX call to the server.
		//-------------------------------------------------------------------------------------------------------
		$("#cbt_pricelist").price({
			pos : pos,
			model : "Product",
			id : "1108",
			date : "2012-01-01",
			currency : "EUR",
			rows : 8,
			error : true,
			fields : [
			          ["fromdate","From Date","d"],
			          ["todate","To Date","d"],
			          ["price","Rate","c0"],
			          ["minimum","Minimum","c0"]
			          ]
		});

		$("#cbt_pricelist").price("currency","USD");

		//-------------------------------------------------------------------------------------------------------
		// Displays availability of the property in a calendar using an AJAX call to the server.
		//-------------------------------------------------------------------------------------------------------
		$("#cbt_calendar").calendar({
			pos: pos, 
			productid: "1108", 
			dateformat: "d",
			numberformat: "c",
			is_available: "Available",
			not_available: "Not Available",
			date: $.datepicker.formatDate("yy-mm-01", new Date()), 
			changeMonth: true,
			changeYear: false,
			error: true
		});

		$("#cbt_quote_popup").dialog({
			autoOpen: false
		});

		$("#cbt_popup").dialog({
			autoOpen: false
		});

		$("#cbt_message").dialog({
			autoOpen: false
		});

		//-------------------------------------------------------------------------------------------------------
		// Creates validated reservation using an AJAX call to the server.
		//-------------------------------------------------------------------------------------------------------
		$("#cbt_book_form").validate({	// validate form using jQuery validation plugin

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
					required: settings.notowner,
					minlength: 5
				},
				cbt_cardnumber: {
					required: settings.notowner,
					creditcard: true
				},
				cbt_cardcode: {
					required: settings.notowner,
					minlength: 3
				},
				cbt_notes: {
					required: settings.notowner,
					minlength: 10
				},
				cbt_payment: {
					required: settings.notowner,
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
						//remote: jQuery.format("{0} is already in use")
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
				cbt_payment: {
					required: "Enter payment amount",
					number: "Must be a number",
					min: "Minimum of {0}",
					max: "Maximum of {0}"
				},
				cbt_notes: {
					required: "Enter reservation notes",
					minlength: "Minimum {0} characters"
				}
			},

			submitHandler: function(form) { // overrides the default form submit event

				if (settings.error) console.log("book submitted " + jsonURL() + ", " + settings.pos + ", " + settings.productid + ", " + format($("#cbt_fromdate").datepicker("getDate")) + ", " + format($("#cbt_todate").datepicker("getDate")));

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
					//console.log("response quote " + data.quote + " amount " + data.amount)

					$("#cbt_book_form").get(0).reset();

					if (data.message) {
						$("#cbt_message").dialog("open");
						$("#cbt_message").html(data.message);
					}
					else {
						$("#cbt_popup").dialog("open");
						$("#cbt_reservationid").html(data.name);
					}
				}).error(function(data) {if (settings.error) console.log("book error");});
			}
		});

		$("#cbt_emailaddress").change(function() {       // check if email address exists
			party($("#cbt_emailaddress").val());
		});

	});


});

function format(date) {	// convert date to ISO format
	return $.datepicker.formatDate("yy-mm-dd", date);
}

function cbt_reset() {
	$("#cbt_price").empty();
	$("#cbt_quote").empty();
	$("#cbt_deposit").html("");
	$("#cbt_payment").empty();
	$("#cbt_status").empty();
}
document.onreset = cbt_reset;

function cbt_nocr(evt) {
	var evt = (evt) ? evt : ((event) ? event : null);
	var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
	if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}
document.onkeypress = cbt_nocr;
