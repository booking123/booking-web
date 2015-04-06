<div class="user-answer">
	<h1 class="user-answer-heading text-center">Conversation with {{ pmName }}</h1>
	<div class="user-answer-body">




		<form class="conversation-main" id="conversation-form" data-id={{ id }}>

			<div class="conversation-list">

				{% for message in messages %}
					{%  if message.FromPartyID == pm %}
						<div class="message message-me container-fluid">
							<div class="row">

								<div class="col-xs-10 message-text">
									<div class="popover left">
										<div class="arrow"></div>

										<div class="popover-content">
											<p>{{ message.Message }}</p>
										</div>
									</div>
								</div>

								<div class="col-xs-2 message-detail">

									<p class="message-detail-name">{{ message.pmName }}</p>
									<p class="message-detail-delay">{{ message.timeDiff }}{{ message.time_value }} ago</p>
								</div>

							</div>
						</div>
					{% else  %}
						<div class="message message-interlocutor container-fluid {{ message.readState }}">
							<div class="row">
									<div class="col-xs-2 message-detail">

										<p class="message-detail-name">Me</p>
										<p class="message-detail-delay">{{ message.timeDiff }}{{ message.time_value }} ago</p>
										{#<p class="message-detail-delay">{{ message.timeDiff }}{{ message.timeDiff }} </p>#}
									</div>

									<div class="col-xs-10 message-text">
										<div class="popover right">
											<div class="arrow"></div>
											{#<h3 class="popover-title">about <span class="black"></span>#}



											{#</h3>#}
											<div class="popover-content">
												<p>{{ message.Message }}</p>
											</div>
										</div>
									</div>
							</div>
						</div>
					{% endif  %}
				{% endfor %}
				</div>
				<textarea class="send-answer-block" name="message_text" placeholder="Click here to reply"></textarea>

				<button  type="submit" class="btn send-btn">Send</button>

				{#<div class="bottom-buttons">#}

					{#<a href="#" class="view-all-link">View all messages</a>#}
					{#<a href="#" class="delete-link"><span></span>Delete message thread</a>#}
				{#</div>#}
		</form>
	</div>
</div>
{#<script id="ConversationsAnswerTemp" type="text/template">#}
	{#<div class="message message-me container-fluid">#}
		{#<div class="row">#}

			{#<div class="col-xs-10 message-text">#}
				{#<div class="popover left">#}
					{#<div class="arrow"></div>#}

					{#<div class="popover-content">#}
						{#<p><%= text %></p>#}
					{#</div>#}
				{#</div>#}
			{#</div>#}

			{#<div class="col-xs-2 message-detail">#}
				{#<img class="message-detail-avatar" src="{{ url('img/admin/pm/user-avatar.png') }}" />#}
				{#<p class="message-detail-name">Me</p>#}
				{#<p class="message-detail-delay"><%= timeDiff %><%= time_value %> ago</p>#}
			{#</div>#}

		{#</div>#}
	{#</div>#}
{#</script>#}


{{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
{{ stylesheet_link('css/frontend/answer.css') }}

{{ javascript_include('scripts/inc/underscore-min.js') }}
{{ javascript_include('scripts/frontend/answer.js') }}