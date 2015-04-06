<style type="text/css">
	#pending_transaction_list .change-status-menu .disabled {
		color: #ccc;
	}
	#pmSettings .checkbox label{
		padding:  0 15px 0 0;
	}
	#pmSettings .checkbox input{
		margin-right: 5px;
	}
	#pmSettings .founts-holder-info{
		display: none;
		color: red;
		font-weight: bold;
		height: 34px;
		line-height: 34px;
	}
	#pmSettings .control-label{
		text-align: left;
	}
	#pmSettings .no-padding{
		padding: 0;
	}
</style>

{% set page_url = url('admin/root/property-managers/index/') %}

<h2 class="page-header">Property Managers</h2>


<div class="report-box">
	<form id="filter-form" action="">
		<div class="report-form form-inline">
			<div class="form-group">
				<label for="Name">Name</label>
				<input type="text" class="form-control" id="Name" name="Name" value=""/>
			</div>
			<div class="form-group">
				<label for="Company">Company</label>
				<input type="text" class="form-control" id="Company" name="Company" value=""/>
			</div>

			<div class="form-group">
				<label for="Provider">PMS Provider</label>
				<input type="text" class="form-control" id="Provider" name="Provider" value=""/>
			</div>
			<div class="form-group">
				{#<label style="display: block" for="Provider">&nbsp;</label>#}
				<button type="submit" class="btn btn-default">Submit</button>
			</div>
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

	<table class="table table-striped table-condensed" id="pm_list">
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

<div id="pmSettings" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title text-center" id="settings_name_PM"></h4>
			</div>

			<div class="modal-body">
				<form class="form-horizontal" role="form">
					<div class="form-group">
						<label for="settings_additional_commission" class="col-sm-5 control-label">Additional Fees</label>
						<div class="col-sm-3 no-padding">
							<div class="input-group">
								<input type="text" class="form-control text-right" name="additional_commission" id="settings_additional_commission"/>
								<span class="input-group-addon">%</span>
							</div>
						</div>
						<div class="col-sm-4 founts-holder-info">3% Credit Cart Fee</div>
					</div>
					<div class="form-group">
						<div class="col-sm-12">
							<div class="checkbox">
								<label><input type="radio" name="net_rate" value="0" id="settings_retail_rates"> Retail Rates</label>
								<label><input type="radio" name="net_rate" value="1" id="settings_net_rates"> NET Rates</label>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_comm" class="col-sm-5 control-label">PM Commission Included</label>
						<div class="input-group col-sm-3">
							<input type="text" class="form-control text-right" name="commission" id="settings_comm"/>
							<span class="input-group-addon">%</span>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_bp_comm" class="col-sm-5 control-label">BookingPal Commision</label>
						<div class="input-group col-sm-3">
							<input type="text" class="form-control text-right" name="bp_commission" id="settings_bp_comm"/>
							<span class="input-group-addon">%</span>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_pms_markup" class="col-sm-5 control-label">PMS Markup</label>
						<div class="input-group col-sm-3">
							<input type="text" class="form-control text-right" name="pms_markup" id="settings_pms_markup"/>
							<span class="input-group-addon">%</span>
						</div>
					</div>
					<input type="hidden" name="id" id="settings_id" />
				</form>
			</div>


			<div class="modal-footer">
				<div class="alert text-left" role="alert">
					<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<span id="settings_messages"></span>
				</div>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button id="submitPmSettings" type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>

<br/><br/><br/>

<script id="temp-row" type="text/template">
	<tr>
		<td class="isID" data-id="<%= pID %>"><% if (pmiID) { %><a class="open-settings-pm" href="javascript:void(0);" data-pmi="<%= pmiID %>"><%= pID %></a><% } else { %><%= pID %><% } %></td>
		<td><%= pCompany %></td>
		<td><%= pAddress %></td>
		<td><%= pCountry %></td>
		<td><%= pPhone %></td>
		<td><%= pName %></td>
		<td><%= Provider %></td>
		<td><%= pmsID %></td>
		<td><%= CreatedDate %></td>
		<td><%= pmFundsHolder %></td>
		<td class="text-center">
			<div class="btn-group">
				<input type="button" class="btn btn-xs btn-default dropdown-toggle select-status" data-toggle="dropdown" value="<%= pState %>" />
				<ul class="dropdown-menu change-status-menu" role="menu">
					<li><a href="#" data-status="Created">Created</a></li>
					<li><a href="#" data-status="Suspended">Suspended</a></li>
				</ul>
			</div>
		</td>
	</tr>
</script>