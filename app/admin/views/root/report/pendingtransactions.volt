<div id="dialogDeleteChannels" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="alert alert-warning fade in">
			<button class="close" type="button" data-dismiss="modal" aria-hidden="true">×</button>
			<p>Are you sure you want to delete channels?</p>

			<p>
				<button id="submitDeleteChannels" class="btn btn-danger" type="button">Yes</button>
				<button class="btn btn-default" type="button" data-dismiss="modal" aria-hidden="true">No</button>
			</p>
		</div>
	</div>
</div>

<h2 class="page-header">Report: Pending Transaction</h2>

<div class="report-box">
	<form id="form-pending" action="{{ url('admin/root/') }}report/get_pendingtransactions" method="get">
		<div class="report-form">
			<div class="form-group">
				<div class="report-form form-inline">

					<div class="form-group">
						<label for="start_date">Start date</label>
						<input type="text" class="form-control" id="start_date" name="start_date" autocomplete="off"
							   placeholder="00/00/0000" value="{{ filter['start_date'] }}"/>
					</div>
					<div class="form-group">
						<label for="end_date">End date</label>
						<input type="text" class="form-control" id="end_date" name="end_date" autocomplete="off"
							   placeholder="00/00/0000" value="{{ filter['end_date'] }}"/>
					</div>

					<div class="form-group">
						<label for="booking_id">Booking ID</label>
						<input type="text" class="form-control inputId" id="booking_id" name="booking_id"
							   value="{{ filter['booking_id'] }}"/>
					</div>
					<div class="form-group">
						<label for="product_id">Product ID</label>
						<input type="text" class="form-control inputId" id="product_id" name="product_id"
							   value="{{ filter['product_id'] }}"/>
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
						<label for="pms">Property Manager</label>
						<select disabled="disabled" class="form-control disabled" id="pms" name="pms">
							<option value="">Property Manager</option>
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
						<input type="checkbox" name="filter_status[]" value="3"> Cleared
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="filter_status[]" value="4"> Failed
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="filter_status[]" value="5"> Deleted
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="filter_status[]" value="6"> Cancelled
					</label>
				</div>
			</div>

			<div class="report-form">
				<br />
				<label><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
			</div>

			<button type="submit" class="btn btn-default">Submit</button>
		</div>
	</form>

	<br/>

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

<script id="temp_row" type="text/template">
	<tr>
		<td><%= ptEntryDateTime %></td>
		<td class="text-center"><%= pgpName %></td>
		<td class="text-center"><%= ptFundsHolder %></td>
		<td><%= ptFirstName %></td>
		<td><%= ptLastName %></td>
		<td><%= ptPhoneNumber %></td>
		<td><%= PartnerName %></td>
		<td><%= SupplierName %></td>
		<td><%= ChargeDate %></td>
		<td class="text-right"><%= ptChargeAmount %></td>
		<td><%= ptCurrency %></td>
		<td><%= ptTransaction %></td>
		<td class="status"><%= ptStatus %></td>
		<td class="text-center">
			<% if (ptStatus != 'Cancelled' && ptStatus != 'Cleared' && ptStatus != 'Deleted') { %>
			<button type="button" class="btn btn-success btn-xs action_button transaction_action"
					data-id="<%= ptID %>" data-type="clear" data-question="Are you sure you want to mark this transaction as Cleared?">
				Clear
			</button>
			<button type="button" class="btn btn-danger btn-xs action_button transaction_action"
					data-id="<%= ptID %>" data-type="delete" data-question="Are you sure you want to mark this transaction as Deleted?">
				Delete
			</button>
			<% } %>
			<button type="button" class="btn btn-default btn-xs action_button"
					data-id="<%= ptID %>" data-type="email">
				Email-Confirm
			</button>
		</td>
	</tr>
</script>