$(document).ready(function () {
	var $blockPM = $('#blockForPM');
	var $blockCP = $('#blockForCP');
	var $blockAll = $('#blockForAll');

	$('#userType').change(toggleUserType);
	$('#Registration').on('keyup', '.has-error input', function () {
		validateElement($(this));
	}).on('change', '.has-error select', function () {
		validateElement($(this));
	}).submit(function (e) {
		e.preventDefault();
		errorMessages();

		var $form = $(this);

		if (!isValidateForm($form)) {
			errorMessages($('#errorMessage'), 'Please enter fields', 'danger');
			return;
		}

		var loginForm = $form.serializeArray();
		var loginFormObject = {manager_request: {}};
		$.each(loginForm, function(i, v) {
			if (v.name == 'repassword') { return; }

			loginFormObject.manager_request[v.name] = v.value;
		});

		$('button', $form).attr('disabled', 'disabled');
		$.ajax({
			url: SITE_URL + 'xml/services/json/registration/manager',
			contentType : 'application/json',
			type : 'POST',
			data: JSON.stringify(loginFormObject, null, 2),
			success: function (resp) {
				$('button',$form).removeAttr('disabled');
				if (!resp.data) {
					errorMessages($('#errorMessage'), 'Lost connect to server.', 'danger');
					return;
				}

				if (resp.data.status.is_error) {
					errorMessages($('#errorMessage'), resp.data.status.message, 'danger');
					return;
				}

				$blockCP.hide();
				$blockPM.hide();
				$blockAll.hide();

				$('#blockConfirm').show();
			},
			error: function (error) {
				$('button',$form).removeAttr('disabled');
				errorMessages($('#errorMessage'), 'Lost connect to server.', 'danger');
			}
		});
	});
	toggleUserType();



	function toggleUserType() {
		$blockPM.hide(); $blockCP.hide();
		switch ($('#userType').val()) {
			case 'pm': $blockPM.show(); return true;
			case 'cp': $blockCP.show(); return true;
			default : return false;
		}
	}
	function isValidateForm($form) {
		var isError = false;
		var $userType =  $('#userType'),
			$agreements = $('#agreement' + $userType.val());
		validateElement($userType);

		var agreement = $agreements.is(':checked');
		isError = !agreement;

		$form.find('input').each(function() {
			var inputUserType = $(this).data('user');
			if (inputUserType && inputUserType != $userType.val()) {
				return;
			}

			if ($(this).attr('type') == 'hidden') {
				return;
			}

			if (validateElement($(this))) {
				isError = true;
			}
		});

		$agreements.parents('.checkbox').toggleClass('has-error', !agreement);

		if ($userType.val() == 'pm') {
			validateElement($('#pmsid'));
		}

		return !isError;
	}
});