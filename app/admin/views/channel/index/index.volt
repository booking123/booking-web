
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
				<td><a href="{{ url('admin/channel/reservations/?last_day=1') }}">{{ resByDay.countRes }}</a></td>
				<td><a href="{{ url('admin/channel/reservations/?last_day=7') }}">{{ resByWeek.countRes }}</a></td>
				<td><a href="{{ url('admin/channel/reservations/?last_day=30') }}">{{ resByMonth.countRes }}</a></td>
				<td><a href="{{ url('admin/channel/reservations/?last_day=all') }}">{{ resByAll.countRes }}</a></td></tr>
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


{% if tasks_list %}
	<div class="table-block tasks-table">
		<div class="table-heading pull-left">
			<h3>Tasks</h3><span>3 new tasks</span><a href="#">View all</a>
		</div>

		<p class="table-pagination pull-right"><a href="#" class="previous-link">&lt;</a><strong>1</strong>/5<a href="#"
																												class="next-link">
				&gt;</a></p>

		<div class="table-style">
			<table class="table ">
				<tr class="unactive-row">
					<td><span></span>New inqury</td>
					<td>James Brown</td>
					<td>1424 Helm St.</td>
					<td>30 min ago</td>
					<td><a href="#">Reply to inqury</a></td>
				</tr>
				<tr>
					<td><span></span>Pending reservation</td>
					<td>Sally King</td>
					<td>1424 Helm St.</td>
					<td>2 hours ago</td>
					<td><a href="#">Confirm reservation</a></td>
				</tr>
				<tr>
					<td><span></span>Cancelation</td>
					<td>John Metcalf</td>
					<td>1424 Helm St.</td>
					<td>3 days ago</td>
					<td><a href="#">Process cancelation</a></td>
				</tr>

			</table>
		</div>

	</div>
{% endif %}

{% if messages_list %}
	<div class="table-block messages-table">
		<div class="table-heading">
			<h3>Messages</h3><span>3 new messages</span><a href="#">View all</a>
		</div>
		<p class="table-pagination pull-right"><a href="#"
												  class="previous-link">&lt;</a><strong>1</strong>/5
			<a href="#" class="next-link"> &gt; </a></p>

		<div class="table-style">
			<table class="table ">
				<tr class="unactive-row">
					<td>May 27 | 2:21PM</td>
					<td>James Brown</td>
					<td>1424 Helm St.</td>
					<td>30 min ago</td>
					<td><a href="#">View message</a></td>
				</tr>
				<tr>
					<td>May 26 | 12:44PM</td>
					<td>Sally King</td>
					<td>1424 Helm St.</td>
					<td>2 hours ago</td>
					<td><a href="#">View message</a></td>
				</tr>
				<tr>
					<td>May 25 | 10:21PM</td>
					<td>John Metcalf</td>
					<td>1424 Helm St.</td>
					<td>3 days ago</td>
					<td><a href="#">View message</a></td>
				</tr>

			</table>
		</div>

	</div>
{% endif %}

{% if distributions_list %}
	<div class="table-block distribution-table">
		<div class="table-heading">
			<h3>Distribution</h3><span>39 of 64 partners publishing</span><a href="#">View all</a>
		</div>
		<div class="table-style">
			<table class="table ">
				<tr>
					<td>Active partners:</td>
					<td width="15%"><span class="text-success">30</span></td>
					<td>Max Commision:</td>
					<td width="15%"><span class="text-danger">10%</span></td>
					<td><a href="#">Increace max commision</a></td>
				</tr>
				<tr>
					<td>Available partners:</td>
					<td><span class="text-success">39</span></td>
					<td>Indirect bookings</td>
					<td><span class="text-danger">OFF</span></td>
					<td><a href="#">Enable indirect bookings</a></td>
				</tr>
				<tr>
					<td colspan="2"><a href="#"> + Add more partners</a></td>
					<td>Credit cards</td>
					<td><span class="text-danger">OFF</span></td>
					<td><a href="#">Enable credit cards</a></td>
				</tr>

			</table>
		</div>

	</div>
{% endif %}

{% if refer_freand %}
	<div class="refering-block">
		<img src="{{ url('img/admin/pm/refer-img.png') }}" class="pull-left img-responsive"/>

		<p class="pull-left">Refer A Friends to BookingPal and earn 10 commision free Bookings!</p>
		<a href="#" class="btn btn-default pull-right">Refer A Friend</a>
	</div>
{% endif %}
<div class="push"></div>
