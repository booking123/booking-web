
<div class="content-block-wrapper">
	<div class="content-block-title">
		<h3>Reservations Overview</h3>
	</div>

	<div class="table-wrapper" id="ReservationStatistic">
		<table class="table statistic-table">
			<tr class="statistic-table-title">
				<th></th>
				<th>24 hours</th>
				<th>7 days</th>
				<th>30 days</th>
				<th>Total</th>
			</tr>
			<tr class="last-days">
				<th>New Reservations:</th>
				<td><a href="{{ url('admin/pm/reservations/?last_day=1') }}">{{ resByDay.countRes }}</a></td>
				<td><a href="{{ url('admin/pm/reservations/?last_day=7') }}">{{ resByWeek.countRes }}</a></td>
				<td><a href="{{ url('admin/pm/reservations/?last_day=30') }}">{{ resByMonth.countRes }}</a></td>
				<td><a href="{{ url('admin/pm/reservations/?last_day=all') }}">{{ resByAll.countRes }}</a></td></tr>
			<tr>
				<th>Average Res Amt:</th>
				<td>${{ number_format(resByDay.avg) }}</td>
				<td>${{ number_format(resByWeek.avg) }}</td>
				<td>${{ number_format(resByMonth.avg) }}</td>
				<td>${{ number_format(resByAll.avg) }}</td>
			</tr>
			<tr>
				<th>Booking Revenue:</th>
				<td>${{ number_format(resByDay.sumPrices) }}</td>
				<td>${{ number_format(resByWeek.sumPrices) }}</td>
				<td>${{ number_format(resByMonth.sumPrices) }}</td>
				<td>${{ number_format(resByAll.sumPrices) }}</td>
			</tr>
		</table>
	</div>
</div>
