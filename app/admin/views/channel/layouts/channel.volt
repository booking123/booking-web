<!DOCTYPE html>
<html>
<head>
    <title>Channel Partner | {{ main_menu[main_menu_active] }}</title>
	{{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
	{{ stylesheet_link('css/admin/pm/main.css') }}
	{{ stylesheet_link('css/admin/channel/chp-main.css') }}

	<!-- For custom CSS -->
	{{ assets.outputCss() }}
	<!-- For custom CSS END -->

    {{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
	{{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}
	{{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript">
        var SITE_URL = '{{ url('admin/channel/') }}';
    </script>
</head>
<body>
<header class="navbar navbar-inverse navbar-fixed-top">
	<div class="container-fluid">
		<a href="#" class="brand pull-left"></a>
		<a href="{{ url('login/signout') }}" class="status pull-right">Log Out</a>
		<p class="account-name pull-right">{{ company_name }}</p>
	</div>

</header>
<div class="container-fluid main-content">
	<div class="row">
		<div class="col-md-2 col-sm-3 col-xs-12 left-sidebar">
			<div class="list-group left-sidebar-menu">
				{% for key, value in main_menu %}
					{% if key == 'dashboard' %}
						<a href="{{ url('admin/channel/') }}" class="list-group-item {{ key }}{% if key == main_menu_active %} active{% endif %}"><span class="list-icon"></span>{{ value }}</a>
					{% else %}
						<a href="{{ url('admin/channel/' ~ key ~ '/index/') }}" class="list-group-item {{ key }}{% if key == main_menu_active %} active{% endif %}"><span class="list-icon"></span>{{ value }}</a>
					{% endif %}
				{% endfor %}
			</div>
		</div>

		<div class="col-md-10 col-sm-9 col-xs-12 col-md-offset-2 col-sm-offset-3 col-xs-offset-0  right-block">
			<div class="row tables-block">
				<div class="page-wrapper">
					<!-- For custom Site content -->
					{{ content() }}
					<!-- For custom site content END -->
				</div>
				<div class="footer content-block-wrapper">
					<div class="container-fluid footer-content">
						<div class="row">
							<div class="col-md-12 footer-rights">
								<p><span>&copy;</span> &ensp; 2014, BookingPal, Inc. All rights reserved.</p>
							</div>
						</div>
					</div>
				</div>

			</div>
		</div>
	</div>
</div>
<!-- For custom JS -->
{{ assets.outputJs() }}
<!-- For custom JS END -->
</body>
</html>