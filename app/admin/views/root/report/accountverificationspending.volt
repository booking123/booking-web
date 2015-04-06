<h2 class="page-header">Report: Account Verifications Pending</h2>

<div class="report-box">
	<form id="filter-form" action="{{ url('admin/root/') }}report/get_accountverificationspending" method="get">
		<p>
			<label class="checkbox-inline"><input type="checkbox" id="filter_all" checked="checked"/> All</label>
			<label class="checkbox-inline"><input type="checkbox" name="filter[]" checked="checked" value="verified"/> Verified</label>
			<label class="checkbox-inline"><input type="checkbox" name="filter[]" checked="checked" value="notverified"/> Not Verified</label>
		</p>

		<div class="report-form">
			<label><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
		</div>

		<div class="form-actions">
			<button type="submit" href="#" class="btn btn-default">Run report</button>
		</div>
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

	<table class="table table-striped" id="result_table">
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


<br /><br /><br />

<script id="temp_row" type="text/template">
	<tr>
		<td><%= pUserName %></td>
		<td><%= pUserPhone %></td>
		<td class="text-right"><%= pmAmount %></td>
		<td><%= pmType %></td>
		<td><%= pmVerifiedDate %></td>
	</tr>
</script>