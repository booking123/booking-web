{{ stylesheet_link('css/admin/pm/channels.css') }}

<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<br/>

<ol class="breadcrumb">
	<li>{{ link_to('admin/pm/', 'Dashboard') }}</li>
	<li>{{ link_to('admin/pm/channels/index/', 'Channels') }}</li>
	<li class="active">Add Channels</li>
</ol>

<div class="pm-content channels">
	<div id="channel-terms-conditions">
		<div class="wrapper-modal-box"></div>
	</div>

	<div class="pm-message-menu">
		<div class="row">
			<div class="col-md-10">
				<h3>Select New Channels Below:</h3>
			</div>
			<div class="col-md-2 text-right">
				<a class="del-btn" href="{{ url('admin/pm/channels/index/') }}"></a>
			</div>
		</div>
	</div>

	<ul id="reports_tab_buttons" class="pm-reports nav nav-tabs">
		<li class="active" data-tab="reports"><a href="#">Pay-Per-Booking Sites</a></li>
		<li data-tab="payment-settings"><a href="#">Pay-Per-Listing Sites</a></li>
		<li data-tab="deposit-methods"><a href="#">Pay-Per-Inquiry Sites</a></li>
	</ul>

	<form id="channels_list" class="form-horizontal" action="{{ url('admin/pm/channels/add/') }}">
		<div class="pm-tabs" id="tab-reports">
			<table class="pm-table channels table table-bordered table-hover table-striped">
				<thead>
				<tr>
					<th class="checked-call"><img alt="" src="{{ url('img/admin/ok.png') }}"/></th>
					<th>Channel</th>
					<th>Property Coverage</th>
					<th>Payment Processing</th>
					<th>Contract Requirement</th>
					<th>Channel Terms</th>
					<th>Channel Margin</th>
					<th>More Info</th>
				</tr>
				</thead>
				<tbody>
				{% for row in channels['booking'] %}
					<tr>
						<td><input name="channels[]" type="checkbox" value="{{ row.id }}"
								   data-privacy="{{ row.privacy_policy }}" data-terms="{{ row.terms_conditions }}"
								   data-name="{{ row.channel_name }}"/></td>
						<td class="text-center"><img class="channel-logo" alt="{{ row.channel_name }}" src="{{ row.logo_url }}"/>
						</td>
						<td class="text-center">{{ row.coverage }}</td>
						<td>{{ row.payment_process }}</td>
						<td>Contract with BookingPal</td>
						<td>{% if row.terms_conditions %}<a href="{{ row.terms_conditions }}">Terms and
								Conditions</a>{% endif %}</td>
						<td class="text-right">{{ row.commission }}%</td>
						<td class="text-center"><a href="#" class="pm-channels-info"></a></td>
					</tr>
				{% endfor %}
				</tbody>
			</table>
		</div>

		<div class="pm-tabs" id="tab-payment-settings">
			<table class="pm-table channels table table-bordered table-hover table-striped">
				<thead>
				<tr>
					<th class="checked-call"><img alt="" src="{{ url('img/admin/ok.png') }}"/></th>
					<th>Channel</th>
					<th>Property Coverage</th>
					<th>Contract Requirement</th>
					<th>Sign up URL</th>
					<th>Inquiry fee</th>
					<th>More Info</th>
					<th>Note</th>
				</tr>
				</thead>
				<tbody>
				{% for row in channels['listing'] %}
					<tr>
						<td><input name="channels[]" type="checkbox" value="{{ row.id }}"
								   data-privacy="{{ row.privacy_policy }}" data-terms="{{ row.terms_conditions }}"
								   data-name="{{ row.channel_name }}"/></td>
						<td class="text-center"><img width="140" alt="{{ row.channel_name }}" src="{{ row.logo_url }}"/>
						</td>
						<td class="text-center">{{ row.coverage }}</td>
						<td>Contract with BookingPal</td>
						<td>{% if row.website_url %}<a
								href="{{ row.website_url }}">{{ row.channel_name }}</a>{% endif %}</td>
						<td>{{ row.listing_fees }}</td>
						<td class="text-center"><a href="#" class="pm-channels-info"></a></td>
						<td class="text-center">-</td>
					</tr>
				{% endfor %}
				</tbody>
			</table>
		</div>

		<div class="pm-tabs" id="tab-deposit-methods">
			<table class="pm-table channels table table-bordered table-hover table-striped">
				<thead>
				<tr>
					<th class="checked-call"><img alt="" src="{{ url('img/admin/ok.png') }}"/></th>
					<th>Channel</th>
					<th>Property Coverage</th>
					<th>Contract Requirement</th>
					<th>Sign up URL</th>
					<th>Inquiry fee</th>
					<th>More Info</th>
					<th>Note</th>
				</tr>
				</thead>
				<tbody>
				{% for row in channels['inquiry'] %}
					<tr>
						<td><input name="channels[]" type="checkbox" value="{{ row.id }}"
								   data-privacy="{{ row.privacy_policy }}" data-terms="{{ row.terms_conditions }}"
								   data-name="{{ row.channel_name }}"/></td>
						<td class="text-center"><img width="140" alt="{{ row.channel_name }}" src="{{ row.logo_url }}"/>
						</td>
						<td class="text-center">{{ row.coverage }}</td>
						<td>Contract with BookingPal</td>
						<td>{% if row.website_url %}<a
								href="{{ row.website_url }}">{{ row.channel_name }}</a>{% endif %}</td>
						<td>{{ row.listing_fees }}</td>
						<td class="text-center"><a href="#" class="pm-channels-info"></a></td>
						<td class="text-center">-</td>
					</tr>
				{% endfor %}
				</tbody>
			</table>
		</div>

		<div class="text-right channels-submit-box">
			<label>
				<input id="confirm_checkbox" type="checkbox" name=""/>&nbsp;
				Agree to <a id="channels_terms_conditions" href="#">Terms &amp; Conditions</a>
			</label>
			<button type="submit" class="btn btn-lg btn-success">Add Channel(s) &rang;</button>
		</div>
	</form>
</div>

{% include '/../templates/channel_info_modal.volt' %}

<script type="text/javascript">
	$(document).ready(function () {
		var $form_channels_list = $('#channels_list'),
			$channels_tabs = $('#reports_tab_buttons');

		$form_channels_list.submit(function () {
			if (!document.getElementById('confirm_checkbox').checked) {
				alert('Please confirm that you have read, understand and accept the channel partners Distribution Agreement.');
				return false;

			} else if (!$form_channels_list.find('table input:checked').length) {
				alert('At least one partner need to be checked and Distribution Agreement checkbox checked. ');
				return false;
			}
		});
		// 'Terms Conditions' modal window
		$('#channels_terms_conditions').click(function () {
			var channels = _.map($form_channels_list.find('table input:checked'), function (input) {
				return $(input).data();
			});

			//TODO: ERROR view
			if (channels.length) {
				var template = _.template(document.getElementById('temp_terms_conditions').innerHTML);

				$('.modal-content', '#myModal').html(template({ channels: channels }));
				$('#myModal').modal('show');
			}

			return false;
		});

		// Channel list pagination
		var tab = $channels_tabs.find('li.active').data('tab');
		show_active_tab(tab);

		$channels_tabs.find('a').click(function () {
			var this_li = $(this).parent();
			if (this_li.hasClass('active')) {
				return;
			}

			$channels_tabs.find('li').removeClass('active');
			this_li.addClass('active');

			show_active_tab(this_li.data('tab'));
		});

		function show_active_tab(tab) {
			$('.pm-tabs').hide();
			$('#tab-' + tab).show();
		}
	});
</script>

<script id="temp_terms_conditions" type="text/template">
	<div>
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="myModalLabel">Terms & Conditions</h4>
		</div>
		<div class="modal-body">
			<% _.each(channels, function(channel) { %>
			<div class="row">
				<div class="col-md-4"><%=channel.name%></div>
				<div class="col-md-4 text-center"><% if (channel.terms != '-' && channel.terms) { %><a target="_blank"
																									   href="<%=channel.terms%>">Terms
					and Conditions</a><% } else { %>-<% } %>
				</div>
				<div class="col-md-4 text-center"><% if (channel.privacy != '-' && channel.privacy) { %><a
						target="_blank" href="<%=channel.privacy%>">Privacy Policy</a><% } else { %>-<% } %>
				</div>
			</div>
			<% }); %>
		</div>
	</div>
</script>
