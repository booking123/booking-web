$(document).ready(function () {
	var $table = $('#pending_transaction_list'),
		$form = $('#filter-form');

	var report = $.report({
		report_url: SITE_URL + 'channel-partners/get_channels/',
		form: $form,
		table: $table,
		tempRow: $('#temp-row'),
		paginator: $('.pages_info')
	});

	$form.submit(function (e) {
		report.resetPagination()
			.run();

		return false;
	});

	report.run();

	// -----------------------
	$('#createChannel').click(function () {
		openChannelSettings({});
		$('#cpSettings').modal('show');
	});

	$table.on('click', 'a.openSettingsCP', function () {
		$.ajax({
			url: SITE_URL + 'channel-partners/getsettingscp',
			data: {
				cp_id: $(this).html().trim()
			},
			dataType: 'json',
			success: function (resp) {

				if (resp.error) {
					modalMessager('danger', '<strong>Error:</strong> ' + resp.message);
					return;
				}

				openChannelSettings(resp.data.item);

				$('#cpSettings').modal('show');
			}
		});
		return false;
	});

	$('#cp_search_by_name').click(function () {
		var name = $("#settings_cp_name").val().trim();
		if (name.length < 3	) {
			return false;
		}
		searchPartyByName(name);
	});

	$('form','#cpSettings').submit(function () {
		var isError = false;

		$(this).find('input.form-control').each(function () {
			var val = $(this).val();

			switch ($(this).data('type')) {
				case 'text' :
					if (!val) {
						$(this).parents('.form-group').addClass('has-error');
						isError = true;
					} else {
						$(this).parents('.form-group').removeClass('has-error');
					}
					break;
				case 'percent':
					if (val > 100 || ($(this).val() && !$.isNumeric($(this).val()))) {
						$(this).parents('.form-group').addClass('has-error');
						isError = true;
					} else {
						$(this).parents('.form-group').removeClass('has-error');
					}
					break;
				case 'mail':
					if (!IsEmail(val)) {
						$(this).parents('.form-group').addClass('has-error');
						isError = true;
					} else {
						$(this).parents('.form-group').removeClass('has-error');
					}
					break;
				case 'int':
					if (val && !$.isNumeric($(this).val())) {
						$(this).parents('.form-group').addClass('has-error');
						isError = true;
					} else {
						$(this).parents('.form-group').removeClass('has-error');
					}
					break;
			}
		});

		if (isError) {
			modalMessager('danger', '<strong>Error:</strong> Please, enter correct information.');
			return false;
		}

		$.ajax({
			url: SITE_URL + 'channel-partners/changesettingscp',
			data: $(this).serialize(),
			dataType: 'json',
			success: function (resp) {
				if (resp.error) {
					modalMessager('danger', '<strong>Error:</strong> ' + resp.message);
					return;
				}

				modalMessager('success', '<strong>Success:</strong> ' + resp.message);

				$('.cpCommission', '#cpID_' + resp.item.id).html((+resp.item.commission).toFixed(2));

				report.run();
			}
		});

		return false;


		function IsEmail(email) {
			var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			return regex.test(email);
		}
	});
	
	$('#submitCpSettings').click(function () {
		$('form','#cpSettings').submit();
	});

	$('#show-more-changes').click(function () {
		toggleSettingsMore(!$(this).hasClass('open'));
		return false;
	});

	$('#exist_channels').on('change', 'input', function () {
		if (!$(this).data('party')) {
			setChannelForm({});
			return;
		}

		$.ajax({
			url: SITE_URL + 'channel-partners/getsettingscp',
			data: {
				party_id: $(this).data('party')
			},
			dataType: 'json',
			success: function (resp) {

				if (resp.error) {
					modalMessager('danger', '<strong>Error:</strong> ' + resp.message);
					return;
				}

				setChannelForm(resp.data.item);
			}
		});

	});

	function setChannelForm(data) {
		var default_data = {
			ID: 0,
			posID: '',
			posError: false,
			cpID: 0,
			Name: '',
			ExtraName: '',
			EmailAddress: '',
			DayPhone: '',
			WebAddress: '',
			State: 'Created',
			PostalAddress: '',
			PostalCode: '',
			Country: '',
			commission: 0,
			channel_type: 5,
			traffic: '',
			send_email: true,
			ftp_password: ''
		};

		data = $.extend(default_data, data);


		// Set Data
		$('#settings_cp_name').val(data.Name);
		$('#settings_cp_contact_name').val(data.ExtraName);
		$('#settings_cp_mail').val(data.EmailAddress);
		$('#settings_cp_phone').val(data.DayPhone);
		$('#settings_cp_site').val(data.WebAddress);
		$('#settings_cp_address').val(data.PostalAddress);
		$('#settings_cp_zip').val(data.PostalCode);
		$('#settings_cp_country').val(data.Country);
		$('#settings_cp_comm').val(data.commission);
		$('#settings_cp_traffic').val(data.traffic);
		$('#settings_cp_ftp_password').val(data.ftp_password);

		$('#settings_cp_state').val(data.State);
		$('#settings_cp_type').val(data.channel_type);
		$('#settings_cp_send_mail').prop('checked', +data.send_email);

		data.ID = +data.ID;
		$('#settings_id').val(data.ID); $('#settings_id_text').html(!data.ID ? 'none': data.ID);
		data.cpID = +data.cpID;
		$('#settings_cp_id').val(data.cpID); $('#settings_cp_id_text').html(!data.cpID ? 'none' : data.cpID);
		$('#settings_pos_text').html(!data.posID ? 'none' : data.posID).toggleClass('bg-danger', data.posError);

		if (data.ID) {
			$('.hide-create', '#cpSettings').show();
		} else {
			$('.hide-create', '#cpSettings').hide();
		}
		return data;
	}

	function openChannelSettings(data) {
		data = setChannelForm(data);
		//Set Title
		$('#settings_name_CP').html(data.Name ? data.Name  : 'Create new channel');

		// Search Channel box
		$('#exist_channels').hide()
			.find('tbody').html('');

		$('#cp_not_use').click();

		$('.form-group', '#cpSettings').removeClass('has-error');

		modalMessager();
		toggleSettingsMore(false);
	}

	function toggleSettingsMore(status) {
		var name = !status ? 'Show More Changes' : 'Hide More Changes';
		$('#show-more-changes').toggleClass('open', status).html(name);
		if (status) {
			$('.more-block', '#cpSettings').show();
		} else {
			$('.more-block', '#cpSettings').hide();
		}

	}

	function modalMessager(type, html) {
		var all_types = ['alert-success', 'alert-warning', 'alert-info', 'alert-danger'];
		$('.alert','#cpSettings').removeClass(all_types.join(' '));
		if (type) {
			$('.alert','#cpSettings').addClass('alert-' + type)
				.html(html);
		}

	}

	function searchPartyByName(name) {
		$.ajax({
			url:  SITE_URL + '/channel-partners/searchcp/',
			data: { s : name },
			dataType: 'json',
			success: function (resp) {
				$('tbody tr', '#exist_channels').remove();

				if (resp.data.exist_channels) {
					for (var i in resp.data.exist_channels) {
						var input = !resp.data.exist_channels[i].cp_id ? '<input type="radio" data-party="' + resp.data.exist_channels[i].ID + '" name="cp" />' : '';
						$('tbody', '#exist_channels').append('<tr>'
						+ '<td>' + input + '</td>'
						+ '<td>' + resp.data.exist_channels[i].ID + '</td>'
						+ '<td><b>' + resp.data.exist_channels[i].Name + '</b><br />' + (resp.data.exist_channels[i].EmailAddress || '-----') + '</td>'
						+ '<td>' + (resp.data.exist_channels[i].UserType || '-----') + '</td>'
						+ '<td>' + (resp.data.exist_channels[i].state || '-----') + '</td>'
						+ '<td>' + (resp.data.exist_channels[i].cp_id || '-----') + '</td>'
						+ '</tr>');
					}
				}
				$('#exist_channels').show();
			}
		});
	}
});