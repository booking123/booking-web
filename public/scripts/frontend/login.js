$(document).ready(function () {
	$('#login').submit(function (e) {
		var $form = $(this);
		e.preventDefault();
		errorMessages();

		if (!isValidateForm($form)) {
			errorMessages($('#errorMessage'), 'Please enter Username and Password', 'danger');
			return;
		}

		$('button', $form).attr('disabled', 'disabled');

		$.ajax({
			url: $form.attr('action'),
			data: $form.serialize(),
			dataType: 'json',
			success: function (resp) {
				$('button',$form).removeAttr('disabled');

				if (resp.error) {
					errorMessages($('#errorMessage'), resp.message, 'danger');
					return;
				}

				window.location.href = SITE_URL + resp.data.url;
			},
			error: function () {
				$('button',$form).removeAttr('disabled');
			}
		});
	});

	function isValidateForm($form) {
		var isError = false;

		$form.find('input').each(function() {

			if ($(this).attr('type') == 'hidden' || !$(this).parents('.form-group').length) {
				return;
			}

			if (validateElement($(this))) {
				isError = true;
			}
		});

		return !isError;
	}
});