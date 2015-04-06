$(document).ready(function () {
	var filter_status_name = 'input[name="filter_status[]"]',
		items_ids_name = 'input[name="ID[]"]',
		$report_table = $('#result_table'),
		$form = $('#filter-form');

	$('#filter_status_all').click(function () {
		$(filter_status_name).prop('checked', $(this).prop('checked'));
	});

	$(filter_status_name).click(function () {
		$('#filter_status_all').prop("checked", ($(filter_status_name + ':checked').length == $(filter_status_name).length));
	});

	$('#del_all').click(function () {
		$(items_ids_name).prop('checked', $(this).prop('checked'));
	});

	$(items_ids_name).click(function () {
		$('#del_all').prop("checked", ($(items_ids_name + ':checked').length == $(items_ids_name).length));
	});

	var report = $.report({
		report_url: SITE_URL + 'report/get_overduetransactions',
		form: $form,
		table: $report_table,
		tempRow: $('#temp-row'),
		paginator: $('.pages_info')
	});

	$form.submit(function () {
		if ($(this).find('input[name=csv]').prop('checked')) {
			return true;
		}

		report.resetPagination().run();

		return false;
	});
});