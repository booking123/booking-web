$(document).ready(function () {
	var $transList = $('#TransactionList'),
		$transFilter = $('#TransactionFilter'),
		$checkIn = $('#check-in', $transFilter),
		$checkOut = $('#check-out', $transFilter);

	var transSettings = Object.create(defaultListSettings);

	transSettings.list.per_page = 25;
	transSettings.list.url = 'transactions/list/';
	transSettings.list.success = function ($table, data) {
		$table.html('');

		for (var i in data.items) {
			var product = data.items[i];

			$table.append('<tr>' +
				'<td><a href="#" class="modal-transaction-details" data-cid="' + product.tID + '">' + product.ptDate + '</a></td> ' +
				'<td>' + product.ptRes + '</td> ' +
				'<td>' + product.cName + '</td> ' +
				'<td><a href="#" class="' + product.ptStatus + '-label status-block">' + product.ptStatus + '</a></td> ' +
				'<td>' + product.ptAmount + '</td> ' +
				'<td>' + product.ptCurrency + '</td> ' +
				'<td>' + product.ptChtype + '</td> ' +
				'</tr>');
		}

	};

	transSettings.list.init = function () {
		var listMethods = this;
		$transFilter.submit();
	};

	transSettings.filterForm.link = $transFilter;
	transSettings.filterForm.filteringParams = function (filterValues) {
		if (filterValues.check_in) {
			filterValues.check_in = $.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate('mm/dd/yy', filterValues.check_in))
		}

		if (filterValues.check_out) {
			filterValues.check_out = $.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate('mm/dd/yy', filterValues.check_out))
		}

		filterValues.s = filterValues.s ? $.trim(filterValues.s) : '';

		return filterValues;
	};

	transSettings.pagination.link = $('.pagination-block', $transList);

	transSettings.countItem.link = $('.count-rows', $transList);
	transSettings.countItem.funcTemplate = function (total_items) {
		return total_items + ' transaction' + (total_items > 1 ? 's' : '');
	};


// Bind buttons
	$('.table tbody', $transList).createList(transSettings);

	$checkIn.datepicker({
		maxDate: $.datepicker.parseDate('mm/dd/yy', $checkIn.val()) || new Date(),
		onClose: function (selectedDate) {
			$checkOut.datepicker("option", "minDate", selectedDate);
		}
	});

	$checkOut.datepicker({
		minDate: $.datepicker.parseDate('mm/dd/yy', $checkOut.val()),
		maxDate: new Date(),
		onClose: function (selectedDate) {
			$checkIn.datepicker("option", "maxDate", selectedDate);
		}
	});

	$('.toggle-hide-filter').click(function () {
		$('#TransactionFilter').toggleClass('hidden');
		$(this).toggleClass('open-filter');
	});

	$transList.on('click', '.modal-transaction-details', function () {
		getTransactionByID($(this).data('cid'));
		return false;
	});


	function getTransactionByID(id) {
		$.ajax({
			url: SITE_URL + 'transactions/detail/',
			data: {id: id},
			method: 'get',
			dataType: 'json',
			success: function (resp) {
				if (resp.error) {
					return;
				}
				_.forEach(resp.data.item, function (v, k) {
					$('.' + k, '#modalDetails').html(v);
				});

				$('#modalDetails').modal('show');
			},
			error: function (e) {
				console.log(e);
			}
		});
	}
});