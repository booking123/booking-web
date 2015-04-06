/*

 (function( $ ) {
 var methods = {
 run: function(){
 alert('run');
 },
 applyFilter: function( sortField, sortOrder ){

 }
 }

 $.fn.report = function( options ){
 var settings = $.extend({
 'url': '',
 'obj_table': null,
 'obj_pagination': null,
 'cur_page': 0,
 'num_pages': 0,
 'params': {}
 }, options);

 };
 })(jQuery);
 */
//TODO: BUG - reset number page if add new search params
//TODO: Change pagination list. If page is more!!!
(function ($) {
	var _report = {
		isRunning: false,
		isWorking: false,
		funcTempRow: function () {
			return null;
		},
		getPaginationRow: function (contet, page, current_page, type) {
			var tmp = $('<li></li>').append($('<span></span>').html(contet));

			if (page == current_page) {
				tmp.addClass(type);
			} else {
				tmp.find('span').click(function () {
					$.report.impl.goPage(page);
				});
			}

			return tmp;
		},
		$tbody: {},
		countRows: 0
	};

	$.report = function (options) {
		return $.report.impl.init(options);
	};

	$.fn.report = function (options) {
		return $.report.impl.init(options);
	};

	$.report.defaults = {
		report_url: 'default ulr to ajax call',
		form: null,
		table: null,
		tempRow: null,
		paginator: null,
		pages: {
			first: 0,
			prev: 0,
			next: 0,
			last: 0,
			current: 0,
			total: 0
		},
		sortField: '',
		sortOrder: 'ASC'
	};

	$.report.impl = {
		d: {},

		loading: {
			show: function () {
				_report.isWorking = true;

				$.report.impl.o.table.find('a').not('.default').addClass('disabled');
				$.report.impl.o.table.find('button').prop('disabled', true);
				$.report.impl.o.form.find('button[type=submit]').prop('disabled', true);
				$.report.impl.o.paginator.find('li').not('.default').addClass('disabled');


				this.$el.show();
			},

			hide: function () {
				_report.isWorking = false;

				$.report.impl.o.table.find('a').not('.default').removeClass('disabled');
				$.report.impl.o.table.find('button').prop('disabled', false);
				$.report.impl.o.form.find('button[type=submit]').prop('disabled', false);
				$.report.impl.o.paginator.find('li').not('.default').removeClass('disabled');

				this.$el.hide();
			},

			$el: $('<img height="12" src="/img/loading.gif" alt="Loading" style="display: none; margin-left: 5px" />')
		},

		init: function (options) {
			var s = this;

			s.o = $.extend({}, $.report.defaults, options);

			if (typeof options != 'object') {
				alert('Report Error: Unsupported date type: ' + typeof data);
				return s;
			}

			s.o.form.addClass('jq-report');
			s.o.table.addClass('jq-report');

			if (s.o.form.find('#sortField').length == 0) {
				s.o.form.append($('<input />').attr({type: 'hidden', name: 'sort', id: 'sortField', value: s.o.sortField}));
			}

			if (s.o.form.find('#sortOrder').length == 0) {
				s.o.form.append($('<input />').attr({type: 'hidden', name: 'sort_order', id: 'sortOrder', value: s.o.sortOrder}));
			}

			if (s.o.form.find('#page').length == 0) {
				s.o.form.append($('<input />').attr({type: 'hidden', name: 'page', id: 'page', value: '1'}));

			}

			s.o.form.find('button[type=submit]').append(s.loading.$el);

			_report.funcTempRow = _.template(s.o.tempRow.html());
			_report.$tbody = s.o.table.find('tbody');
			_report.countRows = s.o.table.find('thead th').length;

			s.o.table.find('thead a').click(function () {
				s.o.form.find('input[name=csv]').prop('checked', false);
				s.applyFilter($(this));
				return false;
			});

			return s;
		},

		resetPagination: function () {
			$('#page').val(1);
			return this;
		},

		run: function () {
			var s = this;

			if (_report.isWorking) {
				return;
			}

			//TODO: Use form action for submit!!!
			s.loading.show();
			$.ajax({
				url: s.o.report_url,
				data: s.o.form.serialize(),
				method: 'get',
				dataType: 'json',
				success: function (resp) {
					_report.$tbody.empty();

					if (!resp.data.items.length) {
						_report.$tbody.append('<td class="text-center" colspan="' + _report.countRows + '"><h4>No results</h4></td>');
					} else {
						for (var i in resp.data.items) {
							_report.$tbody.append(_report.funcTempRow(resp.data.items[i]));
						}
					}

					s.o.pages.first = resp.data.first;
					s.o.pages.prev = resp.data.before;
					s.o.pages.next = resp.data.next;
					s.o.pages.last = resp.data.last;
					s.o.pages.current = resp.data.current;
					s.o.pages.total = resp.data.total_pages;
					s.o.pages.total_items = resp.data.total_items;

					s.processPages();

					s.setSorting(resp.data.sorting.name, resp.data.sorting.order);

					_report.isRunning = true;
					s.loading.hide();
				},
				error: function () {
					alert('Error!');
					s.loading.hide();
				}
			});
		},

		setSorting: function (name, order) {
			var s = this,
				$thead = s.o.table.find('thead');

			s.o.sortField = name;
			s.o.sortOrder = order;


			var glyph_class = order.toLowerCase() == 'asc' ? 'glyphicon-sort-by-attributes' : 'glyphicon-sort-by-attributes-alt';

			$thead.find('span.glyphicon').remove();
			$thead.find('a[data-sort=' + name + ']').append(' <span class="glyphicon ' + glyph_class + '"></span>');

			s.o.form.find('#sortField').val(name);
			s.o.form.find('#sortOrder').val(order);
		},

		applyFilter: function ($a) {
			var s = this,
				keyword = $a.data('sort'),
				order = 'ASC';

			if (s.o.sortField == keyword) {
				order = s.o.sortOrder = (s.o.sortOrder == "ASC") ? "DESC" : "ASC";
			} else {
				s.o.sortField = keyword;
				s.o.sortOrder = "ASC";
			}

			s.setSorting(keyword, order);

			if (_report.isRunning) {
				s.run();
			}
		},

		processPages: function () {
			var s = this,
				$pagination_list = s.o.paginator.find('.pagination.pagination-sm'),
				$pages_info = s.o.paginator.find('.total_pages');
			if (s.o.paginator.length == 0) {
				alert('Pagination object does not exist');
			}
			$pagination_list.empty();

			// First page
			$pagination_list.append(_report.getPaginationRow('&laquo;', s.o.pages.first, s.o.pages.current, 'disabled default'));

			// Prev page
			$pagination_list.append(_report.getPaginationRow('&lsaquo;', s.o.pages.prev, s.o.pages.current, 'disabled default'));

			var current_before = 1,
				current_after = (+s.o.pages.current + 5) > s.o.pages.total ? s.o.pages.total : +s.o.pages.current + 5;

			if ((s.o.pages.current - 5) > current_before) {
				current_before = s.o.pages.current - 5;
				$pagination_list.append('<li class="disabled default"><span>...</span></li>');
			}

			// process all pages here
			for (var i = current_before; i <= current_after; i++) {
				$pagination_list.append(_report.getPaginationRow(i, i, s.o.pages.current, 'active'));
			}

			if ((+s.o.pages.current + 5) < s.o.pages.total) {
				$pagination_list.append('<li class="disabled default"><span>...</span></li>');
			}
			// Next page
			$pagination_list.append(_report.getPaginationRow('&rsaquo;', s.o.pages.next, s.o.pages.current, 'disabled default'));

			// Last page
			$pagination_list.append(_report.getPaginationRow('&raquo;', s.o.pages.last, s.o.pages.current, 'disabled default'));

			$pages_info.html('Page: ' + s.o.pages.current + ' from ' + s.o.pages.total + ' / Total item: ' + s.o.pages.total_items);
		},

		goPage: function (page) {
			var s = this;
			s.o.form.find('#page').val(page);
			s.run();
		}
	}
})(jQuery);