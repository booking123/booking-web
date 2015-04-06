{% set current_before = (rows.current - 5) < 1 ? 1 : rows.current - 5 %}
{% set current_afret = (rows.current + 5) > rows.total_pages ? rows.total_pages : rows.current + 5 %}
<div class="container-fluid">
	<div class="row">
		{% if rows.total_pages %}
		<div class="col-xs-9">
			<ul class="pagination pagination-sm">
				<li {% if 1 == rows.current %}
						class="disabled"><span>&laquo;</span>
					{% else %}
						><a href="{{ page_url }}?page=1">&laquo;</a>
					{% endif %}
				</li>

				<li {% if rows.before == rows.current %}
						class="disabled"><span>&lsaquo;</span>
					{% else %}
						><a href="{{ page_url ~ '?page=' ~ rows.before }}">&lsaquo;</a>
					{% endif %}
				</li>

				{% if current_before > 1 %}
					<li><span>..</span></li>
				{% endif %}

				{% for index in current_before..current_afret %}
					<li {% if index == rows.current %}
							class="active"><span>{{ index }}</span>
						{% else %}
							><a href="{{ page_url ~ '?page=' ~ index }}">{{ index }}</a>
						{% endif %}
					</li>
				{% endfor %}

				{% if current_afret < rows.total_pages %}
					<li><span>..</span></li>
				{% endif %}

				<li {% if rows.next <= rows.current %}
						class="disabled"><span>&rsaquo;</span>
					{% else %}
						><a href="{{ page_url ~ '?page=' ~ rows.next }}">&rsaquo;</a>
					{% endif %}
				</li>

				<li {% if rows.last <= rows.current %}
						class="disabled"><span>&raquo;</span>
					{% else %}
						><a href="{{ page_url ~ '?page=' ~ rows.last }}">&raquo;</a>
					{% endif %}
				</li>
			</ul>
		</div>

		<div class="col-xs-3">
			<p class="text-right">Page: {{ rows.current }} from {{ rows.total_pages }} / Total
				item: {{ rows.total_items }}</p>
		</div>
		{% endif %}
	</div>
</div>