//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	3.0.9
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See http://jqueryui.com/demos/datepicker/#date-range
//See http://docs.jquery.com/Plug-ins/Validation

(function( $ ) {

	var settings = {
			pos: "",			// point of sale code
			id: "",				// organization id
			error: true			// include error messages
	};

	var methods = {
			init : function(options) {

				settings = $.extend(settings, options);
				
				localize(function() {refresh();});
//				return this.each(function(i, e) {
//					localize(function() {refresh(e);});	
//				});
			},
			id : function( id ) {
				if (settings.error) console.log("set id " + id);
				settings.id = id;
				refresh();
			}
	};

	$.fn.organization = function( method ) {
		if ( methods[method] ) {return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));}
		else if ( typeof method === "object" || ! method ) {return methods.init.apply( this, arguments );}
		else {console.log( "Method " +  method + " does not exist." );}    
	};

	function refresh (e) {

		if (settings.error) console.log("organization " + settings.pos + ", " + settings.id + ", " + settings.error);

		$.getJSON(jsonURL(), {
			service : "party",
			pos : settings.pos,
			id : settings.id
		},
		function(data) {
			if (data.message) {if (settings.error) console.log(data.message);}
			else {
				$("#cbt_name").val(data.name);
				$("#cbt_emailaddress").val(data.emailaddress);
				$("#cbt_dayphone").val(data.dayphone);
				$("#cbt_webaddress").val(data.webaddress);
				$("#cbt_commission").val(data.commission);
				$("#cbt_discount").val(data.discount);
				$("#cbt_notes").val(data.notes);
				$("#cbt_terms").val(data.terms);
			}
		})
		.error(function(data) {if (settings.error) console.log("party error");});

		var validator = $("#cbt_form").validate({		// validate form using jQuery validation plug-in

			debug: false,       									// true for debugging

			invalidHandler: function(form, validator) {				// handle invalid fields
				message(validator.numberOfInvalids());
			},

			ignore: ".ignore",              						// ignore validation of fields with this class

			rules: {                								// validation rules
				cbt_name: {
					required: true,
					minlength: 5
				},
				cbt_emailaddress: {
					required: true,
					email: true
				},
				cbt_dayphone: {
//					phone: true,
					required: true
				},
				cbt_webaddress: {
					required: true,
					minlength: 3
				},
				cbt_commission: {
					required: true,
					number: true,					
					min: 0,
					max: 100
				},
				cbt_discount: {
					required: true,
					number: true,					
					min: 0,
					max: 100
				},
				cbt_notes: {
					required: true,
					minlength: 10
				},
				cbt_terms: {
					required: true,
					minlength: 10
				}
			},

			messages: {              									// validation messages
				cbt_name: {
					required: "Enter the organization holder",
					minlength: "Minimum {0} characters"
				},
				cbt_emailaddress: {
					required: "Enter the primary email address",
					email: "Enter a valid address"
				},
				cbt_dayphone: {
					required: "Enter the phone number",
					phone: "Enter a valid phone number"
				},
				cbt_webaddress: {
					required: "Enter the webaddress URL",
					minlength: "Minimum {0} characters"
				},
				cbt_commission: {
					required: "Enter manager's commission percentage",
					number: "Must be a number",
					min: "Minimum of {0}",
					max: "Maximum of {0}"
				},
				cbt_discount: {
					required: "Enter agent's commission percentage",
					number: "Must be a number",
					min: "Minimum of {0}",
					max: "Maximum of {0}"
				},
				cbt_notes: {
					required: "Enter the company description",
					minlength: "Minimum {0} characters"
				},
				cbt_terms: {
					required: "Enter the terms & conditions",
					minlength: "Minimum {0} characters"
				}
			},

			submitHandler: function(form) { // overrides the default form submit event

				if (settings.error) console.log("organization submitted " 
						+ jsonURL() 
						+ ", " + settings.pos 
						+ ", " + $("#cbt_emailaddress").val() 
						+ ", " + $("#cbt_name").val() 
						+ ", " + $("#cbt_dayphone").val()
						+ ", " + $("#cbt_commission").val()
						+ ", " + $("#cbt_discount").val()
						+ ", " + $("#cbt_notes").val()
						+ ", " + $("#cbt_terms").val()
					);

				$.getJSON(jsonURL(), {
					service : "party",
					method: "set",
					pos : settings.pos,
					id : settings.id,
					date : $.datepicker.formatDate("yy-mm-01", new Date()),
					name : $("#cbt_name").val(),
					emailaddress : $("#cbt_emailaddress").val(),
					dayphone : $("#cbt_dayphone").val(),
					webaddress : $("#cbt_webaddress").val(),
					commission : $("#cbt_commission").val(),
					discount : $("#cbt_discount").val(),
					notes : $("#cbt_notes").val(),
					terms : $("#cbt_terms").val()
				},
				function (data) {
					//console.log("response " + data.message)
					if (data.message) {console.log(data.message);}
					else {$("#cbt_popup").dialog("open");}
				}).error(function(data) {if (settings.error) console.log("organization error");});
			},
			success: function(label) {                     // handles field success events
				//message(validator.numberOfInvalids());
			}
		});

		function message(errors) {
			if (errors) {
				$("div.error span").html("Please enter the highlighted field(s)");
				$("div.error").show();
			} 
			else {$("div.error").hide();}
		}
	}

})( jQuery );
