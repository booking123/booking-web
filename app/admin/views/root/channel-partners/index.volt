<h2 class="page-header">Channel Partners <button class="btn btn-primary" id="createChannel">Create Channel</button></h2>

<div class="report-box">
	<form id="filter-form" action="">
		<div class="report-form form-inline">
			<div class="form-group">
				<label for="s_channel_name"></label>
				<input type="text" class="form-control" id="s_channel_name" name="s_channel_name" placeholder="Channel Name"/>
				<button type="submit" class="btn btn-default">Search</button>
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

	<table class="table table-striped table-condensed" id="pending_transaction_list">
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

<div id="cpSettings" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">

			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title text-center" id="settings_name_CP"></h4>
			</div>

			<div class="modal-body">
				<form class="form-horizontal" role="form">
					<div class="form-group hide-create">
						<label class="col-sm-4 control-label">Party ID</label>
						<div class="col-sm-8"><input type="hidden" name="id" id="settings_id" /><span id="settings_id_text"></span></div>
					</div>
					<div class="form-group hide-create">
						<label class="col-sm-4 control-label">POS ID</label>
						<div class="col-sm-8"><span id="settings_pos_text"></span></div>
					</div>
					<div class="form-group hide-create">
						<label class="col-sm-4 control-label">Channel ID</label>
						<div class="col-sm-8"><input type="hidden" name="cp_id" id="settings_cp_id" /><span id="settings_cp_id_text"></span></div>
					</div>
					<div class="form-group">
						<label for="settings_cp_name" class="col-sm-4 control-label">Channel Name*</label>
						<div class="col-sm-8">
							<div class="input-group">
								<input type="text" class="form-control" name="name" id="settings_cp_name" data-type="text" />
								<span class="input-group-btn"><button class="btn btn-default" type="button" id="cp_search_by_name">Search</button></span>
							</div>
						</div>
					</div>

					<table class="table table-condensed" id="exist_channels">
						<thead>
							<tr>
								<th>#</th>
								<th>Party ID</th>
								<th>Name / Email</th>
								<th>Type</th>
								<th>Status</th>
								<th>Channel ID</th>
							</tr>
						</thead>
						<tbody></tbody>
						<tfoot>
						<tr>
							<td><input id="cp_not_use" type="radio" name="cp" data-party="0" value="" checked="checked" /></td>
							<td colspan="8"><label for="cp_not_use">Do not use any channel</label></td>
						</tr>
						</tfoot>
					</table>

					<div class="form-group">
						<label for="settings_cp_contact_name" class="col-sm-4 control-label">Contact Name</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="contact_name" id="settings_cp_contact_name"/></div>
					</div>
					<div class="form-group">
						<label for="settings_cp_mail" class="col-sm-4 control-label">Email Address*</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="mail" id="settings_cp_mail" data-type="mail"/></div>
					</div>
					<div class="form-group">
						<label for="settings_cp_state" class="col-sm-4 control-label">State</label>
						<div class="col-sm-8">
							<select class="form-control" id="settings_cp_state" name="state">
								<option selected="selected" value="Created">Created</option>
								<option value="Final">Final</option>
								<option value="Initial">Initial</option>
								<option value="Suspended">Suspended</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_cp_type" class="col-sm-4 control-label">Channel Type</label>
						<div class="col-sm-8">
							<select class="form-control" id="settings_cp_type" name="channel_type">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option selected="selected" value="5">5</option>
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_cp_comm" class="col-sm-4 control-label">CP Commission Included</label>
						<div class="col-sm-8">
							<div class="input-group col-sm-8 col-sm-offset-4">
								<input type="text" class="form-control text-right" name="commission" id="settings_cp_comm" data-type="percent"/>
								<span class="input-group-addon">%</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="settings_cp_send_mail" class="col-sm-12 control-label"><input type="checkbox" name="send_mail" id="settings_cp_send_mail" value="1"/> &nbsp; Send emails to customer</label>
					</div>
					<div class="form-group">
						<label for="settings_cp_ftp_password" class="col-sm-4 control-label">FTP password</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="ftp_password" id="settings_cp_ftp_password"/></div>
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_traffic" class="col-sm-4 control-label">Traffic</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="traffic" id="settings_cp_traffic"/></div><!--  data-type="int" -->
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_phone" class="col-sm-4 control-label">Phone Number</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="phone" id="settings_cp_phone"/></div>
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_site" class="col-sm-4 control-label">Web Site</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="site" id="settings_cp_site"/></div>
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_address" class="col-sm-4 control-label">Postal Address</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="address" id="settings_cp_address"/></div>
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_zip" class="col-sm-4 control-label">Postal Code</label>
						<div class="col-sm-8"><input type="text" class="form-control" name="zip" id="settings_cp_zip"/></div>
					</div>
					<div class="form-group more-block">
						<label for="settings_cp_country" class="col-sm-4 control-label">Country</label>
						<div class="col-sm-8">
							<select class="form-control" id="settings_cp_country" name="country">
								<option value=""></option>
								{% for v in countries %}
									<option value="{{ v.ID }}">{{ v.Name }}</option>
								{% endfor %}
							</select>
						</div>
					</div>
					<a href="#" class="btn btn-sm btn-default" id="show-more-changes">Show More Changes</a>
				</form>
			</div>

			<div class="modal-footer">
				<div class="alert text-left" role="alert">
					<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
					<span id="settings_messages"></span>
				</div>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button id="submitCpSettings" type="button" class="btn btn-primary">Save changes</button>
			</div>
		</div>
	</div>
</div>

<script id="temp-row" type="text/template">
	<tr id="cpID_<%= cpID %>">
		<td><% if (pID) { %><a class="openSettingsCP" href="#"><%= cpID %></a><% } else { %><%= cpID %><% } %></td>
		<td class="cpName"><%= cpChannelName %></td>
		<td><%= cpState %></td>
		<td><%= cpCoverage %></td>
		<td><%= cpChannelType %></td>
		<td><%= cpContactType %></td>
		<td><%= cpPaymentProcess %></td>
		<td><%= cpTraffic %></td>
		<td class="cpCommission"><%= cpCommission %></td>
		<td><%= cpPhone %></td>
		<td><%= cpEmail %></td>
		<td><%= cpOfficeAddress %></td>
	</tr>
</script>