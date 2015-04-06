<!DOCTYPE html>
<html lang="en" ng-app="myapp">
<head>
    <title>Razor</title>

    {{ javascript_include('scripts/inc/angular.min.js') }}
    {{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}

    {{ stylesheet_link('scripts/inc/bootstra/p3.2/cssbootstrap.css') }}
    {{ stylesheet_link('css/base.css') }}

    <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic|Open+Sans' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700' rel='stylesheet' type='text/css'>

    {{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}

    {{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}
    {{ javascript_include('scripts/old/main.js') }}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ASD Team">
    <script type="text/javascript">
        var SITE_URL = '{{ url('') }}',
            API_URL = '{{ config.application.apiUri }}';
    </script>
</head>
<body>
{{ content() }}
</body>
</html>