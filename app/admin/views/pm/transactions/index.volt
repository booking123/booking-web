<div class="content-block-wrapper functional-block">
	<div class="col-sm-12 text-right">
		<a href="#" class="toggle-hide-filter"><span>+</span>Filters</a>
	</div>

	<form action="" method="get" id="TransactionFilter" class="hidden">
		<div class="row">
			<div class="col-sm-5">
				<h4>Transaction search</h4>
				<input type="text" class="form-control" name="s" placeholder="Enter guest name, unit or reservation #"/>
			</div>

			<div class="col-sm-5">
				<h4>Create date</h4>

				<div class="set-reservation-dates row">
					<div class="col-md-6 datepicker-input">
						<label class="sr-only" for="check-in">Check in</label>
						<input type="text" class="form-control" name="check_in" id="check-in" placeholder="Check in:" value="{{ check_in }}"/>
						<span class="icon"></span>
					</div>
					<div class="col-md-6 datepicker-input">
						<label class="sr-only" for="check-out">Check out</label>
						<input type="text" class="form-control" name="check_out" id="check-out" placeholder="Check out:" value="{{ check_out }}"/>
						<span class="icon"></span>
					</div>
				</div>
			</div>

			<div class="col-sm-5 filter-bottom">


					<div class="row">
						{% for id, row in statuses %}
							<label class="col-xs-6 col-lg-4"><input type="checkbox" name="status" value="{{ id }}"/> {{ row }}</label>
						{% endfor %}
					</div>
					<input type="submit" class="btn btn-submit" value="Search"/>


			</div>
		</div>
	</form>
</div>

<div class="content-block-wrapper" id="TransactionList">
	<div class="content-block-title">
		<div class="row">
			<div class="col-xs-10">
				<h3>Transactions</h3>
				<span class="count-rows"></span>
			</div>
			<div class="pagination-block col-xs-2 text-right"></div>
		</div>
	</div>

	<div class="table-wrapper">
		<table class="table statistic-table">
			<thead>
				<tr class="statistic-table-title">
					<th>Payment Date</th>
					<th>Reservation ID</th>
					<th>Customer</th>
					<th>Status</th>
					<th>Transaction amount</th>
					<th>Currency</th>
					<th>Charge type</th>
				</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</div>

<div id="modalDetails" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title" id="myModalLabel">Transactions Details</h4>
			</div>
			<div class="modal-body">
				<div class="reservation-detail">
					<dl>
						<dt>Transaction ID:</dt>
						<dd><span class="tID"></span></dd>
					</dl>
					<dl>
						<dt>Gateway Transaction ID:</dt>
						<dd><span class="tGatwayID"></span></dd>
					</dl>
					<dl>
						<dt>Funds Holder:</dt>
						<dd><span class="tFundsHolder"></span></dd>
					</dl>
					<dl>
						<dt>Balance Due:</dt>
						<dd><span class="rPrice"></span></dd>
					</dl>

					<dl>
						<dt>Current amount:</dt>
						<dd><span class="tTotalAmount"></span></dd>
					</dl>
					<dl>
						<dt>Total amount:</dt>
						<dd><span class="tFinalAmount"></span></dd>
					</dl>
					<dl>
						<dt>Source:</dt>
						<dd><span class="rChannel"></span></dd>
					</dl>
					<dl>
						<dt>Status:</dt>
						<dd><span class="tStatus"></span></dd>
					</dl>
				</div>
			</div>
		</div>
	</div>
</div>
