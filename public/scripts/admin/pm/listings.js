$(document).ready(function () {
	var listingSettings = Object.create(defaultListSettings);
	listingSettings.list.url = 'listings/list/';
	listingSettings.list.success = function ($table, data) {
		for (var i in data.items) {
			var product = data.items[i];

			$table.append('<tr>' +
				'<td><a href="#">' + product.Name + '</a></td> ' +
				'<td>' + product.lName + '</td> ' +
				'<td>' + product.cName + '</td> ' +
				'<td>' + product.pBath + '</td> ' +
				'<td>' + product.pBed + '</td> ' +
				'</tr>');
		}

		$table.closest(".content-block-wrapper").toggleClass('hidden', !data.items.length);
	};
	listingSettings.countItem.funcTemplate = function (total_items) {
		return total_items + ' listing' + (total_items != 1 ? 's' : '');
	};

	var $initialList = $('#LiveList');
	listingSettings.list.init = function () {
		var listMethods = this;
		listMethods.run({
			page : 1,
			atm: 1
		});
	};
	listingSettings.pagination.link = $('.pagination-block', $initialList);
	listingSettings.countItem.link = $('.count-rows', $initialList);
	$('.table tbody', $initialList).createList(listingSettings);

	var $suspendedList = $('#InactiveList');
	listingSettings.list.init = function () {
		var listMethods = this;
		listMethods.run({
			page : 1,
			atm: 0
		});
	};
	listingSettings.pagination.link = $suspendedList.find('.pagination-block');
	listingSettings.countItem.link = $suspendedList.find('.count-rows');
	$('.table tbody', $suspendedList).createList(listingSettings);
});

