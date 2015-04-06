$(document).ready(function () {
	var $table = $('#result_table'),
		$form = $('#filter-form'),

		filter_status_name = 'input[name="filter_status[]"]',
        filter_types = 'input[name="filter_types[]"]',
		items_ids_name = 'input[name="ID[]"]';

	var report = $.report({
		report_url: SITE_URL + 'report/get_transactions/',
		form: $form,
		table: $table,
		tempRow: $('#temp-row'),
		paginator: $('.pages_info')
	});

	$form.submit(function (e) {
		if ($(this).find('input[name=csv]').prop('checked')) {
			return true;
		}

		report.resetPagination()
			.run();


		return false;

	});

	$( "#start_date" ).datepicker({
		onClose: function( selectedDate ) {
			$( "#end_date" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	$( "#end_date" ).datepicker({
		onClose: function( selectedDate ) {
			$( "#start_date" ).datepicker( "option", "maxDate", selectedDate );
		}
	});

	$('#filter_status_all').click(function () {
		$(filter_status_name).prop('checked', $(this).prop('checked'));
	});

	$(filter_status_name).click(function () {
		$('#filter_status_all').prop("checked", ($(filter_status_name + ':checked').length == $(filter_status_name).length));
	});

    $('#filter_types_all').click(function () {
        $(filter_types).prop('checked', $(this).prop('checked'));
    });

    $(filter_types).click(function () {
        $('#filter_types_all').prop("checked", ($(filter_types + ':checked').length == $(filter_types).length));
    });

	$('#del_all').click(function () {
		$(items_ids_name).prop('checked', $(this).prop('checked'));
	});

	$(items_ids_name).click(function () {
		$('#del_all').prop("checked", ($(items_ids_name + ':checked').length == $(items_ids_name).length));
	});


	$table.on('click', '.openMoreInfo', function () {
		var $tr = $(this).parents('tr'),
			data = $tr.data(),
			rows = [
				{id: "ptNetRate", name: "NET Rate"},
				{id: "ptPartnerPayment", name: "Partner Payment"},
				{id: "ptTotalBookingpalPayment", name: "Total Bookingpal Payment"},
				{id: "ptCreditCardFee", name: "Credit Card Fee"},
				{id: "ptPaymentPMS", name: "PMS Payment"}
			];

		$('#settings_name_transaction').html(data.pttransactionid);
		$('#transactionsInfoList').html('');

		_.each(rows, function (val) {
			var str = '';

			switch (val.id) {
				case 'ptNetRate' : str = (data[val.id.toLowerCase()] ? 'Active' : 'Not Active'); break;
				case 'ptPartnerPayment' : str = (data[val.id.toLowerCase()] || '0.0000'); break;
				default :
					str = (data[val.id.toLowerCase()] || '0.00');
			}

			$('#transactionsInfoList').append('<tr><td>' + val.name + '</td><td class="text-right">' + str + '</td></tr>')
		});

		$('#moreTransactionsInfo').modal('show');
	});
}).click(function (e) {
	if (!$(e.target).hasClass('popover-link') && !$(e.target).parents('.popover').length) {
		$('.popover-link').popover('hide');
	}
}).on('click', '.popover-link', function () {
	$('.popover-link').popover('hide');
	$(this).popover('destroy')
		.popover('show');
	return false;
});