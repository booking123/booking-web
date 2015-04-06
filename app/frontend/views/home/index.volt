<div class="{{ location_settings['class'] }}">
<!--
<ul>
    <li><b>checkInDate</b>: [[params.checkInDate]]</li>
    <li><b>checkOutDate</b>: [[params.checkOutDate]]</li>
    <li><b>currency</b>: [[params.currency]]</li>
    <li><b>guests</b>: [[params.guests]]</li>
    <li><b>language</b>: [[params.language]]</li>
    <li><b>locationID</b>: [[params.locationID]]</li>
    <li><b>locationName</b>: [[params.locationName]]</li>
    <li><b>period</b>: [[params.period]]</li>
</ul>
-->
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar" role="navigation">
                    <a class="navbar-brand home" href="{{ url('home/') }}"><img src="{{ unique_logo }}" alt=""></a>
                    <ul class="nav navbar-right currency">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <span class="currency-long" ng-bind="params.currency"></span>
                                <span class="currency-short" ng-bind-html="currency[params.currency] | html"></span>
                                <span class="caret-arrow"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li ng-repeat="c in currency_list"><a href="#" ng-click="selectCurrency(c.id, c.name)" ng-bind="c.name"></a></li>
                            </ul>
                        </li>
                    </ul>
                    <!--
                    <ul class="nav navbar-right language">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">

                                <span class="language-long">English</span>
                                <span class="language-short">En</span>
                                <b class="caret-arrow"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="#">English</a></li>
                                <li><a href="#">...</a></li>
                            </ul>
                        </li>
                    </ul>
                    -->
                    <!--
                    <div class="authorisation-box active-user">
                        <div class="login-box text-right">
                            <button class="btn btn-login" data-toggle="modal" data-target="#modalLogIn">Log in</button>
                            <a class="btn btn-reg" href="https://www.mybookingpal.com/registration/new/">Register</a>
                        </div>

                        <div class="user-box">
                            <a href="#" class="btn-profile favourite">
                                <span class="profile-cat-name">Favourite</span>
                                <span class="profile-cat-count">99</span>
                            </a>
                            <a href="#" class="btn-profile suitcase">
                                <span class="profile-cat-name">My trips</span>
                                <span class="profile-cat-count">9</span>
                            </a>
                            <a href="#" class="btn-profile inquiry">
                                <span class="profile-cat-name">Inquiry</span>
                                <span class="profile-cat-count">+99</span>
                            </a>

                            <div class="user-info">
                                <a class="user-name" href="#">Name Surname</a>
                                <button class="btn btn-login" id="goLogout" >Log out</button>
                            </div>
                        </div>
                    </div>
                    -->
                </nav>
            </div>
        </div>
    </div>
</header>
<div class="main-searchbox">

<form method="get" ng-submit="advancedSearch.go()">
	<div class="main-searchbox-wrapper">

		{% if (location_settings['class'] != 'eu') %}
		<div class="search-slider">
			<div class="ss-slide unique_bg" ></div>
			<div class="ss-slide city_bg" ></div>
			<div class="ss-slide swim_bg" ></div>
			<div class="ss-slide golf_bg" ></div>
			<div class="ss-slide ski_bg" ></div>
			<div class="ss-slide beach_bg" ></div>
		</div>
		{%  endif %}

		<div class="container">
			<h1 class="searchbox_title"><span>Unique</span><br class="visible-xs-inline" />{{ location_settings['title'] }}</h1>

			<div class="search-panel">
				<div class="search-panel-wrapper">
					<div class="row">
						<div class="search-panel-input-box col-md-4 col-sm-12">
							<label class="sr-only" for="searchTextValue">Where are you going?</label>
							<input type="text" class="form-control" id="searchTextValue" placeholder="Where are you going?" autocomplete="off" search-button="home_search_button" search-autocomplete ng-model="params.locationName" />
							<input type="hidden" ng-model="params.locationID" name="location_id" />
						</div>
						<div class="search-panel-input-box datepicker-box col-md-2 col-sm-3">
							<label class="sr-only" for="checkInDate">Check in</label>
							<input class="form-control" type="text" placeholder="Check in" id="checkInDate" autocomplete="off" ng-model="params.checkInDate" datepicker dp-function="mainDatepickerChanges" dp-check-out="checkOutDate" readonly="readonly" />
							<span class="caret-custom"></span>
						</div>
						<div class="search-panel-input-box datepicker-box col-md-2 col-sm-3">
							<label class="sr-only" for="checkOutDate">Check out</label>
							<input class="form-control" type="text" placeholder="Check out" id="checkOutDate" autocomplete="off" readonly="readonly" ng-model="params.checkOutDate" />
							<span class="caret-custom"></span>
						</div>
						<div class="search-panel-input-box col-md-2 col-sm-4">
							<div class="btn-group">
								<input type="hidden" value="2" name="guests" id="guests" />
								<button type="button" class="btn btn-default dropdown-toggle" id="guests_button" data-toggle="dropdown">
									<span class="caret-custom guests"></span>[[ adults[params.adults] ]]<!--Guests-->
								</button>
								<ul class="dropdown-menu" role="menu">
									<li ng-repeat="a in adults_list"><a href="javascript:void(0);" ng-click="selectAdults(a.id, a.name)" ng-bind="a.name"></a></li>
								</ul>
							</div>
						</div>
						<div class="search-panel-input-box col-md-2 col-sm-2">
							<input type="submit" class="btn btn-success" value="Search" id="home_search_button" />
						</div>
						<div class="search-panel-input-box include-properties col-sm-12">
							<label><input type="checkbox" ng-checked="advancedSearch.options.listChecked.indexOf('include_properties') > -1" ng-click="advancedSearch.options.toggleCheck('include_properties')"/> Include Properties that require a Saturday arrival?</label>
						</div>
					</div>
				</div>
				<div class="row search-panel-bottom-line">
					<div class="col-md-12 col-sm-12 text-right">
						<a id="toggleAdvancedOptions" href="#"><span>+</span> Advanced search options</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="advanced-search search-content-box">
		<div class="container">
			<h2>Advanced Search</h2>

			<div class="as-content row">
				<div class="col-md-4 col-sm-6 no-padding-lr as-content-row">
					<div class="form-group">
						<label class="col-sm-12 padding-lr-7px">Property Type:</label>
						<div class="col-sm-12 padding-lr-7px">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret-custom"></span> [[advancedSearch.propertyType.active.name]]</button>
								<ul class="dropdown-menu" role="menu">
									<li ng-repeat="row in advancedSearch.propertyType.list"><a href="#" ng-click="advancedSearch.propertyType.select(row)">[[row.name]]</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 no-padding-lr as-content-row">
					<div class="form-group">
						<label class="col-sm-12 padding-lr-7px">Number of Bedrooms:</label>
						<div class="col-sm-12 padding-lr-7px">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
									<span class="caret-custom"></span> [[advancedSearch.numOfBedrooms.active.name]]
								</button>
								<ul class="dropdown-menu" role="menu">
									<li ng-repeat="row in advancedSearch.numOfBedrooms.list"><a href="#" ng-click="advancedSearch.numOfBedrooms.select(row)">[[row.name]]</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 no-padding-lr as-content-row">
					<div class="form-group">
						<label class="col-sm-12 padding-lr-7px">Number of Bathrooms:</label>

						<div class="col-sm-12 padding-lr-7px">
							<div class="btn-group">
								<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
									<span class="caret-custom"></span> [[advancedSearch.numOfBathrooms.active.name]]
								</button>
								<ul class="dropdown-menu" role="menu">
									<li ng-repeat="row in advancedSearch.numOfBathrooms.list"><a href="#" ng-click="advancedSearch.numOfBathrooms.select(row)" ng-bind="row.name"></a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div class="col-md-4 col-sm-6 no-padding-lr as-content-row">
					<div class="form-group">
						<label class="col-sm-12 padding-lr-7px">Price Range</label>

						<div class="col-sm-12 padding-lr-7px currency-filter home">
							<div class="row">
								<div class="min col-xs-2">
									<div class="input-group">
										<span class="input-group-addon" ng-bind-html="currency[params.currency] | html"></span>


									</div>
								</div>
								<div class="min col-xs-5">
									<div class="input-group">

										<input type="text" class="form-control" placeholder="Min" ng-model="advancedSearch.minPriceValue.active" >
										<div class="input-group-btn">
											<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
											<ul class="dropdown-menu" role="menu">
												<li ng-repeat="row in advancedSearch.minPriceValue.list"><a href="#" ng-click="advancedSearch.minPriceValue.select(row)">[[row]]</a></li>
											</ul>
										</div><!-- /btn-group -->
									</div><!-- /input-group -->
								</div>
								<div class="max col-xs-5">
									<div class="input-group">

										<input type="text" class="form-control" placeholder="Max" ng-model="advancedSearch.maxPriceValue.active" >
										<div class="input-group-btn">
											<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span></button>
											<ul class="dropdown-menu" role="menu">
												<li ng-repeat="row in advancedSearch.maxPriceValue.list"><a href="#" ng-click="advancedSearch.maxPriceValue.select(row)">[[row]]</a></li>
											</ul>
										</div><!-- /btn-group -->
									</div><!-- /input-group -->
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-6 no-padding-lr as-content-row">
					<div class="form-group">
						<label for="propertyID" class="col-sm-12 padding-lr-7px">Property ID:</label>

						<div class="col-sm-12 padding-lr-7px">
							<input type="text" class="form-control" placeholder="ID" id="propertyID" ng-model="advancedSearch.propertyID">
						</div>
					</div>
				</div>
				<div class="col-sm-4 as-options no-padding-lr">
					<div class="col-sm-12 padding-lr-7px">
						<h5>Options</h5>
						<ul class="as-checkbox-block">
							<li ng-repeat="row in advancedSearch.options.list"><label><input type="checkbox" value="[[row.id]]" ng-checked="advancedSearch.options.listChecked.indexOf(row.id) > -1" ng-click="advancedSearch.options.toggleCheck(row.id)"> <span>[[row.name]]</span></label></li>
						</ul>
					</div>
				</div>

				<div class="col-sm-12 as-list-amenities no-padding-lr">
					<h5><span class="caret-plus visible-xs-inline">+</span>Amenities <span class="hidden-xs">(Select all that apply)</span></h5>
					<ul class="row as-checkbox-block">
						<li class="col-md-3 col-sm-6 col-xs-6 padding-lr-7px" ng-repeat="row in advancedSearch.ammenities.list"><label><input type="checkbox" value="[[row.id]]" ng-checked="advancedSearch.ammenities.listChecked.indexOf(row.id) > -1" ng-click="advancedSearch.ammenities.toggleCheck(row.id)"> [[row.name]]</label></li>
					</ul>
				</div>

				<div class="col-sm-12 advanced-search-buttons">
					<input type="submit" class="btn btn-success" value="Search" />
					<br class="visible-xs-inline" />
					<a class="cancel btn-close-as" href="#">Cancel</a>
				</div>
			</div>

		</div>

		<div class="separate-line-bottom"></div>
	</div>
</form>
</div>


<div class="search-content-box wrapper-location-list">
    <div class="container">
        <h2>Start Your Adventure</h2>
        <h4>Discover destinations that travelers love.</h4>

        <div class="location-list row">
			{% for city in location_settings['cities'] %}
				<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
					<a href="{{ url(city['link']) }}" class="location-link">
						<span>{{ city['name'] }}</span><img src="{{ url(city['image']) }}" alt="">
					</a>
				</div>
			{% endfor %}
		</div>
    </div>
</div>
{# if (location_settings['class'] != 'eu') %}
<div class="search-content-box wrapper-map-box hidden-sm hidden-xs">
    <div class="container">
        <h2>Search By Map</h2>
        <h4>Click the map below to search for rentals in that area</h4>
        <div class="map-box"><img src="{{ url('img/frontend/map-new.png') }}" alt=""></div>
    </div>
</div>
{% endif #}
<footer id="footer">
    <div class="container">
		<ul class="footer-menu">
			<li><a href="{{ url('home') }}">Home</a></li>
			<li><a target="_blank" href="{{ url('privacy-policy/html') }}">Privacy Policy</a></li>
			{#<li><a href="#">Terms &amp; Conditions</a></li>#}
			{#<li><a href="#">FAQ’s</a></li>#}
			{#<li><a href="#">Company</a></li>#}
		</ul>
        <div class="copy">&copy; 2015 BookingPal, Inc. All Rights Reserved.</div>
    </div>
</footer>

<!-- Modal blocks -->
<div class="modal fade search-modal-login" id="modalLogIn" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span
                            class="sr-only">Close</span></button>
                <h1 class="modal-title" id="myModalLabel">Log in</h1>
            </div>
            <div class="modal-body">
                <form action="#" method="get">
                    <div class="login-Email">
                        <div>E-mail</div>
                        <input type="text">
                    </div>
                    <div class="login-Password">
                        <div>Password</div>
                        <input type="text">
                    </div>
                    <div class="login-button">
                        <button type="submit" class="btn btn-success btn-lg login-submit" id="goLogin">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

</div>
<!-- End Modal blocks -->