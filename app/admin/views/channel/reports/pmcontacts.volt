<h2 class="page-header">Property Manager Contacts</h2>

<div class="report-box">

	<div class="row">
		<div class="col-xs-3">
			<input id="pm_filter" value="" class="form-control" placeholder="Name"/>
		</div>
	</div>

	<br/>

	<table id="pm_list" class="table table-striped table-condensed">
		<thead>
		<tr>
			<th>ID</th>
			<th>Company Name</th>
			<th>Contact</th>
			<th>Phone</th>
		</tr>
		</thead>
		<tbody>
		{% for v in propertyManagers %}
			<tr>
				<td>{{ v.ID }}</td>
				<td>{{ v.Name }}</td>
				<td>{{ v.ExtraName }}</td>
				<td>{{ v.DayPhone }}</td>
			</tr>
		{% endfor %}
		</tbody>
	</table>
</div>

<script type="text/javascript">
	$(document).ready(function () {
		$('#pm_filter').keyup(function () {
			var word = $(this).val();

			$('tr', '#pm_list tbody').each(function () {
				var name = $(this).find('td').eq(1).text().trim().toLowerCase();

				if (~name.indexOf(word.toLowerCase())) {
					$(this).show();
				} else {
					$(this).hide();
				}
			})
		});

		$('th', '#pm_list').click(function () {
			var table = $(this).parents('table').eq(0);
			var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
			this.asc = !this.asc;
			if (!this.asc) {
				rows = rows.reverse()
			}
			for (var i = 0; i < rows.length; i++) {
				table.append(rows[i])
			}
		});

		function comparer(index) {
			return function (a, b) {
				var valA = getCellValue(a, index), valB = getCellValue(b, index)
				return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
			}
		}

		function getCellValue(row, index) {
			return $(row).children('td').eq(index).html()
		}
	});
</script>

<br/><br/><br/>