function validateElement($el) {
	if (!$el.length) {
		return;
	}

	var val = $el.val().trim(),
		type = $el.data('type'),
		isError = !val;

	if (type && !isError) {
		switch (type) {
			case 'email':
				isError = !validateEmail(val);
				break;
//					case 'int': isError = true; break;
			case 'password':
				isError = !validatePassword(val, 'repassword');
				break;
			case 'repassword':
				isError = !validatePassword(val, 'password');
				break;
		}
	}

	$el.parents('.form-group').toggleClass('has-error', isError);

	return isError;

	function validateEmail(val) {
		var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
		return pattern.test(val);
	}
	function validatePassword (val, other_type) {
		var $other_input = $el.parents('form').find('input[data-type=' + other_type + ']');
		if (!$other_input.length) {
			return true;
		}

		var isError = $other_input.val() != val;
		$other_input.parents('.form-group').toggleClass('has-error', isError);
		return !isError;
	}
}

function errorMessages($obj, message, type) {
	if (!$obj || !$obj.length) {
		console.log(type, message);
		return;
	}

	if (!type) {
		$obj.removeClass().html('').hide()
			.addClass('alert');

		return;
	}

	$obj.html(message).addClass('alert-' + type); //.show();
}

