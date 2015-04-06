app.directive('searchAutocomplete', function ($http) {
	return function (scope, element, attrs) {
		element.autocomplete({
			html: true,
			source: "/api/location/getlocations/",
			minLength: 1,
			select: function (event, ui) {
				scope.params.locationName = ui.item.value;
				scope.params.locationID = ui.item.ID;
				$(this).blur();
			},
			search: function (event, ui) {
				if ($(this).val().length == parseInt($(this).val()).toString().length && !isNaN(parseInt($(this).val()))) {
					return false;
				}
			},
			response: function (event, ui) {
				if (!ui.content.length) {
					ui.content.push({
						label: "<img style='float: left; padding: 10px; position: relative; bottom: -3px;' src='../img/frontend/search/no-search-results-img.png' alt='No results.' />Sorry&nbsp;we&nbsp;could&nbsp;not&nbsp;find&nbsp;this&nbsp;location&nbsp;<b>'" + $(event.target).val() + "'&nbsp;",
						value: ''
					});
				}
			}
		}).blur(function () {
			scope.$apply(function () {
				var location = encodeURI(scope.params.locationName);
				if (location.length == 0) {
					$(this).addClass('error');
					return;
				}
				if (location.length == parseInt(location).toString().length) return;
				// @todo: remove ID
				$('#home_search_button').attr('disabled', 'disabled');
				$http.get("/api/location/getinfo?location=" + location, {})
					.success(function (data, status, headers, config) {
						if (data.error) {
							scope.params.locationID = -1;
							element.addClass('error');
						} else {
							// @todo: remove ID
							$('#home_search_button').removeAttr('disabled');
							scope.params.locationID = data.data.ID;
							element.removeClass('error');
						}
					});
			});
		}).keyup(function () {
			scope.$apply(function () {
				scope.params.locationID = 0;
			});
		});
	}
});
app.directive('datepicker', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			dpFunction: '@',
			dpCheckOut: '@'
		},
		link: function (scope, element, attrs, ngModelCtrl) {
			$(function () {
				(typeof scope.$parent[scope.dpFunction] == "function") && scope.$parent[scope.dpFunction](scope, element, attrs, ngModelCtrl);
			});
		}
	}
});
app.directive('detailInlineDp', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModelCtrl) {
			var calendar = new inlineDetailCalendar(element);

			calendar.setPositionDate('10/02/2014')
				.clearRules()
				.setIntervals(scope.inlineDetailCalendar.closed, 'closed')
				.setIntervals(scope.inlineDetailCalendar.booked, 'booked')
				.bindChangeMonth(function (dateStart, dateEnd) {
					calendar.toggleCalendar(true);

					scope.inlineDetailCalendar.getIntervalsFromMonths(dateStart, dateEnd, function () {
						calendar.toggleCalendar(false);
					});
				})
				.refresh();


			scope.$watch('inlineDetailCalendar.startDate', function (oldValue, newValue) {
				if (scope.action != 'product_detail') {
					return;
				}

				calendar.clearRules()
					.setPositionDate(oldValue || newValue);

				if (oldValue && newValue && newValue.getTime() == oldValue.getTime()) {
					scope.inlineDetailCalendar.getIntervalsFromMonths(calendar.getStartDate(), calendar.getEndDate(), function () {
						calendar.toggleCalendar(false);
					});
				}

				//scope.inlineDetailCalendar.oldProduct = scope.product_info.id;
			});

			scope.$watch('inlineDetailCalendar.opened', function (oldValue, newValue) {
				if (scope.action != 'product_detail') {
					return;
				}
				calendar
					.clearRules()
					.setIntervals(oldValue || newValue, 'opened')
					.setIntervals(scope.inlineDetailCalendar.booked, 'booked')
					.refresh();
			});

			scope.$watch('inlineDetailCalendar.booked', function (oldValue, newValue) {
				if (scope.action != 'product_detail') {
					return;
				}

				calendar
					.clearRules()
					.setIntervals(scope.inlineDetailCalendar.opened, 'opened')
					.setIntervals(oldValue || newValue, 'booked')
					.refresh();
			});

		}
	}
});
app.directive('a', function () {
	return {
		restrict: 'E',
		link: function (scope, elem, attrs) {
			if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
				elem.on('click', function (e) {
					e.preventDefault();
				});
			}
		}
	};
});
app.directive('checkSize', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			scope.$watch('product_info.description', function () {
				scope.hide_description = element.height() < 352 ? true : false;
			})
		}
	};
});
app.directive('checkUl', function ($window) {
	return function (scope, element) {
		var w = angular.element($window);
		w.bind('resize', function () {
			scope.hide_description = element.height() < 300 ? true : false;
		});

	}

});