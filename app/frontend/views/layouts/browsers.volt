<!DOCTYPE html>
<html>
<head>
	<title>Razor</title>
	<!-- css3-mediaqueries.js for IE less than 9 -->
	<!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
	<![endif]-->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<!-- Google Fonts -->
	<link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic|Open+Sans' rel='stylesheet' type='text/css'/>
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700' rel='stylesheet' type='text/css'/>

	{{ stylesheet_link('css/frontend/browsers.css') }}
	<script type="text/javascript">var SITE_URL = "{{ url('') }}";</script>
</head>
<body>
	{{ content() }}
</body>
</html>



