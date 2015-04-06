//-------------------------------------------------------------------------------------------------------
// Concept, script and CSS copyright CBT Limited
// Author	CBT Limited, London, UK
// Version	3.0.10
// See license at http://razor-cloud.com/razor/License.html
// See http://api.jquery.com/jQuery.getJSON/
// See http://docs.jquery.com/UI/Datepicker
// See API libraries at http://code.google.com/apis/libraries/devguide.html#jquery
// See CSS themes at http://the-xavi.com/articles/jquery-ui-css-themes-hosted-on-cdn
//-------------------------------------------------------------------------------------------------------
// This application is intended to illustrate how the jQuery plug-ins are used and is not intended for production use.
// It includes the jQuery Theme Switcher to preview the application with different themes. 
// Other themes can be created by editing the CSS classes in guest.css or with the jQuery ThemeRoller.
// Notes in the JavaScript below attempt to explain the purpose of each function.
//-------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
// Ensures that the HTML form is fully loaded before executing ang JavaScript.
//-------------------------------------------------------------------------------------------------------
$(document).ready(function() {

	//-------------------------------------------------------------------------------------------------------
	// The jQuery Theme Switcher to preview different standard themes. 
	//-------------------------------------------------------------------------------------------------------
	$("#switcher").themeswitcher({
		height: 800,
		width: 400,
		buttonPreText: "You can select a different theme. This is "
	});

	//-------------------------------------------------------------------------------------------------------
	// The jQuery tabs function to lay out the application tabs. 
	//-------------------------------------------------------------------------------------------------------
	$("#tabs").tabs();

	//-------------------------------------------------------------------------------------------------------
	// The parameters passed in the application URL.
	// Usage example is: http://razor-cloud.com/guest.html?pos=5e7e3a77b3714ea2&reservationid=100062
	// Test flag is typically true for development, false for deployment
	//-------------------------------------------------------------------------------------------------------
	var pos = getURLParameter("pos");
	var reservationid = getURLParameter("reservationid");
	var test =  false;
	
	//-------------------------------------------------------------------------------------------------------
	// Reads the basic reservation data in JSON format using an AJAX call to the server.
	// Populates the fields using "cbt_..." tags to map from JSON data to HTML divisions.
	//-------------------------------------------------------------------------------------------------------
	if (test) console.log("reservation " + jsonURL() + "," + pos + "," + reservationid);
	
	$.getJSON(jsonURL(), {
		service: "reservation",
		pos: pos, 
		id: reservationid
	},
	function(reservation) {
		
		$("#cbt_reservationname").append(reservation.name);
		$("#cbt_customername").text(reservation.customername);
		$("#cbt_guestname_1").text(reservation.customername);
		$("#cbt_rate_customer").text(reservation.customername);		
		$("#cbt_productname").append(reservation.productname);
		$("#cbt_rate_product").append(reservation.productname);
		$("#cbt_emailaddress").append(reservation.emailaddress);
		$("#cbt_emailaddress_input").append(reservation.emailaddress);
		$("#cbt_mobilephone").append(reservation.mobilephone);
		
		$("#cbt_fromdate").append(reservation.fromdate);
		$("#cbt_todate").append(reservation.todate);
		$("#cbt_notes").append(reservation.notes);
		
		$("#cbt_price").append(formatted(reservation.price, "c", culture(reservation.currency)));
		$("#cbt_quote").append(formatted(reservation.quote, "c", culture(reservation.currency)));
		$("#cbt_balance").append(formatted(reservation.balance, "c", culture(reservation.currency)));
		$("#cbt_outstanding").append(formatted(reservation.balance, "c", culture(reservation.currency)));

		//-------------------------------------------------------------------------------------------------------
		// Get alternative arrival date by adding one day
		//-------------------------------------------------------------------------------------------------------
		var fromdatealt = $.datepicker.parseDate("yy-mm-dd", reservation.fromdate);
		fromdatealt.setDate(fromdatealt.getDate() + 1);
		fromdatealt = $.datepicker.formatDate("yy-mm-dd", fromdatealt);

		//-------------------------------------------------------------------------------------------------------
		// Create options list from these two dates
		//-------------------------------------------------------------------------------------------------------
		$("#cbt_etadate").get(0).options[$("#cbt_etadate").get(0).options.length] = new Option(reservation.fromdate, reservation.fromdate);
		$("#cbt_etadate").get(0).options[$("#cbt_etadate").get(0).options.length] = new Option(fromdatealt, fromdatealt);

		//-------------------------------------------------------------------------------------------------------
		// Times are in ISO 9601 format (hh:mm:ss) and are split into hour and minute lists
		//-------------------------------------------------------------------------------------------------------
		var arrivaltime = reservation.arrivaltime.split(":", 3); 
		$("#cbt_arrival_hour").val(arrivaltime[0]);
		$("#cbt_arrival_minute").val(arrivaltime[1]);

		var departuretime = reservation.departuretime.split(":", 3);
		$("#cbt_departure_hour").val(departuretime[0]);
		$("#cbt_departure_minute").val(departuretime[1]);

		// Sets the default number of key sets to the number of rooms.
		$("#cbt_keys").val(reservation.productroom);
		
		$("#cbt_termsaccepted").val(reservation.termsaccepted);

		//-------------------------------------------------------------------------------------------------------
		// Reads the priced features of the property (product) in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name, label and optional format.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_feature " + pos + "," + reservationid);
		
		$("#cbt_feature").feature({
			pos: pos,
			model: "product",
			id: reservation.productid,
			date: reservation.fromdate,
			currency: reservation.currency,
			rows: 4,
			error: test,
			fields: [
			         ["type","Type","_"],
			         ["name","Feature Name"],
			         ["price","Price","c"],
			         ["unit","Unit"],
			         ["notes","Description"]
			         ]
		});

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
			wait: 1500,
			sequence:1,
			error: test
		});

		function cbt_reset() {
			$("#cbt_price").empty();
			$("#cbt_quote").empty();
			$("#cbt_payment").empty();
			$("#cbt_status").empty();
		}

		//-------------------------------------------------------------------------------------------------------
		// Reads the details of a bank account in JSON format using an AJAX call to the server.
		// Populates a list columns from JSON data into an HTML table.
		// The fields specify respectively the field name, label and optional format.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_finance " + reservation.financeid);
		
		$("#cbt_finance").finance({
			pos: pos,
			model: "finance",
			id: reservation.financeid,
			error: test,
			fields: [
			         ["bankname","Bank"],
			         ["branchname","Branch"],
			         ["branchnumber","Branch #"],
			         ["name","Name"],
			         ["accountnumber","Account #"],
			         ["ibanswift","IBAN/SWIFT"],
			         ["currencyname","Currency"]
			         ]
		});

		//-------------------------------------------------------------------------------------------------------
		// Reads the transactions of a ledger account and subsidiary account in JSON format using an AJAX call to the server.
		// Populates a list columns from JSON data to a HTML table.
		// The fields specify respectively the field name, label and optional format.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_journal " + reservation.productid);
		
		$("#cbt_journal").journal({
			pos: pos, 
			accountid: "61", 
			entityid: reservation.productid, 
			fromdate: "1970-01-01", 
			todate: "2020-12-31", 
			currency: reservation.currency,
			error: test,
			fields: [
						 ["date","Date","d"],
						 ["process","Trn"],
						 ["name","Folio"],
						 ["description","Description",40],
						 ["debitamount","Debit","c"],
						 ["creditamount","Credit","c"]
					]
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
		// Uses the latitude and longitude of the booked property to display its street view.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_view " + "," + reservation.latitude + "," + reservation.longitude);
		
		$("#cbt_view").view({
			latitude: reservation.latitude, 
			longitude: reservation.longitude, 
			zoom: 12, 
			heading: 0,
			pitch: 0,
			error: test
		});					

		//-------------------------------------------------------------------------------------------------------
		// Uses the latitude and longitude of the booked property to display a route from another location.
		// The example shows a fixed origin but it may also be entered via a text or list field.
		// Change the origin with: $("#cbt_route").route("origin", "new_origin");
		// The route popup and button are to display the route text in a pop up window.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_route " + "," + reservation.latitude + "," + reservation.longitude);
		
		$("#cbt_route").route({
			latitude:  reservation.latitude, 
			longitude: reservation.longitude, 
			origin: "Raleigh-Durham International Airport",
			travelMode: google.maps.TravelMode.DRIVING,
			unitSystem: google.maps.UnitSystem.METRIC,
			plain: true, 
			error: test
		});

		if (test) console.log("cbt_route origin ");
		
		$("#cbt_route").route("origin","Raleigh-Durham International Airport");

		if (test) console.log("cbt_route_popup ");
		
		$("#cbt_route_popup").dialog({
			autoOpen: false
		});

		if (test) console.log("cbt_route_click ");
		
		$("#cbt_route_click").click(function routePopup() {
			$( "#cbt_route_popup" ).dialog({ width: 700 });
			$("#cbt_route_popup").dialog("open");
		});
		
		//-------------------------------------------------------------------------------------------------------
		// Reads the party record of the property manager in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name, label and optional format.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_party " + "," + reservation.organizationid);
		
		$("#cbt_party").party({
			pos: pos,
			model: "Party",
			id: reservation.organizationid,
			error: test,
			fields: [
			         ["name","Company Name"],
			         ["emailaddress","Email Address"],
			         ["webaddress","Web URL"],
			         ["dayphone","Phone Number"],
			         ["faxphone","Fax Number"],
			         ["mobilephone","Mobile Phone"],
			         ["nightphone","Skype Number"],
			         ["postaladdress","Postal Address", 40],
			         ["postalcode","Postal Code"],
			         ["country","Country"],
			         ["currency","Currency"],
			         ["identitynumber","Company Number"],
			         ["taxnumber","Tax Reference"]
			         ]
		});

		//-------------------------------------------------------------------------------------------------------
		// Reads the check in instructions of the property in JSON format using an AJAX call to the server.
		// Populates a division in the HTML document.
		// Note that the language can be specified using the appropriate ISO language code.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_checkin " + "," + reservation.productid);

		$("#cbt_checkin").info({
			pos: pos, 
			model:"Product", 
			id: reservation.productid, 
			language:"en", 
			type: "CheckIn"
		});

		//-------------------------------------------------------------------------------------------------------
		// Gets local weather conditions using the Yahoo! weather service.
		// See http://developer.yahoo.com/weather/ for the meaning and permissible values of the parameters.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_weather " + "," + "2521361");

		$("#cbt_weather").weather({
			wid: 2521361,
			unit: "f",
			image: true,
			range: true,
			wind: true,
			link: true,
			date: true,
			error: test
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays a radio button array of ratings of the property in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name and label.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_rate " + "," + reservationid);

		$("#cbt_rate").rate({
			pos: pos,
			reservationid: reservationid,
			ratings: 5,
			error: test,
			fields:	[
				       	 ["overall","Overall"],
				       	 ["check_in","Check-in"],
				       	 ["cleanliness","Cleanliness"],
				       	 ["comfort","Comfort"],
				       	 ["location","Location"],
				       	 ["service","Service"],
				       	 ["value","Value"]
			       	 ]
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays a check box array of reasons to rent of the property in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name and label.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_reason " + "," + reservationid);

		$("#cbt_reason").opinion({
			pos: pos,
			reservationid: reservationid,
			type: "cbt_reason",
			legend: "Reason for Accommodation",
			error: test,
			fields:	[
				       	 ["Beach / Sun"],
				       	 ["Business Meeting / Event"],
				       	 ["Concert / Music Festival"],
				       	 ["Gambling / Casinos"],
				       	 ["Golf"],
				       	 ["Great Food / Wine"],
				       	 ["Museum / Cultural / Historical"],
				       	 ["Outdoor / Adventure"],
				       	 ["Shopping"],
				       	 ["Skiing / Winter Sports"],
				       	 ["Spa"],
				       	 ["Sporting Event"],
				       	 ["Theme / Amusement Park"],
				       	 ["Other"]
			       	 ]
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays a check box array of opinions about the quality of the property in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name and label.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_quality " + "," + reservationid);

		$("#cbt_quality").opinion({
			pos: pos,
			reservationid: reservationid,
			type: "cbt_quality",
			legend: "Accommodation Qualities",
			error: test,
			fields:	[
				       	 ["Beautiful"],
				       	 ["Charming"],
				       	 ["Comfortable"],
				       	 ["Cozy"],
				       	 ["Elegant"],
				       	 ["Hidden Gem"],
				       	 ["Hot Spot"],
				       	 ["Incredible Staff"],
				       	 ["No Frills"],
				       	 ["Plush"],
				       	 ["Quiet"],
				       	 ["Romantic"],
				       	 ["Roomy"],
				       	 ["Trendy"]
			       	 ]
		});

		//-------------------------------------------------------------------------------------------------------
		// Displays a check box array of opinions about the suitability of the property in JSON format using an AJAX call to the server.
		// Populates fields to map each column from JSON data to an HTML table.
		// The fields specify respectively the field name and label.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_suitability " + "," + reservationid);
		
		$("#cbt_suitability").opinion({
			pos: pos,
			reservationid: reservationid,
			type: "cbt_suitability",
			legend: "Property is Suitable for",
			error: test,
			fields:	[
			       	 ["Families with Teenagers"],
			       	 ["Families with Young Children"],
			       	 ["Friends and Family"],
			       	 ["Friends Getaway"],
			       	 ["Large Groups"],
			       	 ["Luxury Minded Travellers"],
			       	 ["Older Travellers"],
			       	 ["People with Disabilities"],
			       	 ["Rugged Travellers"],
			       	 ["Tourists"],
			       	 ["Young Singles"]
			       	 ]
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
		// Reads arbitrary key value pairs in JSON format using an AJAX call to the server.
		// Populates the fields using "cbt_..." tags to map from JSON data to HTML divisions.
		// Note that this allows non-standard data to be defined and stored on the server.
		// The value() function returns a value from a list of key value pairs and a key.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("value" + reservationid);

		function value(kvs, key) {
			var i = 0;
			for (i; i < kvs.length; i++) {
				if (kvs[i].key == key) {return kvs.value;}
			}
			return null;
		};

		$.getJSON(jsonURL(), {
			service: "value",
			pos: pos,
			model: "Reservation",
			id: reservationid
		},
		function(keyvalues) {
			if (keyvalues.message) {if (test)  console.log(keyvalues.message);}
			else {
				$("#cbt_beverage").val(value(keyvalues, "beverage"));
				$("#cbt_etadate").val(value(keyvalues, "etadate"));
				$("#cbt_flight").val(value(keyvalues, "flight"));

				var guestname_1 = value(keyvalues, "guestname_1");
				if (guestname_1) {$("#cbt_guestname_1").val(guestname_1);} //do not override default
				$("#cbt_agerange_1").val(value(keyvalues, "agerange_1"));

				$("#cbt_guestname_2").val(value(keyvalues, "guestname_2"));
				$("#cbt_agerange_2").val(value(keyvalues, "agerange_2"));

				$("#cbt_guestname_3").val(value(keyvalues, "guestname_3"));
				$("#cbt_agerange_3").val(value(keyvalues, "agerange_3"));

				$("#cbt_guestname_4").val(value(keyvalues, "guestname_4"));
				$("#cbt_agerange_4").val(value(keyvalues, "agerange_4"));

				$("#cbt_guestname_5").val(value(keyvalues, "guestname_5"));
				$("#cbt_agerange_5").val(value(keyvalues, "agerange_5"));

				$("#cbt_guestname_6").val(value(keyvalues, "guestname_6"));
				$("#cbt_agerange_6").val(value(keyvalues, "agerange_6"));
			}
		})
		.error(function(data) {if (test)  console.log("guest error");});

		//-------------------------------------------------------------------------------------------------------
		// Validates the content of cbt_guest_form prior to submitting it to the server.
		// Any errors are displayed adjascent to the appropriate fields.
		// Reads the fields having "cbt_..." tags into JSON reservation fields or into a list of JSON key values.
		// Updates standard reservation values in JSON format using an AJAX call to the server.
		// Updates non-standard key value pairs in JSON format using another AJAX call to the server.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_guest_form" + reservationid);

		$("#cbt_guest_form").validate({ // validate form using jQuery validation plug-in

			debug: true, 		// true for debugging

			invalidHandler: function(form, cbt_guest_validator) { // handle invalid fields
				message(cbt_guest_validator.numberOfInvalids());
			},

			ignore: ".ignore",  // ignore validation of fields with this class

			rules: { 			// validation rules
				cbt_beverage: {
					required: true
				},
				cbt_country_phone_code: {
					required: true
				},
				cbt_emailaddress_input: {
					required: true,
					email: true
				},
				cbt_etadate: {
					required: true
				},
				cbt_flight: {
					required: true,
					minlength: 5
				},
				cbt_keys: {
					required: true
				},
				cbt_mobilephone: {
					required: true,
					minlength: 10
				},
				cbt_notes: {
					required: true,
					minlength: 10
				},
				cbt_termsaccepted: {
					required: true
				}
			},

			messages: { 		// validation messages
				cbt_beverage: "Select a beverage",
				cbt_mobilephone: {
					required: "To keep in touch",
					minlength: "Minimum ten characters"
				},
				cbt_etadate: {
					required: "Enter the ETA date"
				},
				cbt_flight: {
					required: "Enter a flight number",
					minlength: "Minimum five characters"
				},
				cbt_keys: {
					required: "Key sets needed"
				},
				cbt_emailaddress_input: {
					required: "Direct email address",
					email: "Valid address required"
				},
				cbt_notes: {
					required: "Enter any special requests",
					minlength: "Minimum ten characters"
				},
				cbt_termsaccepted: {
					required: "Please agree to the terms"
				}
			},

			submitHandler: function(form) { // overrides the default form submit event

				$.getJSON(jsonURL(), {
					service: "reservation",
					method: "set",
					pos: pos,
					reservationid: reservationid,
					arrivaltime: $("#cbt_arrival_hour").val() + ":" + $("#cbt_arrival_minute").val() + ":00",
					beverage: $("#cbt_beverage").val(),
					departuretime: $("#cbt_departure_hour").val() + ":" + $("#cbt_departure_minute").val() + ":00",
					emailaddress: $("#cbt_emailaddress_input").val(),
					mobilephone: $("#cbt_mobilephone").val(),
					notes: $("#cbt_notes").val(),
					termsaccepted: $("#cbt_termsaccepted").val()
				}).error(function(data) {if (test) console.log("reservation.set error");});
				

				$.getJSON(jsonURL(), {
					service: "value",
					method: "set",
					pos: pos,
					model: "Reservation",
					id: reservationid,
					keyvalues: [
					            	["beverage", $("#cbt_beverage").val()],
					            	["etadate", $("#cbt_etadate").val()],
					            	["flight", $("#cbt_flight").val()],
					            	["guestname_1", $("#cbt_guestname_1").val()],
					            	["agerange_1", $("#cbt_agerange_1").val()],
					            	["guestname_2", $("#cbt_guestname_2").val()],
					            	["agerange_2", $("#cbt_agerange_2").val()],
					            	["guestname_3", $("#cbt_guestname_3").val()],
					            	["agerange_3", $("#cbt_agerange_3").val()],
					            	["guestname_4", $("#cbt_guestname_4").val()],
					            	["agerange_4", $("#cbt_agerange_4").val()],
					            	["guestname_5", $("#cbt_guestname_5").val()],
					            	["agerange_5", $("#cbt_agerange_5").val()],
					            	["guestname_6", $("#cbt_guestname_6").val()],
					            	["agerange_6", $("#cbt_agerange_6").val()]
					            ]

				}).error(function(data) {if (test) console.log("guestset error");});
			}
		});

		//-------------------------------------------------------------------------------------------------------
		// Validates the content of cbt_card_form prior to submitting it to the server.
		// Any errors are displayed adjascent to the appropriate fields.
		// Reads the fields having "cbt_..." tags into a JSON map message.
		// Updates credit card values in JSON format using an AJAX call to the server.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_card_form" + reservation.financeid);

		$("#cbt_card_form").validate({								// validate form using jQuery validation plug-in

			debug: true,       										// true for debugging

			invalidHandler: function(form, cbt_card_validator) {	// handle invalid fields
				message(cbt_card_validator.numberOfInvalids());
			},

			ignore: ".ignore",              						// ignore validation of fields with this class

			errorLabelContainer: "#cbt_card_error",					// location to display errors

			rules: {                								// validation rules
				cbt_emailaddress: {
					required: true,
					email: true
				},
				cbt_cardholder: {
					required: true,
					minlength: 5
				},
				cbt_cardnumber: {
					required: true,
					creditcard: true
				},
				cbt_cardcode: {
					required: true,
					minlength: 3
				},
				cbt_cardamount: {
					required: true,
					min: 10,
					max: 1000000,
					number: true						
				}
			},

			messages: {              								// validation messages
				cbt_emailaddress: {
					required: "Enter an email address",
					email: "Enter a valid address"
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
				cbt_cardamount: {
					required: "Enter payment amount",
					min: "Minimum of {0}",
					max: "Maximum of {0}",
					number: "Must be a number"
				}
			},

			submitHandler: function(form) { 				// overrides the default form submit event

				$.getJSON(jsonURL(), {
					service: "card",
					pos: pos,
					productid: reservation.financeid,
					date: $.datepicker.formatDate("yy-mm-01", new Date()),
					emailaddress: $("#cbt_emailaddress").val(),
					cardholder: $("#cbt_cardholder").val(),
					cardnumber: $("#cbt_cardnumber").val(),
					cardmonth: $("#cbt_cardmonth").val(),
					cardyear: $("#cbt_cardyear").val(),
					cardcode: $("#cbt_cardcode").val(),
					amount: $("#cbt_cardamount").val()
				},
				function (data) {
					if (data.message) {
						if (test) console.log(data.message);
					}
					else {
						$("#cbt_popup").dialog("open");
					}
				}).error(function(data) {if (test) console.log("card error");});
			}
		});

		//-------------------------------------------------------------------------------------------------------
		// Validates the content of cbt_rate_form prior to submitting it to the server.
		// Any errors are displayed adjascent to the appropriate fields.
		// Reads the fields having "cbt_..." tags into a JSON map message.
		// Updates rating values in JSON format using an AJAX call to the server.
		// The atLeastOneChecked function ensures that at least one items is checked.
		//-------------------------------------------------------------------------------------------------------
		if (test) console.log("cbt_rate_form" + reservationid);

		jQuery.validator.addMethod('atLeastOneChecked', function(value, element) {
			return ($('.Opinion input:checked').length > 0);
		});

		
		$("#cbt_rate_form").validate({								// validate form using jQuery validation plug-in

			debug: true,       										// true for debugging

			invalidHandler: function(form, cbt_rate_validator) {	// handle invalid fields
				message(cbt_rate_validator.numberOfInvalids());
			},

			ignore: ".ignore",              						// ignore validation of fields with this class

			errorLabelContainer: "#cbt_rate_error",					// location to display errors

			rules: {                								// validation rules
				cbt_rate_notes: {
					required: true
				},
				cbt_rate_overall: {
					required: true
				},
				cbt_reason: { 
					required: true,
					minlength: 2
				},
				cbt_quality: { 
					required: true,
					minlength: 2
				},
				cbt_suitability: { 
					required: true,
					minlength: 2
				}
			},

			messages: {              									// validation messages
				cbt_rate_notes: {
					required: "Please comment!"
				},
				cbt_rate_overall: {
					required: "Please give an overall rating"
				},
				cbt_reason: {
					required: "Please give reason(s) for your trip",
					minlength: "Please select at least two options"
				},
				cbt_quality: {
					required: "Please rate the property quality",
					minlength: "Please select at least two options"
				},
				cbt_suitability: {
					required: "Please assess property suitability",
					minlength: "Please select at least two options"
				}
			},

			submitHandler: function(form) { // overrides the default form submit event

				$.getJSON(jsonURL(), {
					service: "rate",
					pos: pos,
					reservationid: reservationid,
					date: $.datepicker.formatDate("yy-mm-01", new Date()),
					reason: $("#cbt_reason").val()
				},
				function (data) {
					if (data.message) {
						if (test) console.log(data.message);
					}
				}).error(function(data) {if (test) console.log("rate error");});
			}
		}).error(function(data) {if (test) console.log("reservation error");});

		function message(errors) {
			if (errors) {
				$("div.error span").html(errors == 1
						? "Please enter the highlighted field"
								: "Please enter the " + errors + " highlighted fields");
				$("div.error").show();
			} 
			else {$("div.error").hide();}
		}

	});

});

	

