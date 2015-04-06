<style type="text/css">
	.info-block {

	}
	.info-block .info-block-header {
		line-height: 26px;
		font-size: 16px;
	}
	.info-block .info-block-header .info-block-title {
		font-size: 26px;
	}
	.info-block .info-block-content {
		background: #fff;
		border-radius: 5px;
	}

	.info-block .edit-inform{
		float: right;
	}
</style>

<div class="container-fluid content-block-wrapper">
	<div class="row">
		<div class="profile-inform info-block col-sm-6">
			<div class="info-block-header">
				<a href="#" class="edit-inform">Edit information</a>
				<h3 class="info-block-title">Profile Information</h3>
			</div>
			<div class="info-block-content">
				<form id="save_account" class="form-horizontal" action="{{ url('admin/pm/account/save/') }}" method="post">
					<div data-error="Please enter first name" class="form-group req">
						<label for="first_name" class="col-sm-4 control-label">First Name:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="first_name" name="first_name" value="{{ pm.FirstName }}" />
						</div>
					</div>
					<div data-error="Please enter last name" class="form-group req">
						<label for="last_name" class="col-sm-4 control-label">Last Name:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="last_name" name="last_name" value="{{ pm.LastName }}" />
						</div>
					</div>
					<div data-error="Please enter email" class="form-group req">
						<label for="email" class="col-sm-4 control-label">E-mail:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="email" name="email" value="{{ pm.EmailAddress }}" />
						</div>
					</div>
					<div data-error="Please enter phone number" class="form-group req">
						<label for="tel" class="col-sm-4 control-label">Telephone number:</label>
						<div class="col-sm-8">
							<input type="text" class="form-control" id="tel" name="tel" value="{{ pm.DayPhone }}">
						</div>
					</div>
					<div class="password_block">
						<div data-error="Please enter correct password" class="form-group">
							<label for="password" class="col-sm-4 control-label">Password:</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="password" name="password" autocomplete="off"/>
							</div>
						</div>
						<div class="form-group">
							<label for="re-password" class="col-sm-4 control-label">Repeat Password:</label>
							<div class="col-sm-8">
								<input type="password" class="form-control" id="re-password" name="re-password" autocomplete="off"/>
							</div>
						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-offset-5 col-sm-7">
							<button type="submit" class="btn btn-success btn-lg">Save Updates</button>
						</div>
					</div>
				</form>
			</div>
		</div>

		<div class="pm-inform info-block col-sm-6">
			<div class="info-block-header">

				<a href="#" class="edit-inform">Edit information</a>
				<h3 class="info-block-title">Detail Information</h3>
			</div>
			<div class="info-block-content">
				<form id="save_account" class="form-horizontal" action="{{ url('admin/pm/account/save/') }}" method="post">
					<div class="form-group">
						<label for="pms_account_id" class="col-sm-4 control-label">Account ID:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="pms_account_id" value="{{ pm.AltPartyID }}" disabled="disabled">
						</div>
					</div>
					<div class="form-group">
						<label for="pms_name" class="col-sm-4 control-label">PMS:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="pms_name" disabled="disabled" value="{{ pm.Name }}">
						</div>
					</div>
					<div class="form-group">
						<label for="company_name" class="col-sm-4 control-label">Company Name:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="company_name" value="{{ pm.Name }}">
						</div>
					</div>
					<div data-error="Please enter address" class="form-group req">
						<label for="address" class="col-sm-4 control-label">Address:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="address" name="address"
								   value="{{ pm.Address }}"/>
						</div>
					</div>
					<div data-error="Please enter city" class="form-group req">
						<label for="city" class="col-sm-4 control-label">City:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="city" name="city" value="{{ pm.City }}"/>
						</div>
					</div>
					<div data-error="Please enter state" class="form-group req">
						<label for="state" class="col-sm-4 control-label">State / Province:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="state" name="state" value="{{ pm.State }}"/>
						</div>
					</div>
					<div data-error="Please enter postal code" class="form-group req">
						<label for="zip" class="col-sm-4 control-label">Zip / Postal Code:</label>

						<div class="col-sm-8">
							<input type="text" class="form-control" id="zip" name="zip" value="{{ pm.PostalCode }}">
						</div>
					</div>
					<div class="form-group">
						<label for="country" class="col-sm-4 control-label">Country:</label>

						<div class="col-sm-8">
							<select id="country" class="form-control" name="country">
								{% for row in countries %}
									<option{% if pm.Country == row.ID %} selected="selected"{% endif %}
											value="{{ row.ID }}">{{ row.Name }}</option>
								{% endfor %}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="currency" class="col-sm-4 control-label">Currency:</label>

						<div class="col-sm-8">
							<select id="currency" class="form-control" name="currency">
								{% for row in currencies %}
									<option{% if pm.Currency == row.ID %} selected="selected"{% endif %}
											value="{{ row.ID }}">{{ row.Name }}</option>
								{% endfor %}
							</select>
						</div>
					</div>
					<div class="form-group">
						<label for="date_format" class="col-sm-4 control-label">Date Format:</label>

						<div class="col-sm-8">
							<select id="date_format" class="form-control" name="date_format">
								{% for row in date_formats %}
									<option{% if pm.FormatDate == row.FormatDate %} selected="selected"{% endif %}
											value="{{ row.FormatDate }}">{{ row.FormatDate }}</option>
								{% endfor %}
							</select>
						</div>
					</div>

					<div class="form-group">
						<div class="col-sm-offset-5 col-sm-7">
							<button type="submit" class="btn btn-success btn-lg">Save Updates</button>
						</div>
					</div>
				</form>
			</div>

		</div>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function () {
		$('#save_account').submit(function () {
			var $alert_block = $(this).find('.alert'),
					error_messages = [];

			$(this).find('.form-group').removeClass('has-error');


			$(this).find('.req')
					.each(function () {
						if (!$(this).find('input').val()) {
							error_messages.push($(this).data('error'));
							$(this).addClass('has-error');
						}
					});

			var $pass_input = $('#password'),
					$re_pass_input = $('#re-password');

			if ($pass_input.val() != $re_pass_input.val()) {
				$pass_input.parents('.form-group').addClass('has-error');
				$re_pass_input.parents('.form-group').addClass('has-error');
				error_messages.push($pass_input.parents('.form-group').data('error'));
			}


			if (!error_messages.length) {

				$alert_block.fadeOut();
				$.ajax({
					url: $(this).attr('action'),
					data: $(this).serialize(),
					method: 'get',
					dataType: 'json',
					success: function (resp) {
						if (resp.error) {
							$alert_block.fadeIn().find('ul').html('');
							for (var i = 0; i < resp.messages.length; i++) {
								$alert_block.find('ul').append('<li>' + resp.messages[i] + '</li>');
							}
						}
					}
				});
			} else {
				$alert_block.fadeIn().find('ul').html('');
				for (var i = 0; i < error_messages.length; i++) {
					$alert_block.find('ul').append('<li>' + error_messages[i] + '</li>');
				}
			}

			return false;
		});
	});
</script>