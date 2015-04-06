{{ stylesheet_link('css/jqueryUiForDatepicker.css') }}
<style type="text/css">
	.btn-success.disabled,
	.btn-success[disabled],
	fieldset[disabled] .btn-success,
	.btn-success.disabled:hover,
	.btn-success[disabled]:hover,
	fieldset[disabled] .btn-success:hover,
	.btn-success.disabled:focus,
	.btn-success[disabled]:focus,
	fieldset[disabled]
	.btn-success:focus,
	.btn-success.disabled:active,
	.btn-success[disabled]:active,
	fieldset[disabled]
	.btn-success:active,
	.btn-success.disabled.active,
	.btn-success.active[disabled],
	fieldset[disabled] .btn-success.active {
		background: none repeat scroll 0 0 #99ca50;
		border-color: #99ca50;
	}
	#search_name{ width: 250px; }
	#search_location{ width: 250px; }
	#search_id{ width: 150px; }

	.ui-autocomplete {
		max-height: 302px;
		overflow-x: hidden;
		overflow-y: auto;
	}
	.ButtonStatusInquire{
		margin-left: 10px;
	}
</style>
<br/>

<ol class="breadcrumb">
	<li>{{ link_to('admin/pm/', 'Dashboard') }}</li>
	<li class="active">Property Detail</li>
</ol>

<div class="pm-content">
	<div class="pm-message-menu">
		<div class="row">
			<div class="col-md-9 search-listing">
				<form class="form-inline" role="form" id="search_form">
					<div class="form-group">
						<label class="sr-only" for="search_location">Property Location</label>
						<input id="search_location" type="text" class="form-control" placeholder="Property Location" name="search_location" autocomplete="off"/>
						<input id="search_location_id" type="hidden" name="search_location_id"/>
						<div class="view"></div>
					</div>
					<div class="form-group">
						<label class="sr-only" for="search_name">Product Name</label>
						<input id="search_name" type="text" class="form-control" placeholder="Property Name" name="search_name"/>
					</div>
					<div class="form-group">
						<label class="sr-only" for="search_id">Product ID</label>
						<input id="search_id" type="text" class="form-control" placeholder="Property ID" name="search_id"/>
					</div>
					<button type="submit" class="btn btn-default">Search</button>
				</form>
			</div>

		</div>
	</div>

	<table id="ProductList" class="pm-table pm-table-listing table table-bordered table-hover table-striped">
		<thead>
		<tr>
			<th>Property</th>
			<th>Edit</th>
			<th>Status</th>
			<th>Inquire Status</th>
		</tr>
		</thead>
		<tbody>
		{#{% for product in products %}#}
			{#<tr>#}
				{#<td class="listing-property"><img src="{{ url('img/admin/tump-product-img.png') }}"/> {{ product.Name }}#}
				{#</td>#}
				{#<td class="listing-edit" data-id="{{ product.ID }}">#}
					{#<div class="btn-group ButtonStatus">#}
						{#<button type="button" class="btn btn-default bookable_online">Bookable Online</button>#}
						{#<button type="button" class="btn btn-default inquire_only">Inquire only</button>#}
						{#<input type="hidden" name="State" value="{{ product.State }}"/>#}
					{#</div>#}

					{#<div class="btn-group ButtonStatusInquire">#}
						{#<button type="button" class="btn btn-default use_api">Use API</button>#}
						{#<button type="button" class="btn btn-default send_email" disabled="disabled">Send email#}
						{#</button>#}
						{#<input type="hidden" name="State" value="{{ product.inquire_state }}"/>#}
					{#</div>#}

				{#</td>#}
				{#<td class="active_listing text-center">{{ product.State }}</td>#}
				{#<td class="active_listing text-center">{{ product.inquire_state }}</td>#}
			{#</tr>#}
		{#{% endfor %}#}
		</tbody>
	</table>
	<div class="btn-toolbar" role="toolbar">
		<div id="product_list_pagination" class="btn-group">
		</div>
	</div>
</div>

{{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}
<script type="text/javascript">
	$(document).ready(function () {

		$('.listing-edit', '#ProductList').each(function () {
			ChangeButtonStatus(this);
		});

		$('#ProductList').on('click', '.listing-edit button', function () {
			var $root = $(this).parents('.listing-edit');
			var $parent = $(this).parent('div');
			var status = '';

			$root.find('button').prop('disabled', true);

			if ($(this).hasClass('bookable_online')) {
				status = 'Created';
			} else if ($(this).hasClass('inquire_only')) {
				$parent.find('input').val('inquire_only');
				ChangeButtonStatus($root);

				return;
			} else if ($(this).hasClass('use_api')) {
				status = 'Use API';
			} else if ($(this).hasClass('send_email')) {
				status = 'Send e-mail';
			}

			$.ajax({
				url: SITE_URL + 'property_detail/product_status_change/',
				data: {
					status: status,
					id: $root.data('id')
				},
				dataType: 'json',
				success: function (resp) {
					if (!resp.error) {
						$parent.find('input').val(status);
					}

					$root.parents('tr').find('td:eq(2)').html(resp.data.State);
					$root.parents('tr').find('td:eq(3)').html(resp.data.inquire_state);

					ChangeButtonStatus($root, (status == 'Created'));
				},
				error: function () {
					ChangeButtonStatus($root);
				}
			});
		});

		$( "#search_location").keyup(function () {
			if ($("#search_location").val().length < 2) {
				$("#search_location_id").val('');
			}
		}).autocomplete({
			source:  "/api/location/getlocations/",
			minLength: 2,
			select: function( event, ui ) {

				$("#search_location").val( ui.item.value );
				$("#search_location_id").val( ui.item.ID );
			},
			search: function( event, ui ){
				if ( $(this).val().length == parseInt( $(this).val()).toString().length && !isNaN(parseInt( $(this).val())) ){
					return;
				}
			}
		});


		var arr_search = {};
		$('#search_form').submit(function () {
			var arr = $(this).serializeArray();

			for (var i = 0; i < arr.length; i++) {
				arr_search[arr[i].name] = arr[i].value;
			}
			viewProductList(1);
			return false;
		}).submit();

		function viewProductList(page) {
			var data = arr_search;
			data.p = page;

			$.ajax({
				url: SITE_URL + 'property_detail/product_list/',
				data: data,
				dataType: 'json',
				success: function (resp) {
					$('tbody', '#ProductList').empty();

					if (resp.error) {
						console.log(resp.message);
						return;
					}

					viewPaginationList(resp.data);

					for (var i in resp.data.items) {
						var product = resp.data.items[i];

						var tr = $('<tr></tr>');

						tr.append('<td class="listing-property"><img src="{{ url('img/admin/tump-product-img.png') }}" /> ' + product.Name + '</td>');

						product.inquire_state = product.inquire_state ? product.inquire_state : '';

						var td = $('<td data-id="' + product.pID + '" class="listing-edit"><div class="btn-group ButtonStatus">'
								+ '<button type="button" class="btn btn-default bookable_online">Bookable Online</button>'
								+ '<button type="button" class="btn btn-default inquire_only">Inquire only</button>'
								+ '<input type="hidden" name="State" value="' + product.State + '" />'
								+ '</div>'
								+ '<div class="btn-group ButtonStatusInquire">'
								+ '<button type="button" class="btn btn-default use_api">Use API</button>'
								+ '<button type="button" class="btn btn-default send_email" disabled="disabled">Send email</button>'
								+ '<input type="hidden" name="State" value="' + product.inquire_state + '" /></div></td>');
						tr.append(td);

						tr.append('<td class="active_listing text-center">' + product.State + '</td>');
						tr.append('<td class="active_listing text-center">' + product.inquire_state + '</td>');

						$('tbody', '#ProductList').append(tr);
						ChangeButtonStatus(td);
					}
				}
			});
		}

		function ChangeButtonStatus(obj, reset_inquire) {
			var class_name = 'btn-success';
			$(obj).find('button')
					.removeClass(class_name)
					.prop('disabled', false);

//			$(obj).find('.send_email').prop('disabled', true);

			var $ButtonStatus = $(obj).find('.ButtonStatus'),
					$ButtonStatusInquire = $(obj).find('.ButtonStatusInquire');

			var $inputBSI = $ButtonStatusInquire.find('input'),
					$inputBS = $ButtonStatus.find('input');

			if (reset_inquire) {
				$inputBSI.val('');
			}

			var status = $inputBSI.val();

			if (status == 'Use API' || status == 'Send e-mail') {
				buttonSelected($ButtonStatus.find('.inquire_only'));
				$ButtonStatusInquire.show();
				switch (status) {
					case 'Use API' :
						buttonSelected($ButtonStatusInquire.find('.use_api'));
						return;
					case 'Send e-mail' :
						buttonSelected($ButtonStatusInquire.find('.send_email'));
						return;
				}
			}

			status = $inputBS.val();
			if (status == 'Created') {
				buttonSelected($ButtonStatus.find('.bookable_online'));
			} else if (status == 'inquire_only') {
				$ButtonStatusInquire.show();
				buttonSelected($ButtonStatus.find('.inquire_only'));
				return;
			}

			$ButtonStatusInquire.hide();

			function buttonSelected($btn) {
				$btn.addClass(class_name).prop('disabled', true);
			}
		}

		function viewPaginationList(data) {
			function getPaginationRow (contet, page, current_page, type) {
				var tmp = $('<button type="button" class="btn btn-default"></button>').html(contet);

				if (page == current_page) {
					tmp.addClass(type).prop('disabled', true);
				} else {
					tmp.click(function () {
						viewProductList(page);
					});
				}
				return tmp;
			}

			data.total = +data.last;
//			data.total = +data.total_items;
			data.current = +data.current;

			var $pagination_list = $('#product_list_pagination');

			$pagination_list.empty();

			// First page
			$pagination_list.append(getPaginationRow('&laquo;', data.first, data.current, 'disabled'));

			// Prev page
			$pagination_list.append(getPaginationRow('&lsaquo;', data.before, data.current, 'disabled'));

			var current_before = 1,
				current_after = (+data.current + 5) > data.last ? data.last : +data.current + 5;

			if ((data.current - 5) > current_before) {
				current_before = data.current - 5;
				$pagination_list.append('<button type="button" class="btn btn-default disabled" disabled="disabled">...</button>');
			}

			// process all pages here
			for (var i = current_before; i <= current_after; i++) {
				$pagination_list.append(getPaginationRow(i, i, data.current, 'btn-success'));
			}

			if ((data.current + 5) < data.last) {
				$pagination_list.append('<button type="button" class="btn btn-default disabled" disabled="disabled">...</button>');
			}
			// Next page
			$pagination_list.append(getPaginationRow('&rsaquo;', data.next, data.current, 'disabled'));

			// Last page
			$pagination_list.append(getPaginationRow('&raquo;', data.last, data.current, 'disabled'));

//					$pages_info.html('Page: ' + s.o.pages.current + ' from ' + s.o.pages.total + ' / Total item: ' + s.o.pages.total_items);
		}
	});
</script>