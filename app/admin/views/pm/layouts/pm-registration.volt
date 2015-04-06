<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Property Manager | Registration</title>
    <link href='https://fonts.googleapis.com/css?family=Nunito:400,300,700' rel='stylesheet' type='text/css'/>

    {{ stylesheet_link('scripts/inc/bootstrap3.2/css/bootstrap.css') }}
    {{ stylesheet_link('css/admin/pm/main.css') }}

    <!-- For custom CSS -->
    {{ assets.outputCss() }}
    <!-- For custom CSS END -->
    {{ javascript_include('scripts/inc/jquery-2.1.1.min.js') }}
    {{ javascript_include('scripts/inc/bootstrap3.2/js/bootstrap.js') }}


	<!-- Angular -->
	{{ javascript_include('scripts/inc/angular-1.3.3/angular.js') }}
	{{ javascript_include('scripts/inc/angular-1.3.3/angular-route.js') }}
	{{ javascript_include('scripts/inc/angular-1.3.3/angular-resource.js') }}

	<!-- END Angular -->
	<script type="text/javascript">var SITE_URL = "{{ url('admin/pm/') }}", SITE_API_URL = '{{ config.application.baseUri }}api/';</script>
</head>

<body class="pm-dashboard" ng-app="regApp">

<header class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <a href="#" class="brand pull-left"></a>

        <a href="{{ url('login/signout') }}" class="status pull-right">Log Out</a>

        <p class="account-name pull-right"> PM Registration</p>
    </div>
</header>

<div class="container-fluid main-content" ng-controller="MainCtrl">
    <div class="row">
        <div class="col-md-2 col-sm-3 col-xs-12 left-sidebar">
            <div class="list-group left-sidebar-menu">
                {% for key, value in main_menu %}
                    <a href="#" class="list-group-item {{ key }}" tabindex="-1"><span class="list-icon"></span>{{ value }}</a>
                {% endfor %}
            </div>
        </div>

        <div class="col-md-10 col-sm-9 col-xs-12 col-md-offset-2 col-sm-offset-3 col-xs-offset-0 right-block">
            <div class="row registration">
                <ol class="breadcrumb text-center">
					<li ng-repeat="val in breadcrumbValues" ng-class="{active: val.id <= $root.numberStep, current: val.id == $root.numberStep}" ng-switch on="breadcrumbIsActive(val)">
						<a ng-switch-when="true" href="[[ val.link ]]">[[ val.name ]]</a>
						<span ng-switch-default>[[ val.name ]]</span>
					</li>
                </ol>
				<div class="steps">
                <!-- For custom Site content -->
                {{ content() }}
                <!-- For custom site content END -->
				</div>
            </div>
        </div>

        <div class="col-md-10 col-sm-9 col-xs-12 col-md-offset-2 col-sm-offset-3 col-xs-offset-0 navigation-box">
            <div class="row">
                <div class="col-xs-5 col-xs-offset-1 text-left"><a class="btn btn-lg btn-back" href="[[ prevPage() ]]"><span class="arrow"></span> Back</a></div>
                <div class="col-xs-5 text-right"><a class="btn btn-lg btn-next" href="[[ nextPage() ]]">Next <span class="arrow"></span></a></div>
            </div>
        </div>
    </div>
</div>
<!-- For custom JS -->
{{ javascript_include('scripts/admin/pm/angular/app.js') }}
{{ javascript_include('scripts/admin/pm/angular/services/Location.js') }}
{{ javascript_include('scripts/admin/pm/angular/controllers/registrationController.js') }}
{{ assets.outputJs() }}
<!-- For custom JS END -->
</body>
</html>