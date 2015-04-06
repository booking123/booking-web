$(document).ready(function () {
	$('.toggle-hide-filter').click(function(){
		$('#ReservationFilter').toggleClass('hidden');
		$(this).toggleClass('open-filter');
	});
	var $resList = $('#ReservationList'),
		$resFilter = $('#ReservationFilter'),
		$checkIn = $('#check-in', $resFilter),
		$checkOut = $('#check-out', $resFilter);

	var reservSettings = Object.create(defaultListSettings),
		template = _.template(document.getElementById('ReservationListTemp').innerHTML);

	reservSettings.list.url = 'reservations/list/';
	reservSettings.list.success = function ($table, data) {
		$table.html('');

		_.forEach(data.items, function (item) {
			$table.append(template(item));
		});
	};
	reservSettings.list.init = function () {
		$resFilter.submit();
	};

	reservSettings.filterForm.link = $resFilter;
	reservSettings.filterForm.filteringParams = function (filterValues) {
		if (filterValues.check_in) {
			filterValues.check_in = $.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate('mm/dd/yy', filterValues.check_in))
		}

		if (filterValues.check_out) {
			filterValues.check_out = $.datepicker.formatDate("yy-mm-dd", $.datepicker.parseDate('mm/dd/yy', filterValues.check_out))
		}

		filterValues.s = filterValues.s ? $.trim(filterValues.s) : '';

		return filterValues;
	};

	reservSettings.pagination.link = $('.pagination-block', $resList);

	reservSettings.countItem.link = $('.count-rows', $resList);
	reservSettings.countItem.funcTemplate = function (total_items) {
		return total_items + ' reservation' + (total_items != 1 ? 's' : '');
	};


// Bind buttons
	$('.table tbody', $resList).createList(reservSettings);

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

	$resList
		.on('click', '.modal-reservation-details', function () {
			getReservationByID($(this).data('id'));

			return false;
		})
		.on('click', '.modal-client-list-reservations', function () {
			getCustomerDetails($(this).data('cid'));

			return false;
		});

	$('#modalGuestResList').on('click', '.element-wrapper', function () {
		$('#modalGuestResList').modal('hide');
		getReservationByID($(this).data('rid'));
		$('#modalDetails').modal('show');
	});




	function getCustomerDetails(id) {
		$.ajax({
			url: SITE_URL + 'reservations/questlist/',
			data: {id: id},
			method: 'get',
			dataType: 'json',
			success: function (resp) {
				if (resp.error) {
					return;
				}

				_.forEach(resp.data.customer, function (v, k) {
					$('.' + k, '#modalGuestResList').html(v);
				});

				$('.customer-reservation-list').html('');
				_.forEach(resp.data.items, function (v) {
					$('.customer-reservation-list').append('<div class="element-wrapper" data-rid="' + v.rID + '">'
					+ '<div class="reservation-element">'
					+ '<div class="pull-left"><p href="#">' + v.rFromDate + ' - ' + v.rToDate + '</p><span>' + v.pName + '</span></div>'
					+ '<div class="pull-right"><a class="btn btn-default status-block ' + v.rState.toLowerCase() + '" href="#">' + v.rState + '</a><span>' + v.pPhysicaladdress + '</span></div>'
					+ '</div>'
					+ '</div>')
				});

				$('#modalGuestResList').modal('show');
			},
			error: function (e) {
				console.log(e);
			}
		});
	}

	function getReservationByID(id) {
		$.ajax({
			url: SITE_URL + 'reservations/detail/',
			data: {id: id},
			method: 'get',
			dataType: 'json',
			success: function (resp) {
				if (resp.error) {
					return;
				}
				var state = resp.data.item.rState.toLowerCase();
				resp.data.item.rTitle = resp.data.item.pName + ' - ' + resp.data.item.pBed + ' bed / ' + resp.data.item.pBath + ' bath';
				_.forEach(resp.data.item, function (v, k) {
					$('.' + k, '#modalDetails').html(v);
				});

				$('.rState').addClass(state);
				$('#modalDetails').modal('show');

			},
			error: function (e) {
				console.log(e);
			}
		});
	}
});