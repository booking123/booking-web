{#
TODO: DELETE thead
page_url = string / this page link
thead = array / [[view name, sort_name],...]
active_sort = array / sort_name
#}
<thead>
<tr>
	{% for v in thead %}
		<th>
			{% if v|length > 1 %}
				<a{% if active_sort['desc'] %} class="dropup"{% endif %} href="{{ page_url ~ '?sort=' ~ v[1] }}">
					{{ v[0] }}{% if active_sort['name'] == v[1] %} <span class="caret"></span>{% endif %}
				</a>
			{% else %}
				{{ v[0] }}
			{% endif %}
		</th>
	{% endfor %}
</tr>
</thead>