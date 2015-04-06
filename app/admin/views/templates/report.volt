<div class="reports" id="report-{{ report['name'] }}" data-url="{{ url(report['url']) }}">
	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-9">
				<ul class="pagination pagination-sm">
					<li class="disabled"><span>&laquo;</span></li>

					<li class="disabled"><span>&lsaquo;</span></li>

					<li><span>..</span></li>

					<li class="disabled"><span>&rsaquo;</span></li>

					<li class="disabled"><span>&raquo;</span></li>
				</ul>
			</div>

			<div class="col-xs-3">
				<p class="text-right"></p>
			</div>
		</div>
	</div>

	<table class="table table-striped table-condensed">
		<thead>
		<tr>
			{% for v in thead %}
				<th>
					{% if v|length > 1 %}
						<a{% if active_sort['desc'] %} class="dropup"{% endif %}
								href="{{ page_url ~ '?sort=' ~ v[1] }}">
							{{ v[0] }}{% if active_sort['name'] == v[1] %} <span class="caret"></span>{% endif %}
						</a>
					{% else %}
						{{ v[0] }}
					{% endif %}
				</th>
			{% endfor %}
		</tr>
		</thead>
		<tbody>
		</tbody>
	</table>

	<div class="container-fluid">
		<div class="row">
			<div class="col-xs-9">
				<ul class="pagination pagination-sm">
					<li class="disabled"><span>&laquo;</span></li>

					<li class="disabled"><span>&lsaquo;</span></li>

					<li><span>..</span></li>

					<li class="disabled"><span>&rsaquo;</span></li>

					<li class="disabled"><span>&raquo;</span></li>
				</ul>
			</div>

			<div class="col-xs-3">
				<p class="text-right"></p>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function () {
		var $report = $('#report-{{ report['name'] }}');

		$report.find('.table thead a').click(function () {

		});

	});

	var Reports = function () {
		var rows = {};


		this.setRoes = function (data) {
			for (var i = 0; i < data.length; i++) {
				rows[i] = {
					name: data[i][0],
					key: data[i][1],
					sort: 0
				};
			}
		};

		this.setData = function () {

		};
	};
</script>