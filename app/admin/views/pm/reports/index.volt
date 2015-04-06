<br/>

<ol class="breadcrumb">
	<li>{{ link_to('admin/pm/', 'Dashboard') }}</li>
	<li class="active">Reports</li>
</ol>

<style>
	.pm-reports.nav-tabs{
		border-bottom-width: 1px;
		border-bottom-color: #003960;
	}
	.pm-reports.nav-tabs > li > a{
		border-radius: 0;
		color: #003960;
		font-weight: bold;
		font-size: 16px;
		border-color: #0386D6;
		/*border-bottom-width: 1px;*/
		padding-top: 5px;
		margin-top: 5px;
		margin-right: 10px;
	}
	.pm-reports.nav-tabs > li.active > a{
		margin-top: 0;
		padding-top: 10px;
		border-color: #003960;
		border-width: 2px;
		border-bottom-width: 0;
	}
	.pm-tabs{
		border: 2px solid #003960;
		border-top-width: 0;
		padding: 20px;
		background: #fff;
		display: none;
	}
	.small-info{
		font-size: 10px;
		padding: 5px 0 0;
		margin: 0;
	}
	.pm-tabs .form-horizontal .reports-wrapper{
		margin: 10px -20px;
		background: #BAD9F4;
		padding: 20px;
	}
	.pm-tabs .form-horizontal .reports-wrapper label.control-label{
		font-size: 18px;
	}
	.pm-tabs .form-horizontal .reports-wrapper .col-sm-8 label{
		font-weight: normal;
		margin: 5px 10px 0 0;
	}
	.separator-bottom{
		padding-top: 10px;
		margin: 0;
		border-bottom: 2px #052A4D dashed;
	}
</style>

<script type="text/javascript">
	$(document).ready(function() {
		$('a', '#reports_tab_buttons').click(function () {
			var this_li = $(this).parent();
			if (this_li.hasClass('active')) {
				return;
			}

			$('li', '#reports_tab_buttons').removeClass('active');
			this_li.addClass('active');

			show_active_tab(this_li.data('tab'));
		});

		var tab = $('li.active', '#reports_tab_buttons').data('tab');
		show_active_tab(tab);

		function show_active_tab(tab) {
			$('.pm-tabs').hide();
			$('#tab-' + tab).show();
		}
	});
</script>

<div class="pm-content">
	<ul id="reports_tab_buttons" class="pm-reports nav nav-tabs">
		<li class="active" data-tab="reports"><a href="#">Reports</a></li>
		<li data-tab="payment-settings"><a href="#">Payment Settings</a></li>
		<li data-tab="deposit-methods"><a href="#">Deposit Methods</a></li>
		<li data-tab="help"><a href="#">Help</a></li>
	</ul>
	<div class="pm-tabs" id="tab-reports">
		<form class="form-horizontal" role="form">
			<div class="reports-wrapper">
				<div class="form-group">
					<label for="type-report" class="col-sm-4 control-label">Select a Report to Run:</label>
					<div class="col-sm-8">
						<div class="row">
							<div class="col-sm-6">
								<select class="form-control" id="type-report" name="type-report">
									<option>Booking Reports</option>
								</select>
							</div>
						</div>
						<p class="small-info">Payouts (funds that you will be receiving from channel partners)</p>
						<p class="small-info">Payments (funds that you owe the channel partners)</p>
					</div>
					<div class="col-sm-12"><p class="separator-bottom"></p></div>
				</div>
				<div class="form-group">
					<label for="type-report" class="col-sm-4 control-label">Date Range:</label>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="type-report" placeholder="From">
					</div>
					<div class="col-sm-4">
						<input type="text" class="form-control" id="type-report" placeholder="To">
					</div>
					<div class="col-sm-12"><p class="separator-bottom"></p></div>
				</div>
				<div class="form-group">
					<label for="property" class="col-sm-4 control-label">Property</label>
					<div class="col-sm-4">
						<select class="form-control" id="property" name="property">
							<option>Show all properties</option>
						</select>
					</div>
					<div class="col-sm-12"><p class="separator-bottom"></p></div>
				</div>
				<div class="form-group">
					<label for="type-report" class="col-sm-4 control-label">Show Payment Status:</label>
					<div class="col-sm-8">
						<label><input type="checkbox" /> Not Paid Yet</label>
						<label><input type="checkbox" /> Partially Paid</label>
						<label><input type="checkbox" /> Paid in Full</label>
						<label><input type="checkbox" /> Expired/Cancelled</label>
					</div>

				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10 text-right">
					<button type="submit" class="btn btn-success btn-lg">Generate Report &rsaquo;</button>
				</div>
			</div>
		</form>

	</div>

	<div class="pm-tabs" id="tab-payment-settings">
		<h3>Payment Settings</h3>
	</div>

	<div class="pm-tabs" id="tab-deposit-methods">
		<h3>Deposit Methods</h3>
	</div>

	<div class="pm-tabs" id="tab-help">
		<h3>help</h3>
	</div>
</div>