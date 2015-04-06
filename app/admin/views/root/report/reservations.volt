<style type="text/css">
	#reservationHistory .reservation-history-content{
		padding: 0 20px;
	}
	strong.checkbox-inline{
		cursor: default;
		padding-left: 10px;
		font-weight: bold;
	}

	.pandora-box{}
	.pandora-box .pandora-box-title{}
	.pandora-box .pandora-box-content{ display: none; }

	@media (min-width: 991px) {
		#reservationHistory .modal-dialog.modal-lg{ max-width: 90%; width: auto; }
	}
	@media (max-width: 991px) {
		#reservationHistory .modal-dialog.modal-lg{ width: auto; margin: 10px; }
	}
</style>
<h2 class="page-header">Report: Reservations</h2>


<div class="report-box">
	<div class="form-inline report-form">
		<form id="filter-form" action="{{ url('admin/root/') }}report/get_reservations" method="get">
			<div class="form-group">
				<label for="start_date">Start date</label>
				<input type="text" class="form-control" id="start_date" name="start_date" value="{{ filter['start_date'] }}" autocomplete="off" placeholder="00/00/0000" />
			</div>
			<div class="form-group">
				<label for="end_date">End date</label>
				<input type="text" class="form-control" id="end_date" name="end_date" value="{{ filter['end_date'] }}" autocomplete="off" placeholder="00/00/0000" />
			</div>

			<div class="form-group">
				<label for="reservation_id">Reservation ID</label>
				<input type="text" class="form-control inputId" id="reservation_id" name="reservation_id" value="{{ filter['reservation_id'] }}" />
			</div>
			<div class="form-group">
				<label for="number">Reservation Name</label>
				<input type="text" class="form-control inputId" id="number" name="number" value="{{ filter['number'] }}" />
			</div>
			<div class="form-group">
				<label for="property_id">Property ID</label>
				<input type="text" class="form-control inputId" id="property_id" name="property_id" value="{{ filter['property_id'] }}"/>
			</div>
			<div class="form-group">
				<label for="pm">PM</label>
				<select class="form-control" id="pm" name="pm">
					<option value="">All</option>
					{% for pm in property_managers %}
						<option value="{{ pm.ID }}" {% if filter['pm'] == pm.ID %} selected="selected"{% endif %}>{{ pm.Name }}</option>
					{% endfor %}
				</select>
			</div>

			<div class="report-form">
				<strong class="checkbox-inline">Type:</strong>
				<label class="checkbox-inline">
					<input type="checkbox" id="filter_types_all" value=""> All
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_types[]" value="Booked"/> Booked Online
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_types[]" value="Inquiry"> Inquiry Only
				</label>
			</div>


			<div class="report-form">
				<strong class="checkbox-inline">Status:</strong>
				<label class="checkbox-inline">
					<input type="checkbox" id="filter_status_all" value=""> All
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Arrived"/> Arrived
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Briefed"> Briefed
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Cancelled"> Cancelled
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Closed"> Closed
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Confirmed"> Confirmed
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Departed"> Departed
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="FullyPaid"> FullyPaid
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Initial"> Initial
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="PreDeparture"> PreDeparture
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Provisional"> Provisional
				</label>
				<label class="checkbox-inline">
					<input type="checkbox" name="filter_status[]" value="Reserved"> Reserved
				</label>
			</div>

			<div class="report-form">
				<br />
				<label><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
			</div>

			<div class="form-group submit-row">
				<button type="submit" class="btn btn-default">Submit</button>
			</div>
		</form>
	</div>

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
				<th>{% if v|length > 1 %}<a href="javascript:void(0);" data-sort="{{ v[1] }}">{{ v[0] }}</a>{% else %}{{ v[0] }}{% endif %}</th>
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


<script>
	$(document).ready(function () {
		$("#result_table").on('click', '.pandora-box-title', function (e) {
			e.preventDefault();
			$(this).parent().find('.pandora-box-content').toggle();
		});
	});
</script>
<!-- hide -->
<div id="reservationHistory" class="modal fade" tabindex="-1" role="dialog"  aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Reservation ID: <span id="history_res_id"></span></h4>
			</div>
			<div class="modal-body">
				<table id="history_table" class="table table-striped table-condensed">
					<thead>
					<tr>
						<th>User</th>
						<th>State</th>
						<th>Activity</th>
						<th>Process</th>
						<th>Notes</th>
						<th>Date</th>
					</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
			<div class="modal-footer"></div>
		</div>
	</div>
</div>

<script id="temp-table-row" type="text/template">
	<tr>
		<td><%= rID %></td>
		<td><%= rDate %></td>
		<td><%= rName %></td>
		<td><%= pID %></td>
		<td><%= pName %></td>
		<td><%= rFromDate %></td>
		<td><%= rToDate %></td>
		<td>
			<div class="pandora-box">
				<a class="pandora-box-title" href="#"><%= cName %></a>
				<span class="pandora-box-content">
					<% if (cEmail) { %><br /><b>Email:</b> <%= cEmail %><% } %>
					<% if (cPhone) { %><br /><b>Phone:</b> <%= cPhone %><% } %>
				</span>
			</div>
		</td>
		<td><%= rState %></td>
		<td><%= pmName %></td>
		<td><%= aName %></td>
		<td class="text-center"><% if (countEvents>0) { %><a class="reservation_more_history" data-id="<%=rID%>" href="javascript:void(0);">View</a><% } else { %>-<% } %></td>
	</tr>
</script>

<script id="temp-history-row" type="text/template">
	<tr>
		<td><%=aName%></td>
		<td><%=eState%></td>
		<td><%=eActivity%></td>
		<td><%=eProcess%></td>
		<td><%=eNotes%></td>
		<td><%=eDate%></td>
	</tr>
</script>