<!DOCTYPE html>
<html>
<head>
    <title>Razor | API</title>
	{{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
    {{ stylesheet_link('css/base.css') }}

	{{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
	{{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}
    {{ javascript_include('scripts/old/main.js') }}

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="ASD Team">
    <script type="text/javascript">
        var SITE_URL = '{{ url('') }}';
    </script>
</head>
<body>
<nav id="head-nav" class="navbar navbar-default navbar-fixed-top" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            {{ link_to('', '&nbsp;', 'class': 'navbar-brand') }}
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse navbar-right navbar-ex1-collapse">
            <ul class="nav navbar-nav">
                <li>{{ link_to('privacy-policy', 'Privacy policy') }}</li>
                <li>{{ link_to('login/', 'Login') }}</li>
            </ul>
        </div>
        <!-- /.navbar-collapse -->
    </div>
    <!-- /.container -->
</nav>

<div id="wrap">
    <!-- Begin page content -->
    <div class="container">
        {{ content() }}
    </div>
    <div id="push"></div>
</div>

<footer id="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <ul class="list-inline">
                    <li>{{ link_to('', 'Home') }}</li>
                    <li class="footer-menu-divider">&sdot;</li>
                    <li>{{ link_to('#about', 'About') }}</li>
                    <li class="footer-menu-divider">&sdot;</li>
                    <li>{{ link_to('#services', 'Services') }}</li>
                    <li class="footer-menu-divider">&sdot;</li>
                    <li>{{ link_to('#contact', 'Contact') }}</li>
                </ul>
                <p class="copyright text-muted small">Copyright &copy; Your Company 2013. All Rights Reserved</p>
            </div>
        </div>
    </div>
</footer>
</body>
</html>