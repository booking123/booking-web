
<div class="content-block-wrapper functional-block ">
	<div class="col-sm-12 text-right">
		<a href="#" class="toggle-hide-filter"><span>+</span>Filters</a>
	</div>

	<form action="" method="get" id="ReservationFilter" class="hidden">
		<div class="row">

			<div class="col-sm-5">
				<h4>Reservation search</h4>
				<input id="resFilterS" type="text" class="form-control" name="s" placeholder="Enter guest name, unit or reservation #"/>
			</div>

			<div class="col-sm-5">
				<h4>Create date</h4>
				<div class="set-reservation-dates row">

					<div class="col-md-6 datepicker-input">
						<label class="sr-only" for="check-in">Check in</label>
						<input type="text" class="form-control" id="check-in" placeholder="From:" name="check_in"
							   value="{{ check_in }}"/>
						<span class="icon"></span>
					</div>
					<div class="col-md-6 datepicker-input">
						<label class="sr-only" for="check-out">Check out</label>
						<input type="text" class="form-control" id="check-out" placeholder="To:" name="check_out"
							   value="{{ check_out }}"/>
						<span class="icon"></span>
					</div>
				</div>
			</div>

			<div class="col-sm-12">
				<input type="submit" class="btn btn-submit" value="Search"/>
			</div>
		</div>
	</form>
</div>

<div id="ReservationList" class="content-block-wrapper">
	<div class="content-block-title">
		<div class="row">
			<div class="col-xs-10">
				<h3>Reservations</h3>
				<span class="count-rows"></span>
			</div>
			<div class="pagination-block col-xs-2 text-right"></div>
		</div>
	</div>
	<div class="table-wrapper">
		<table class="table statistic-table">
			<thead>
			<tr class="statistic-table-title">
				<th>Reservation ID</th>
				<th>Create Date</th>
				<th>Arrival Date</th>
				<th>Guest Name</th>
				<th># Nights</th>
				<th>Unit</th>
				<th>Status</th>
				<th>Booking Total</th>
				{#<th>Sources</th>#}
			</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</div>

<div class="modal fade" id="modalDetails" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
							class="sr-only">Close</span></button>
				<h4 class="modal-title" id="myModalLabel">Reservation Details</h4>
			</div>
			<div class="modal-body">
				<div class="customer-name text-center">
					<h2 class="cName"></h2>
					<a href="#" class="rState status-block">Balance due</a>
				</div>
				<div class="reservation-detail">
					<dl>
						<dt>Property:</dt>
						<dd><span class="rTitle">Snow Run Condo - 2 bed / 2 bath</span></dd>
					</dl>
					<dl>
						<dt>Check In:</dt>
						<dd><span class="rFromDate">8/22/14</span> @ <span class="rArrivalTime">2:00 PM</span></dd>
					</dl>
					<dl>
						<dt>Check Out:</dt>
						<dd><span class="rToDate">8/22/14</span> @ <span class="rDepartureTime">2:00 PM</span></dd>
					</dl>
					<dl>
						<dt>Amount Charged:</dt>
						<dd>$?,???.?? (inc Tax) paid on 7/4</dd>
					</dl>
					<dl>
						<dt>Balance Due:</dt>
						<dd><span class="rPrice">1200.64</span></dd>
					</dl>
					<dl>
						<dt>Source:</dt>
						<dd><span class="rChannel"></span></dd>
					</dl>
					<dl class="more-field">
						<dt>Deposit:</dt>
						<dd>? Nights</dd>
					</dl>
					<dl class="more-field">
						<dt>Cleaning Fee:</dt>
						<dd>$?,???.??</dd>
					</dl>
					<dl class="more-field">
						<dt>Nightly Base Rate</dt>
						<dd>$?,???.??</dd>
					</dl>
					<dl class="more-field">
						<dt>Commision</dt>
						<dd>???%</dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modalGuestResList" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	 aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
							class="sr-only">Close</span></button>
				<h4 class="modal-title" id="myModalLabel">Customer Details</h4>
			</div>
			<div class="modal-body">
				<div class="customer-name">
					<h2 class="cName">James Brown</h2>
					<p class="cPhone">412-123-233</p>
					<p class="cEmail">asdf@sss.sd</p>
					<p class="cAddress">112 Emi st. Park</p>
				</div>
				<div class="customer-reservation-heading">
					<h4>Bookings</h4>

				</div>
				<div class="customer-reservation-list">

					<div class="element-wrapper">
						<div class="reservation-element">
							<div class="pull-left"><a href="#">8/13 - 9/2</a><span>Alpine haus</span></div>
							<div class="pull-right"><a class="btn btn-default btn-confirmed"  href="#">Confirmed</a><span>Burington, VT</span></div>
						</div>
					</div>
					<div class="element-wrapper">

						<div class="reservation-element">
							<div class="pull-left"><a href="#">8/13 - 9/2</a><span>Alpine haus</span></div>
							<div class="pull-right"><a class="btn btn-default btn-confirmed" href="#">Balance Due</a><span>Burington, VT</span></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>


<script id="ReservationListTemp" type="text/template">
	<tr>
		<td><a href="#" class="modal-reservation-details" data-id="<%= rID %>"><%= rID %></a></td>
		<td><%= rDate %></td>
		<td><%= rFromDate %></td>
		<td><a href="#" class="modal-client-list-reservations" data-cid="<%= cID %>"><%= cName %></a></td>
		<td><%= rNights %></td>
		<td><span class="correct-line"><%= pName %></span></td>
		<td><a href="#" class="modal-reservation-details status-block btn btn-default <%= rStateClass %>" data-id="<%= rID %>"><%= rState %></a></td>
		<td><%= rPrice %></td>
		{#<td><%= rChannel %></td>#}
	</tr>
</script>