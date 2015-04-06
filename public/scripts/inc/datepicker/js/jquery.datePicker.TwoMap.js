"use strict"

function CaledarController(settings) {
	var s = this,
		NowDate = +(new Date()).zeroTime(),
		LastDate = +(new Date()).addYears(10);

	var arrCallback = [],
		arrErrors = [];

	var options = {
		inputIn: {},
		inputOut: {},
		oneCalendar: false,
		stay: false
	};

	$.extend(options, settings);


	var InterfaceCalendar = {
		selected: null,
		badDate: false,
		checkDate: function (date) {
			var sCalendar = this,
				current_date = null;

			try {
				current_date = Date.fromString(date);

				if (+current_date < NowDate || +current_date > LastDate) {
					current_date = null;
					throw 'Date is old. Please enter correct date.';
				}

				sCalendar.selected = current_date;
				sCalendar.badDate = false;

				calculateDays();

			} catch (e) {
				sCalendar.badDate = true;
			} finally {
				return current_date;
			}
		},
		setDateFormInput: function (date) {
			var sCalendar = this,
				current_date = null;

			try {
				current_date = Date.fromString(date);

				if (+current_date < NowDate || +current_date > LastDate) {
					current_date = null;
					throw 'Date is old. Please enter correct date.';
				}

				sCalendar.selected = current_date;
				sCalendar.badDate = false;


				checkIn.b.month1.dpRerenderCalendar();
				!useOne && checkIn.b.month2.dpRerenderCalendar();

				checkOut.b.month1.dpRerenderCalendar();
				!useOne && checkOut.b.month2.dpRerenderCalendar();


				if (checkIn.selected && checkOut.selected) {
					checkOut.stay = calculateStay(checkIn.selected, checkOut.selected);
					setStayToBox(checkOut.stay);
				}
			} catch (e) {
				sCalendar.badDate = true;

				//console.log('Error', e, date);
			}

		},
		createCalendars: function () {
			var sCalendar = this;

			sCalendar.b.month1 = generateMonth('calendar-1');

			sCalendar.b.month1.bind('dateSelected', function (event, date, $td, status) {
				sCalendar.dbSelectBind(event, date, $td, status);
			});

			if (useOne) {
				return;
			}

			sCalendar.b.month2 = generateMonth('calendar-2');

			sCalendar.b.month2.bind('dateSelected', function (event, date, $td, status) {
				sCalendar.dbSelectBind(event, date, $td, status);
			});

			// Binds
			sCalendar.b.month1.bind('dpMonthChanged', function (event, displayedMonth, displayedYear) {
				sCalendar.b.month2.dpSetDisplayedMonth(displayedMonth + 1, displayedYear);
			});

			sCalendar.b.month2.bind('dpMonthChanged', function (event, displayedMonth, displayedYear) {
				sCalendar.b.month1.dpSetDisplayedMonth(displayedMonth - 1, displayedYear);
			});

			sCalendar.b.month1.find('.dp-nav-next-month').remove();

			//unbind().click(function () {
			//	sCalendar.b.month2.find('.dp-nav-next-month').trigger('click');
			//});
			sCalendar.b.month2.find('.dp-nav-prev-month').remove();
			//	.unbind().click(function () {
			//	sCalendar.b.month1.find('.dp-nav-prev-month').trigger('click');
			//});

		},
		dbSelectBind: function () {},
		b: {}
	};


	/* Not working in ie8-- */
	var checkIn = Object.create(InterfaceCalendar),
		checkOut = Object.create(InterfaceCalendar);


	var checkIn_TimeID = null;
	checkIn.dbSelectBind = function (event, date, $td, status) {
		var sCalendar = this;

		sCalendar.selected = new Date(date);

		if (!$td.find('span').length) {
			$td.wrapInner('<span/>').addClass('selected');
		}

		sCalendar.b.month1.dpSetSelected(sCalendar.selected.asString(), true, false, false);

		date.addDays(1);

		checkOut.b.month1.dpSetStartDate(date);
		checkOut.b.month1.dpSetDisplayedMonth(sCalendar.selected.getMonth(), sCalendar.selected.getFullYear());

		if (!useOne) {
			sCalendar.b.month2.dpSetSelected(checkIn.selected.asString(), true, false, false);

			checkOut.b.month2.dpSetStartDate(date);
			checkOut.b.month2.dpSetDisplayedMonth(sCalendar.selected.getMonth() + 1, sCalendar.selected.getFullYear());
		}


		if (checkOut.selected && !checkOut.stay && checkOut.selected < checkIn.selected) {
			checkOut.setStay(1);
		} else {
			calculateDays();
		}


		//var $c =  $checkIn.parents('.datepicker-box').find('.calendar');
		////if (!checkOut.selected && !$checkOut.val()) {
		//if ($c.is(':visible')) {
		//	$checkOut.trigger('focus');
		//	$c.hide();
		//}
		if (checkIn_TimeID) {
			clearTimeout(checkIn_TimeID);
		}
		checkIn_TimeID = setTimeout(function () {
			$checkIn.parents('.datepicker-box').find('.calendar').hide();
		}, 1000);
	};

	var checkOut_TimeID = null;
	checkOut.dbSelectBind = function (event, date, $td, status) {

		if (!checkIn.selected) {
			return;
		}
		var sCalendar = this;
		sCalendar.selected = new Date(date);


		if (!$td.find('span').length) {
			$td.wrapInner('<span/>').addClass('selected');
		}

		sCalendar.b.month1.dpSetSelected(sCalendar.selected.asString(), true, false, false);
		!useOne && sCalendar.b.month2.dpSetSelected(sCalendar.selected.asString(), true, false, false);


		var stay = calculateStay(checkIn.selected, date); //checkIn.selected ? parseInt(Math.ceil((date - checkIn.selected) / 86400000), 10) : 0;
		checkOut.setStay(stay);


		if (checkOut_TimeID) {
			clearTimeout(checkOut_TimeID);
		}
		checkOut_TimeID = setTimeout(function () {
			$checkOut.parents('.datepicker-box').find('.calendar').hide();
		}, 1000);
	};
	checkOut.setStay = function (stay) {
		this.stay = stay;
		calculateDays();
	};

	// Start
	var useOne = options.oneCalendar,
		$checkIn = options.inputIn,
		$checkOut = options.inputOut;

	checkIn.b = {};
	checkOut.b = {};
	checkIn.selected = null;
	checkOut.selected = null;
	checkIn.badDate = false;
	checkOut.badDate = false;

	checkIn.createCalendars();
	checkOut.createCalendars();

	if (options.stay) {
		checkOut.b.links = buildBlockStay();
		checkOut.b.links.find('a').click(function () {
			checkOut.setStay(+$(this).data('step'));
		});
	}


	var startDate = checkIn.checkDate($checkIn.val());
	if (!startDate) {
		errorTrigger($checkIn);
		startDate = new Date();
	} else {
		checkIn.b.month1.dpSetSelected(checkIn.selected.asString(), true, true);
		!useOne && checkIn.b.month2.dpSetSelected(checkIn.selected.asString(), true, true);
	}

	if (!checkOut.checkDate($checkOut.val())) {
		errorTrigger($checkOut);
	} else {
		checkOut.b.month1.dpSetSelected(checkOut.selected.asString(), true, true);
		!useOne && checkOut.b.month2.dpSetSelected(checkOut.selected.asString(), true, true);
	}

	if (!useOne) {
		checkIn.b.month2.dpSetDisplayedMonth(startDate.getMonth() + 1, startDate.getFullYear());
		checkOut.b.month2.dpSetDisplayedMonth(startDate.getMonth() + 1, startDate.getFullYear());
	}

	mergeCalendarsBlock($checkIn, checkIn);
	mergeCalendarsBlock($checkOut, checkOut);


	// For Use ...
	s.setCallback = function (func) {
		arrCallback.push(func);

		return this;
	};
	function runCallback() {
		for (var i = 0; i < arrCallback.length; i++) {
			if (arrCallback[i](checkIn.selected.asString(), checkOut.selected.asString(), checkOut.stay) === false) {
				break;
			}
		}
	}

	s.errorTrigger = function (func) {
		arrErrors.push(func);
		return this;
	};
	function errorTrigger(el) {
		for (var i = 0; i < arrErrors.length; i++) {
			if (arrErrors[i](el) === false) {
				break;
			}
		}
	}

	s.setDate = function (type, val) {
		switch (type) {
			case 'checkIn' :
				checkIn.setDateFormInput(val);
				break;

			case 'checkOut' :
				checkOut.setDateFormInput(val);
				break;
		}
	};

	// General ...
	function mergeCalendarsBlock($el, obj) {
		var $parentBox = $el.parents('.datepicker-box');

		var c = $('<div class="calendar" />');

		for (var i in obj.b) {
			c.append(obj.b[i]);
		}
		c.find('.dp-nav-next-year, .dp-nav-prev-year').remove();

		$(document).click(function (e) {
			if ($parentBox.find('.calendar').is(':visible') && ($(e.target).parents('.datepicker-box').is($parentBox) || $(e.target).parents('table.jCalendar').length)) {
				return;
			}
			$parentBox.find('.calendar').hide();
		});

		$el.change(function () {
			obj.setDateFormInput($(this).val());
		});

		$parentBox.append(c);

		$el.focus(function (e) {
			e.preventDefault();
			showCalendar($parentBox);

			if ($el == $checkIn) {
				hideCalendar($checkOut);
			} else {

				hideCalendar($checkIn);
			}
		});

		$(window).resize(function () {
			resizeCalendarPosition($parentBox.find('.calendar'));
		});
	}

	function calendarVisibleRules($td, thisDate, month, year) {
		if ($td.hasClass('other-month')) {
			$td.html('').unbind();
			return;
		}

		$td.html('<span>' + thisDate.getDate() + '</span>');

		if (thisDate.getDay() == 6) {
			$td.addClass('saturday');
		}

		if ((checkIn.selected && thisDate.asString() == checkIn.selected.asString())
			|| (checkOut.selected && thisDate.asString() == checkOut.selected.asString())) {
			$td.addClass('is-checked');
		}

		if (checkIn && checkOut) {
			var checkInDate = new Date(checkIn.selected);
			var checkOutDate = new Date(checkOut.selected);

			checkInDate.zeroTime();
			checkOutDate.zeroTime();
			thisDate.zeroTime();

			if (checkInDate && checkOutDate && (thisDate >= checkInDate && thisDate <= checkOutDate)) {
				if (!$td.find('span').length) {
					$td.wrapInner('<span/>');
				}
				$td.addClass('selected-line');


				if (thisDate <= checkInDate) {
					//$td.addClass('first');
					$td.addClass('first').html('<span><i></i><b>' + thisDate.getDate() + '</b></span>');
				} else if (thisDate >= checkOutDate) {
					//$td.addClass('last');
					$td.addClass('last').html('<span><i></i><b>' + thisDate.getDate() + '</b></span>');
				}
			}
		}


		//for (var i = 0, c = dateRules.length; i < c; i++) {
		//	if (dateRules[i].c == 'opened') {
		//		//dateRules[i].s
		//	}
		//	if (thisDate >= dateRules[i].s && thisDate <= dateRules[i].f) {
		//		var d = (dateRules[i].c == 'opened') ? 'closed' : '';
		//
		//		$td.addClass(dateRules[i].c);
		//		if (thisDate <= dateRules[i].s) {
		//			$td.addClass('start ' + d).html('<span><i></i><b>' + thisDate.getDate() + '</b></span>'); //.find('span').append('<i/>');
		//		} else if (thisDate >= dateRules[i].f) {
		//			$td.addClass('end ' + d).html('<span><i></i><b>' + thisDate.getDate() + '</b></span>'); //.find('span').append('<i/>');
		//		}
		//
		//	}
		//}
	}

	function generateMonth(class_name) {
		return $('<div class="' + class_name + '" />')
			.datePicker({inline: true})
			.dpSetRenderCallback(calendarVisibleRules)
			.dpRerenderCalendar();
	}

	function buildBlockStay() {
		var $stayBlock = $('<div class="dp-stay"><h2>Stay:</h2></div>');

		for (var i = 1; i <= 6; i++) {
			$stayBlock.append('<a data-step="' + i + '" href="#">' + i + ' night' + (i > 1 ? 's' : '') + '</a>');
		}

		$stayBlock.append('<div class="separate"></div><a data-step="7" href="#">1 week</a><a data-step="14" href="#">2 weeks</a>');

		$stayBlock.find('a').click(function (e) {
			e.preventDefault();
			$stayBlock.find('a').removeClass('active');
		});

		return $stayBlock;
	}

	function calculateDays() {
		if (checkIn.selected) {
			$checkIn.val(checkIn.selected.asString());

			if (checkOut.stay) {
				checkOut.selected = new Date(checkIn.selected);
				checkOut.selected.addSeconds(checkOut.stay * 86400);

				setStayToBox(checkOut.stay);

				checkOut.b.month1.dpSetSelected(checkOut.selected.asString(), true, false, false);

				!useOne && checkOut.b.month2.dpSetSelected(checkOut.selected.asString(), true, false, false);
			}
		}

		if (checkOut.selected) {
			$checkOut.val(checkOut.selected.asString());
		}

		checkIn.b.month1.dpRerenderCalendar();
		!useOne && checkIn.b.month2.dpRerenderCalendar();

		checkOut.b.month1.dpRerenderCalendar();
		!useOne && checkOut.b.month2.dpRerenderCalendar();


		if (!checkIn.selected || !checkOut.selected) {
			return;
		}

		runCallback();
	}

	function showCalendar($parentBox) {
		var $calendar = $parentBox.find('.calendar');
		$calendar.show();
		resizeCalendarPosition($calendar);
	}

	function hideCalendar($el) {
		$el.parents('.datepicker-box').find('.calendar').hide();
	}

	function resizeCalendarPosition($calendar) {
		if (!$calendar.is(':visible')) {
			return;
		}

		$calendar.css('left', 0);
		var width = 7; // Where is one pixel????
		$calendar.children().each(function () {
			if (!$(this).is(':visible')) {
				return;
			}
			width += $(this).width() + parseInt($(this).css('margin-left'), 10) + parseInt($(this).css('margin-right'), 10);
		});

		var position = $calendar.offset();
		var left = $(window).width() - (position.left + width + 5);

		if (left > 0) {
			left = 0;
		}
		$calendar.width(width).css('left', left);
	}

	function calculateStay (start, end) {
		var correct_timezone = end.getTimezoneOffset() - start.getTimezoneOffset();
		return start ? parseInt(Math.ceil((end - start - correct_timezone*60*1000) / 86400000), 10) : 0;
	}

	function setStayToBox (stay) {
		if (!options.stay) {
			return;
		}
		checkOut.b.links.find('a').removeClass('active');
		checkOut.b.links.find('a[data-step=' + stay + ']').addClass('active');
	}
}

function inlineDetailCalendar(calendar_box, date) {
	var nowDay = new Date(),
		self = this,
		arrCallback = [],
		dateRules = [],

		c1 = $('<div />').datePicker({inline: true})
			.dpSetRenderCallback(cVisibleRules)
			.dpRerenderCalendar(),
		c2 = $('<div class="hidden-xs" />').datePicker({inline: true})
			.dpSetRenderCallback(cVisibleRules)
			.dpRerenderCalendar();

	c2.dpSetDisplayedMonth(nowDay.getMonth() + 1, nowDay.getFullYear());

	c1.find('.dp-nav-next-year, .dp-nav-prev-year').remove();
	c2.find('.dp-nav-next-year, .dp-nav-prev-year').remove();

	c1.find('.dp-nav-next-month').addClass('visible-xs').hide();
	c2.find('.dp-nav-prev-month').remove();


	c1.bind('dpMonthChanged', function (event, displayedMonth, displayedYear) {
		c2.dpSetDisplayedMonth(displayedMonth + 1, displayedYear);
		runCallback(event, displayedMonth, displayedYear);
	});

	c2.bind('dpMonthChanged', function (event, displayedMonth, displayedYear) {
		c1.dpSetDisplayedMonth(displayedMonth - 1, displayedYear);
	});


	$(calendar_box).append(c1, c2);


	/**
	 * set start month for view calendars line
	 *
	 * @param date (mm/dd/yyyy)
	 * @returns {inlineDetailCalendar}
	 */
	this.setPositionDate = function (date) {
		var objDate = checkSetDate(date);

		if (objDate) {
			nowDay = objDate;

			c1.dpSetDisplayedMonth(nowDay.getMonth(), nowDay.getFullYear());
			c2.dpSetDisplayedMonth(nowDay.getMonth() + 1, nowDay.getFullYear());
		} else {
			console.log('Error. Please set correct date!');
		}


		return this;
	};

	/**
	 * Set intervals for checked dates in calendar date lines.
	 *
	 * @param dates ([{startDate:"mm/dd/yyyy", endDate:"mm/dd/yyyy"}]) - array dates intervals.
	 * @param type -
	 * @returns {inlineDetailCalendar}
	 */
	this.setIntervals = function (dates, type) {
		if (!dates) {
			return this;
		}
		for (var i = 0, c = dates.length; i < c; i++) {

			var current_date = dates[i];

			var s = checkSetDate(current_date['startDate']);
			var f = checkSetDate(current_date['endDate']);

			if (!s || !f) {
				console.log('Error. Date not correct', current_date);
				continue;
			}
			if (type == 'opened') {
				//s.addDays(-1);
				f.addDays(1);
			}

			dateRules.push({
				s:s,
				f:f,
				c:type
			});
		}

		return this;
	};

	this.clearRules = function () {
		dateRules = [];

		return this;
	};

	this.bindChangeMonth = function (func) {
		if (typeof func == "function") {
			arrCallback.push(func);
		}

		return this;
	};

	this.refresh = function () {
		c1.dpRerenderCalendar();
		c2.dpRerenderCalendar();

		return this;
	};

	this.toggleCalendar = function(type) {
		if (!type) {
			//$(calendar_box)
		}

		c1.find('.dp-calendar').toggleClass('blocked', type);
		c2.find('.dp-calendar').toggleClass('blocked', type);
	};

	this.getStartDate = function () {
		var firstMonth = new Date(nowDay.getFullYear(), nowDay.getMonth(), 1, 0, 0, 0);

		return new Date(firstMonth.getFullYear(), firstMonth.getMonth(), 1 - (firstMonth.getDay() ? firstMonth.getDay() : 7), 0, 0, 0);
	};

	this.getEndDate = function () {
		var lastMonth = new Date(nowDay.getFullYear(), nowDay.getMonth() + 2, 1, 0, 0);

		return new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1 + 7 - (lastMonth.getDay() ? lastMonth.getDay() : 7), 0, 0);
	};

	/**
	 *
	 * @param $td
	 * @param thisDate
	 * @param month
	 * @param year
	 */
	function cVisibleRules($td, thisDate, month, year) {

		if ($td.hasClass('other-month')) {
			$td.html('');
			return;
		}
		$td.html('<span>' + thisDate.getDate() + '</span>');
		if (thisDate.getDay() == 6) {
			$td.addClass('saturday');
		}

		for (var i = 0, c = dateRules.length; i < c; i++) {
			if (dateRules[i].c == 'opened') {
				//dateRules[i].f.addDays(1);
			}

			if (thisDate >= dateRules[i].s && thisDate <= dateRules[i].f) {
				var d = (dateRules[i].c == 'opened') ? 'closed' : '';

				$td.addClass(dateRules[i].c);
				if (thisDate <= dateRules[i].s) {
					$td.addClass('start ' + d).html('<span><i></i><b>' + thisDate.getDate() + '</b></span>'); //.find('span').append('<i/>');
				} else if (thisDate >= dateRules[i].f) {
					$td.addClass('end ' + d).html('<span><i></i><b>' + thisDate.getDate() + '</b></span>'); //.find('span').append('<i/>');
				}

				if ($td.is('.opened.end.closed.booked.start')) {

					if (thisDate <= dateRules[i].s) {
						$td.removeClass('opened end closed booked start');
						$td.addClass('error_booked_start');
					} else if (thisDate >= dateRules[i].f) {
						$td.addClass('error_booked_finish');
						$td.removeClass('opened end closed booked start');
					}
				}
			}
		}

		if ($td.is('.opened.start.closed.booked')) {
			var $td_prev = $td.prev();
			if ($td_prev.length && $td_prev.hasClass('booked') && !$td_prev.hasClass('opened')) {
				$td.addClass('error_booked');
			}
		} else if ($td.prev().is('.opened.end.closed.booked')){

			if ($td.hasClass('booked') && !$td.hasClass('opened')) {
				$td.prev().addClass('error_booked');
			}
		}
	}

	function runCallback(event, displayedMonth, displayedYear) {

		nowDay.setMonth(displayedMonth);
		nowDay.setFullYear(displayedYear);

		var dateStart = self.getStartDate();
		var dateEnd = self.getEndDate();

		for (var i = 0; i < arrCallback.length; i++) {
			if (arrCallback[i](dateStart, dateEnd) === false) {
				break;
			}
		}
	}

	function checkSetDate(date) {
		if (date instanceof Date) {
			return date;
		}

		var d = date.split('-');

		if (d.length == 3) {
			date = new Date(d[0],d[1] - 1, d[2], 0, 0, 0);
		} else {
			try {
				date = Date.fromString(date);
			} catch (e) {
				return false;
			}
		}

		return date;
	}



}