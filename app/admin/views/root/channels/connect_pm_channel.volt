<style type="text/css">
	/*.search-box{ border: 1px solid #000}*/
	.search-box input {
		width: 100%;
		text-align: left
	}

	.list-search-result {}

	.list-search-result table {
		border-collapse: collapse;
		width: 100%;
	}

	.list-search-result thead {
		text-align: left;
		display: table;
		float: left;
		width: 100%;
	}

	.list-search-result thead tr {
		display: table-row;
		width: 100%;
	}

	.list-search-result tbody {
		display: block;
		height: 300px;
		overflow: auto;
		float: left;
		width: 100%;
	}

	.list-search-result tbody tr {
		display: table;
		width: 100%;
	}

	.list-search-result .col1 {
		width: 5%
	}

	.list-search-result .col2 {
		width: 20%
	}

	.list-search-result .col3 {
		width: 50%
	}

	.list-search-result .col4 {
		width: 20%
	}

	#modalConfirmAdd .modal-dialog {
		width: 80%;
	}

	.panel-title {
		line-height: normal;
	}
</style>

<h2 class="page-header">Connect Channel to PM</h2>

<div class="row">
	<form id="GoMarge" action="" method="post">
		<div class="col-xs-6">
			<h3>Channels</h3>

			<div id="ListChannel" class="list-search-result">
				<div class="search-box"><input type="text" name="sc" class="form-control" data-type="cp"/></div>
				<table class="table table-hover table-condensed">
					<thead>
					<tr>
						<th class="col1"><input class="select_all_items" type="checkbox"/></th>
						<th class="col2">#</th>
						<th class="col3">Name</th>
					</tr>
					</thead>

					<tbody></tbody>
				</table>
			</div>
		</div>

		<div class="col-xs-6">
			<h3>Property Managers</h3>

			<div id="ListManager" class="list-search-result">
				<div class="search-box"><input type="text" name="sc" value="" class="form-control" data-type="pm"/>
				</div>
				<table class="table table-hover table-condensed">
					<thead>
					<tr>
						<th class="col1"><input class="select_all_items" type="checkbox"/></th>
						<th class="col2">#</th>
						<th class="col3">Name</th>
						<th class="col4">Type</th>
					</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>

		<div class="text-center" style="margin: 20px">
			<button type="submit" class="btn btn-lg btn-default">Merge</button>
		</div>
	</form>
</div>

<hr/>

<form id="listMerges" action="" method="post">
	<div class="row">
		<div class="col-xs-6">
			<div class="panel-group" id="ListTiesChannel"></div>
		</div>
		<div class="col-xs-6">
			<div class="panel-group" id="ListTiesManager"></div>
		</div>
	</div>
	<div class="text-center" style="margin: 20px">
		<button type="submit" class="btn btn-lg btn-default">Delete</button>
	</div>
</form>

<!-- Modals -->
<div class="modal fade" id="modalConfirmAdd" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
							class="sr-only">Close</span></button>
				<h4 class="modal-title">Are you sure you want to add relation(s)?</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-6">
						<table class="table table-striped table-condensed" id="ConfMergeCP">
							<thead>
							<tr>
								<th class="col1"></th>
								<th class="col2">#</th>
								<th class="col3">Name</th>
							</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div class="col-xs-6">
						<table class="table table-striped table-condensed" id="ConfMergePM">
							<thead>
							<tr>
								<th class="col1"></th>
								<th class="col2">#</th>
								<th class="col3">Name</th>
								<th class="col4">Type</th>
							</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button id="ConfirmMerge" type="button" class="btn btn-default" data-dismiss="modal">Connect</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modalDeleteMerge" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">Are you sure you want to delete relation(s)?</h4>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-12">
						<table class="table table-striped table-condensed" id="modalDeleteMergeTable">
							<thead>
							<tr>
								<th></th>
								<th>CP Name</th>
								<th>PM Name</th>
							</tr>
							</thead>
							<tbody></tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button id="modalDeleteMergeButton" type="button" class="btn btn-default" data-dismiss="modal">Delete Connect(s)</button>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="modalDeleteOneConnect" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
				<h4 class="modal-title">Are you sure you want to delete relation?</h4>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				<button id="modalDeleteOneConnectButton" type="button" class="btn btn-default" data-dismiss="modal">Delete Connect</button>
				<input id="modalDeleteOneConnectVal" type="hidden" name="modalDeleteOneConnectVal" value="" />
			</div>
		</div>
	</div>
</div>

<script type="text/template" id="tempTableMerges">
	<div id="ties_<%= id %>" class="panel panel-default">
		<div class="panel-heading">
			<h4 class="panel-title">
				<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
						class="sr-only">Close</span></button>
				<a data-toggle="collapse" data-parent="#accordion" href="#<%= id %>"><%= name %></a>
			</h4>
		</div>
		<div id="<%= id %>" class="panel-collapse collapse in">
			<div class="panel-body">
				<table class="table table-hover table-condensed">
					<tbody>
					<% _.each(connects, function(merge) { %>
						<%= tempTableMergesRow(merge) %>
					<% }); %>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</script>

<script type="text/template" id="tempTableMergesRow">
	<tr class="<%= cp.id %>_<%= pm.id %>">
		<td><input type="checkbox" name="merge_del" value="<%= cp.id %>,<%= pm.id %>" data-pm="<%= pm.name %>"
				   data-cp="<%= cp.name %>"/></td>
		<td><%= active.id %></td>
		<td><%= active.name %></td>
		<td class="text-right">
			<button type="button" class="btn btn-xs btn-danger">Delete</button>
		</td>
	</tr>
</script>

<script type="text/template" id="TempItemRow">
	<tr>
		<td class="col1">
			<input type="checkbox" name="list_<% if (UserType == 'ChannelPartner') { %>cp<% } else { %>pm<% } %>[]"
				   value="<%= ID %>"/>
		</td>
		<td class="col2"><%= ID %></td>
		<td class="col3"><%= Name %></td>
		<% if (UserType != 'ChannelPartner') { %>
		<td class="col4"><%= PMSID %></td>
		<% } %>
	</tr>
</script>