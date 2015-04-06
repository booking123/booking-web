/**
 * Created by User on 02.09.14.
 */
$(document).ready(function () {

    $('.images-block').delegate('img', 'click', function () {
		$('.large-img .slick-active img').attr('src',$(this).attr('src').replace('Thumb','Standard'));
		$('.images-block img').removeClass('selected-img');
		$(this).addClass('selected-img');

        //var src = $(this).attr('src');
        //$('.slick-slide').removeClass('slick-active');
        //$('.large-img .slick-slide img').each(function () {
        //    var larg_src = $(this).attr('src');
		//
        //    if (larg_src == src) {
        //        $(this).parent().addClass('slick-active');
        //    }
        //});
    });
	$('.images-block').delegate('img', 'mouseenter', function () {
		$(this).css('opacity','0.3').parent().css('background','#10446c');
	});
	$('.images-block').delegate('img', 'mouseleave', function () {
		$(this).css('opacity','1').parent().css('background','transparent');
	});
	$('.button-view-items.to-grid').bind('click',function(){
		$(window).resize();
	});
	$('.result-left-column').on('click','.overview-read-more ', function(e) {
		e.preventDefault();
		var $transparent_block = $(this).siblings('.transparent-block'),
			$overview_list = $('.overview-list');
		$overview_list.toggleClass('open');
		if ($overview_list.hasClass('open')){
			$transparent_block.addClass('hidden');
		} else {
			$transparent_block.removeClass('hidden');
		}
		$(this).toggleClass('open');
	});
});