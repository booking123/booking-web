//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://jqueryui.com/demos/datepicker/#date-range
//See http://docs.jquery.com/Plug-ins/Validation

(function( $ ) {

	localize();
	var settings = {
		pos: "",				// point of sale code
		model: "",				// model type to be credited with payment
		id: "",					// model ID to be credited with payment
		numberformat: "c",		// number format
		error: false			// include error messages
	};

	$.fn.card = function(options) {

		settings = $.extend(settings, options);

		return this.each(function(i, e) {

			if (settings.error) console.log("start " + settings.pos + ", " + settings.model + ", " + settings.id);

			var validator = $("#cbt_card_form").validate({		// validate form using jQuery validation plug-in

				debug: true,       										// true for debugging

				invalidHandler: function(form, validator) {	// handle invalid fields
					message(validator.numberOfInvalids());
				},

				ignore: ".ignore",              						// ignore validation of fields with this class

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
					cbt_notes: {
						required: true,
						minlength: 10
					},
					cbt_payment: {
						required: true,
						number: true,					
						min: 10,
						max: 1000000
					}
				},

				messages: {              									// validation messages
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

					if (settings.error) console.log("card submitted " + jsonURL() + ", " + settings.pos + ", " + $("#cbt_emailaddress").val() + ", " + $("#cbt_cardholder").val() + ", " + $("#cbt_cardnumber").val()+ ", " + $("#cbt_payment").val());
					
					$.getJSON(jsonURL(), {
						service : "card",
						pos : settings.pos,
						model : settings.model,
						id : settings.id,
						date : $.datepicker.formatDate("yy-mm-01", new Date()),
						emailaddress : $("#cbt_emailaddress").val(),
						notes : $("#cbt_notes").val(),
						cardholder : $("#cbt_cardholder").val(),
						cardnumber : $("#cbt_cardnumber").val(),
						cardmonth : $("#cbt_cardmonth").val(),
						cardyear : $("#cbt_cardyear").val(),
						cardcode : $("#cbt_cardcode").val(),
						amount : $("#cbt_payment").val()
					},
					function (data) {
						//console.log("response " + data.message)

						if (data.message) {
							$("#cbt_message").dialog("open");
							$("#cbt_message").html(data.message);
						}
						else {
							$("#cbt_popup").dialog("open");
							$("#cbt_quote").html(formatted(data.quote, settings.numberformat, culture(data.currency)));
							$("#cbt_deposit").html(data.deposit.toFixed(0) + "%");
							if (data.available) {
								$("#cbt_status").html(settings.is_available);
								var amount = (data.quote * data.deposit / 100.0);
								$("#cbt_payment").html(formatted(amount, settings.numberformat, culture(data.currency)));
								$("body").data("amount", amount);
							}
							else {$("#cbt_status").html(settings.not_available);}
						}
						if (data.message) {
							console.log(data.message);
						}
						else {
							$("#cbt_popup").dialog("open");
						}
					}).error(function(data) {if (settings.error) console.log("card error");});
				},
				success: function(label) {                     // handles field success events
					message(validator.numberOfInvalids());
				}
			});

		});

		function message(errors) {
			if (errors) {
				$("div.error span").html(errors == 1
						? "Please enter the highlighted field"
								: "Please enter the " + errors + " highlighted fields");
				$("div.error").show();
			} 
			else {$("div.error").hide();}
		}

	};
	
})( jQuery );
