$(document).ready(function () {

		var full_url = window.location.href;
		var url = full_url.substr(full_url.length - 2);

	console.log(url);

	$('.language-toggle').click(function(e) {
		e.preventDefault();
		$('.lang-select').toggleClass('hidden');
	});

	$('.lang-select li a').each(function() {
		if ($(this).attr("data-id")==url) {
			$(this).addClass("active-lang");
			$('.language-toggle').text($(this).text()).append('<span class="language-caret"></span>');
		}

	});


	$('.modal-toggle').click(function(e) {
		e.preventDefault();
		var modal = $(this).attr("data-toggle");
		$('#' + modal).removeClass('hidden');
	});
	$('.modal-close').click(function(e) {
		e.preventDefault();
		var modal = $(this).attr("data-toggle");
		$('#' + modal).addClass('hidden');
	});



});
