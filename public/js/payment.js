//Concept, script and CSS copyright CBT Limited
//Author	CBT Limited, London, UK
//Version	2.00
//See license at http://razor-cloud.com/razor/License.html
//See http://api.jquery.com/jQuery.getJSON/
//See new window http://www.htmlcodetutorial.com/linking/linking_famsupp_120.html

var pos = '';
var reservationid = '';

function guest(
		pos,           // point of sale code
		reservationid  // reservation ID
) {
	this.pos = pos;
	this.reservationid = reservationid;
	//alert(reservationid);
}

$().ready(function() {
	
	function statement(    // get reservation statement table
			pos,           // point of sale code
			reservationid // reservation ID
	) {
		//alert(pos + ', ' + reservationid);

        $.validator.addMethod('positive', function(value, element, param) {
            return (value >= 0);
        }, 'Please enter a positive amount');


		$('#paymentForm').validate({                       // validate form using jQuery validation plug-in

			debug: false,                                // true for debugging

			invalidHandler: function(form, validator) {  // handle invalid fields
				var errors = validator.numberOfInvalids();
				if (errors) {
					var message = errors == 1
					? 'Please enter the highlighted field'
							: 'Please enter the ' + errors + ' highlighted fields';
					$('div.error span').html(message);
					$('div.error').show();
				} else {
					$('div.error').hide();
				}
			},

			ignore: '.ignore',                          // ignore validation of fields with this class

			rules: {                                    // validation rules
				cardholder: {
					required: true,
					minlength: 5
					//remote: 'users.php'
				},
				cardnumber: {
					required: true,
					creditcard: true,
					minlength: 10
				},
				cardcode: {
					required: true,
					minlength: 3
				},
				amount: {
					required: true,
					number: true,
					positive: true
				}
			},

			messages: {                                     // validation messages
				fromdate: 'Set the arrival date',
				todate: 'Set the departure date',
				emailaddress: {
					required: 'Enter an email address',
					email: 'Enter a valid address'
						//remote: jQuery.format('{0} is already in use')
				},
				firstname: 'Enter the first name',
				familyname: 'Enter the family name',
				cardholder: {
					required: 'Enter the card holder',
					minlength: 'Minimum five characters'
				},
				cardnumber: {
					required: 'Enter the card number',
					creditcard: 'Enter a valid card number',
					minlength: 'Minimum ten characters'
				},
				cardcode: {
					required: 'Enter the security code',
					minlength: 'Minimum three characters'
				},
				amount: {
					required: 'Enter payment amount',
					number: 'Must be a number',
					positive: 'Must be a positive amount'
				}
			},

			submitHandler: function(form) {                // overrides the default form submit event
				$.getJSON('https://razor-cloud.com/razor/jQueryServer?callback=?', {
					type : 'payment',
					pos : pos,
					reservationid : reservationid,
					cardholder : $('#cbt_cc_holder').val(),
					cardnumber : $('#cbt_cc_number').val(),
					cardmonth : $('#cbt_cc_expiry_month').val(),
					cardyear : $('#cbt_cc_expiry_year').val(),
					cardcode : $('#cbt_cc_ccv').val(),
					amount : $('#cbt_cc_amount').val(),
					amount : $('#cbt_cc_currency').val()
				},
				function (data) {
					alert('success');
				})
				.error(function(data) {alert('error');});
			}
		});


		$.getJSON("https://razor-cloud.com/razor/jQueryServer?callback=?", {
			type : "statementlist",
			pos : pos,
			reservationid : reservationid
		},
		function(data) {
			if (data.message != undefined) alert(data.message);
			var html = '<tr><th>Process</th><th>Reference</th><th>Date</th><th>Debit</th><th>Credit</th><th></th><th>Description</th></tr>';
			$.each(data.items, function(i, item) {
				html += '<tr><td>' + item.process 
				+ '</td><td>' + item.name 
				+ '</td><td style="width: 100px; text-align: center;">' + item.date 
				+ '</td><td style="text-align: right;">' + item.debit.toFixed(2) 
				+ '</td><td style="text-align: right;">' + item.credit.toFixed(2) 
				+ '</td><td>' + item.currency + '</td><td>' 
				+ item.description + '</td></tr>';
			});
			$('#cbt_statement_table').append(html);
		})
		.error(function(data) {alert("error");});
	}

	$("#cbt_confirmation_pdf").click(function() {
		alert("Handler for .click() called.");
		$.getJSON("https://razor-cloud.com/razor/jQueryServer?callback=?", {
			type : "confirmationpdf",
			pos : pos,
			reservationid : reservationid
		},
		function(data) {
			if (data.message != undefined) alert(data.message);
			window.open(data.url, 'Reservation Confirmation', 'width=400,height=200,location=no,resizable=no,scrollbars=yes');
			return false;
		})
		.error(function(data) {alert("error");});
	});

	$("#cbt_statement_pdf").click(function() {
		alert("Handler for .click() called.");
		$.getJSON("https://razor-cloud.com/razor/jQueryServer?callback=?", {
			type : "statementpdf",
			pos : pos,
			reservationid : reservationid
		},
		function(data) {
			if (data.message != undefined) alert(data.message);
			window.open(data.url, 'Reservation Statement', 'width=400,height=200,location=no,resizable=no,scrollbars=yes');
			return false;
		})
		.error(function(data) {alert("error");});
	});
});