<!DOCTYPE html>
<html>
<head>
    <title>Razor ADMIN</title>
	{{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
    {{ stylesheet_link('css/backend.css') }}

	{{ stylesheet_link('css/jqueryUiForDatepicker.css') }}

	<!-- For custom CSS -->
	{{ assets.outputCss() }}
	<!-- For custom CSS END -->

    {{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
	{{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}
	{{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ASD Team">
    <script type="text/javascript">
        var SITE_URL = '{{ url('admin/root/') }}';
    </script>
</head>
<body>
<nav id="head-nav" style="" class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            {{ link_to('admin/root/', '&nbsp;', 'class': 'navbar-brand') }}
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div id="main_menu" class="collapse navbar-collapse">
		    {% include 'menu.volt' %}
            <div class="admin-user-panel">
                <p>Hi, <a href="#" class="green">{{ user_name }}</a> | My account</p>
                <p><a href="{{ url('login/signout') }}">Sign Out</a> &nbsp; | &nbsp; <a href="#">New Messages (3)</a> &nbsp; | &nbsp; <a href="#">Help</a></p>
            </div>
        </div>

        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>
<div id="wrap">
    <!-- Begin page content -->
    <div class="container-fluid">
		<div class="row">
			<div class="col-xd-12" role="main">
                {{ content() }}
            </div>
        </div>
    </div>
    <div id="push"></div>
</div>

<!-- For custom JS -->
{{ assets.outputJs() }}
<!-- For custom JS END -->
</body>
</html>