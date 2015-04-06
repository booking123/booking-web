<!DOCTYPE html>
<html ng-app="app">
<head>
	<!--[if lte IE 8]>
	<script>
		location.assign('/browsers');
	</script>
	<![endif]-->

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking</title>
    <link href='//fonts.googleapis.com/css?family=Nunito:400,300,700' rel='stylesheet' type='text/css'>
    <!-- Fonts for calendar -->
    <link href='//fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
    <link href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'><!-- Fonts for calendar -->

    {{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
    {{ stylesheet_link('scripts/inc/jquery-ui-1.11.1.custom/jquery-ui.css') }}
    {{ stylesheet_link('scripts/inc/jquery-ui-1.11.1.custom/jquery-ui.theme.css') }}
    {{ stylesheet_link('scripts/inc/datepicker/css/datePicker.css') }}
    {{ stylesheet_link('scripts/inc/datepicker/css/datePicker.TwoMap.css') }}

    {{ stylesheet_link('css/frontend/style.css') }}
    {{ stylesheet_link('css/frontend/main.css') }}
    {#{{ stylesheet_link('css/frontend/calendar.css') }}#}

    <script>
        var SITE_URL = "{{ url('') }}",
            API_URL = '{{ config.application.apiUri }}';
    </script>
</head>
<body ng-cloak ng-controller="search" class="{{ unique_class }}">
{{ content() }}

{{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
{{ javascript_include('scripts/inc/jquery-ui-1.11.1.custom/jquery-ui.js') }}
{{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.min.js') }}

{{ javascript_include('scripts/inc/datepicker/js/date.js') }}
{{ javascript_include('scripts/inc/datepicker/js/jquery.datePicker.js') }}
{{ javascript_include('scripts/inc/datepicker/js/jquery.datePicker.TwoMap.js') }}
{{ javascript_include('scripts/inc/jquery.placeholder.js') }}

{{ javascript_include('scripts/frontend/global.js') }}
{{ javascript_include('scripts/frontend/main.js') }}

<!-- Angular -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.js"></script>
{{ javascript_include('scripts/frontend/search/app.js') }}
{{ javascript_include('scripts/frontend/search/controller.js') }}
{{ javascript_include('scripts/frontend/search/directives.js') }}
{{ javascript_include('scripts/frontend/search/filters.js') }}
{{ javascript_include('scripts/frontend/search/services.js') }}
<!-- Angular Google maps -->
<script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
{{ javascript_include('scripts/inc/angular-gm.min.js') }}

<script>
    angular.element( document ).ready(function () {
        var scope = angular.element(document.querySelector('body')).scope();

        scope.$apply(function(){
            {% if (js_logo != 'false') %}
            scope.params.logo = '{{ unique_logo }}';
            {%  endif %}
            scope.params.pos = '{{ pos }}';
        });

        scope.init();
    });
</script>
<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-52530372-1', 'auto');
	ga('send', 'pageview');
</script>
</body>
</html>