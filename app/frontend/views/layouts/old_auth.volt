<!DOCTYPE html>
<html ng-app="app">
<head>
	<title>Razor</title>

	{{ stylesheet_link('inc/b-old-ootstrap3.2/css/b-old-ootstrap.css') }}
	{{ stylesheet_link('css/base.css') }}

	<link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic|Open+Sans' rel='stylesheet' type='text/css'>

	<link href='//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700' rel='stylesheet' type='text/css'>

	{{ javascript_include('j-old-s/jquery-1.9.1.js') }}
	{{ javascript_include('j-old-s/jquery-ui-1.10.4.custom.js') }}

	{{ javascript_include('inc/b-old-ootstrap3.2/js/b-old-ootstrap.js') }}

	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<meta name="author" content="ASD Team">
	<script type="text/javascript">
		var SITE_URL = '{{ url('') }}';
	</script>
</head>
<body>
{{ content() }}
</body>
</html>