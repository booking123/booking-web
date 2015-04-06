$(document).ready(function () {
	$('.ss-slide', '.search-slider').css({'visibility': 'visible'}).hide().eq(1).show();
	var i=0;
	showDifferentBG(i);
    /*
	$('.location-link').click(goToSearchResult);
	function goToSearchResult() {
		window.location.href = 'search-result.html';
		return false;
	}
    */

	function showDifferentBG(i) {
		var slides = [
			{name: 'Unique', bg: 'unique_bg'},
			{name: 'City', bg: 'city_bg'},
			{name: 'Swim', bg: 'swim_bg'},
			{name: 'Golf', bg: 'golf_bg'},
			{name: 'Ski', bg: 'ski_bg'},
			{name: 'Beach', bg: 'beach_bg'}
		];


		//var min = parseInt(0),
		//	max = parseInt(5),
			var my_bg = get_cookie("MBP_BG");
		    my_bg = my_bg ? my_bg : 0;
		//do {
		//	var a = Math.floor(Math.random() * (max - min + 1)) + min;
		//} while (a == my_bg);

		$('.search-slider').find(".ss-slide:visible").fadeOut(1000)
			.end().find("." + slides[i].bg).fadeIn(1000);

		$('.main-searchbox-wrapper').find('.searchbox_title span').html(slides[i].name);

		set_cookie("MBP_BG", i);
		i++;
		if (i==6) {
			i=0;
		}
		setTimeout(function () {
			showDifferentBG(i);
		}, 5000);

	}
	$('#toggleAdvancedOptions').bind('click',function(){
		if ($('.main-searchbox').hasClass('active-advanced')==true) {
			if ($('.main-searchbox-wrapper').height() == 465) {
				$(window).scrollTop(545);
			} else if ($('.main-searchbox-wrapper').height() == 400) {
				$(window).scrollTop(480);
			}
		} else {
			$(window).scrollTop(0);
		}
	});
	$('.advanced-search .cancel.btn-close-as').bind('click',function(){
		$(window).scrollTop(0);
	});
	$('.advanced-search-buttons button').bind('click',function(){
		if($('.search-panel-input-box input').hasClass('error')==true) {
			$(window).scrollTop(0);
		}
	});
	$(document).keypress(function(e){
		if (e.keyCode=13){
			$('.search-panel-input-box.col-md-2.col-sm-2 button').click();
		}
	});



});