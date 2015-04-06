{% set page_url = url('admin/root/pms-companies/index/') %}

<h2 class="page-header">PMS Companies</h2>

<div class="report-box">
	{% include '/../templates/paginations.volt' %}

	<table id="pending_transaction_list" class="table table-striped table-condensed">
		{% include '/../templates/thead_sorting.volt' %}
		<tbody>
		{% for v in rows.items %}
			<tr>
				<td>{{ v.pID }}</td>
				<td>{{ v.pOrganizationID }}</td>
				<td>{{ v.pPartyID }}</td>
				<td>{{ v.pPartyName }}</td>
				<td>{{ v.pState }}</td>
				<td>{{ v.pSupportsCreditCard }}</td>
				<td>{{ v.pSendConfirmationEmails }}</td>
			</tr>
		{% endfor %}
		</tbody>
	</table>

	{% include '/../templates/paginations.volt' %}
</div>

<br/><br/><br/>

<script type="text/javascript">
	$(document).ready(function () {
		$('#filterReset').click(function () {
			window.location.href = '{{ page_url }}?Name=';
		});
	});
</script>