var report = null;

$('document').ready( function(){

    $('#filter_all').click( function(){
        $('input[name="filter[]"]').prop('checked', $(this).prop('checked') );
    });

    $('input[name="filter[]"]').click( function(){
        $('#filter_all').prop("checked", ( $('input[name="filter[]"]:checked').length == $('input[name="filter[]"]').length ));
    });

    report = $.report({
        report_url: SITE_URL + 'report/get_accountverificationspending',
        form: $('#filter-form'),
        table: $('#result_table'),
        tempRow: $('#temp_row'),
		paginator: $('.pages_info')
    });

	$('#filter-form').submit(function () {
		console.log($(this).find('input[name=csv]'));
		if ($(this).find('input[name=csv]').prop('checked')) {
			return true;
		}

		report.run();
		return false;
	});
});