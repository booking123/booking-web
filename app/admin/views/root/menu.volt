    <ul class="nav navbar-nav">
		<li><a href="{{ url('admin/root/property-managers/') }}" class="list-group-item">Property Managers</a></li>
		<li><a href="{{ url('admin/root/pms-companies/') }}" class="list-group-item">PMS Companies</a></li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Channels <b class="caret"></b></a>
			<ul class="dropdown-menu">
				<li><a href="{{ url('admin/root/channel-partners/') }}">Channel Partners</a></li>
				<li><a href="{{ url('admin/root/channels/connect_pm_channel') }}">Connect Channel to PM</a></li>
			</ul>
		</li>
		<li class="dropdown">
			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Reports <b class="caret"></b></a>
			<ul class="dropdown-menu">
				<li><a href="{{ url('admin/root/report/accountverificationspending') }}">Account Verifications Pendings</a></li>
				<li><a href="{{ url('admin/root/report/registrationpending') }}">Registrations Pending</a></li>
				<li><a href="{{ url('admin/root/report/pendingtransactions') }}">Pending Transaction</a></li>
				{#<li><a href="{{ url('admin/root/report/paymentprocessing') }}">Property Payments Booking</a></li>#}
				<li><a href="{{ url('admin/root/report/transactions') }}">Transactions</a></li>
				<li><a href="{{ url('admin/root/report/reservations') }}">Reservations</a></li>
				<li><a href="{{ url('admin/root/report/overduetransactions') }}">Overdue Transactions</a></li>
				<li><a href="{{ url('admin/root/report/paymentssent') }}">Payments Sent/Pending</a></li>
			</ul>
		</li>
	</ul>