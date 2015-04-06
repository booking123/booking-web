<h2 class="page-header">Report: Payments Sent/Pending</h2>

<div class="report-box">
	<form id="form-payment-sent" action="{{ url('admin/root/') }}report/get_paymentssent" method="get">
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
						<label for="product_id">Property ID</label>
						<input type="text" class="form-control inputId" id="product_id" name="product_id"
							   value="{{ filter['property_id'] }}"/>
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
						<label for="pm">Property Manager</label>
						<select class="form-control disabled" id="pm" name="pm" >
							<option value="">All</option>
							{% for pm in pmes %}
								<option value="{{ pm.ID }}" {% if filter['pm'] == pm.ID %} selected="selected"{% endif %}>{{ pm.Name }}</option>
							{% endfor %}
						</select>
					</div>
				</div>
				<div class="report-form">
					<label class="checkbox-inline">
						<input type="checkbox" id="filter_status_all" value=""> All
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="filter_status[]" value="1"/> Cleared
					</label>
					<label class="checkbox-inline">
						<input type="checkbox" name="filter_status[]" value="0"> No Cleared
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
		<td><%= prID %></td>
		<td><%= pmName %></td>
		<td><%= propertyAddress %></td>
		<td><%= BookingID %></td>
		<td><%= prCheckInDate %></td>
		<td><%= prType %></td>
		<td><%= ChannelPartner %></td>
		<td class="text-center"><%= prCleared %></td>
		<td class="text-center"><a data-id="<%= prID %>" class="btn btn-sm btn-default" href="#"><% if (prCleared == 'Yes') { %>No <% } %>Cleared</a></td>
	</tr>
</script>