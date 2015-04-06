<!DOCTYPE html>
<html>
<head>
	<title>Razor</title>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="description" content="">
	<!-- Google Fonts -->
	{#<link href='//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic|Open+Sans' rel='stylesheet' type='text/css'/>#}
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,700italic,400,600,700' rel='stylesheet' type='text/css'/>

	{{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
	{{ stylesheet_link('css/frontend/login.css') }}

	<script type="text/javascript">var SITE_URL = "{{ url('') }}";</script>

	{{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
	{{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}
	{{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}

	{{ javascript_include('scripts/frontend/auth.js') }}
</head>
<body>
<div class="wrapper">
	<header class="login-header">
		<nav class="navbar navbar-default">
			<div class="container">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
							data-target="#bs-example-navbar-collapse-1">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="{{ url('home/') }}"><img src="{{ unique_logo }}" alt=""/></a>
				</div>


				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1" >

					<ul class="nav navbar-nav navbar-right">
						<li><a {% if current_page == 'login' %}class="active"{% else %}href="{{ url('login/') }}"{% endif %} >Log in</a></li>
						<li><a {% if current_page == 'register' %}class="active"{% else %}href="{{ url('register/') }}"{% endif %} >Register</a></li>

						<li class="dropdown">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle language-btn" data-toggle="dropdown">
									English
								</button>
								<button type="button" class="btn btn-default dropdown-toggle language-arrow" data-toggle="dropdown">
									<span class="arrow"></span>
								</button>
								<ul class="dropdown-menu">
									<li ><a href="#" >English</a></li>
									<li ><a href="#" >Deutsch</a></li>
									<li ><a href="#" >Español</a></li>
									<li ><a href="#" >Français</a></li>
									<li ><a href="#" >Italiano</a></li>
									<li ><a href="#" >Русский</a></li>
								</ul>
							</div>
						</li>
					</ul>

				</div>
				<!-- /.navbar-collapse -->
			</div>
			<!-- /.container-fluid -->
		</nav>
	</header>
	{{ content() }}
</div>

<!-- For custom JS -->
{{ assets.outputJs() }}
<!-- For custom JS END -->

</body>
</html>



