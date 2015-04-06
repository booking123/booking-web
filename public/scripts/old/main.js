(function ($) {
	var _default = {
		message: 'Error',
		error: true
	};

	function _validate(params) {
		console.log(typeof params);
		switch (typeof params[0]) {
			case 'object' :
				return $.extend(_default, params[0]);
			case 'string' :
				return $.extend(_default, {
					message: params[0],
					error: params[1]
				});
		}

		return _default;
	}

	function _typeMessage(type) {
		return type ? 'error' : 'success';
	}

	$.fn.showMessage = function (message, error) {

		var data = _validate(arguments);

		this.addClass(_typeMessage(data.error))
			.html(data.message).show();

		return this;
	};

	$.fn.hideMessage = function (time) {

		var self = this;

		setTimeout(function () {
			self.removeClass('error success')
				.html('').hide();
		}, +time * 1000);

		return this;
	};

	$.showMessage = function (message, error) {
		var settings = _validate(arguments);

		alert(settings.message);

		return this;
	};

})(jQuery);