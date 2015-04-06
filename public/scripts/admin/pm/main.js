"use strict";
//TODO: need correct bu from unsave function
var defaultListSettings = {
	list: {
		url: 'http://link.to.get.json.data',
		per_page: 5,
		success: function ($rootTable, response) {
			console.log($rootTable, response);
		},
		error: function ($rootTable, error) {
			console.log($rootTable, error);
		}
	},

	pagination: {
		link: null,
		funcTemplate: function ($paginationBox, pagParams) {
			var listMethods = this;
			var $a = $('<a href="javascript:void(0);" class="prev-link">&lt;</a>');
			if (pagParams.before && pagParams.before < pagParams.current) {
				$a.click(function (e) {
					e.preventDefault();
					listMethods.run({ page: pagParams.before });
				});
			} else {
				$a.addClass('disabled');
			}
			$paginationBox.append($a);
			// Current / Count
			var $span = $('<span><b>' + pagParams.current + '</b>/' + pagParams.total_pages + '</span>');
			$paginationBox.append($span);
			// Next
			$a = $('<a href="javascript:void(0);" class="next-link">&gt;</a>');
			if (pagParams.next && pagParams.next > pagParams.current) {
				$a.click(function (e) {
					e.preventDefault();
					listMethods.run({ page: pagParams.next });
				});
			} else {
				$a.addClass('disabled');
			}
			$paginationBox.append($a);
		}
	},

	countItem: {
		link: null,
		funcTemplate: function (total_items) {
			return total_items + ' item' + (total_items > 1 ? 's' : '');
		}
	},

	sorting: {

	},

	messages: {
		link: null
	},

	filterForm: {
		link: null,
		//paramsType: {},
		filteringParams: function (filterValues) {
			// correct values if need...
			// if return false - break filtering and query to server.
			return filterValues;
		}
	}
};

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name] !== undefined) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

$.fn.createList = function (listParams) {
	var $rootTable = this,
		$rootMessageBox,
		$rootCountBoxes,
		$rootPaginatBoxes,
		$rootFilterForm;

	var listSettings = $.extend(true, {}, defaultListSettings, listParams);

	var _isWork = false;

	var listMethods = {
		isWork: function () {
			return _isWork;
		},

		requestData: {
			per_page: 5,
			page: 1
		},

		run: function (params) {
			_isWork = true;

			console.log(this.requestData);
			this.requestData = $.extend(this.requestData, params);
			//params.per_page = params.per_page ? params.per_page : globalParams.list.per_page;

			$.ajax({
				type: "get",
				url: SITE_URL + listSettings.list.url,
				data: this.requestData,
				dataType: 'json',
				success: function (resp) {
					_isWork = false;
					$rootTable.empty();

					if (resp.error) {
						_setMessages("Error: Don't get date from server.", '');
						return;
					}

					listSettings.list.success && listSettings.list.success.apply(listMethods, [$rootTable, resp.data]);

					_setPagination({
						total_pages: resp.data.total_pages,
						total_items: resp.data.total_items,
						current: resp.data.current,
						next: resp.data.next,
						before: resp.data.before
					});
				},
				error: function (e) {
					_isWork = false;
					_setMessages("Error: Don't get date from server.", '');

					listSettings.list.error && listSettings.list.error.apply(listMethods, [$rootTable, e]);
				}
			});
		}
	};

	// Starting
	$rootCountBoxes = listSettings.countItem.link ? $(listSettings.countItem.link) : null;
	$rootPaginatBoxes = listSettings.pagination.link ? $(listSettings.pagination.link) : null;

	listSettings.filterForm && listSettings.filterForm.link && _setFilterForm(listSettings.filterForm.paramsType);

	listSettings.list && listSettings.list.init && listSettings.list.init.apply(listMethods, [$rootTable]);

	return this;


	function _setMessages(message, type) {
		if (!$rootMessageBox || !$rootMessageBox.length) {
			console.log(type, message);
			return;
		}

		if (!type) {
			$rootMessageBox.removeClass().html('').hide()
				.addClass('alert');

			return;
		}

		$rootMessageBox.html(message).addClass('alert-' + type); //.show();
	}

	function _setPagination(pagParams) {
		var defaultPagParams = {
			total_pages: 1,
			total_items: 0,
			current: 1,
			next: 1,
			before: 1
		};

		pagParams = $.extend(defaultPagParams, pagParams);

		if (!pagParams.total_pages) {
			pagParams.total_pages = 1;
		}

		$rootCountBoxes && $rootCountBoxes.length && $rootCountBoxes.each(setCountItems);

		$rootPaginatBoxes && $rootPaginatBoxes.length && $rootPaginatBoxes.each(setPagination);

		function setCountItems () {
			var strCount = listSettings.countItem.funcTemplate(pagParams.total_items);
			$(this).empty()
				.append(strCount);
		}

		function setPagination () {
			$(this).html('');
			// Before
			if (listSettings.pagination.funcTemplate && (typeof listSettings.pagination.funcTemplate == "function")) {
				listSettings.pagination.funcTemplate.apply(listMethods, [$(this), pagParams]);
			}
		}

	}

	function _setFilterForm() {
		var listFilters = { page: 1, status: [] };
		$rootFilterForm = listSettings.filterForm.link;
		$rootFilterForm.submit(function (e) {
			e.preventDefault();
			var params = listSettings.filterForm.filteringParams($rootFilterForm.serializeObject());

			listMethods.run($.extend([], listFilters, params));
		});
	}

	function _setSorting() {

	}

};
