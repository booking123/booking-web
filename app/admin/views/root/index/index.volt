
<div>
	<h1>Admin Page</h1>
	<p>
		<button id="clear_demo_user" type="button" class="btn btn-warning">Clear information for demo user</button>
	</p>
</div>
<script>
	$(document).ready(function () {
		$('#clear_demo_user').click(function () {
			var $self = $(this);
			$.ajax({
				url: SITE_URL + 'index/cleardemouser/',
				data: {
					status: 'clear_demo'
				},
				dataType: 'json',
				success: function (resp) {
					if (resp.error) {
						alert('Demo User is reset!');
					}

					$self.addClass('disabled');
				}
			});
			return false;
		});
	});
</script>