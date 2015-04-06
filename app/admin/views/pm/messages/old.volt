<script type="text/javascript">
	$(document).ready(function () {
		$('.pm-button.compose').click(function () {
			$('.pm-compose').show();
			return false;
		});

		$('#send_message').submit(function () {
			$('.pm-compose').hide();
			return false;
		});

	});
</script>

<br/>

<ol class="breadcrumb">
	<li>{{ link_to('admin/pm/', 'Dashboard') }}</li>
	<li class="active">Messages</li>
</ol>

<div class="pm-content">
	<div class="pm-compose">
		<form id="send_message" class="form-horizontal" action="{{ url('admin/pm/send/') }}" method="post">
			<div class="form-group">
				<label for="message_to" class="col-sm-2 control-label">To:</label>

				<div class="col-sm-4">
					<input type="email" class="form-control input-lg" id="message_to" name="to">
				</div>
				<div class="col-sm-1"><a href="#" class="pm-button search-address"  data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom" ></a></div>
			</div>
			<div class="form-group">
				<label for="massage_subject" class="col-sm-2 control-label">Subject:</label>

				<div class="col-sm-10">
					<input type="text" class="form-control input-lg" id="massage_subject" name="subject">
				</div>
			</div>
			<div class="form-group">
				<label for="message_content" class="col-sm-2 control-label">Message:</label>

				<div class="col-sm-10">
					<textarea id="message_content" rows="5" name="message" class="form-control input-lg"></textarea>
				</div>
			</div>

			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10 text-right">
					<button type="submit" class="btn btn-success btn-lg">Send</button>
				</div>
			</div>
		</form>
	</div>

	<div class="pm-message-menu">
		<a href="#" class="pm-button compose">Compose</a>
		<a href="#" class="pm-button forward">Forward</a>
		<a href="#" class="pm-button save">Save Draft</a>
		<a href="#" class="pm-button reply">Reply</a>
		<a href="#" class="pm-button trash">Trash</a>
	</div>

	<form>
		<table class="pm-table table table-bordered table-hover table-striped">
			<thead>
			<tr>
				<th class="checked-call"><img alt="" src="{{ url('img/admin/ok.png') }}"/></th>
				<th>From</th>
				<th>Subject</th>
				<th>Date</th>
			</tr>
			</thead>
			<tbody>
			<tr class="new-row">
				<td><input type="checkbox" name="message" value=""/></td>
				<td>Alex Aydin</td>
				<td>Follow Up</td>
				<td>Sun, 5/19</td>
			</tr>
			<tr>
				<td><input type="checkbox" name="message" value=""/></td>
				<td>Alex Aydin</td>
				<td>Follow Up</td>
				<td>Sun, 5/19</td>
			</tr>
			<tr>
				<td><input type="checkbox" name="message" value=""/></td>
				<td>Alex Aydin</td>
				<td>Follow Up</td>
				<td>Sun, 5/19</td>
			</tr>
			</tbody>
		</table>
	</form>
</div>
