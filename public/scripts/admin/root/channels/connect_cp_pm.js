"use strict"
$(document).ready(function () {
	$('#ListChannel').mergeItemsList({
		type: 'cp',
		listTies: '#ListTiesChannel',
		tempItemRow: '#TempItemRow',
		tempBox: '#TempTiesCP'
	});

	$('#ListManager').mergeItemsList({
		type: 'pm',
		listTies: '#ListTiesManager',
		tempItemRow: '#TempItemRow',
		tempBox: '#TempTiesPM'
	});

	var mergeConfirmStatus = false;
	$('#ConfirmMerge').click(function () {
		mergeConfirmStatus = true;
		$('#GoMarge').submit();
	});

	$('#GoMarge').submit(function () {
		var $activeMergeCP = $('input:checked', '#ListChannel tbody'),
			$activeMergePM = $('input:checked', '#ListManager tbody');

		if (!$activeMergeCP.length || !$activeMergePM.length) {
			alert('Please, select any property manager or channel partner');
			mergeConfirmStatus = false;
			return false;
		}

		if (!mergeConfirmStatus) {
			var ConfMergeCP = $('tbody','#ConfMergeCP');
			ConfMergeCP.html('');
			$activeMergeCP.each(function (){
				var $self = $(this);
				var $tr = $self.parents('tr').clone();

				var $td = $('<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
				$td.click(function () {
					$self.parents('tr').find('input').attr('checked', false).trigger('change');
					$(this).parents('tr').remove();
				});

				$tr.find('td').eq(0).html($td);

				ConfMergeCP.append($tr);
			});

			var ConfMergePM = $('tbody','#ConfMergePM');
			ConfMergePM.html('');
			$activeMergePM.each(function (){
				var $self = $(this);
				var $tr = $self.parents('tr').clone();

				var $td = $('<button type="button" class="close"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>');
				$td.click(function () {
					$self.parents('tr').find('input').attr('checked', false).trigger('change');
					$(this).parents('tr').remove();
				});

				$tr.find('td').eq(0).html($td);

				ConfMergePM.append($tr);
			});

			$('#modalConfirmAdd').modal('show');
			return false;
		}
		mergeConfirmStatus = false;
		$.ajax({
			url: SITE_URL + 'channels/addties',
			data: $(this).serialize(),
			dataType: 'json',
			success: function (resp) {

				if (!resp.data.ties.length) {
					return;
				}

				var temp = _.template($('#tempTableMergesRow').html());

				for (var i = 0; i < resp.data.ties.length; i++) {
					var tie = resp.data.ties[i],
						row = {
							cp: {
								id: tie.cp_id,
								name: tie.cp_name
							},
							pm: {
								id: tie.pm_id,
								name: tie.pm_name
							},
							active: {
								id: 0,
								name: ''
							}
						};

					var pm = $('#ties_' + tie.pm_id + ' table'),
						cp = $('#ties_' + tie.cp_id + ' table');

					if (!pm.find('tbody').length) {
						pm.append('<tbody></tbody>');
					}

					if (!cp.find('tbody').length) {
						cp.append('<tbody></tbody>');
					}

					row.active.id = tie.cp_id;
					row.active.name = tie.cp_name;
					pm.find('tbody').append(temp(row));

					row.active.id = tie.pm_id;
					row.active.name = tie.pm_name;
					cp.find('tbody').append(temp(row));
				}
			},
			error: function () {
			}
		});

		return false;
	});

	var deleteConfirmStatus = false;
	$('#modalDeleteMergeButton').click(function () {
		deleteConfirmStatus = true;
		$('#listMerges').submit();
	});
	$('#listMerges').submit(function () {
		if (!$(this).find('input:checked').length) {
			alert('Please, select any merges');
			return false;
		}
		var $table = $('tbody', '#modalDeleteMergeTable');

		if (!deleteConfirmStatus) {
			$table.find('tr').remove();
			$(this).find('input:checked').each(function () {
				var ids = $(this).val().split(','),
					data = $(this).data();
				var tr = '<tr>' +
					'<td></td>' +
					'<td>' + data.cp + '</td>' +
					'<td>' + data.pm + '(' + ids[1] + ')' + '</td>' +
					'</tr>';

				$table.append(tr);
			});
			$('#modalDeleteMerge').modal('show');
			return false;
		}

		deleteConfirmStatus = false;

		var ties = [];
		$(this).find('input:checked').each(function () {
			ties.push($(this).val().split(','));
		});

		removeMerges(ties);

		return false;
	});

	$('#modalDeleteOneConnectButton').click(function () {
		var arr = $('#modalDeleteOneConnectVal').val().split('_');
		removeMerges([arr]);
		$('#modalDeleteOneConnectVal').val('');
	});
});

function removeMerges(merges) {
	$.ajax({
		url: SITE_URL + 'channels/merges_ajax_del',
		data: {
			merges: merges
		},
		dataType: 'json',
		success: function (resp) {
			if (!resp.data.delete_merges.length) {
				return;
			}

			for (var i = 0; i < resp.data.delete_merges.length; i++) {
				$('.' + resp.data.delete_merges[i][0] + '_' + resp.data.delete_merges[i][1]).remove();
			}
		}
	});
}


(function ($) {
	$.fn.mergeItemsList = function (options) {

		var settings = $.extend({
			type: '',
			listTies: '',
			tempItemRow: '',
			tempBox: ''
		}, options);

		return this.each(function () {
			var $this = $(this);

			var $input = $this.find('.search-box input'),
				$list = $this.find('table.table tbody'),
				$listTies = $(settings.listTies),
				$checkbox_all_items = $this.find('.select_all_items');

			$input.keyup(function () {
				itemsList($input.val());
			});

			$checkbox_all_items.change(function () {
				var check_status = $(this).prop('checked'),
					$use_inputs = $list.find('input');

				if (!check_status) {
					$use_inputs.prop('checked', check_status).trigger('change');
					return;
				}

				if ($use_inputs.not(':checked').length < 2) {
					$use_inputs.not(':checked').prop('checked', check_status).trigger('change');
					return;
				}

				var ids = [];
				$use_inputs.not(':checked').each(function () {
					ids.push($(this).val());
				});

				selectItems(ids);
			});

			// ----------
			$list.on('change', 'input', function () {
				var $self = $(this),
					id = $self.val();

				if (!$self.prop('checked')) {
					unSelectRemove(id);
					return;
				}

				selectItems([id]);
			});

			$listTies.on('click', '.btn-danger', function () {
//				var arr = $(this).parents('tr').attr('class').split('_');


				$('#modalDeleteOneConnectVal').val($(this).parents('tr').attr('class'));
				$('#modalDeleteOneConnect').modal('show');
//				if (confirm('Are you sure you want to delete relation?')) {
//					removeMerges([arr]);
//				}

			});

			// ----------
			itemsList($input.val());

			// ----------
			function selectItems(ids) {
				buttonDisable();
				$.ajax({
					url: SITE_URL + 'channels/connect_ajax_get_connects',
					data: {
						id_items: ids,
						type: settings.type
					},
					dataType: 'json',
					success: function (resp) {
						if (!resp.data && !resp.data.length) {
							return;
						}

						var tempTableMerges = _.template($('#tempTableMerges').html()),
							tempTableMergesRow = _.template($('#tempTableMergesRow').html());;

						for(var i = 0; i < resp.data.length; i++) {
							var data = resp.data[i];
							data.tempTableMergesRow = tempTableMergesRow;

							$listTies.append(tempTableMerges(data));
							$list.find('input[value=' + data.id + ']').prop('checked', true);
						}

						$checkbox_all_items.prop("checked", ($list.find('input:checked').length == $list.find('input').length));

						buttonEnable();
					}, error: function () {
						buttonEnable();
					}
				});
			}

			function unSelectRemove(id) {
				$('#ties_' + id).remove();
				$checkbox_all_items.prop('checked', false);
			}

			function buttonDisable() {
				$checkbox_all_items.prop('disabled', true);
				$list.find('input').prop('disabled', true);
			}

			function buttonEnable() {
				$checkbox_all_items.prop('disabled', false);
				$list.find('input').prop('disabled', false);
			}

			var ajaxObj;
			function itemsList(s) {
				ajaxObj && ajaxObj.abort();

				ajaxObj = $.ajax({
					url: SITE_URL + 'channels/list',
					data: {
						s: s,
						type: settings.type
					},
					dataType: 'json',
					success: function (resp) {
						$list.find('input:not(:checked)').parents('tr').remove();
						var temp = _.template($(settings.tempItemRow).html());

						for (var i = 0; i < resp.data.channels.length; i++) {
							var item = resp.data.channels[i];
							if (!$list.find('input[value=' + item.ID + ']').length) {
								$list.append(temp(item));
							}
						}
					}
				});
			}

			//TODO: Old version
			function tiesList(id, type, item_name) {
				$('#ties_' + id).remove();
				$.ajax({
					url: SITE_URL + 'channels/merges_ajax_list',
					data: {
						id: id,
						type: type
					},
					dataType: 'json',
					success: function (resp) {
						if (!resp.data) {
							return;
						}

						var tempTableMerges = _.template($('#tempTableMerges').html());

						var data = resp.data;
						data.tempTableMergesRow = _.template($('#tempTableMergesRow').html());

						$listTies.append(tempTableMerges(data));
					}
				});
			}
		});
	};

	$.fn.autoSearchWords = function (option) {
		var $input = this.find('.search-box input');
		var $list = this.find('table.table tbody');
		var $listTies = $(option.listTies);

		function listData(s) {
			$.ajax({
				url: SITE_URL + 'channels/list',
				data: {
					s: s,
					type: option.type
				},
				dataType: 'json',
				success: function (resp) {
					$list.find('input:not(:checked)').parents('tr').remove();
					var temp = _.template($(option.tempItemRow).html());

					for (var i = 0; i < resp.data.channels.length; i++) {
						var item = resp.data.channels[i];
						if (!$list.find('input[value=' + item.ID + ']').length) {
							$list.append(temp(item));
						}
					}
				}
			});
		}

		function listTies(id, item_name) {
			$('#ties_' + id).remove();

			$.ajax({
				url: SITE_URL + 'channels/ties',
				data: {
					id: id,
					type: option.type
				},
				dataType: 'json',
				success: function (resp) {
					var temp = _.template($(option.tempBox).html());

					if (!resp.data) {
						return;
					}
					var data = resp.data;
					console.log(data.Title);
					if (option.type == 'cp') {
						data.Title = 'Channel ' + item_name;
					} else {
						data.Title = 'Property manager ' + item_name;
					}

					$listTies.append(temp(data));
				}
			});
		}

		function deleteTie(cp_ids, pm_ids) {
			$.ajax({
				url: SITE_URL + 'channels/deltie',
				data: {
					list_cp: cp_ids,
					list_pm: pm_ids
				},
				dataType: 'json',
				success: function (resp) {
					if (!resp.data.ties.length) {
						return;
					}

					for (var i = 0; i < resp.data.ties.length; i++) {
						$('.' + resp.data.ties[i].cp_id + '_' + resp.data.ties[i].pm_id).remove();
					}
				}
			});
		}

		listData($input.val());

		/* Bind Events */
		$input.keyup(function () {
			listData($input.val());
		});

		$list.on('change', 'input', function () {
			var $self = $(this),
				id = $self.val();

			if (!$self.prop('checked')) {
				$('#ties_' + id).remove();
				return;
			}

			listTies(id, 'Name');
		});

		$listTies.on('click', '.btn-danger', function () {
			var arr = $(this).parents('tr').attr('class').split('_');

			deleteTie([arr[0]], [arr[1]]);
		});
	}
})(jQuery);