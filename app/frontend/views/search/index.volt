<!-- Search params controller -->
<div class="wrapper">
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar" role="navigation">
                    <a ng-show="params.logo" class="navbar-brand search-result" href="{{ url('home/') }}{{ logo_params }}"><img src="{{ unique_logo }}"></a>
                    <ul class="nav navbar-right currency">
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <span class="currency-long">[[ params.currency ]]</span>
                                <span class="currency-short" ng-bind-html="currency[params.currency] | html"></span>
                                <span class="caret-arrow"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li ng-repeat="c in currency_list"><a href="#" ng-click="selectCurrency(c.id, c.name)">[[c.name]]</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</header>

<div class="main-searchbox">
	<form rol="form" action="" method="get">
		<div class="container">
			<div class="search-panel">
				<div class="row">
					<div class="search-panel-input-box col-sm-4">
						<input type="text" class="form-control" search-autocomplete ng-model="params.locationName" id="searchTextValue" placeholder="Where are you going?" name="location" autocomplete="off">
						<input type="hidden" ng-model="params.locationID" name="location_id" id="searchIdValue" />
					</div>
					<div class="search-panel-input-box datepicker-box col-sm-2">
						<label class="sr-only" for="checkIn">Check-in</label>
						<input class="form-control" type="text" ng-model="params.checkInDate" datepicker dp-function="mainDatepickerChanges" dp-check-out="checkOutDate" placeholder="Check in" id="checkInDate" name="check_in" autocomplete="off" readonly="readonly" />
						<span class="caret-custom"></span>
					</div>
					<div class="search-panel-input-box datepicker-box col-sm-2">
						<label class="sr-only" for="checkOut">Check-out</label>
						<input class="form-control" type="text" ng-model="params.checkOutDate" placeholder="Check out" id="checkOutDate" name="check_out" autocomplete="off" readonly="readonly" />
						<span class="caret-custom"></span>
					</div>
					<div class="search-panel-input-box col-sm-2">
						<div class="btn-group">
							<input type="hidden" value="2" name="guests" id="guests" />
							<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
								<span class="caret-custom guests"></span>[[ adults[params.adults] ]]<!--Guests-->
							</button>
							<ul class="dropdown-menu" role="menu">
								<li ng-repeat="g in adults_list"><a href="#" ng-click="selectAdults(g.id, g.name)">[[g.name]]</a></li>
							</ul>
						</div>
					</div>
					<div class="search-panel-input-box col-sm-2">
						<button type="submit" class="btn btn-success" ng-click="processSearch()">Search</button>
					</div>
					<div class="search-panel-input-box include-properties col-sm-12">
						<label><input type="checkbox" ng-checked="advancedSearch.options.listChecked.indexOf('include_properties') > -1" ng-click="advancedSearch.options.toggleCheck('include_properties')" /> Include Properties that require a Saturday arrival?</label>
					</div>
					<div class="search-panel-bottom-line col-sm-offset-9 col-sm-3 text-right">
						<a id="toggleAdvancedOptions" href="#"><span>+</span> Advanced search options</a>
					</div>
				</div>
			</div>

			<div class="advanced-search row">
				<div class="separate-line"></div>
				<div class="search-panel-input-box col-md-5 col-sm-6">
					<form class="form-horizontal" role="form">
						<div class="form-group">
							<label for="propertyType" class="col-sm-5 control-label">Property Type:</label>
							<div class="col-sm-7">
								<select id="propertyType" name="propertyType" class="form-control" ng-model="advancedSearch.propertyType.active" ng-options="row.name for row in advancedSearch.propertyType.list"></select>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-5 control-label">Price Range (per night)</label>
							<div class="col-sm-7 currency-filter search">
								<div class="row">
									<div class="min col-xs-2">
										<span class="input-group-addon" ng-bind-html="currency[params.currency] | html"></span>
									</div>

									<div class="max col-xs-5">
										<div class="input-group">

											<input type="text" class="form-control" placeholder="Min" ng-model="advancedSearch.minPriceValue.active">
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
						<div class="form-group">
							<label for="bedroomNumber" class="col-sm-5 control-label">Number of Bedrooms:</label>
							<div class="col-sm-7">
								<select id="bedroomNumber" name="bedroomNumber" class="form-control" ng-model="advancedSearch.numOfBedrooms.active" ng-options="row.name for row in advancedSearch.numOfBedrooms.list"></select>
							</div>
						</div>
						<div class="form-group">
							<label for="bathroomNumber" class="col-sm-5 control-label">Number of Bathrooms:</label>
							<div class="col-sm-7">
								<select id="bathroomNumber" name="bedroomNumber" class="form-control" ng-model="advancedSearch.numOfBathrooms.active" ng-options="row.name for row in advancedSearch.numOfBathrooms.list"></select>
							</div>
						</div>

						<div class="form-group">
							<label for="propertyID" class="col-sm-5 control-label">Property ID:</label>
							<div class="col-sm-7">
								<input type="text" class="form-control" placeholder="ID" id="propertyID" ng-model="advancedSearch.propertyID">
							</div>
						</div>
					</form>
				</div>
				<div class="search-panel-input-box col-md-7 col-sm-6">
					<h5>Amenities (Select all that apply)</h5>
					<div class="row amenities">
						<label class="col-md-4 col-xs-6" ng-repeat="row in advancedSearch.ammenities.list"><input type="checkbox" value="[[row.id]]" ng-checked="advancedSearch.ammenities.listChecked.indexOf(row.id) > -1" ng-click="advancedSearch.ammenities.toggleCheck(row.id)"> [[row.name]]</label>
					</div>
					<div class="row amenities">
						<div class="col-md-7 col-sm-12 padding-lr-7px">
							<div class="row">
								<h5 class="col-sm-12">Options</h5>
								<label class="col-xs-12" ng-repeat="row in advancedSearch.options.list"><input type="checkbox" value="[[row.id]]" ng-checked="advancedSearch.options.listChecked.indexOf(row.id) > -1" ng-click="advancedSearch.options.toggleCheck(row.id)"> [[row.name]]</label>
							</div>
						</div>
						<div class="col-md-5 col-sm-12 text-right search-advanced-buttons">
							<a class="cancel btn-close-as" href="#">Cancel</a>
							<button type="submit" class="btn btn-success" ng-click="advancedSearch.apply()">Apply Filters</button>
						</div>
					</div>
				</div>

				<div class="separate-line-bottom"></div>
			</div>
		</div>
	</form>
</div><!-- active-advanced -->

<div class="container" ng-show="action=='search_process'">
    <div class="row sr-panel text-center">
        {#<span class="loading-state"></span>#}
		<img class="loading-state" src="{{ url('img/frontend/Loader.gif') }}" />
    </div>
</div>

<div class="container" ng-show="action == 'search_result' && products.filtered.length == 0">
    <div class="row sr-panel text-center">
        <h2>No results</h2>
    </div>
</div>

<!-- Search result -->
<div class="container search-result" ng-show="action=='search_result' && products.filtered.length > 0">
    <div class="row sr-panel">
        <div class="col-sm-6 col-xs-12">
            <p class="search-description">[[ params.locationNameOutput ]]</p>
            <p class="count-items">Displaying properties  [[ pagination.current * pagination.perPage + 1 ]] - [[ ((pagination.current + 1) * pagination.perPage <= products.filtered.length) ? (pagination.current + 1) * pagination.perPage : products.filtered.length ]]  of  [[ products.filtered.length ]] in total</p>
        </div>
        <div class="col-sm-6 hidden-xs sr-panel-control text-right">
            <span class="sort-by">Sort by</span>
            <ul class="nav">
                <li class="dropdown">
                    <a href="#" class="dropdown-toggle sort-list-button" data-toggle="dropdown">
                        [[ sort_list[params.sort].name ]] <span class="sort-list-params">[[ sort_list[params.sort].type ]]</span> <b class="caret-arrow"></b>
                    </a>
                    <ul class="dropdown-menu sort-dropdown">
                        <li ng-repeat="(k,s) in sort_list"><a href="javascript:void(0);" ng-class="{active: $index == selected}" ng-click="params.sort = k; sortProducts();">[[ s.name ]] <span class="sort-list-params pull-right">[[ s.type ]]</span></a></li>
                        <!--
                        <li><a href="#">Price: Low to High</a></li>
                        <li><a href="#">Price: High to Low</a></li>
                        <li><a href="#">Bedrooms: Most to Least</a></li>
                        <li><a href="#">Bedrooms: Least to Most</a></li>
                        -->
                    </ul>
                </li>
            </ul>
            {#<label class="instant-booking"><input type="checkbox" name="instant_booking" /> Instant booking</label>#}
            <a class="button-view-items to-line" ng-class="params.search_result_type == 'list' ? 'active' : ''" href="javascript:void(0);" ng-click="params.search_result_type = 'list'"></a>
            <a class="button-view-items to-grid" ng-class="params.search_result_type == 'grid' ? 'active' : ''" href="javascript:void(0);" ng-click="params.search_result_type = 'grid'"></a>
        </div>
    </div>
    <article class="row sr-list" ng-class="params.search_result_type == 'list' ? 'to-line' : 'to-grid'">
        <div ng-class="params.search_result_type == 'list' ? 'col-md-12' : 'col-md-4 col-sm-6 col-sx-12'"
             ng-repeat="product in products.filtered | startFrom: pagination.current * pagination.perPage | limitTo:pagination.perPage"
             ng-if="product.exactmatch == true">

            <div class="result-item">
                <a class="item-logo-box" href="javascript:void(0);" ng-click="openProductDetail(product.productid)" >
					<img border="0" src="[[ product.pictureLocation ]]" />
                </a>
                <div class="item-advanced-box">
                    <h4>[[ product.productname ]]</h4>
					<dd class="green hide-to-line hidden-xs"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
                    <ul class="advanced-info ">
                        <li>Sleeps [[ product.guests ]]</li>
                        <li class="separator">/</li>
                        <li>[[ product.bedroom ]] Bedroom(s)</li>
                        <li class="separator">/</li>
                        <li>[[ product.bathroom ]] Bathroom(s)</li>
                    </ul>
                    <ul class="advanced-info ">
                        <li>Min Stay: <span>[[ product.minstay ]] Night(s)</span></li>
                        <li class="separator" ng-show="product.productClassType">/</li>
                        <li ng-show="product.productClassType">Property type: <span>[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] || product.productClassType ]]</span></li>
                    </ul>
                    <ul class="advanced-info " ng-show="product.managerName!='Flipkey API'">
                        <li>Managed by <span>[[ product.managerName ]]</span></li>
                    </ul>
                    <div class="advanced-footer">
                        <span class="book-it-now  hidden-xs" ng-hide="product.inquiryOnly == true">Book it Online</span>
                        {#<span class="minimum-stay hidden-sm  hidden-xs">[[ product.minstay ]] night minimum stay</span>#}
						<button type="button" class="btn btn-details visible-xs" ng-click="openProductDetail(product.productid)">View Details</button>
						<button type="button" class="btn btn-details hide-to-line hidden-xs" ng-click="openProductDetail(product.productid)">View Details</button>
                    </div>
                </div>

                <div class="item-amount">
                    {#<a class="item-like glyphicon glyphicon-heart hide-to-grid hidden-sm  hidden-xs" href="#"></a>#}
                    {#<a href="#" class="item-more-info"><span>+</span> More Info</a>#}
                    <dl ng-show="product.quote">
                        <dt class="hide-to-grid">Total for [[ params.periodOutput ]] nights</dt>
                        <dd class="green hide-to-grid"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
						<dt class="hide-to-line">Total for [[ params.periodOutput ]] nights</dt>
						<dd class="green hide-to-line"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
						<p class="visible-xs">Min. Night Stay: <span class="">[[ product.minstay ]] </span></p>
                    </dl>
                    <dl class="hide-to-grid" ng-show="product.pricePerNight">
                        <dt>Avg. price per night</dt>
                        <dd><span ng-bind-html="currency[params.currency] | html"></span>[[ product.pricePerNight | price: 0 ]]</dd>
						<span class="book-it-now  visible-xs" ng-hide="product.inquiryOnly == true">Book it Online</span>
                    </dl>

					<button type="button" class="btn btn-details hidden-xs hide-to-grid" ng-click="openProductDetail(product.productid)">View Details</button>
                </div>

                <div class="mobile-advanced-info"></div>

                <div class="clearfix"></div>
            </div>
        </div>

        <h1 ng-show="pagination.showLabels" class="properties-divider suggested_properties_label_[[ pagination.showLabels ]]"><span>Suggested Properties</span></h1>

        <div ng-class="params.search_result_type == 'list' ? 'col-md-12' : 'col-md-4 col-sm-6 col-sx-12'"
             ng-repeat="product in products.filtered | startFrom: pagination.current * pagination.perPage | limitTo:pagination.perPage"
             ng-if="product.exactmatch == false">

            <div class="result-item">
                <a class="item-logo-box" href="javascript:void(0);" ng-click="openProductDetail(product.productid)" >
                    <img border="0" src="[[ product.pictureLocation ]]" />
                </a>
                <div class="item-advanced-box">
                    <h4>[[ product.productname ]]</h4>
                    <dd class="green hide-to-line hidden-xs"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
                    <ul class="advanced-info ">
                        <li>Sleeps [[ product.guests ]]</li>
                        <li class="separator">/</li>
                        <li>[[ product.bedroom ]] Bedroom(s)</li>
                        <li class="separator">/</li>
                        <li>[[ product.bathroom ]] Bathroom(s)</li>
                    </ul>
                    <ul class="advanced-info ">
                        <li ng-hide="product.minstay == ''">Min Stay: <span ng-class="product.suggestedby.indexOf('minstay') != -1 ? 'suggested_minstay' : ''">[[ product.minstay ]] Night(s)</span></li>
                        <li class="separator" ng-show="product.suggestedby.indexOf('checkinday') != -1">/</li>
                        <li ng-show="product.suggestedby.indexOf('checkinday') != -1">Checkin day: <span ng-class="product.suggestedby.indexOf('checkinday') != -1 ? 'suggested_minstay' : ''">[[ product.CheckInDayRequired ]]</span></li>
                        <li class="separator" ng-show="product.productClassType">/</li>
                        <li ng-show="product.productClassType">Property type: <span>[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] ]]</span></li>
                    </ul>
                    <ul class="advanced-info " ng-show="product.managerName!='Flipkey API'">
                        <li>Managed by <span>[[ product.managerName ]]</span></li>
                    </ul>
                    <div class="advanced-footer">
                        <span class="book-it-now  hidden-xs" ng-hide="product.inquiryOnly == true">Book it Online</span>
                        {#<span class="minimum-stay hidden-sm  hidden-xs">[[ product.minstay ]] night minimum stay</span>#}
                        <button type="button" class="btn btn-details visible-xs" ng-click="openProductDetail(product.productid)">View Details</button>
                        <button type="button" class="btn btn-details hide-to-line hidden-xs" ng-click="openProductDetail(product.productid)">View Details</button>
                    </div>
                </div>

                <div class="item-amount">
                    {#<a class="item-like glyphicon glyphicon-heart hide-to-grid hidden-sm  hidden-xs" href="#"></a>#}
                    {#<a href="#" class="item-more-info"><span>+</span> More Info</a>#}
                    <dl ng-show="product.quote">
                        <dt class="hide-to-grid">Total for [[ params.periodOutput ]] nights</dt>
                        <dd class="green hide-to-grid"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
                        <dt class="hide-to-line">Total for [[ params.periodOutput ]] nights</dt>
                        <dd class="green hide-to-line"><span ng-bind-html="currency[params.currency] | html"></span>[[ product.quote | price: 0 ]]</dd>
                        <p class="visible-xs">Min. Night Stay: <span class="">[[ product.minstay ]] </span></p>
                    </dl>
                    <dl class="hide-to-grid" ng-show="product.pricePerNight">
                        <dt>Avg. price per night</dt>
                        <dd><span ng-bind-html="currency[params.currency] | html"></span>[[ product.pricePerNight | price: 0 ]]</dd>
                        <span class="book-it-now  visible-xs" ng-hide="product.inquiryOnly == true">Book it Online</span>
                    </dl>

                    <button type="button" class="btn btn-details hidden-xs hide-to-grid" ng-click="openProductDetail(product.productid)">View Details</button>
                </div>

                <div class="mobile-advanced-info"></div>

                <div class="clearfix"></div>
            </div>
        </div>

        <!--
        <div class="col-md-12">
            <div class="result-item">
                <a class="item-logo-box" href="#"><img alt="" src="images/temp/items/item1.jpg"/></a>

                <div class="item-advanced-box">
                    <h4>Studio in Minami Azabu</h4>
                    <ul class="advanced-info">
                        <li>Sleeps 4</li>
                        <li class="separator">/</li>
                        <li>2 Bedroom(s)</li>
                        <li class="separator">/</li>
                        <li>1 Bathroom(s)</li>
                    </ul>
                    <ul class="advanced-info hide-to-grid">
                        <li>Min Stay: <span>4 Night(s)</span></li>
                        <li class="separator">/</li>
                        <li>Property type: <span>Apartment</span></li>
                    </ul>
                    <ul class="advanced-info hide-to-grid">
                        <li>Managed by <span>Interhome AG - Manager</span></li>
                    </ul>
                    <div class="advanced-footer hide-to-grid">
                        <button type="button" class="btn btn-details">Details</button>
                        <span class="book-it-now hidden-sm  hidden-xs">BOOK IT NOW</span>
                        <span class="minimum-stay hidden-sm  hidden-xs">4 night minimum stay</span>
                    </div>
                </div>

                <div class="item-amount">
                    <a class="item-like glyphicon glyphicon-heart hide-to-grid hidden-sm  hidden-xs" href="#"></a>
                    <a href="#" class="item-more-info"><span>+</span> More Info</a>
                    <dl>
                        <dt class="hide-to-grid">Total for 1 week</dt>
                        <dd class="green">$2,241</dd>
                    </dl>
                    <dl class="hide-to-grid">
                        <dt>Avg. price per night</dt>
                        <dd>$321</dd>
                    </dl>
                </div>

                <div class="mobile-advanced-info"></div>

                <div class="clearfix"></div>
            </div>
        </div>
        -->

    </article>

    <div class="row search-result-pagination" >
        <div class="col-sm-12 text-center">
            <ul class="pagination">
                <li ng-show="pagination.current > 0"><a href="javascript:void(0);" ng-click="pagination.setPage( pagination.current - 1 )">&laquo;</a></li>
                <li ng-hide="pagination.pages==1"  ng-repeat="n in [] | range:pagination.pages" ng-class="{active: pagination.current == n}"><a href="javascript:void(0);" ng-click="pagination.setPage( n )">[[ n + 1 ]]</a></li>
                <li ng-show="pagination.current < pagination.pages -1"><a  href="javascript:void(0);" ng-click="pagination.setPage( pagination.current + 1 )">&raquo;</a></li>
            </ul>
        </div>
    </div>
</div><!-- End Search result -->

<!-- Detail Page -->
<div class="detail-result" ng-show="action=='product_detail'">
    <div class="container">
        <div class="row">
            <div class="col-xs-8 ">
                <h4 ng-bind="product_info.name"></h4>
                <h5 ng-bind="product_info.address"></h5>
            </div>
            <div class="col-xs-4">
                <a href="javascript:void(0);" class="result-back-link" ng-click="backToSearch()">Back to search results</a>
                <a href="javascript:void(0);" class="btn btn-default result-button-link" ng-click="backToSearch()">Back</a>
                <!--
                <a href="javascript:void(0);" ng-hide="products.filtered.length > 0" class="result-back-link" ng-click="backToSearch()">Back to search results</a>
                <a href="javascript:void(0);" ng-hide="products.filtered.length > 0" class="btn btn-default result-button-link" ng-click="backToSearch()">Back</a>
                -->
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8 col-md-8 result-left-column">
                <div class="result-left-column-slider">
                    <div class="large-img"></div>
                    <div class="images-block"></div>
                </div>

                <div id="carousel-example-generic" class="carousel slide result-left-column-slider-mobile" data-ride="carousel">
                    <!-- Indicators -->
                    <ol class="carousel-indicators">
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                        <li data-target="#carousel-example-generic" data-slide-to="3"></li>
                    </ol>

                    <!-- Wrapper for slides -->
                    <div class="carousel-inner">
                        {#<a href="#" class="glyphicon glyphicon-heart"></a>#}
                        <div class="item active">
                            <img src="images/details/image_big.png" alt="...">
                        </div>
                        <div class="item">
                            <img src="images/details/image2_small.jpg" alt="...">
                        </div>
                    </div>

                    <!-- Controls -->
                    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left"></span>
                    </a>
                    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>


                <div check-size class="result-left-column-overview result-block-style" ng-show="product_info.description.length>9">

                    <h4 class="detail-heading">Overview</h4>
                    <div class="content list" >
						<ul check-ul class="overview-list" ng-bind-html="product_info.description | html"></ul>
                    </div>
					<div class="transparent-block" ng-class="{hidden: hide_description}"></div>
					<a ng-class="{hidden: hide_description}"  href="#" class="pull-right overview-read-more"><span class="more">More</span><span class="less">Less</span></a>
					<div class="clearfix"></div>
                </div>

				<div class="result-left-column-overview result-block-style">
					<h4 class="detail-heading">Map</h4>
					<div class="content">
						<gm-map gm-map-id="'googleMap'" gm-center="googleMapCenter" gm-zoom="googleMapZoom" gm-map-options="googleMap.options" class="product-map">
							<gm-markers gm-objects="gogleMap.markers" gm-id="object.id" gm-position="{lat: object.lat, lng: object.lng}"></gm-markers>
						</gm-map>
					</div>	
				</div>

				<div class="result-left-column-overview result-block-style availability">
					<h4 class="detail-heading">Availability</h4>
					<ul class="availability-history">
						<li class="booked">Dates booked: <span></span></li>
						<li class="closed">Unavailable: <span></span></li>
					</ul>
					<div class="clearfix"></div>

					<div class="content ng-binding call" detail-inline-dp ng-model="dpIntervals"></div>
					<div class="clearfix"></div>
				</div>

                <div class="result-block-style" ng-show="product_info.fees.included || product_info.fees.excluded">
                    <div ng-show="product_info.fees.included">
                        <h4 class="detail-heading">Included</h4>
                        <ul>
                            <li ng-repeat="i in product_info.fees.included">[[ i.text ]] <span ng-bind-html="i.currency | html"></span> [[  i.price  ]]</li>
                        </ul>
                    </div>
                    <div ng-show="product_info.fees.excluded">
                        <h4 class="detail-heading">Excluded</h4>
                        <b style="display: block; margin-left: 40px;">*Any extra cost will be charged by the host at the property's currency</b>
                        <b style="display: block; margin: 8px 0px 8px 40px;">** You will be charged in the local currency of this property. All converted amounts are estimates only and are subject to currency exchange.</b><br />
                        <ul>
                            <li ng-repeat="i in product_info.fees.excluded">[[ i.text ]] <span ng-bind-html="i.currency | html"></span> [[  i.price  ]]</li>
                        </ul>
                    </div>
                </div>

                <div class="result-left-column-rates result-block-style">
                    <h4 class="detail-heading">Rates</h4>
                    <div class="product_detail_prices">
                        <table class="tab_rates_rates_table">
                            <thead>
                                <tr class="heading_row">
                                    <td class="first_column" style="width: 30%;">Rate Period</td>
                                    <td>Min price/ Max price</td>
                                    <td class="last_column" style="width: 30%;">Event Minimum Stay</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="data_row" ng-repeat="(key, value) in product_info.prices">
                                    <td class="first_column" style="width: 30%;"><span>[[ value.date_start.substring(0, 10) ]] - [[ value.date_end.substring(0, 10) ]]</span></td>
                                    <td ng-bind-html="value.price | html">[[ value.price ]]</td>
                                    <td class="last_column" style="width: 30%;">[[ value.minstay ]] nights</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--
                <div class="result-left-column-map result-block-style">
                    <h4 class="detail-heading">Map</h4>
                </div>
                -->
            </div>
            <div class="col-lg-4 col-md-4">
                <div class="result-book-panel">
                    <div class="result-book-panel-price result-block-style">
                        <div class="error" ng-show="error">
                            [[ product_info.message ]]
                        </div>
                        <div class="result-book-panel-price-head" ng-hide="error">
                            <h2 ng-hide="product_info.price">Calculating...</h2>
                            <h2 ng-show="product_info.price"><span ng-bind-html="product_info.currency | html"></span> [[ product_info.price | price: 0 ]]</h2>
                            {#<a href="#" class="glyphicon glyphicon-heart"></a>#}
                        </div>
                        <div class="result-book-panel-price-bottom">
                            [[ diff2dates(params.detailCheckInDate, params.detailCheckOutDate); ]] night(s) total
                            <span ng-hide="error || params.detailApiCount < params.detailApiNum">
                                <a href="javascript:void(0);" ng-hide="product_info.inquire == true" ng-click="showBookingWidget();">View Details</a>
                                <a href="javascript:void(0);" ng-hide="product_info.inquire == false" ng-click="showInquireDialog();">View Details</a>
                            </span>
                        </div>
                        <div class="result-book-panel-dates-head" ng-hide="error || params.detailApiCount < params.detailApiNum">
                            Your dates are <span>Available</span>
                        </div>
                        <div class="row ">
                            <div class="col-lg-6 col-sm-6 col-md-12 col-xs-6">
                                <div class="input-group datepicker-box">
                                    <input type="text" ng-model="params.detailCheckInDate" class="form-control" datepicker dp-function="detailDatepickerChanges" dp-check-out="checkOutDateDetail" readonly="readonly" />
                                </div>
                            </div>
                            <div class="col-lg-6 col-sm-6 col-md-12 col-xs-6">
                                <div class="input-group datepicker-box">
                                    <input type="text" ng-model="params.detailCheckOutDate" class="form-control" id="checkOutDateDetail" readonly="readonly" />
                                </div>
                            </div>
                        </div>
                        <div class="result-book-panel-button" ng-hide="error || params.detailApiCount < params.detailApiNum">
                            <a href="javascript:void(0);" ng-hide="product_info.inquire == true" onclick="$('#btn_book_now_detail').attr('disabled', 'disabled').blur(); $('#btn_book_now_detail').find('img').show();" ng-click="showBookingWidget();" id="btn_book_now_detail" class="btn btn-default" style="position: relative;">Book Now
                                <img alt="Loading" src="{{ url('img/preloader.png') }}" class="bp_product_detail_preloader" style="display: none; position: absolute; right: 10px;"></a>
                            <a href="javascript:void(0);" ng-hide="product_info.inquire == false" ng-click="showInquireDialog();" id="btn_email_owner_detail" class="btn btn-default" style="position: relative;">Email Owner</a>
                        </div>
                    </div>
                    <div class="result-info ">
                        <table class="table table-striped">
                            <tr>
                                <td>Sleeps</td>
                                <td>[[ product_info.person ]]</td>
                            </tr>
                            <tr>
                                <td>Bedrooms</td>
                                <td>[[ product_info.bedroom ]]</td>
                            </tr>
                            <tr>
                                <td>Bathrooms</td>
                                <td>[[ product_info.bathroom ]]</td>
                            </tr>
                            <tr>
                                <td>Property Type</td>
                                <td>[[ product_info.propertyType ]]</td>
                            </tr>
                            <tr>
                                <td>Minimum Stay</td>
                                <td>[[ product_info.minstay ]] night(s)</td>
                            </tr>
                            <tr>
                                <td>Property ID</td>
                                <td>[[ product_info.id ]]</td>
                            </tr>
                            <tr ng-show="showCommission">
                                <td>Commission</td>
                                <td>[[ product_info.commission ]]%</td>
                            </tr>
                        </table>
                    </div>
                    <div class="result-amenities result-block-style" ng-show="product_info.amenities">
                        <h4 class="detail-heading">Amenities</h4>
                        <ul>
                            <li ng-repeat="a in product_info.amenities">[[ a ]]</li>
                        </ul>
                    </div>
                    <div class="secure-payment-title result-block-style"
                         ng-show="product_info.cc.mc || product_info.cc.visa || product_info.cc.amex || product_info.cc.dscvr || product_info.cc.jcb">
                        This owner accepts BookingPal's most secure form of payment.
                        <div class="text-center">
                            <img src="{{ url('img/credit_cards/mastercard.png') }}" ng-show="product_info.cc.mc">
                            <img src="{{ url('img/credit_cards/visacard.png') }}" ng-show="product_info.cc.visa">
                            <img src="{{ url('img/credit_cards/amecianexpresscard.png') }}" ng-show="product_info.cc.amex">
                            <img src="{{ url('img/credit_cards/discovercard.png') }}" ng-show="product_info.cc.dscvr">
                            <img src="{{ url('img/credit_cards/jcbcard.png') }}" ng-show="product_info.cc.jcb">
                        </div>
                    </div>
                    <div class="result-cancelation result-block-style" ng-show="product_info.cancellationMessage">
                        <h4 class="detail-heading">Cancelation</h4>
                        <div ng-bind-html="product_info.cancellationMessage | html" ></div>
                    </div>
                    <div class="result-terms result-block-style" ng-show="product_info.checkIn || product_info.checkOut || product_info.terms.url">
                        <h4 class="detail-heading">Terms and conditions</h4>
                        Check in time is [[ product_info.checkIn ]]<br>
                        Check-out time is [[ product_info.checkOut ]]
                        <a ng-href="[[ product_info.terms.url ]]" target="_blank" class="detail-link" ng-show="product_info.terms.type == 'pdf' && product_info.terms.url != ''">Click here to download property terms &amp; conditions</a>
                        <a ng-href="[[ product_info.terms.url ]]" target="_blank" class="detail-link" ng-show="product_info.terms.type != 'pdf' && product_info.terms.url != ''">Click here to view complete property terms &amp; conditions</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div><!-- End Detail Page -->
<div class="push"></div>
</div>

<footer id="footer">
    <div class="container">
        <ul class="footer-menu">
			<li><a href="{{ url('home') }}{{ logo_params }}">Home</a></li>
            <li><a target="_blank" href="{{ url('privacy-policy/html') }}">Privacy Policy</a></li>
            {#<li><a href="#">Terms &amp; Conditions</a></li>#}
            {#<li><a href="#">FAQ’s</a></li>#}
            {#<li><a href="#">Company</a></li>#}
        </ul>
        <div class="copy">&copy; 2015 BookingPal, Inc. All Rights Reserved.</div>

    </div>
</footer>

<!-- POPUP Contact Owner START -->
<div class="popup_window_search_result" id="popup_window_contact_owner" ng-show="showPopupContact">

    <div class="popup_window_search_result_back"></div>
    <div class="popup_window_contact_owner_wrapper">

        <div class="popup_window_heading">
            <div class="popup_heading_text">Contact the Owner</div>
        </div>
        <form name="popupContactForm" class="search_result_form" novalidate>
            <div class="popup_contact_owner_content_wrapper">

                <div class="popup_content_error"></div>

                <div id="inquire_confirmation">
                    <p class="heading">Thank for your inquiry, <span id="inquiry_fn_ln">"First Name" "Last Name"</span>!</p>
                    <p>We've sent your message and you'll find a copy in your own inbox in just a minute.</p>
                    <p>If you don't see an email from mybookingpal within the next 10 minutes, check your spam filter. Not there? Please contact us.</p>
                    <div class="popup_contact_buttons_div">
                        <div class="popup_contact_buttons_wrapper">
                            <div class="popup_close_btn" ng-click="showPopupContact=false">Close</div>
                            <div class="clearer"></div>
                        </div>
                        <div class="clearer"></div>
                    </div>
                </div>
				<!-- TODO: need code review!!!!  -->
				<style type="text/css">
					#popup_window_contact_owner .datepicker-box{
						position: relative;
					}
					#popup_window_contact_owner .calendar{
						top: 26px;
					}
				</style>
                <div id="inquire_form">
                    <div class="popup_content_title">Tell the owner when you would like to travel</div>
                    <div class="popup_content_field_row">
                        <div class="datepicker-box"><input type="text" ng-model="inquire.checkInDate" datepicker dp-function="inquireDatepickerChanges" dp-check-out="contactCheckOutDatepickerField" class="popup_window_input_field popup_window_datepicker_field floater_left" id="contactCheckInDatepickerField" readonly /></div>
                        <div class="datepicker-box"><input type="text" ng-model="inquire.checkOutDate" class="popup_window_input_field popup_window_datepicker_field floater_right" id="contactCheckOutDatepickerField" readonly /></div>
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <div class="contact_pearson_number_div">
                            <div class="contact_pearson_number_label" style="float: left;">Adults</div>
                            <select ng-model="inquire.adults" name="contactAdultsNumber" id="contactAdultsNumber" class="person_number_select_field" style="float: left;">
                                <option ng-repeat="o in inquire.adultsList" ng-selected="[[ o == inquire.adults ]]" value="[[o]]">[[o]]</option>
                            </select>
                            <div class="contact_pearson_number_label">Children</div>
                            <select ng-model="inquire.child" name="inquireChildsNumber" id="inquireChildsNumber" class="person_number_select_field">
                                <option ng-repeat="o in inquire.childList" ng-selected="[[ o == inquire.child ]]" value="[[o]]">[[o]]</option>
                            </select>
                            <div class="clearer"></div>
                        </div>
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="inquire.firstname" name="contactFirstname" id="contactFirstname" type="text" class="popup_window_input_field floater_left" placeholder="First Name" />
                        <input required ng-model="inquire.lastname" name="contactLastname" id="contactLastname" type="text" class="popup_window_input_field floater_right" placeholder="Last Name" />
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="inquire.emailaddress" name="contactEmailaddress" id="contactEmailaddress" type="text" class="popup_window_input_field floater_left" placeholder="Email Address" />
                        <input required ng-model="inquire.phonenumber" name="contactPhonenumber" id="contactPhonenumber" type="text" class="popup_window_input_field floater_right" placeholder="Phone Number" />
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <textarea ng-model="inquire.messageText" id="contactMessagetext" class="popup_window_textarea" placeholder="Message to Owner"></textarea>
                    </div>

                    <div class="popup_contact_terms_text">
                        By clicking "Send Email" you are agreeing to our <a href="javascript:void(0)" onclick="Mybookingpal.goTermsConditions()">Terms &amp; Conditions</a>
                    </div>
                    <div class="popup_dashed_line"></div>

                    <div class="popup_contact_buttons_div">
                        <div class="popup_contact_buttons_wrapper">
                            <div class="popup_close_btn" ng-click="showPopupContact=false">Close</div>
                            <div class="popup_submit_btn" ng-click="submitInquireDialog()">Send Email</div>
                            <div class="clearer"></div>
                        </div>
                        <div class="clearer"></div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
