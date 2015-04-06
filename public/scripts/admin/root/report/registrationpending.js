$(document).ready(function () {
	var $reservation_table = $('#result_table'),
		$form = $('#filter-form');

	var report = $.report({
		report_url: SITE_URL + 'report/get_registrationpending',
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
});