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

    {{ stylesheet_link('tmp-search/css/search-result.css') }}


    <link href='//fonts.googleapis.com/css?family=Nunito:400,300,700' rel='stylesheet' type='text/css'>
    {{ stylesheet_link('tmp-search/inc/bootstrap-3.2.0/css/bootstrap.css') }}
    <!-- TODO: Delete jquery ui class, when create custom design for datapicker and autocomplite -->
    {{ stylesheet_link('tmp-search/inc/jquery-ui-1.11.1.custom/jquery-ui.css') }}
    {{ stylesheet_link('tmp-search/inc/jquery-ui-1.11.1.custom/jquery-ui.theme.css') }}
    {{ stylesheet_link('tmp-search/inc/jquery-ui-1.11.1.custom/jquery-ui.css') }}
    {{ stylesheet_link('tmp-search/inc/jquery-ui-1.11.1.custom/jquery-ui.theme.css') }}

	{{ stylesheet_link('tmp-search/inc/datepicker/css/datePicker.css') }}
	{{ stylesheet_link('tmp-search/inc/datepicker/css/datePicker.TwoMap.css') }}

    {{ stylesheet_link('tmp-search/css/style.css') }}
    {{ stylesheet_link('tmp-search/css/search-result.css') }}


    <script>
        var SITE_URL = '{{ url('') }}',
            API_URL = '{{ config.application.apiUri }}';
    </script>
</head>
<body ng-cloak ng-controller="search">
{{ content() }}

{{ javascript_include('tmp-search/inc/jquery/jquery-2.1.1.js') }}
{{ javascript_include('tmp-search/inc/jquery-ui-1.11.1.custom/jquery-ui.js') }}
{{ javascript_include('tmp-search/inc/bootstrap-3.2.0/js/bootstrap.min.js') }}
{{ javascript_include('tmp-search/js/global.js') }}
{{ javascript_include('tmp-search/js/search-result.js') }}

<!-- Detail files -->
{{ stylesheet_link('tmp-search/inc/slick.slider/slick.css') }}
{{ stylesheet_link('tmp-search/css/detail.css') }}

{{ javascript_include('tmp-search/inc/slick.slider/slick.min.js') }}
{{ javascript_include('tmp-search/js/detail_script.js') }}
<!-- End Detail files -->

<script type="text/javascript">
    $(document).ready(function () {
        /*
        $('.btn-details, .item-logo-box', '.sr-list').click(function () {
            $('.search-result').hide();
            $('.detail-result').show();
        });
        */
        /*
        $('.result-back-link').click(function () {
            $('.search-result').show();
            $('.detail-result').hide();
            return false;
        });
        */
    });
</script>

{{ javascript_include('tmp-search/inc/datepicker/js/date.js') }}
{{ javascript_include('tmp-search/inc/datepicker/js/jquery.datePicker.js') }}
{{ javascript_include('tmp-search/inc/datepicker/js/jquery.datePicker.TwoMap.js') }}

<!-- Angular -->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.24/angular.js"></script>

<script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>
{{ javascript_include('scripts/inc/angular-gm.min.js') }}

{{ javascript_include('tmp-search/js/search/app.js') }}
{{ javascript_include('tmp-search/js/search/controller.js') }}
{{ javascript_include('tmp-search/js/search/directives.js') }}
{{ javascript_include('tmp-search/js/search/filters.js') }}
{{ javascript_include('tmp-search/js/search/services.js') }}
{{ javascript_include('tmp-search/inc/jquery/jquery.placeholder.js') }}
<!-- Angular Google maps -->
{{ javascript_include('scripts/inc/angular-gm.min.js') }}

<script>
    angular.element( document ).ready(function () {
        var scope = angular.element(document.querySelector('body')).scope();

        scope.$apply(function(){
            scope.debug = '{{ config.debug }}'
            scope.params.locationName = '{{ location }}';
            scope.params.locationID = {{ location_id }};
            scope.params.checkInDate = scope.convertDate('{{ check_in }}', 'usa');
            scope.params.detailCheckInDate = scope.params.checkInDate;
            scope.params.checkOutDate = scope.convertDate('{{ check_out }}', 'usa');
            scope.params.detailCheckOutDate = scope.params.checkOutDate;
            scope.params.adults = '{{ guests }}';
            scope.params.period = '{{ period }}';
            scope.params.pos = '{{ pos }}';
            scope.params.currency = '{{ currency }}';
            scope.params.product_id = '{{ product_id }}';
            scope.showCommission = {{ show_commission }};

			scope.advancedSearch.setParams({
				property_type: '{{property_type}}',
				num_bed: '{{num_bed}}',
				num_bath: '{{num_bath}}',
				min: '{{min}}',
				max: '{{max}}',
				options: '{{options}}',
				ammenities: '{{ammenities}}',
				property: '{{property}}'
			});
        });

        scope.init();
    });
</script>

<!-- Widget -->
{{ javascript_include('js/widget.js') }}
<script>
    Mybookingpal.setParams({
        'pos': '{{ pos }}',
        'currency': '{{ currency }}'
    });
</script>
</body>
</html>