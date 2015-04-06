$(document).ready(function () {
	var $reservation_table = $('#result_table'),
		$form = $('#filter-form');
	var filter_status_name = 'input[name="filter_status[]"]',
		filter_types_name = 'input[name="filter_types[]"]',
		items_ids_name = 'input[name="ID[]"]';


	$("#start_date").datepicker({
		onClose: function (selectedDate) {
			$("#end_date").datepicker("option", "minDate", selectedDate);
		}
	});

	$("#end_date").datepicker({
		onClose: function (selectedDate) {
			$("#start_date").datepicker("option", "maxDate", selectedDate);
		}
	});
	var report = $.report({
		report_url: SITE_URL + 'report/get_reservations',
		form: $form,
		table: $reservation_table,
		tempRow: $('#temp-table-row'),
		paginator: $('.pages_info')
	});

	$form.submit(function () {
		if ($(this).find('input[name=csv]').prop('checked')) {
			return true;
		}

		report.resetPagination()
			.run();

		return false;
	});

	$reservation_table.on('click', '.reservation_more_history', function () {
		var $self = $(this);

		$.ajax({
			url: SITE_URL + 'report/get_history_reservation/',
			data: {
				t: 123,
				id: $self.data('id')
			},
			method: 'get',
			dataType: 'json',
			success: function (resp) {
				var $tb = $('tbody', '#history_table ');
				$tb.html('');

				if (resp.error) {
					alert('Sorry an error occurred!');
					return;
				}
				$('#history_res_id').html($self.data('id'));

				if (resp.data.length) {
					var _t = _.template($('#temp-history-row').text());
					for (var i = 0; i < resp.data.length; i++) {
						$tb.append(_t(resp.data[i]));
					}
				} else {
					$tb.append('<tr colspan="4">Don\'t have any events</tr>')
				}

				$('#reservationHistory').modal('show');
			}
		});
	});

	$('#filter_status_all').click(function () {
		$(filter_status_name).prop('checked', $(this).prop('checked'));
	});

	$(filter_status_name).click(function () {
		$('#filter_status_all').prop("checked", ($(filter_status_name + ':checked').length == $(filter_status_name).length));
	});

	$('#filter_types_all').click(function () {
		$(filter_types_name).prop('checked', $(this).prop('checked'));
	});

	$(filter_types_name).click(function () {
		$('#filter_types_all').prop("checked", ($(filter_types_name + ':checked').length == $(filter_types_name).length));
	});

	$('#del_all').click(function () {
		$(items_ids_name).prop('checked', $(this).prop('checked'));
	});

	$(items_ids_name).click(function () {
		$('#del_all').prop("checked", ($(items_ids_name + ':checked').length == $(items_ids_name).length));
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