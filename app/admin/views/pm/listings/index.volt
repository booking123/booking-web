<div class="content-block-wrapper">
	<div class="row content-block-title">
		<div class="col-xs-10">
			<h3>Listings Overview</h3>
			{#<span class="count-rows total-count">{{ counts_with_status['Initial'] }} of {{ counts_with_status['Suspended']+counts_with_status['Created']+counts_with_status['Initial'] }} active listings</span>#}
		</div>
	</div>

	<div class="table-wrapper">
		<table class="table statistic-table">
			<tr>
				<td>Live Listings:</td>
				<td><a href="#" class="text-success">{{ counts_with_status['Live'] }}</a></td>
				<td>Inactive Listings:</td>
				<td><a href="#" class="text-danger">{{ counts_with_status['Inactive'] }}</a></td>
				<td></td>
			</tr>
			<tr class="overview-keys">
				<td>Key:</td>
				<td><i class="att-icon"></i> = needs attention</td>
				<td><i class="norm-icon"></i> = less than ideal</td>
				<td><i class="ideal-icon"></i> = ideal</td>
				<td></td>
			</tr>
		</table>
	</div>
</div>

<div class="content-block-wrapper hidden" id="LiveList">
	<div class="row content-block-title">
		<div class="col-xs-10">
			<h3>Live Listings</h3>
			<span class="count-rows"> </span>
		</div>
		<div class="pagination-block text-right col-xs-2"></div>
	</div>
	<div class="table-wrapper">
		<table class="table statistic-table">
			<thead>
			<tr class="statistic-table-title">
				<th class="table-name">Name</th>
				<th class="table-city">City</th>
				<th class="table-country">Country</th>
				<th class="table-bathrooms">Bathrooms</th>
				<th class="table-bedrooms">Bedrooms</th>
			</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</div>

<div class="content-block-wrapper hidden" id="InactiveList">
	<div class="row content-block-title">
		<div class="col-xs-10">
			<h3>Inactive Listings</h3>
			<span class="count-rows"></span>
		</div>
		<div class="pagination-block text-right col-xs-2"></div>
	</div>
	<div class="table-wrapper">
		<table class="table statistic-table">
			<thead>
			<tr class="statistic-table-title">
				<th class="table-name">Name</th>
				<th class="table-city">City</th>
				<th class="table-country">Country</th>
				<th class="table-bathrooms">Bathrooms</th>
				<th class="table-bedrooms">Bedrooms</th>
			</tr>
			</thead>
			<tbody></tbody>
		</table>
	</div>
</div>

