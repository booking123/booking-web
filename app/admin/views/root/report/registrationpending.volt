<h2 class="page-header">Report: Registrations Pending</h2>

<div class="report-box">
	<form id="filter-form" action="{{ url('admin/root/') }}report/get_registrationpending" method="get">
		<div class="report-form form-inline">
			<div class="form-group">
				<label for="name">PM Name</label>
				<input type="text" class="form-control" id="name" name="name" value="{{ filter['name'] }}"/>
			</div>

			<div class="form-group">
				<label for="email">PM Email</label>
				<input type="text" class="form-control" id="email" name="email" value="{{ filter['email'] }}"/>
			</div>
			<div class="form-group">
				<label for="step">Step Name</label>
				<select class="form-control" id="step" name="step">
					<option value="">All</option>
					{% for id,step in reg_steps %}
						<option value="{{ id }}" {% if filter['step'] == id %} selected="selected"{% endif %}>{{ step }}</option>
					{% endfor %}
				</select>
			</div>

			<div class="report-form">
				<br />
				<label><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
			</div>

			<div class="form-group submit-row">
				<button type="submit" class="btn btn-default">Submit</button>
			</div>
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


<script id="temp-table-row" type="text/template">
	<tr>
		<td><%= pmCreatedDate %></td>
		<td><%= pmID %></td>
		<td><%= pName %></td>
		<td><%= pEmail %></td>
		<td><%= creatorName %></td>
		<td><%= pmRegStepID %></td>
		<td><%= pmNewReg %></td>
		<td><%= pState %></td>
	</tr>
</script>