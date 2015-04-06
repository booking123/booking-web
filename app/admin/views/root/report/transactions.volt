<h2 class="page-header">Report: Transactions</h2>

<div class="report-box">
	<form id="filter-form" action="get_transactions">
		<div class="report-form form-inline">
			<div class="form-group">
				<label for="start_date">Start date</label>
				<input type="text" class="form-control" id="start_date" name="start_date" placeholder="00/00/0000" value="{{ filter['start_date'] }}"/>
			</div>
			<div class="form-group">
				<label for="end_date">End date</label>
				<input type="text" class="form-control" id="end_date" name="end_date" placeholder="00/00/0000" value="{{ filter['end_date'] }}"/>
			</div>

			<div class="form-group">
				<label for="booking_id">Booking ID</label>
				<input type="text" class="form-control inputId" id="booking_id" name="booking_id"/>
			</div>
			<div class="form-group">
				<label for="product_id">Product ID</label>
				<input type="text" class="form-control inputId" id="product_id" name="product_id"/>
			</div>
		</div>

		<div class="report-form">
			<strong class="checkbox-inline">Status:</strong>
			<label class="checkbox-inline">
				<input type="checkbox" id="filter_status_all" value=""> All
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="pending"> Pending
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="accepted"> Accepted
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="declined"> Declined
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_status[]" value="failed"> Failed
			</label>
		</div>

		<div class="report-form">
			<strong class="checkbox-inline">Type:</strong>
			<label class="checkbox-inline">
				<input type="checkbox" id="filter_types_all" value=""> All
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_types[]" value="Booked"> Booked Online
			</label>
			<label class="checkbox-inline">
				<input type="checkbox" name="filter_types[]" value="Inquiry"> Inquiry Only
			</label>
		</div>

		<div class="report-form">
			<label class="checkbox-inline"><input id="to_csv" type="checkbox" name="csv" value="1"> Save report to CSV</label>
		</div>

		<div class="report-form">
			<button type="submit" class="btn btn-default">Submit</button>
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

	<table class="table table-striped table-condensed" id="result_table">
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

<div id="moreTransactionsInfo" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title" id="myModalLabel">Detail information for Transaction ID: <span id="settings_name_transaction"></span></h4>
			</div>

			<div class="modal-body">
				<table class="table table-striped table-condensed">
					<thead>
						<tr>
							<th>Name</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody id="transactionsInfoList"></tbody>
				</table>
			</div>


			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<br/><br/><br/>

<script id="temp-row" type="text/template">
	<tr data-ptTransactionID="<%= ptTransactionID %>"
		data-ptPartnerPayment="<%= ptPartnerPayment %>"
		data-ptTotalBookingpalPayment="<%= ptTotalBookingpalPayment %>"
		data-ptCreditCardFee="<%= ptCreditCardFee %>"
		data-ptPaymentPMS="<%= ptPaymentPMS %>"
		data-ptNetRate="<%= ptNetRate %>"
			>
		<td><%= ptCreateDate %></td>
		<td><%= ptTransactionID %></td>
		<td>
			<% if (pCustomerPhone) { %>
			<a class="popover-link" href="#" data-toggle="popover" title="Phone" data-placement="top" data-content="<%= pCustomerPhone %>"><%= pCustomerName %></a>
			<% } else { %>
			<%= pCustomerName %>
			<% } %>
		</td>
		<td><%= rID %></td>
		<td><%= rProductID %></td>
		<td><%= ptTransaction %></td>
		<td><%= ptFundsHolder %></td>
		<td><%= rState %></td>
		<td>
			<% if (ptMessage) { %>
			<a class="popover-link" href="#" data-toggle="popover" title="Message" data-placement="top" data-content="<%= ptMessage %>"><%= ptStatus %></a>
			<% } else { %>
			<%= ptStatus %>
			<% } %>
		</td>
		<td><%= PartnerName %></td>
		<td><%= SupplierName %></td>
		<td class="text-right"><%= ptTotalAmount %></td>
		<td><%= ptCurrency %></td>
		<td class="text-right"><%= ptTotalCommission %></td>
		<td class="text-right"><%= ptFinalAmount %></td>
		<td class="text-right"><%= InvoiceDate %></td>
		<td><%= ptChargeType %></td>
		<td><button class="btn btn-xs btn-default openMoreInfo">Open</button></td>
	</tr>
</script>