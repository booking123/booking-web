{{ stylesheet_link('css/admin/pm/channels.css') }}

<div id="myModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content"></div>
	</div>
</div>

<div id="waringMessage" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="alert alert-warning fade in">
			<button class="close" type="button" data-dismiss="modal" aria-hidden="true">×</button>
			<h4>Warning</h4>
			<div id="waringMessageContent"></div>
		</div>
	</div>
</div>

<div id="dialogDeleteChannels" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
		<div class="alert alert-danger fade in">
			<button class="close" type="button" data-dismiss="modal" aria-hidden="true">×</button>
			<h4>Delete channels</h4>
			<p>Are you sure you want to delete channels?</p>
			<p>
				<button id="submitDeleteChannels" class="btn btn-danger" type="button">Yes</button>
				<button class="btn btn-default" type="button" data-dismiss="modal" aria-hidden="true">No</button>
			</p>
		</div>
	</div>
</div>

<br/>

<ol class="breadcrumb">
	<li>{{ link_to('admin/pm/', 'Dashboard') }}</li>
	<li class="active">Channels</li>
</ol>

<style>
</style>
<div class="pm-content channels">
	<form id="form_del_channels" action="{{ url('/admin/pm/channels/del/') }}">
		<div class="pm-message-menu">
			<div class="row">
				<div class="col-md-12 text-right">
					<a class="add-btn" href="{{ url('/admin/pm/channels/list/') }}">Add Channels</a>
					<a id="del_channels" class="del-btn" href="#">Delete Channel(s)</a>
				</div>
			</div>
		</div>

		<h4 class="channels-title">My Channels (<span>{{ channels|length }}</span>)</h4>

		<table class="pm-table channels table table-bordered table-hover table-striped">
			<thead>
			<tr>
				<th class="checked-call"><img alt="" src="{{ url('img/admin/ok.png') }}"/></th>
				<th>Partners</th>
				<th>Coverage</th>
				<th>Contract Type</th>
				<th>Payment Process</th>
				<th>Payouts</th>
				<th>Damage insurance<br/>Coverage</th>
				<th>Traffic<p>(Unique Visitors per month)</p></th>
				<th>More Info</th>
			</tr>
			</thead>
			<tbody>
			{% for v in channels %}
				<tr>
					<td><input class="channels_ids" name="channels[]" value="{{ v.id }}" type="checkbox"/></td>
					<td><img src="{{ v.logo_url }}" alt="{{ v.channel_name }}" class="channel-logo"/></td>
					<td>{{ v.coverage }}</td>
					<td>{{ v.channel_type }}</td>
					<td>{{ v.payment_process }}</td>
					<td>{{ v.payouts }}</td>
					<td>{{ v.damage_coverage }}</td>
					<td>{{ v.traffic }}</td>
					<td class="text-center"><a href="#" class="pm-channels-info"></a></td>
				</tr>
			{% endfor %}
			</tbody>
		</table>
	</form>
</div>

{% include '/../templates/channel_info_modal.volt' %}

<script type="text/javascript">
	$(document).ready(function () {
		$('#del_channels').click(function () {
			if ($('#form_del_channels .channels_ids:checked').length) {
				$('#dialogDeleteChannels').modal('show');
			} else {
				$('#waringMessageContent').html('<p>Please, select any channels for delete</p>');
				$('#waringMessage').modal('show');
			}

			return false;
		});


		$('#submitDeleteChannels').click(function () {
			var $form = $('#form_del_channels');

			$.ajax({
				url: SITE_URL + 'channels/del/',
				data: $form.serialize(),
				dataType: 'json',
				method: 'get',
				success: function (resp) {
					for (var i in resp) {
						if (!resp[i].error) {
							$form.find('input[value="' + resp[i].id + '"]').parents('tr').remove();
						}
					}

					$('#dialogDeleteChannels').modal('hide');
					$('span', '.channels-title').html($('#form_del_channels .channels_ids').length);
				},
				error: function () {
					$('#waringMessageContent').html('<p>Sorry</p>');
					$('#waringMessage').modal('show');
				}
			});

		});

	});
</script>