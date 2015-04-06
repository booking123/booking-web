$(document).ready(function () {
	/* toggle for grid items - view more info */
	$('.item-more-info').click(function () {
		var isActive = !$(this).hasClass('active'),
			$currentItem = $(this).parents('.result-item');

		$(this).toggleClass('active', isActive);

		$currentItem.find('.mobile-advanced-info')
			.html($currentItem.find('.item-advanced-box .advanced-info').clone())
			.fadeToggle(isActive);

		return false;
	});

	/* Toggle from grid to line */
    /*
	$('.button-view-items').click(function () {
		var view_grid = 'to-grid';
		var view_line = 'to-line';

		$(this).addClass('active');

		if ($(this).hasClass(view_grid)) {
			$('.sr-list').addClass(view_grid).removeClass(view_line);
			$('.button-view-items.' + view_line).removeClass('active');

			$('.result-item').parent().addClass('col-md-4 col-sm-6 col-sx-12');
		} else {
			$('.sr-list').addClass(view_line).removeClass(view_grid);
			$('.button-view-items.' + view_grid).removeClass('active');

			$('.result-item').parent().removeClass('col-md-4 col-sm-6 col-sx-12')
				.addClass('col-md-12');
		}
	});
	*/

	$('.button-view-items.to-line').click();

    /*
	$(document).ready(function () {
		$('.btn-details, .item-logo-box', '.sr-list').click(function () {
			$('.search-result').addClass('hidden');
			$('.detail-result').removeClass('hidden');
		});

		$('.result-back-link').click(function () {
			$('.search-result').removeClass('hidden');
			$('.detail-result').addClass('hidden');
			return false;
		});

	});
	*/
});