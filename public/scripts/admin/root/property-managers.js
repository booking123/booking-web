$(document).ready(function () {
	var $table = $('#pm_list'),
		$form = $('#filter-form'),
		$modalWindow = $('#pmSettings');

	var report = $.report({
		report_url: SITE_URL + 'property-managers/list/',
		form: $form,
		table: $table,
		tempRow: $('#temp-row'),
		paginator: $('.pages_info')
	});

	$form.submit(function (e) {
		e.preventDefault();

		report.resetPagination()
			.run();
	});

	report.run();

	$table
		.on('click', '.select-status', function (e) {
			e.preventDefault();

			var status = $(this).val();

			$(this).parents('.btn-group').find('.dropdown-menu li a').each(function () {
				if ($(this).data('status') == status) {
					$(this).addClass('disabled');
				} else {
					$(this).removeClass('disabled');
				}
			});
		})
		.on('click', '.change-status-menu a', function (e) {
			e.preventDefault();
			var message = 'Are you sure you want to change status?',
				link = $(this),
				status = link.data('status');

			if (link.hasClass('disabled')) {
				return;
			}

			if (status == 'Suspended') {
				message = 'Are you sure you want to change status and close properties?';
			}

			confirm(message) && $.ajax({
				url: SITE_URL + 'property-managers/changestatus',
				data: {
					id: link.parents('tr').find('td.isID').data('id'),
					status: status
				},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						alert(resp.message);
						return;
					}
					link.parents('.btn-group').find('.btn').val(status).click();
				}
			});
		})
		.on('click', 'a.open-settings-pm', function (e) {
			e.preventDefault();

			var $tr = $(this).parents('tr');

			$('#settings_name_PM').html($tr.find('td').eq(1).text() + '<br /><span>(' + $tr.find('td').eq(5).text() + ')</span>');

			$.ajax({
				url: SITE_URL + 'property-managers/getsettingspm',
				data: {
					pmi_id: $(this).data('pmi')
				},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						alert(resp.message);
						return;
					}

					changeAdditionalFees(+resp.item.additional_commission, +resp.item.funds_holder);

					if (+resp.item.net_rate) {
						$('#settings_net_rates').click();
					} else {
						$('#settings_retail_rates').click();
					}

					$('#settings_comm').val(+resp.item.commission);
					$('#settings_bp_comm').val(+resp.item.bp_commission);
					$('#settings_pms_markup').val(+resp.item.pms_markup);
					$('#settings_id').val(+resp.item.id);



					modalMessager();
					$modalWindow.modal('show');
				}
			});


		});

	$modalWindow.find('form').submit(function (e) {
		e.preventDefault();

		modalMessager();

		if (+$(this).find('input[name=net_rate]:checked').val()) {
			var isError = false;

			$(this).find('input.form-control').each(function () {
				var val = +$(this).val();

				if (val > 100 || ($(this).val() && !$.isNumeric($(this).val()))) {
					$(this).parents('.form-group').addClass('has-error');
					isError = true;
				} else {
					$(this).parents('.form-group').removeClass('has-error');
				}
			});

			if (isError) {
				return false;
			}
		}

		$.ajax({
			url: SITE_URL + 'property-managers/changesettingspm',
			data: $(this).serialize(),
			dataType: 'json',
			success: function (resp) {
				if (resp.error) {
					modalMessager('danger', '<strong>Error:</strong> ' + resp.message);
					return;
				}

				modalMessager('success', '<strong>Success:</strong> Changes saved');
			}
		});

		return false;
	});

	$('#submitPmSettings').click(function () {
		$('form', '#pmSettings').submit();
	});

	$('input[name=net_rate]','#pmSettings').change(function () {
		checkingRate($(this).val());
	});

	function checkingRate(val) {
		if (!+val) {
			$('#settings_comm').attr('disabled', 'disabled')
				.parents('.form-group').removeClass('has-error');
			$('#settings_bp_comm').attr('disabled', 'disabled')
				.parents('.form-group').removeClass('has-error');
			$('#settings_pms_markup').attr('disabled', 'disabled')
				.parents('.form-group').removeClass('has-error');
		} else {
			$('#settings_comm').removeAttr('disabled');
			$('#settings_bp_comm').removeAttr('disabled');
			$('#settings_pms_markup').removeAttr('disabled');
		}
	}
	function modalMessager(type, html) {
		var all_types = ['alert-success', 'alert-warning', 'alert-info', 'alert-danger'];
		$modalWindow.find('.alert').removeClass(all_types.join(' '));
		if (type) {
			$modalWindow.find('.alert').addClass('alert-' + type)
				.html(html);
		}

	}
	function changeAdditionalFees(additional_commission, funds_holder) {
		var $add_fee = $('#settings_additional_commission');

		if (funds_holder == 1) {
			$('.founts-holder-info').show();
			$add_fee.attr('disabled', 'disabled')
				.val(0);
			return;
		}
		$('.founts-holder-info').hide();
		$add_fee.removeAttr('disabled')
			.val(additional_commission);
	}
});