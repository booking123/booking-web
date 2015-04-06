jQuery(document).ready(function ($) {
	$('input,textarea').placeholder();
	$('#goLogin').click(function () {
		$('#modalLogIn').modal('hide');

		$('.authorisation-box').addClass('active-user');

		return false;
	});
	$('#goLogout').click(function () {

		$('.authorisation-box').removeClass('active-user');

		return false;
	});

	$('#toggleAdvancedOptions, .main-searchbox .btn-close-as').click(function () {
		$('.main-searchbox').toggleClass('active-advanced');

		return false;
	});

	$('.as-list-amenities h5 a').click(function () {
		$('.as-list-amenities').toggleClass('active');

		return false;
	});

});


function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
	var cookie_string = name + "=" + escape(value);

	if (exp_y) {
		var expires = new Date(exp_y, exp_m, exp_d);
		cookie_string += "; expires=" + expires.toGMTString();
	}

	if (path)
		cookie_string += "; path=" + escape(path);

	if (domain)
		cookie_string += "; domain=" + escape(domain);

	if (secure)
		cookie_string += "; secure";

	document.cookie = cookie_string;
}

function get_cookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

	if (results)
		return ( unescape(results[2]) );
	else
		return null;
}

