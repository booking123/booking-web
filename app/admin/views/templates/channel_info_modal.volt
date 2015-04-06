<style>
	#channel-info-modal-border{
		background: #fff;
		border: 1px solid #00385F;
		padding: 2px;
		position: relative;
		margin-top: 40px;
	}
	#channel-info-modal-border .channel-name{
		position: absolute;
		top: -62px;
		left: 15px;
		height: 40px;
		line-height: 40px;
		border: 1px solid #00385F;
		padding: 0 15px;
		background: #FFFFFF;
		font-size: 16px;
		border-bottom-color: #fff;
	}
	#channel-info-modal .channel-info{
		background-color: #00385F;
		color: #FFFFFF;
		height: 400px;
	}
	#channel-info-modal .channel-info img.logo{
		width: 100%;
	}
	#channel-info-modal .channel-description{
		position: relative;
	}
	#channel-info-modal .channel-description-content{
		font-size: 14px;
		height: 320px;
		overflow-y: auto;
		/*margin: 10px -15px 15px 0;*/
	}
	#channel-info-modal .channel-select{
		color: #fff;
		border-radius: 0;
		float: right;
	}
	#channel-info-modal .modal-body{
		padding-top: 5px;
		padding-bottom: 5px;
	}
	#channel-info-modal .modal-footer{
		margin-top: 0;
	}
</style>
<script id="channel_modal_content" type="text/template">
	<div id="channel-info-modal">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			<h4 class="modal-title" id="myModalLabel"><%=channel_name%></h4>
		</div>

		<div class="modal-body">
			<div class="row">
				<div class="col-md-5 channel-info">
					<dl>
						<dd><img alt="<%=channel_name%>" src="<%=logo_url%>" class="logo" /></dd>
					</dl>
					<dl>
						<dt>Internal phone number:</dt>
						<dd><%=phone%></dd>
					</dl>

					<dl>
						<dt>Email address:</dt>
						<dd><%=email%></dd>
					</dl>

					<dl>
						<dt>Office address:</dt>
						<dd><%=office_address%></dd>
					</dl>
				</div>
				<div class="col-md-7 channel-description">
					<div class="channel-description-content"><%=description%></div>

				</div>
			</div>
		</div>

		<div class="modal-footer">
			<button type="button" class="btn btn-lg btn-success channel-select">Select Channel</button>
		</div>
	</div>
</script>

<script type="text/javascript">
	$(document).ready(function () {
		var $modal_window = $('#myModal'),
				$active_channel = {};
		$('a.pm-channels-info').click(function () {
			$active_channel = $(this).parents('tr').find('input');
			$.ajax({
				url: SITE_API_URL + 'channel/get/',
				method: 'get',
				data: {id: $active_channel.val()},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						$active_channel = {};

						$modal_window.modal('hide');

						alert(resp.message);
						return;
					}

					var html_template = _.template(document.getElementById('channel_modal_content').innerHTML);

					$modal_window.find('.modal-content').html(html_template(resp.data));

					$modal_window.modal('show');
				},

				error: function () {
					$active_channel = {};
					$modal_window.modal('hide');
				}
			});

			return false;
		});

		$modal_window.on('click', '.channel-select', function () {
			if ($active_channel.attr) {
				$active_channel.attr('checked', 'checked');
			}

			$modal_window.modal('hide');

			return false;
		});
	});
</script>