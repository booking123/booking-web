<style type="text/css">
	#channel-info-modal{
		position: relative;
		display: none;
	}
	#channel-info-modal .channel-content-wrapper{
		position: fixed;
		top: 150px;
		left: 50%;
		z-index: 2000;

		width: 70%;
		margin-left: -35%;
		padding: 40px;
		background: #EDEDED;
		box-shadow: 0 0 10px 2px #5E5E5E;
	}
	#channel-info-modal .channel-content-wrapper .channel-content-wrapper-border{
		background: #fff;
		border: 1px solid #00385F;
		padding: 2px;
		position: relative;
		margin-top: 40px;
	}
	#channel-info-modal .channel-content-wrapper .channel-content-wrapper-border .channel-name{
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
	#channel-info-modal .channel-content-wrapper .channel-info{
		background-color: #00385F;
		color: #FFFFFF;
		height: 400px;
	}
	#channel-info-modal .channel-content-wrapper .channel-info img.logo{
		width: 100%;
	}
	#channel-info-modal .channel-content-wrapper .channel-description{
		position: relative;
	}
	#channel-info-modal .channel-content-wrapper .channel-description-content{
		font-size: 14px;
		height: 320px;
		overflow-y: auto;
		margin: 10px -15px 15px 0;
	}
	#channel-info-modal .channel-content-wrapper .channel-select{
		color: #fff;
		border-radius: 0;
		float: right;
	}
</style>
<script type="text/javascript">
	$(document).ready(function () {
		var $channel_model =  $('#channel-info-modal'),
				$active_channel = {};

		$('a.pm-channels-info').click(function () {
			$active_channel = $(this).parents('tr').find('input');
			$.ajax({
				url: SITE_API_URL + 'channel/get/',
				method: 'get',
				data: {id: $(this).data('id')},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						$active_channel = {};
						$channel_model.hide();
						alert(resp.message);
						return;
					}

					var template = _.template(document.getElementById('channel_modal_content').innerHTML);

					$channel_model.find('.channel-content-wrapper-border').html(template(resp.data));
					$channel_model.show();
				},
				error: function () {
					$active_channel = {};
					$channel_model.hide();

				}
			});

			return false;
		});

		$channel_model.on('click', 'a.channel-select', function () {
			if ($active_channel.attr) {
				$active_channel.attr('checked', 'checked');
			}

			$channel_model.hide();

			return false;
		});
	});
</script>

<div id="channel-info-modal">
	<div class="channel-content-wrapper">
		<div class="row channel-content-wrapper-border"></div>
	</div>
</div>
<!-- Template -->
<script id="channel_modal_content" type="text/template">
	<div class="col-md-4 channel-info">
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
	<div class="col-md-8 channel-description">
		<h3 class="channel-name"><%=channel_name%></h3>
		<div class="channel-description-content"><%=description%></div>
		<a href="#" class="btn btn-lg btn-success channel-select">Select Channel</a>
	</div>
</script>