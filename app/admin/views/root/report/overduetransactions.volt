<h2 class="page-header">Report: Overdue Transactions</h2>
<div class="report-box">
	<form id="filter-form" action="{{ url('admin/root/') }}report/get_overduetransactions" method="get">
		<div class="report-form form-inline">
			<div class="form-group">
				<label for="product_id">Product ID</label>
				<input type="text" class="form-control inputId" id="product_id" name="product_id" value="{{ filter['product_id'] }}"/>
			</div>
			<div class="form-group">
				<label for="booking_id">Booking ID</label>
				<input type="text" class="form-control inputId" id="booking_id" name="booking_id" value="{{ filter['booking_id'] }}"/>
			</div>

			<div class="form-group">
				<label for="channel">Channels</label>
				<select class="form-control" id="channel" name="channel">
					<option value="">All</option>
					{% for channel in channels %}
						<option value="{{ channel.id }}" {% if filter['channel'] == channel.id %} selected="selected"{% endif %}>{{ channel.channel_name }}</option>
					{% endfor %}
				</select>
			</div>

			<div class="form-group">
				<label for="pms">PMS</label>
				<select class="form-control" id="pms" name="pms">
					<option value="">All</option>
					{% for user in pms %}
						<option value="{{ user.ID }}" {% if filter['pms'] == user.ID %} selected="selected"{% endif %}>{{ user.Name }}</option>
					{% endfor %}
				</select>
			</div>
		</div>

		<div class="report-form">
			<label class="checkbox-inline">
				<input type="checkbox" id="filter_status_all" value=""> All
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="1"/> Active
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="2"> Pending
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="4"> Failed
			</label>
		</div>

		<div class="report-form">
			<br />
			<label><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
		</div>

		<div class="report-form"><button type="submit" class="btn btn-default">Submit</button></div>
	</form>

	<br />

	<div class="pages_info container-fluid">
		<div class="row">
			<div class="col-xs-9">
				<ul class="pagination pagination-sm">
					<li class="disabled"><span>&laquo;</span></li>
					<li class="disabled"><span>&lsaquo;</span></li>
					<li class="disabled"><span>&rsaquo;</span></li>
					<li class="disabled"><span>&raquo;</span></li>
				</ul>
			</div>
			<div class="col-xs-3"><p class="text-right total_pages"></p></div>
		</div>
	</div>
	<table class="table table-striped table-condensed" id="result_table">
		<thead>
		<tr>
			{% for v in thead %}
				<th>
					{% if v|length > 1 %}
						<a href="javascript:void(0);" data-sort="{{ v[1] }}">{{ v[0] }}</a>
					{% else %}
						{{ v[0] }}
					{% endif %}
				</th>
			{% endfor %}
		</tr>
		</thead>
		<tbody></tbody>
	</table>
	<div class="pages_info container-fluid">
		<div class="row">
			<div class="col-xs-9">
				<ul class="pagination pagination-sm">
					<li class="disabled"><span>&laquo;</span></li>
					<li class="disabled"><span>&lsaquo;</span></li>
					<li class="disabled"><span>&rsaquo;</span></li>
					<li class="disabled"><span>&raquo;</span></li>
				</ul>
			</div>
			<div class="col-xs-3"><p class="text-right total_pages"></p></div>
		</div>
	</div>
</div>

<br/><br/><br/>

<script id="temp-row" type="text/template">
	<tr>
		<td><%= ptEntryDateTime %></td>
		<td><%= ptBookingID %></td>
		<td><%= ptPmsConfirmID %></td>
		<td class="text-center"><%= pgpName %></td>
		<td class="text-center"><%= ptFundsHolder %></td>
		<td><%= ptPartialIIN %></td>
		<td><%= PartnerName %></td>
		<td><%= SupplierName %></td>
		<td><%= ptChargeDate %></td>
		<td class="text-right"><%= ptChargeAmount %></td>
		<td><%= ptCurrency %></td>
		<td class="text-right"><%= ptCommission %></td>
		<td><%= ptPartnerPayment %></td>
		<td class="text-right"><%= ptBookingpalPayment %></td>
		<td><a href="#"><%= ptTransaction %></a></td>
		<td><%= ptStatus %></td>
		<td><%= ptAutopay %></td>
		<td><%= rFromDate %></td>
		<td><%= rToDate %></td>
		<td><%= customerName %></td>
		<td><%= customerPhone %></td>
	</tr>
</script>

<!--
		<td><%= ptFirstName %></td>
		<td><%= ptLastName %></td>
		<td><%= ptPhoneNumber %></td>
		<td><button type="button" data-id="<%= ptID %>" class="btn btn-danger btn-xs transaction_delete">Delete</button></td>
-->