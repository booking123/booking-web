<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" ng-app="myapp">
<head>
    <title>BookingPal | Search</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    {{ stylesheet_link('css/styleSearch.css') }}

    <!--<link href='http://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,800,700,600,300' rel='stylesheet' type='text/css' />-->
    <script src="//maps.googleapis.com/maps/api/js?sensor=false"></script>

    {{ javascript_include('scripts/inc/jquery-1.9.1.js') }}
    {{ javascript_include('scripts/inc/jquery-ui-1.10.4.custom.js') }}
    {{ javascript_include('scripts/inc/angular.min.js') }}

    {{ javascript_include('scripts/inc/angular-gm.min.js') }}

    {{ javascript_include('scripts/old/config.js') }}
    {{ javascript_include('scripts/old/css_browser_selector.js') }}
    {{ javascript_include('scripts/old/search_functions_angularjs.js') }}
    <!--{{ stylesheet_link('css/styleSearch.css') }}-->
    {{ stylesheet_link('css/jqueryUiForDatepicker.css') }}

    <script type="text/javascript">
        var SITE_URL = '{{ url('') }}',
            API_URL = '{{ config.application.apiUri }}',
            debug = '{{ config.debug }}';

        $(document).ready( function(){
            if ( SITE_URL == "http://razor/" || SITE_URL == "http://mbp_trunk/" ){
                $('#dev_links').show();
            }

            $( "#searchTextValue").keyup(function(){
                $('#searchLocationID').val(0);
                if ( $(this).val().length == 0 ){
                    $('#clear_location').fadeOut('show');
                } else if($(this).val().length == 1) {
                    $('#clear_location').fadeIn('show');
                }
            }).autocomplete({
                source:  "/api/location/getlocations/",
                minLength: 2,
                select: function( event, ui ) {
                    $("#searchTextValue").val( ui.item.value );
                    $("#resultSearchTextValue").val( ui.item.value );
                    $("#searchLocationID").val( ui.item.ID );
                    $("#searchTextValue").blur();
                },
                search: function( event, ui ){
                    if ( $(this).val().length == parseInt( $(this).val()).toString().length && !isNaN(parseInt( $(this).val())) ){
                        return false;
                    }
                }
            });

            $('.search_input_fields input[placeholder]').each( function(){
                if ( $(this).val() == "" && $(this).attr("placeholder") != "" && typeof $(this).attr("placeholder") != "undefined" ){

                    $(this).addClass('plchldr').val($(this).attr("placeholder"));

                    $(this).keyup( function(){
                        if ( $(this).val() != "" ){ $(this).removeClass('plchldr'); } else {  $(this).addClass('plchldr'); }
                    });
                    $(this).focus(function(){
                        if ( $(this).val()==$(this).attr("placeholder")) $(this).val("");
                    });
                    $(this).blur(function(){
                        if( $(this).val()=="") $(this).val($(this).attr("placeholder") );
                        if ( $(this).val() == $(this).attr('placeholder') ){ $(this).addClass('plchldr'); }
                    });
                } else {
                    $(this).removeClass('plchldr');
                }
            });

            // Fix placeholders for ie9
            $("#popup_window_contact_owner input, #popup_window_contact_owner textarea").each(
                function( ){
                    if ( $(this).val() == "" && $(this).attr("placeholder") != "" && typeof $(this).attr("placeholder") != "undefined" ){

                        $(this).addClass('plchldr').val($(this).attr("placeholder"));

                        $(this).keyup( function(){
                            if ( $(this).val() != "" ){ $(this).removeClass('plchldr'); } else {  $(this).addClass('plchldr'); }
                        });
                        $(this).focus(function(){
                            if($(this).val()==$(this).attr("placeholder")) $(this).val("");
                        });
                        $(this).blur(function(){
                            if( $(this).val()=="") $(this).val($(this).attr("placeholder") );
                            if ( $(this).val() == $(this).attr('placeholder') ){ $(this).addClass('plchldr'); }
                        });
                    } else {
                        $(this).removeClass('plchldr');
                    }
                });
            /*$('#searchTextValue').focus( function(){
                $(this).attr({'placeholder': ''});
            }).blur( function(){
                $(this).attr({'placeholder': 'Where are you going?'});
            });*/
        });

        var scope = [];
        //console.log(app);
        /*
        app.run( function ($rootScope) {
            $rootScope.someData = {message: "hello"};
        });
        */
    </script>
</head>
<body id="SearchController"
      style="display: none;"
      ng-controller="SearchController"
      ng-class="{regular_res: resolutionView=='regular', iframe_res: resolutionView=='iframe'}"
      ng-init="init('{{ iframe }}', '{{ checkin }}', '{{ period }}', '{{ location }}', '{{ location_id }}', '{{ currency }}', '{{ adults }}', '{{ product_id }}', '{{ page }}', '{{ perpage }}', '{{ display_inquire }}')">

{{ javascript_include('js/widget.js') }}
<script>
    Mybookingpal.setParams({
        'pos': '{{ pos }}',
        'currency': 'USD'
    });
</script>

<!--
<div class="popup_window_search_result_payment" id="popup_window_book_step2">
    <div class="popup_window_search_result_back"></div>
    <div class="popup_book_step2_wrapper">
        <div style="position:relative;"><a href="javascript:void(0);" onclick="Mybookingpal.close();" class="close">&nbsp;</a></div>
        <div class="popup_window_heading"><div class="popup_heading_text">Confirmation</div></div>
        <div class="popup_book_step2_content_wrapper">
            <p class="heading">Thanks <span id="razor_step3_username">Alex</span>! Your booking is now confirmed.</p>
            <ul class="confirm_list">
                <li>We sent the confirmation email to <b id="razor_step3_userpass">alexayden@gmail.com</b></li>
                <li>We notified <b id="razor_step3_pmname">Name of property or Management</b> of your upcoming stay.</li>
                <li>We added your booking to our secure, online booking self service tool.</li>
            </ul>
            <p>&nbsp;</p>
            <p class="heading">Check your details</p>
            <div class="round-box">
                <p><b>Name of property or Management</b></p>
                <table>
                    <tr><th>Booking number</th><td id="razor_step3_bnumber">123.456.7890</td></tr>
                    <tr><th>PIN Code</th><td id="razor_step3_pincode">2920</td></tr>
                    <tr><th>Email</th><td id="razor_step3_email">123.456.7890</td></tr>
                    <tr><th>Booking Details</th><td id="razor_step3_details">1 night, 1 room</td></tr>
                    <tr><th>Check-in Thursday</th><td id="razor_step3_checkin">November 13, 2014 (from 3:00 PM)</td></tr>
                    <tr><th>Check-out Friday</th><td id="razor_step3_checkout">November 14, 2014 (until 12:00 PM)</td></tr>
                    <tr><th>Today you'll Pay</th><td>US <span id="razor_step3_firstpayment">$0</span> You'll pay when you stay at <b>name of property or Mgmt</b></td></tr>
                    <tr><th class="green">Total Room Price:</th>
                        <td class="trp">
                            <b class="green" id="razor_step3_totalprice">$299</b>
                            <div class="razor_step3_taxlist">
                                <small>Tax 14% not included</small>
                                <small>City Tax (1.50%) not included</small>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
-->
<a href="#" ng-click="openResultView(property_detail.id, book.checkInDate, book.checkOutDate )" id="reload_detail" style="display: none;">&nbsp;</a>

<!-- Search panel START -->
<div class="wrapper_wide">
    <div class="content_wide_width">
        <div class="header" id="pageHeaderWithLogo" ng-class="{header_fixed: resultView.showFixedHeader && showPage=='result_page'}">
            <div class="header_main_content">
                <img src="{{ logo }}" class="logo_img" ng-click="onLogoClick()" />
                <div class="over_listings">Over 160,000 listings</div>
                <div class="stylized_select_field currency_select_field">
                    <div class="stylized_select_showed_field" ng-click="search.currency.toggle();$event.stopPropagation();" >[[search.currency.selectedName]]</div>
                    <ul ng-show="search.currency.view" class="stylized_search_field_list">
                        <li ng-repeat="oneRow in search.currency.currencyList" ng-class="{selected_option: search.currency.selectedId==oneRow.id}"
                            ng-click="search.currency.select(oneRow.id)">[[oneRow.name]]
                        </li>
                    </ul>
                </div>
                <div class="clearer" ></div>
            </div>
        </div>

        <div class="search_panel">
            <div class="search_panel_wrapper">
                <div class="search_input_fields">
                    <input ng-model="search.searchValue" name="searchTextValue" id="searchTextValue" type="text" class="search_main_text_field input_border input_field_placeholder" placeholder="Where are you going?" ng-blur="getLocation()" />
                    <span class="clear_location"><span ng-click="clearLocation();" id="clear_location"></span></span>
                    <input type="hidden" ng-model="search.searchLocationID" name="searchLocationID" id="searchLocationID" />

                    <input type="text" ng-model="search.checkInDate" datepicker datepicker-class="datepicker_search_search_panel" date-field-in-range="start" connected-date-field-id-array="search.arrayOfCheckOutFieldsId" connected-date-field-value="search.checkOutDate" class="search_calendar_btn search_input_btn input_border search_check_in_field input_field_placeholder" id="searchCheckInDatepickerField" readonly placeholder="Date" />

                    <div class="stylized_select_field search_lengthStay_select_field input_border">
                        <div class="stylized_select_showed_field" ng-click="search.lengthStay.toggle();$event.stopPropagation();" href="#" ng-class="{stylized_select_placeholder: search.lengthStay.showNameValue()=='Length of Stay'}">[[search.lengthStay.showNameValue()]]</div>
                        <ul ng-show="search.lengthStay.view" class="stylized_search_field_list">
                            <li ng-repeat="oneRow in search.lengthStay.lengthStayList" ng-class="{selected_option: search.lengthStay.selectedId==oneRow.id}"
                                ng-click="search.lengthStay.select(oneRow.id)">[[oneRow.name]]
                            </li>
                        </ul>
                    </div>
                    <div class="stylized_select_field search_guest_select_field input_border">
                        <div class="stylized_select_showed_field" ng-click="search.guests.toggle();$event.stopPropagation();" href="#" ng-class="{stylized_select_placeholder: search.guests.showNameValue()=='Guests'}">[[search.guests.showNameValue()]]</div>
                        <ul ng-show="search.guests.view" class="stylized_search_field_list">
                            <li ng-repeat="oneRow in search.guests.guestList" ng-class="{selected_option: search.guests.selectedId==oneRow.id}"
                                ng-click="search.guests.select(oneRow.id)">[[ oneRow.name ]]
                            </li>
                        </ul>
                    </div>


                    <div class="search_btn_div" id="search_button" ng-click="processSearch()">
                        <div class="search_bth_content">Search</div>
                        <div class="search_bth_icon"></div>
                        <div class="progress"></div>
                        <div class="clearer"></div>
                    </div>
                    <div class="clearer"></div>
                </div>

                <div class="search_panel_botom_line">
                    <div class="search_panel_show_all_properties_div">
                        <label>
                            <input type="checkbox" ng-model="search.checkboxShowAllAvailableProperties" ng-true-value="true" ng-false-value="false" id="searchShowAllAvailableProperties" name="searchShowAllAvailableProperties" class="show_all_properties_checkbox"  />
                            <span class="show_all_properties_text">Show all available properties</span>
                        </label>
                    </div>
                    <div ng-click="showHideAdvancedSearchOption()" class="search_advanced_div">
                        <div class="search_advanced_option_icon" ng-class="{search_advanced_option_icon_minus: showAdvancedSearchOption}"></div>
                        <div class="search_advanced_option_text">Advanced Search Options</div>
                        <div class="clearer"></div>
                    </div>
                    <div class="clearer"></div>
                </div>
            </div>
        </div>


    <div class="search_advanced_panel_wrapper" style="display: none;" id="searchAdvancedPanelDiv">
        <div class="search_advanced_panel_arrow_div"></div>
            <div class="search_advanced_panel">
                <div class="search_advanced_panel_content_wrapper">
                    <div class="search_advanced_left_fields">
                        <div class="search_advanced_panel_left_row">
                            <div class="search_advanced_panel_label_left">Property Type: </div>
                            <div class="search_advanced_panel_field_div">
                                <div class="stylized_select_field search_advanced_select_field">
                                    <div class="stylized_select_showed_field" ng-click="search.propertyType.toggle();$event.stopPropagation();" >[[ search.propertyType.selectedName ]]</div>
                                    <ul ng-show="search.propertyType.view" class="stylized_search_field_list">
                                        <li ng-repeat="oneRow in search.propertyType.propertyTypeList" ng-class="{selected_option: search.propertyType.selectedId==oneRow.id}"
                                            ng-click="search.propertyType.select(oneRow.id)">[[oneRow.name]]
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row">
                            <div class="search_advanced_panel_label_left">Number of Bedrooms: </div>
                            <div class="search_advanced_panel_field_div">
                                <div class="stylized_select_field search_advanced_select_field_small">
                                    <div class="stylized_select_showed_field" ng-click="search.bedroomNumber.toggle();$event.stopPropagation();" >[[search.bedroomNumber.selectedName]]</div>
                                    <ul ng-show="search.bedroomNumber.view" class="stylized_search_field_list">
                                        <li ng-repeat="oneRow in search.bedroomNumber.bedroomNumberList" ng-class="{selected_option: search.bedroomNumber.selectedId==oneRow.id}"
                                            ng-click="search.bedroomNumber.select(oneRow.id)">[[oneRow.name]]
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row">
                            <div class="search_advanced_panel_label_left">Number of Bathrooms: </div>
                            <div class="search_advanced_panel_field_div">
                                <div class="stylized_select_field search_advanced_select_field_small">
                                    <div class="stylized_select_showed_field" ng-click="search.bathroomNumber.toggle();$event.stopPropagation();" >[[search.bathroomNumber.selectedName]]</div>
                                    <ul ng-show="search.bathroomNumber.view" class="stylized_search_field_list">
                                        <li ng-repeat="oneRow in search.bathroomNumber.bathroomNumberList" ng-class="{selected_option: search.bathroomNumber.selectedId==oneRow.id}"
                                            ng-click="search.bathroomNumber.select(oneRow.id)">[[oneRow.name]]
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row">
                            <div class="search_advanced_panel_label_left">Price Range U.S.: </div>
                            <div class="search_advanced_panel_field_div">
                                <input ng-model="search.minPrice" name="searchMininumPrice" id="searchMininumPrice" type="number" class="search_advanced_price_field_small floater_left" placeholder="Min"/>
                                <input ng-model="search.maxPrice" name="searchMaximumPrice" id="searchMaximumPrice" type="number" class="search_advanced_price_field_small floater_left" placeholder="Max"/>
                                <div class="clearer"></div>
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row">
                            <div class="search_advanced_panel_label_left">Property ID: </div>
                            <div class="search_advanced_panel_field_div">
                                <input ng-model="search.productID" name="searchProductID" id="searchProductID" type="number" class="search_advanced_text_field floater_left" placeholder="ID"/>
                                <div class="clearer"></div>
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row" style="display: none;">
                            <div class="search_advanced_panel_label_left">Keywords: </div>
                            <div class="search_advanced_panel_field_div">
                                <input ng-model="search.keywords" name="searchKeywords" id="searchKeywords" type="text" class="search_advanced_text_field"/>
                            </div>
                            <div class="clearer"></div>
                        </div>
                        <div class="search_advanced_panel_left_row_last" style="display: none;">
                            <div class="search_advanced_panel_label_left">Neighborhood: </div>
                            <div class="search_advanced_panel_field_div">
                                <select ng-model="search.neighborhood" ng-options="neighborhood.id as neighborhood.name for neighborhood in neighborhoodList" name="searchNeighborhood" id="searchNeighborhood" class="search_advanced_select_field">
                                </select>
                            </div>
                            <div class="clearer"></div>
                        </div>

                        <div class="search_advanced_panel_left_row_last"><label><input type="checkbox" ng-model="search.onlyBooking" name="only_booking" id="only_booking">Instant booking online</label></div>
                    </div>

                    <div class="search_advanced_right_fields">
                        <div class="search_advanced_checkbox_title"><strong>Ammenities</strong> (Select all that apply)</div>
                            <div class="search_advanced_checkbox_wrapper" style="height: auto;">
                                <div class="search_advanced_checkbox_content">
                                    <div class="search_main_checkboxes_with_button_div">

                                        <div class="search_main_checkboxes_div">
                                            <div class="search_checkbox_one_option search_advanced_checkbox_first_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxDryCleaning" id="searchDryCleaning" name="searchDryCleaning" class="search_advanced_checkbox_field" value="HAC96" ng-true-value="HAC96" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Dry Cleaning</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_second_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxElevators" id="searchElevators" name="searchElevators" class="search_advanced_checkbox_field" value="HAC33" ng-true-value="HAC33" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Elevators</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_third_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxFireplace" id="searchFireplace" name="searchFireplace" class="search_advanced_checkbox_field" value="RMA41" ng-true-value="RMA41" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Fireplace</span>
                                                </label>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>

                                        <div class="search_main_checkboxes_div">
                                            <div class="search_checkbox_one_option search_advanced_checkbox_first_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxBreakfastFree" id="searchBreakfastFree" name="searchBreakfastFree" class="search_advanced_checkbox_field" value="HAC227" ng-true-value="HAC227" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Free Breakfast</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_second_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxInternetFree" id="searchInternetFree" name="searchInternetFree" class="search_advanced_checkbox_field" value="HAC222" ng-true-value="HAC222" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Free Internet</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_third_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxKitchen" id="searchKitchen" name="searchKitchen" class="search_advanced_checkbox_field" value="RMA59" ng-true-value="RMA59" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Kitchen</span>
                                                </label>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>

                                        <div class="search_main_checkboxes_div">
                                            <div class="search_checkbox_one_option search_advanced_checkbox_first_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxParking" id="searchParking" name="searchParking" class="search_advanced_checkbox_field" value="HAC68" ng-true-value="HAC68" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Parking</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_second_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxPool" id="searchPool" name="searchPool" class="search_advanced_checkbox_field" value="HAC71" ng-true-value="HAC71" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Pool</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_third_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxTV" id="searchTV" name="searchTV" class="search_advanced_checkbox_field" value="RMA251" ng-true-value="RMA251" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">TV</span>
                                                </label>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>

                                        <div class="search_main_checkboxes_div">
                                            <div class="search_checkbox_one_option search_advanced_checkbox_first_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxWashingMachine" id="searchWashingMachine" name="searchWashingMachine" class="search_advanced_checkbox_field" value="RMA149" ng-true-value="RMA149" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">Washing Machine</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_second_column">
                                                <label>
                                                    <input type="checkbox" ng-model="search.checkboxWiFiHotspot" id="searchWiFiHotspot" name="searchWiFiHotspot" class="search_advanced_checkbox_field" value="EQP55" ng-true-value="EQP55" ng-false-value="false" />
                                                    <span class="search_advanced_checkbox_label">WiFi Hotspot</span>
                                                </label>
                                            </div>
                                            <div class="search_checkbox_one_option search_advanced_checkbox_third_column"></div>
                                            <div class="clearer"></div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    <div class="clearer"></div>
                </div>
                <div class="search_advanced_panel_bottom_line">
                    <div class="search_advanced_close_btn" ng-click="filterProducts()">Apply Filters</div>
                    <div class="search_advanced_cancel_link" ng-click="cancelAdvancedSearchFilters()" >Cancel</div>
                    <div class="clearer"></div>
                </div>
            </div>
        </div>

    </div>
</div>
<!-- Search panel END -->

<div id="dev_links" style="display: none;">
    <a href="javascript:void(0);" onclick="Mybookingpal.showQuote(15176, '06/19/2014', '06/23/2014');">Test popup</a>
    <a href="javascript:void(0);" ng-click="openResultView(94651, '', '');">Open result view</a>
    <a href="javascript:void(0);" ng-click="showInquireDialog('20/11/2014', '24/11/2014', 3, 94651);">showInquireDialog</a>

    <a href="#" ng-click="fillTestData()">Fill data</a>
</div>

<div id="search_loading">
    <img src="{{ url('img/BP_loader.gif') }}" alt="search loading" />
</div>

<div class="wrapper_wide" ng-if="search.noResult == true">
    <div class="content_wide_width">
        <h1 style="text-align: center;">No results</h1>
    </div>
</div>

<div class="alert alert-danger ng-hide" ng-show="page.is_error && {{ config.debug }}" style="display: none;">
    <b>Error!</b> [[ page.message ]]
</div>

<!-- Home Page START -->
<div id="homePage" ng-show="showPage=='home_page'">
    <div class="wrapper_wide">
        <div class="content_wide_width">
            <div class="home_page_content">
                <div class="home_page_menu_div">
                    <div class="home_page_menu_section_div" id="popularCitiesMenuSection">
                        <div class="home_page_menu_section_title">Popular Cities</div>
                        <ul class="home_page_menu_items">
                            <li><a href="{{ url('search/?location=Amsterdam' ~ url_params ~ '#search') }}">Amsterdam</a></li>
                            <li><a href="{{ url('search/?location=Berlin' ~ url_params ~ '#search') }}">Berlin</a></li>
                            <li><a href="{{ url('search/?location=Brussel' ~ url_params ~ '#search') }}">Brussel</a></li>
                            <li><a href="{{ url('search/?location=Budapest' ~ url_params ~ '#search') }}">Budapest</a></li>
                            <li><a href="{{ url('search/?location=Dublin' ~ url_params ~ '#search') }}">Dublin</a></li>
                            <li><a href="{{ url('search/?location=Frankfurt' ~ url_params ~ '#search') }}">Frankfurt</a></li>
                            <li><a href="{{ url('search/?location=London' ~ url_params ~ '#search') }}">London</a></li>
                            <li><a href="{{ url('search/?location=Madrid' ~ url_params ~ '#search') }}">Madrid</a></li>
                            <li><a href="{{ url('search/?location=München' ~ url_params ~ '#search') }}">Munich</a></li>
                            <li><a href="{{ url('search/?location=Paris' ~ url_params ~ '#search') }}">Paris</a></li>
                            <li><a href="{{ url('search/?location=Praha' ~ url_params ~ '#search') }}">Prague</a></li>
                            <li><a href="{{ url('search/?location=Roma' ~ url_params ~ '#search') }}">Rome</a></li>
                            <li><a href="{{ url('search/?location=Rotterdam' ~ url_params ~ '#search') }}">Rotterdam</a></li>
                            <li><a href="{{ url('search/?location=Vienna' ~ url_params ~ '#search') }}">Vienna</a></li>
                            <li><a href="{{ url('search/?location=Warszawa' ~ url_params ~ '#search') }}">Warsaw</a></li>
                            <li><a href="{{ url('search/?location=Zurich' ~ url_params ~ '#search') }}">Zurich</a></li>
                        </ul>
                    </div>
                    <div class="home_page_menu_section_div" id="topDestinationsMenuSection">
                        <div class="home_page_menu_section_title">Top Destinations</div>
                        <ul class="home_page_menu_items">
                            <li><a href="{{ url('search/?location=Athínai' ~ url_params ~ '#search') }}">Athens</a></li>
                            <li><a href="{{ url('search/?location=Barcelona' ~ url_params ~ '#search') }}">Barcelona</a></li>
                            <li><a href="{{ url('search/?location=Cape Town' ~ url_params ~ '#search') }}">Cape Town</a></li>
                            <li><a href="{{ url('search/?location=Istanbul' ~ url_params ~ '#search') }}">Istanbul</a></li>
                            <li><a href="{{ url('search/?location=Lake Tahoe' ~ url_params ~ '#search') }}">Lake Tahoe</a></li>
                            <li><a href="{{ url('search/?location=Lisboa' ~ url_params ~ '#search') }}">Lisbon</a></li>
                            <li><a href="{{ url('search/?location=Milan' ~ url_params ~ '#search') }}">Milan</a></li>
                            <li><a href="{{ url('search/?location=Napoli' ~ url_params ~ '#search') }}">Naples</a></li>
                            <li><a href="{{ url('search/?location=San Diego' ~ url_params ~ '#search') }}">San Diego</a></li>
                            <li><a href="{{ url('search/?location=Sevilla' ~ url_params ~ '#search') }}">Seville</a></li>
                            <li><a href="{{ url('search/?location=Valencia' ~ url_params ~ '#search') }}">Valencia</a></li>
                        </ul>
                    </div>
                </div>
                <div class="home_page_images_div">
                    <div class="home_page_images_first_row">
                        <div class="l_item"><a href="{{ url('search/?location=Amsterdam' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/london.jpg') }}" alt="" /><div class="lbl">Amsterdam</div></a></div>
                        <div class="r_item"><a href="{{ url('search/?location=Istanbul' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/istanbul.jpg') }}" alt="" /><div class="lbl">Istanbul</div></a></div>
                        <div class="clearer"></div>
                    </div>
                    <div class="home_page_images_second_row">
                        <div class="l_item"><a href="{{ url('search/?location=Paris' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/paris.jpg') }}" alt="" /><div class="lbl">Paris</div></a></div>
                        <div class="r_item_1"><a href="{{ url('search/?location=San Diego' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/san-diego.jpg') }}" alt="" /><div class="lbl">San Diego</div></a></div>
                        <div class="r_item_2"><a href="{{ url('search/?location=Lake Tahoe' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/lake-tahoe.jpg') }}" alt="" /><div class="lbl">Lake Tahoe</div></a></div>
                        <div class="clearer"></div>
                    </div>
                    <div class="home_page_images_third_row">
                        <div class="l_item"><a href="{{ url('search/?location=Barcelona' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/barcelona.jpg') }}" alt="" /><div class="lbl">Barcelona</div></a></div>
                        <div class="r_item"><a href="{{ url('search/?location=Roma' ~ url_params ~ '#search') }}"><img src="{{ url('img/cities/rome.jpg') }}" alt="" /><div class="lbl">Rome</div></a></div>
                        <div class="clearer"></div>
                    </div>
                    <!--
                    <div class="home_page_images_first_row">
                        <div class="home_page_image_wrapper home_page_image_wrapper_first_row_left"><img src="{{ url('img/destinations/amsterdam.png') }}" class="home_page_image" />    </div>
                        <div class="home_page_image_wrapper home_page_image_wrapper_first_row_right"><img src="{{ url('img/destinations/san_francisco.png') }}" class="home_page_image" /></div>
                        <div class="clearer"></div>
                    </div>
                    <div class="home_page_images_second_row">
                        <div class="home_page_image_wrapper home_page_image_wrapper_second_row_left"><img src="{{ url('img/destinations/france.png') }}" class="home_page_image" /></div>
                        <div class="home_page_image_second_row_right">
                            <div class="home_page_image_wrapper home_page_image_wrapper_second_row_right home_page_image_wrapper_second_row_right_top"><img src="{{ url('img/destinations/venice.png') }}" class="home_page_image" /></div>
                            <div class="home_page_image_wrapper home_page_image_wrapper_second_row_right"><img src="{{ url('img/destinations/sydney.png') }}" class="home_page_image" /></div>
                        </div>
                        <div class="clearer"></div>
                    </div>
                    <div class="home_page_images_third_row">
                        <div class="home_page_image_wrapper home_page_image_wrapper_third_row_left"><img src="{{ url('img/destinations/new_york.png') }}" class="home_page_image" /></div>
                        <div class="home_page_image_wrapper home_page_image_wrapper_third_row_right"><img src="{{ url('img/destinations/london.png') }}" class="home_page_image" /></div>
                        <div class="clearer"></div>
                    </div>
                    <div class="home_page_images_fourth_row home_page_image_wrapper" ng-show="resolutionView=='iframe'"><img src="{{ url('img/destinations/portugal.png') }}" class="home_page_image" /></div>
                    -->
                </div>
                <div class="clearer"></div>
                <div class="home_page_bottom_line"></div>
            </div>
        </div>
    </div>
</div>
<!-- Home Page END -->

<!-- Search Page START -->
<div id="searchPage" ng-show="showPage=='search_page' && search.products_filtered.length > 0" class="ng-hide">
    <div class="wrapper_wide">
        <div class="content_wide_width">

            <style>.map_view{visibility: hidden;}</style>

            <div class="results_title_with_top_pagination_div">
                <div class="results_title_div">
                    <div style="position: relative;">
                        <label style="position: absolute; top: -2px; right: 0px;"><input type="checkbox" ng-model="search.onlyBooking" ng-change="filterProducts()">Instant booking online</label>
                    </div>
                    <div class="results_main_title_div"><span id="results_main_title_location"></span> Short Term Rentals, Nightly and Weekly Rooms, Houses and Apartments</div>

                    <div class="results_pagination_row"  ng-class="searchResultsTabView">
                        <div class="results_title_with_pagination_data" ng-show="search.products_filtered.length > 0">
                            Displaying properties <strong>[[ paginator.cur_page * paginator.per_page + 1 ]] - [[ ((paginator.cur_page + 1) * paginator.per_page <= search.products_filtered.length) ? (paginator.cur_page + 1) * paginator.per_page : search.products_filtered.length ]] </strong> of <strong>[[ search.products_filtered.length ]] in total</strong>
                        </div>

                        <div class="results_pagination_top_btn_div">
                            <div ng-hide="paginator.cur_page == 0"  ng-click="setPagination( paginator.cur_page - 1 )" class="results_pagination_previous_top_btn margin_right_10 floater_left"></div>
                            <div ng-hide="(paginator.cur_page == paginator.pages - 1) || (paginator.cur_page == 0 && paginator.pages == 0)" ng-click="setPagination( paginator.cur_page + 1 )" class="results_pagination_next_top_btn margin_right_10 floater_left"></div>
                            <div class="clearer"></div>
                        </div>

                        <div class="clearer"></div>
                    </div>
                </div>
            </div>

            <div class="results_choose_view_div">
                <div class="sort_by_div">
                    <div class="sort_by_label">Sort by:</div>
                    
                    <div class="stylized_select_field sort_by_select_field">
                        <div class="stylized_select_showed_field" ng-click="search.sortBy.toggle();$event.stopPropagation();" >[[search.sortBy.selectedName]]</div>
                        <ul ng-show="search.sortBy.view" class="stylized_search_field_list">
                            <li ng-repeat="oneRow in search.sortBy.sortByList" ng-class="{selected_option: search.sortBy.selectedId==oneRow.id}"
                                ng-click="search.sortBy.select(oneRow.id)">[[oneRow.name]]
                            </li>
                        </ul>
                    </div>
                    
                    <div class="clearer"></div>
                </div>

                <div class="choose_view_option_div">
                    <div ng-click="searchResultsTabView='box_view'" ng-class="{result_choose_view_btn_selected: searchResultsTabView=='box_view'}" class="result_choose_view_btn result_box_view_btn"></div>
                    <div ng-click="searchResultsTabView='list_view'" ng-class="{result_choose_view_btn_selected: searchResultsTabView=='list_view'}" class="result_choose_view_btn result_list_view_btn"></div>
                    <div ng-click="triggerTabs('map_view')" ng-class="{result_choose_view_btn_selected: searchResultsTabView=='map_view'}" class="result_choose_view_btn result_map_view_btn"></div>
                    <div class="clearer"></div>
                </div>

                <div class="clearer"></div>
            </div>

            <div class="search_results_div">
                <div ng-show="viewTab('list_view')" class="search_results_list_view_div ng-hide">
                      
                    <div ng-if="search.products_filtered.length > 0">
                        <div class="search_result_type_header search_result_exact_matches" ng-show="page.show_exact">
                            <span class="search_result_type_header_text">Exact Matches</span>
                        </div>
                    
                        <div ng-repeat="product in search.products_filtered | startFrom:paginator.cur_page*paginator.per_page | limitTo:paginator.per_page"
                             ng-if="product.exactmatch == true"
                             class="one_search_result_list_view_with_separator">

                            <div class="one_search_result_list_view">
                                <div class="one_search_result_list_view_img_border_wrapper">
                                    <div class="one_search_result_list_view_img_div" ng-click="openResultView( product.productid, '', '' )">
                                        <img src="[[product.pictureLocation]]" set-image-size resolution-view="resolutionView" regular-min-height="122" regular-min-width="157" iframe-min-height="137" iframe-min-width="177" />
                                        <div class="one_search_result_list_view_img_icon_div"></div>
                                    </div>
                                    <div class="one_search_result_list_view_img_number_text">[[ product.picturesQuantity ]] Photo(s)</div>
                                </div>
                                <div class="one_search_result_list_view_info_div">
                                    <div class="one_search_result_list_view_info_div_wrapper">
                                        <div class="one_search_result_list_view_info_heading">
                                            <div class="one_search_result_list_view_info_heading_left">
                                                <div class="one_search_result_list_view_title" ng-click="openResultView(product.productid, '', '')">[[ product.productname ]]</div>
                                                <div class="one_search_result_list_view_subtitle" ng-show="product.address != ''">[[ product.address  ]]</div>
                                            </div>
                                            <div class="one_search_result_list_view_info_heading_right" ng-show="product.rack">
                                                <div class="one_search_result_list_view_price"><small>Total for [[ search.lengthStay.selectedName ]]</small> <span ng-bind-html="product.currency | get_html"></span>[[ priceFormat(product.quote, true) ]]</div>
                                                <div class="clearer"></div>
                                                <div class="one_search_result_list_view_price_per_label">Average price per night: <span ng-bind-html="product.currency | get_html"></span> [[ priceFormat(pricePerNight(product.checkin, product.checkout, product.quote ), true) ]]</div>
                                                <div class="clearer"></div>
                                                <div ng-hide="product.inquiryOnly == true" style="float: right; margin-top: 10px; display: inline-block; padding: 3px 5px; background: #398126; color: #FFF; font-size: 10px;">Book it now</div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="one_search_result_list_view_info_content_div">
                                            <div class="one_search_result_list_view_info_labels_wrapper">
                                                <div class="one_search_result_list_view_info_labels_left_column">
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.guests">Sleeps: <span class="one_search_result_info_value">[[ product.guests ]]</span></div>
                                                    <div class="one_search_result_list_view_info_label_div">Bedrooms: <span class="one_search_result_info_value">[[ product.bedroom ]]</span></div>
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.bathroom">Bathrooms: <span class="one_search_result_info_value">[[ product.bathroom ]]</span></div>
                                                </div>
                                                <div class="one_search_result_list_view_info_labels_right_column">
                                                    <div ng-hide="product.minstay == ''" class="one_search_result_list_view_info_label_div">Min-Stay: <span class="one_search_result_info_value">[[ product.minstay ]] Night(s)</span></div>
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.productClassType">Property type: <span class="one_search_result_info_value">[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] ]]</span></div>
                                                    <div ng-hide="product.managerName == ''" class="one_search_result_list_view_info_label_div">Managed by: <span class="one_search_result_info_value">[[ product.managerName ]]</span></div>
                                                    <div ng-show="showCommission" class="one_search_result_list_view_info_label_div">Commission: <span class="one_search_result_info_value"> [[ product.agentCommission ]]%</span></div>
                                                </div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="one_search_result_list_view_info_right">
                                                <div class="one_search_result_list_view_book_now_btn_div search_result_book_now_btn" ng-click="openResultView(product.productid, '', '')">Details</div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="one_search_result_list_view_separator"></div>
                        </div>


                        <div class="search_result_type_header search_result_suggested_properties" ng-show="page.show_suggested">
                            <span class="search_result_type_header_text">Suggested Properties</span>
                        </div>

                        <div ng-repeat="product in search.products_filtered | startFrom:paginator.cur_page*paginator.per_page | limitTo:paginator.per_page"
                             ng-if="product.exactmatch == false"
                             class="one_search_result_list_view_with_separator">
                            <div  class="one_search_result_list_view">
                                <div class="one_search_result_list_view_img_border_wrapper">
                                    <div class="one_search_result_list_view_img_div" ng-click="openResultView( product.productid, '', '' )">
                                        <img src="[[product.pictureLocation]]" set-image-size resolution-view="resolutionView" regular-min-height="122" regular-min-width="157" iframe-min-height="137" iframe-min-width="177" />
                                        <div class="one_search_result_list_view_img_icon_div"></div>
                                    </div>
                                    <div class="one_search_result_list_view_img_number_text">[[ product.picturesQuantity ]] Photo(s)</div>
                                </div>
                                <div class="one_search_result_list_view_info_div">
                                    <div class="one_search_result_list_view_info_div_wrapper">
                                        <div class="one_search_result_list_view_info_heading">
                                            <div class="one_search_result_list_view_info_heading_left">
                                                <div class="one_search_result_list_view_title" ng-click="openResultView(product.productid, '', '')">[[ product.productname ]]</div>
                                                <div class="one_search_result_list_view_subtitle" ng-show="product.address != ''">[[ product.address  ]]</div>
                                            </div>
                                            <div class="one_search_result_list_view_info_heading_right" ng-show="product.rack">
                                                <div class="one_search_result_list_view_price"><small>Total for [[ search.lengthStay.selectedName ]]</small> <span ng-bind-html="product.currency | get_html"></span>[[ priceFormat(product.quote, true) ]]</div>
                                                <div class="clearer"></div>
                                                <div class="one_search_result_list_view_price_per_label">Average price per night: <span ng-bind-html="product.currency | get_html"></span> [[ priceFormat(pricePerNight(product.checkin, product.checkout, product.quote ), true) ]]</div>
                                                <div class="clearer"></div>
                                                <div ng-hide="product.inquiryOnly == true" style="float: right; margin-top: 10px; display: inline-block; padding: 3px 5px; background: #398126; color: #FFF; font-size: 10px;">Book it now</div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="one_search_result_list_view_info_content_div">
                                            <div class="one_search_result_list_view_info_labels_wrapper">
                                                <div class="one_search_result_list_view_info_labels_left_column">
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.guests">Sleeps: <span class="one_search_result_info_value">[[ product.guests ]]</span></div>
                                                    <div class="one_search_result_list_view_info_label_div">Bedrooms: <span class="one_search_result_info_value">[[ product.bedroom ]]</span></div>
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.bathroom">Bathrooms: <span class="one_search_result_info_value">[[ product.bathroom ]]</span></div>
                                                </div>
                                                <div class="one_search_result_list_view_info_labels_right_column">
                                                    <div  ng-class="product.suggestedby.indexOf('minstay') != -1 ? 'suggested_minstay' : ''" class="one_search_result_list_view_info_label_div">Min-Stay: <span class="one_search_result_info_value">[[ product.minstay ]] Night(s)</span></div>
                                                    <div class="one_search_result_list_view_info_label_div" ng-show="product.productClassType">Property type: <span class="one_search_result_info_value">[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] ]]</span></div>
                                                    <div ng-hide="product.managerName == ''" class="one_search_result_list_view_info_label_div">Managed by: <span class="one_search_result_info_value">[[ product.managerName ]]</span></div>
                                                    <div class="one_search_result_list_view_info_label_div" ng-class="product.suggestedby.indexOf('checkinday') != -1 ? 'suggested_minstay' : ''" ng-show="product.suggestedby.indexOf('checkinday') != -1">Checkin day: <strong>[[ product.CheckInDayRequired ]]</strong></div>
                                                    <div ng-show="showCommission" class="one_search_result_list_view_info_label_div">Commission: <span class="one_search_result_info_value"> [[ product.agentCommission ]]%</span></div>
                                                </div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="one_search_result_list_view_info_right">
                                                <div class="one_search_result_list_view_book_now_btn_div search_result_book_now_btn" ng-click="openResultView(product.productid, '', '')">Details</div>
                                                <div class="clearer"></div>
                                            </div>
                                            <div class="clearer"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearer"></div>
                            </div>
                            <div class="one_search_result_list_view_separator"></div>
                        </div>
                        
                    </div>
                </div>

                <div ng-show="viewTab('box_view')" class="search_results_box_view_div ng-hide">

                    <div class="search_result_type_header search_result_exact_matches" ng-show="page.show_exact">
                        <span class="search_result_type_header_text">Exact Matches</span>
                    </div>

                    <div style="margin-right: -26px;">
                        <div ng-repeat="(key, product) in search.products_filtered | startFrom:paginator.cur_page*paginator.per_page | limitTo:paginator.per_page"
                             ng-if="product.exactmatch == true"
                             class="one_search_result_box_view one_search_result_box_view_left">
                            <div class="one_search_result_box_view_wrapper">
                                <div class="one_search_result_box_view_title" ng-click="openResultView(product.productid, '', '')">[[ product.productname ]]</div>
                                <div class="one_search_result_box_view_img_border_wrapper" ng-click="openResultView(product.productid, '', '')">
                                    <div class="one_search_result_box_view_img_wrapper">
                                        <img src="[[product.pictureLocation]]" set-image-size resolution-view="resolutionView" regular-min-height="180" regular-min-width="229" iframe-min-height="180" iframe-min-width="229" />
                                        <div class="one_search_result_box_view_img_icon_div"></div>
                                    </div>
                                    <div class="one_search_result_box_view_img_number_text">[[ product.picturesQuantity ]] Photo(s)</div>
                                </div>
                                <div class="one_search_result_box_view_info_div">
                                    <div class="one_search_result_box_view_info_heading">
                                        <div class="one_search_result_box_view_price_div" ng-show="product.rack">
                                            <span class="one_search_result_box_view_price"><small>Total for [[ search.lengthStay.selectedName ]]</small> <span ng-bind-html="product.currency | get_html"></span>  <strong>[[ priceFormat(product.quote, true) ]]</strong></span>
                                            <span class="one_search_result_box_view_price_per_label">Average price per night: <span ng-bind-html="product.currency | get_html"></span> [[ priceFormat(pricePerNight(product.checkin, product.checkout, product.quote ), true) ]]</span>
                                            <span ng-hide="product.inquiryOnly == true" style="margin-top: 7px; display: inline-block; padding: 3px 5px; background: #398126; color: #FFF; font-size: 10px;">Book it now</span>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="one_search_result_box_view_info_labels">
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.productClassType">Property Type: <strong>[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label">Bedrooms: <strong>[[ product.bedroom ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.bathroom">Bathrooms: <strong>[[ product.bathroom ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.guests">Sleeps: <strong>[[ product.guests ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label">Min Stay: <strong>[[ product.minstay ]] Night(s)</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-hide="product.managerName == ''">Managed By: <strong>[[ product.managerName ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label"  ng-show="showCommission">Commission: <strong> [[ product.agentCommission ]]%</strong></div>
                                    </div>
                                </div>
                                <div class="one_search_result_box_view_book_now_btn_div search_result_book_now_btn" ng-click="openResultView(product.productid, '', '')">Details</div>
                            </div>
                        </div>
                    </div>
                    <div class="clearer"></div>
                    
                    <div class="search_result_type_header search_result_suggested_properties" ng-show="page.show_suggested">
                        <span class="search_result_type_header_text">Suggested Properties</span>
                    </div>
                    <div style="margin-right: -26px;">
                        <div ng-repeat="(key, product) in search.products_filtered | startFrom:paginator.cur_page*paginator.per_page | limitTo:paginator.per_page"
                             ng-if="product.exactmatch == false"
                             class="one_search_result_box_view one_search_result_box_view_left">
                            <div class="one_search_result_box_view_wrapper">
                                <div class="one_search_result_box_view_title" ng-click="openResultView(product.productid, '', '')">[[ product.productname ]]</div>
                                <div class="one_search_result_box_view_img_border_wrapper" ng-click="openResultView(product.productid, '', '')">
                                    <div class="one_search_result_box_view_img_wrapper">
                                        <img src="[[product.pictureLocation]]" set-image-size resolution-view="resolutionView" regular-min-height="180" regular-min-width="229" iframe-min-height="180" iframe-min-width="229" />
                                        <div class="one_search_result_box_view_img_icon_div"></div>
                                    </div>
                                    <div class="one_search_result_box_view_img_number_text">[[ product.picturesQuantity ]] Photo(s)</div>
                                </div>
                                <div class="one_search_result_box_view_info_div">
                                    <div class="one_search_result_box_view_info_heading">
                                        <div class="one_search_result_box_view_price_div" ng-show="product.rack">
                                            <span class="one_search_result_box_view_price"><small>Total for [[ search.lengthStay.selectedName ]]</small> <span ng-bind-html="product.currency | get_html"></span>  <strong>[[ priceFormat(product.quote, true) ]]</strong></span>
                                            <span class="one_search_result_box_view_price_per_label">Average price per night: <span ng-bind-html="product.currency | get_html"></span> [[ priceFormat(pricePerNight(product.checkin, product.checkout, product.quote ), true) ]]</span>
                                            <span ng-hide="product.inquiryOnly == true" style="margin-top: 7px; display: inline-block; padding: 3px 5px; background: #398126; color: #FFF; font-size: 10px;">Book it now</span>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="one_search_result_box_view_info_labels">
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.productClassType">Property Type: <strong>[[ propertyTypesList[ product.productClassType.replace("PCT", "") ] ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label">Bedrooms: <strong>[[ product.bedroom ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.bathroom">Bathrooms: <strong>[[ product.bathroom ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-show="product.guests">Sleeps: <strong>[[ product.guests ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-class="product.suggestedby.indexOf('minstay') != -1 ? 'suggested_minstay' : ''">Min Stay: <strong>[[ product.minstay ]] Night(s)</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-hide="product.managerName == ''">Managed By: <strong>[[ product.managerName ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-class="product.suggestedby.indexOf('checkinday') != -1 ? 'suggested_minstay' : ''" ng-show="product.suggestedby.indexOf('checkinday') != -1">Checkin day: <strong>[[ product.CheckInDayRequired ]]</strong></div>
                                        <div class="one_search_result_box_view_info_one_label" ng-show="showCommission">Commission: <strong>[[ product.agentCommission ]]%</strong></div>
                                    </div>
                                </div>

                                <div class="one_search_result_box_view_book_now_btn_div search_result_book_now_btn" ng-click="openResultView(product.productid, '', '')">Details</div>
                            </div>
                        </div>
                    </div>
                    <div class="clearer"></div>
                </div>

                
                
                <div ng-show="viewTab('map_view')" class="search_results_box_view_div ng-hide">
                    <div gm-info-window="infoWindow">
                        <h4 style="margin: 0; padding: 0">[[selectedProduct.productname]]</h4>
                    </div>
                    <gm-map gm-map-id="'GoogleMapListProducts'" gm-center="center" gm-zoom="GoogleMap.options.map.zoom" gm-map-options="GoogleMap.options.map" class="map">
                        <gm-markers gm-objects="search.products_filtered"
                                    gm-id="object.productid"
                                    gm-position="{ lat: object.latitude, lng: object.longitude }"
                                    gm-marker-options="{ title: object.productname, clickable: true }"
                                    gm-events="markerEvents"
                                    gm-on-openinfowindow="selectedProduct = object; infoWindow.open(marker.getMap(), marker);"
                                    gm-on-click="GoogleMap.triggerOpenInfoWindow(object)">
                        </gm-markers>
                    </gm-map>
                </div>
            </div>

            <div class="search_results_pagination_bottom_div ng-hide" ng-hide="viewTab('map_view')">
                <div class="search_results_pagination_bottom_wrapper">
                    <div ng-hide="paginator.cur_page == 0"  ng-click="setPagination( paginator.cur_page - 1 )" class="results_pagination_previous_bottom_btn floater_left"></div>
                    <div ng-hide="(paginator.cur_page == paginator.pages - 1) || (paginator.cur_page == 0 && paginator.pages == 0)" ng-click="setPagination( paginator.cur_page + 1 )" class="results_pagination_next_bottom_btn floater_right"></div>
                    <div class="search_results_pagination_pages_div">
                        <a href="javascript:void(0);" ng-repeat="n in [] | range:paginator.pages" ng-click="setPagination( n )" ng-class="{active: paginator.cur_page == n}">&nbsp;[[ n + 1 ]]&nbsp;</a>
                    </div>
                    <div class="clearer"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Search Page END -->


<!-- Property View Page START -->
<div id="resultViewPage" ng-show="showPage=='result_page'" class="ng-hide">
    <div class="wrapper_wide">
        <div class="content_wide_width">
            <div class="result_view_title_div">
                <div class="search_panel_back_link" ng-click="backToSearchView()" ng-class="{search_back_link_fixed: resultView.showFixedHeader && showPage=='result_page'}" >Back to Search Results</div>
                <div class="result_view_title">[[ property_detail.name ]]</div>
                <p ng-show="property_detail.address" style="clear: both; font-size: 13px;">[[ property_detail.address ]]</p>
                <div class="clearer"></div>
            </div>
            <div class="result_left_column_div">
                <div class="result_tabs_header" ng-class="{header_fixed: resultView.showFixedHeader && showPage=='result_page'}">
                    <div ng-click="triggerProductTabs('overview_tab','overviewResultSection')" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='overview_tab', result_tab_not_selected_btn: resultViewSelectedTab!='overview_tab'}" class="result_tab_overview result_tab_btn">Overview</div>
                    <div ng-click="triggerProductTabs('map_tab','mapResultSection')" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='map_tab', result_tab_not_selected_btn: resultViewSelectedTab!='map_tab'}" class="result_tab_map result_tab_btn">Map</div>
                    <div ng-click="triggerProductTabs('rates_tab','ratesResultSection')" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='rates_tab', result_tab_not_selected_btn: resultViewSelectedTab!='rates_tab'}" class="result_tab_rates result_tab_btn">Rates/Availability</div>

                    <div ng-click="triggerProductTabs('amenities_tab','amenitiesResultSection')" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='amenities_tab', result_tab_not_selected_btn: resultViewSelectedTab!='amenities_tab'}" class="result_tab_amenities result_tab_btn">Amenities</div>
                    <div ng-click="triggerProductTabs('reviews_tab','reviewsResultSection')" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='reviews_tab', result_tab_not_selected_btn: resultViewSelectedTab!='reviews_tab'}" class="result_tab_reviews result_tab_btn">Reviews</div>

                    <div class="clearer"></div>
                </div>
            
                <div class="result_images_panel" id="imagesResultSection">
                    <div class="result_main_image_wrapper">
                        <img src="" id="propertyPageMainImage"/>
                        <div id="propertyPageMainImageLeftButton" class="result_main_image_left_button" onclick="showPreviousPropertyImage()"></div>
                        <div id="propertyPageMainImageRightButton" class="result_main_image_right_button" onclick="showNextPropertyImage()"></div>
                    </div>       

                    <div class="result_thumb_images_wrapper">
                        <div class="result_thumb_images" id="propertyThumbImagesDiv">
                            <div class="clearer"></div>
                        </div>
                        <div class="clearer"></div>
                    </div>
                </div>
                
                <div class="result_tabs_section" id="overviewResultSection">
                    <div class="result_tabs_section_title">Overview</div>
                    <div class="result_tabs_content_normal result_tab_content_overview" ng-bind-html="property_detail.description | get_html"></div>
                </div>
                
                <div class="result_tabs_section" id="mapResultSection">
                    <div class="result_tabs_section_title">Map</div>
                    <div class="result_tabs_content_map">
                        <gm-map gm-map-id="'GoogleMapProduct'" gm-center="center" gm-zoom="GoogleMap.options.mapViewProduct.zoom" gm-map-options="GoogleMap.options.mapViewProduct" class="map">
                            <gm-markers gm-objects="property_detail_map"
                                        gm-id="object.id"
                                        gm-position="{ lat: object.latitude, lng: object.longitude }"
                                        gm-position="{ lat: object.latitude, lng: object.longitude }"
                                        gm-events="markerEvents">
                            </gm-markers>
                        </gm-map>
                    </div>
                </div>

                <div class="result_tabs_section" id="ratesResultSection">
                    <div class="result_tabs_section_title">Rates & Availability</div>
                    <div class="result_tabs_content_rates">
                        <div class="tab_rates_availability_calendar_div">
                            <div class="tab_rates_availability_calendar_content">

                                <div id="datesAvailabilityCalendar" datepicker-inline book-check-in-date='book.checkInDate' book-check-out-date='book.checkOutDate' book-invalid-dates='book.invalidDates'></div>

                                <div class="availability_calendar_legend_row">
                                    <div class="availability_calendar_update_div">
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="availability_calendar_legend_div">
                                        <div class="availability_calendar_dates_booked_div">
                                            <div class="availability_calendar_legend_label">Dates Booked:</div>
                                            <div class="availability_calendar_dates_booked_icon"></div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="availability_calendar_unavailable_dates_div">
                                            <div class="availability_calendar_legend_label">Unavailable:</div>
                                            <div class="availability_calendar_unavailable_dates_icon"></div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="clearer"></div>
                                </div>
                            </div>
                        </div>

                        <div class="tab_rates_rates_div">
                            <div class="tab_rates_rates_heading_div">
                                <div class="tab_rates_rental_info_div">
                                    <div class="tab_rates_rental_info_row"><strong>Rental Basic:</strong> Per property</div>
                                </div>

                                <div class="tab_rates_approximate_equivalent_div">
                                    <div class="tab_rates_approximate_equivalent_label">Approximate equivalent in</div>
                                </div>

                                <div class="clearer"></div>
                            </div>

                            <div ng-if="property_detail.prices.length">
                                <table class="tab_rates_rates_table">
                                    <thead>
                                        <tr class="heading_row">
                                            <td class="first_column" style="width: 30%;">Rate Period</td>
                                            <td>Min price/ Max price</td>
                                            <td class="last_column" style="width: 30%;">Event Minimum Stay</td>
                                        </tr>
                                    </thead>
                                </table>
                                <div class="product_detail_prices">
                                    <table class="tab_rates_rates_table">
                                        <tbody>
                                            <tr class="data_row" ng-repeat="(key, value) in property_detail.prices">
                                                <td class="first_column" style="width: 30%;"><span>[[ value.date_start.substring(0, 10) | date:'MMM d' ]] - [[ value.date_end.substring(0, 10) | date:'MMM d' ]]</span></td>
                                                <td><span ng-bind-html="value.price | get_html"></span></td>
                                                <td class="last_column" style="width: 30%;">[[ value.minstay ]] nights</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div class="rates_table_additional_info_div">
                                <div class="additional_info_text_highlight">Additional Information about rental rates</div>
                                <div class="additional_info_rates_value">Rates are subject to change until reservation is confirmed</div>
                                <div class="additional_info_text_highlight">*Additional monthly rate. Actual rate will depend on the days of the month you stay.</div>
                                <div class="additional_info_text">Payment is usually accepted in the quoted currency (USD) unless the currency and the amount is specifically agreed in advance with the owner / advertiser.</div>
                                <div class="rates_cancellation_policy_title">Cancelation Policy</div>
                                <div class="additional_info_cancellation_policy_value" ng-bind-html="property_detail.cancelation_message | get_html" ></div>

                                <div class="rates_cancellation_policy_title">Terms &amp; Conditions</div>
                                <div class="additional_info_cancellation_policy_value">
                                    <p>Check in time is [[ property_detail.check_in ]] &nbsp;&nbsp;&nbsp; Check-out time is [[ property_detail.check_out ]]</p>
                                    <p ng-show="property_detail.terms == 'pdf' && property_detail.terms_url != ''"><a href="[[ property_detail.terms_url ]]" target="_blank">Click here to download property terms &amp; conditions</a></p>
                                    <p ng-show="property_detail.terms != 'pdf' && property_detail.terms_url != ''"><a href="javascript:void(0);" ng-click="openTerms(property_detail.terms_url);">Click here to view complete property terms &amp; conditions</a></p>
                                </div>
                            </div>
                        </div>
                        
                        
                        <div class="result_items_included_panel">
                            <div class="result_items_included_one_section">
                                <div class="result_items_included_section_title" ng-click="resultView.ratesSectionIncludedInPrice = !resultView.ratesSectionIncludedInPrice">
                                    <div class="result_items_included_section_icon" ng-class="{result_items_included_open_icon: resultView.ratesSectionIncludedInPrice, result_items_included_hidden_icon: !resultView.ratesSectionIncludedInPrice}"></div>
                                    <div class="result_items_included_section_title_text">Included in price</div>
                                    <div class="clearer"></div>
                                </div>
                                <div class="result_items_included_section_content" ng-show="resultView.ratesSectionIncludedInPrice">
                                    <div class="result_items_included_section_content_line" ng-repeat="fee in property_detail.included">
                                        <div class="items_included_line_left">
                                            <div class="items_included_line_item">[[fee.text]]</div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="items_included_line_item_value" ng-bind-html="fee.price | get_html"></div>
                                        <div class="items_included_dashed_line"></div>
                                        <div class="clearer"></div>
                                    </div>
                                
                                </div>
                            </div>
                            
                            <div class="result_items_included_one_section">
                                <div class="result_items_included_section_title" ng-click="resultView.ratesSectionExtraCosts = !resultView.ratesSectionExtraCosts">
                                    <div class="result_items_included_section_icon" ng-class="{result_items_included_open_icon: resultView.ratesSectionExtraCosts, result_items_included_hidden_icon: !resultView.ratesSectionExtraCosts}"></div>
                                    <div class="result_items_included_section_title_text">Extra costs</div>
                                    <div class="clearer"></div>
                                </div>
                                <div class="result_items_included_section_content" ng-show="resultView.ratesSectionExtraCosts">
                                    
                                    <div class="result_items_included_section_content_line" ng-repeat="fee in property_detail.excluded">
                                        <div class="items_included_line_left">
                                            <div class="items_included_line_item">[[fee.text]]</div>
                                            <div class="clearer"></div>
                                        </div>
                                        <div class="items_included_line_item_value" ng-bind-html="fee.price | get_html"></div>
                                        <div class="items_included_dashed_line" ng-show="fee.price"></div>
                                        <div class="clearer"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="result_tabs_section" id="amenitiesResultSection">
                    <div class="result_tabs_section_title">Amenities</div>
                    <div class="result_tabs_content_normal">
                        <ul>
                            <li ng-repeat="amenity in property_detail.amenities">[[ amenity ]]</li>
                        </ul>
                    </div>
                </div>
                
                <div class="result_tabs_section" id="reviewsResultSection">
                    <div class="result_tabs_section_title">Reviews</div>
                    <div class="result_tabs_content_normal">
                    </div>
                </div>
            </div>  
            
            <div class="result_right_column_div">
                <div class="result_book_and_info_panel" ng-class="{header_fixed: resultViewSelectedTab!='overview_tab' && showPage=='result_page'}">
                    <div class="result_book_panel">
                        <div class="result_book_panel_content_wrapper">
                            <div class="result_error" ng-show="page.is_error">This property is no longer available.</div>
                            <div class="result_price_div" ng-hide="page.is_error">
                                <span ng-bind-html="property_detail.currency | get_html"></span>&nbsp;[[ property_detail.quote ]]
                            </div>
                            <div class="result_book_row_div" ng-show="search.checkInDate"><span id="product_detail_number_nights">[[ diff2dates(checkInDate, search.checkOutDate) ]]</span> night(s) total
                                <span class="link_text" ng-click="showPopup(property_detail.id, search.checkInDate, search.checkOutDate)" ng-hide="page.is_error || property_detail.inquire == true">Detailed Price</span>
                                <span class="link_text" ng-click="showInquireDialog(book.checkInDate, book.checkOutDate, search.guests.selectedId ,property_detail.id)" ng-hide="page.is_error || property_detail.inquire == false">Detailed Price</span>
                            </div>
                            <div class="result_book_row_div">
                                <div ng-hide="page.is_error || book.checkInDate == '' || book.checkOutDate == ''">Your dates are <span class="available_dates_book_label">Available!</span></div>
                                <!-- <div ng-show="page.is_error">This property is no longer available.</div> -->
                            </div>
                            <div class="result_book_date_fields">
                                <input type="text" ng-model="book.checkInDate" datepicker datepicker-class="datepicker_book_panel" date-field-in-range="start" connected-date-field-id-array="book.arrayOfCheckOutFieldsId" connected-date-field-value="book.checkOutDate" reload-detail-page="bookCheck" reload-func="openResultView(property_detail.id, book.checkInDate, book.checkOutDate )" class="datepicker result_book_date_input_field floater_left" id="bookCheckInDatepickerField" readonly />
                                <input type="text" ng-model="book.checkOutDate" datepicker datepicker-class="datepicker_book_panel" date-field-in-range="end" connected-date-field-id-array="book.arrayOfCheckInFieldsId" connected-date-field-value="book.checkInDate" reload-detail-page="bookCheck" reload-func="openResultView(property_detail.id, book.checkInDate, book.checkOutDate )" class="datepicker result_book_date_input_field floater_right" id="bookCheckOutDatepickerField" readonly />
                                <div class="clearer"></div>
                            </div>
                            <div ng-show="load_detail == 4">
                                <div class="result_book_it_now_btn result_book_panel_btn" ng-hide="page.is_error || property_detail.inquire == true" ng-click="showPopup(property_detail.id, book.checkInDate, book.checkOutDate)">Book Now</div>
                                <div class="result_email_owner_btn result_book_panel_btn" ng-hide="property_detail.inquire == false">
                                    <div class="result_email_owner_icon_and_text" ng-click="showInquireDialog(book.checkInDate, book.checkOutDate, search.guests.selectedId ,property_detail.id)">Email Owner</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="result_rating_reviews_row">
                        <div class="result_rating_stars_div">
                            <div class="result_rating_star_img"></div>
                            <div class="result_rating_star_img"></div>
                            <div class="result_rating_star_img"></div>
                            <div class="result_rating_star_img"></div>
                            <div class="result_rating_star_img"></div>
                            <div class="clearer"></div>
                        </div>
                        <div class="result_reviews_text">18 Reviews</div>
                        <div class="clearer"></div>
                    </div>

                    <div class="result_info_panel">
                        <div class="result_info_content_wrapper">
                            <div class="result_info_one_row result_info_odd_row">
                                <div class="result_info_label">Sleeps</div>
                                <div class="result_info_value">[[ property_detail.person ]]</div>
                                <div class="clearer"></div>
                            </div>

                            <div class="result_info_one_row">
                                <div class="result_info_label">Bedrooms</div>
                                <div class="result_info_value">[[ property_detail.bedroom ]]</div>
                                <div class="clearer"></div>
                            </div>

                            <div class="result_info_one_row result_info_odd_row">
                                <div class="result_info_label">Bathrooms</div>
                                <div class="result_info_value">[[ property_detail.bathroom ]]</div>
                                <div class="clearer"></div>
                            </div>

                            <div class="result_info_one_row">
                                <div class="result_info_label">Property Type</div>
                                <div class="result_info_value">[[ property_detail.propertytype ]]</div>
                                <div class="clearer"></div>
                            </div>

                            <div class="result_info_one_row result_info_odd_row">
                                <div class="result_info_label">Minimum Stay</div>
                                <div class="result_info_value">[[ property_detail.minstay ]] night(s)</div>
                                <div class="clearer"></div>
                            </div>
                            
                            <div class="result_info_one_row ">
                                <div class="result_info_label">Property ID</div>
                                <div class="result_info_value">[[ property_detail.id ]]</div>
                                <div class="clearer"></div>
                            </div>

                            <div class="result_info_one_row result_info_odd_row" ng-show="showCommission">
                                <div class="result_info_label">Commission</div>
                                <div class="result_info_value">[[ property_detail.commission ]]%</div>
                                <div class="clearer"></div>
                            </div>

                        </div>
                    </div>
                </div>
                
                
                <div class="result_right_column_other_panels" ng-class="{header_fixed: resultViewSelectedTab!='overview_tab' && showPage=='result_page'}">
                    <div class="result_secure_payment_panel">
                        <div class="secure_payment_title">This owner accepts BookingPal's most secure form of payment. <span class="link_text">Learn More</span> </div>
                        <img src="{{ url('img/result_view/secure_payment_logo.png') }}" class="secure_payment_logo">
                        
                        <div class="result_allowed_payments_div">
                            <img src="{{ url('img/credit_cards/mastercard.png') }}" class="payment_card_img" ng-show="property_detail.cc.mc">
                            <img src="{{ url('img/credit_cards/visacard.png') }}" class="payment_card_img" ng-show="property_detail.cc.visa">
                            <img src="{{ url('img/credit_cards/amecianexpresscard.png') }}" class="payment_card_img" ng-show="property_detail.cc.amex">
                            <img src="{{ url('img/credit_cards/discovercard.png') }}" class="payment_card_img" ng-show="property_detail.cc.dscvr">
                            <img src="{{ url('img/credit_cards/jcbcard.png') }}" class="payment_card_img" ng-show="property_detail.cc.jcb">
                        </div>
                    </div>
                    
                    <div class="result_advanced_protection_services_panel">
                        <div class="result_advanced_protection_services_wrapper">
                            <div class="result_advanced_protection_services_title result_advanced_protection_services_content_wrapper">Add vacation protection services to your booking</div> 
                            <hr>
                            <div class="result_advanced_protection_services_content result_advanced_protection_services_content_wrapper">
                                <div class="result_advanced_protection_services_subtitle">Three services to protect your trip:</div>
                                <div class="advanced_protection_content_line">
                                    <div class="advanced_protection_content_icon advanced_protection_protect_payments_icon"></div>
                                    <div class="advanced_protection_content_line_text">Protect your payments in case you need to cancel.</div>
                                    <div class="clearer"></div>
                                </div>
                                <div class="advanced_protection_content_line">
                                    <div class="advanced_protection_content_icon advanced_protection_guarantee_expecations_icon"></div>
                                    <div class="advanced_protection_content_line_text">Guarantee the rental meets your expectations.</div>
                                    <div class="clearer"></div>
                                </div>
                                <div class="advanced_protection_content_line">
                                    <div class="advanced_protection_content_icon advanced_protection_ensure_damage_icon"></div>
                                    <div class="advanced_protection_content_line_text">Ensure you're prepared in case of accidental damage.</div>
                                    <div class="clearer"></div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    
                    <div class="result_items_included_panel">
                        <div class="result_items_included_one_section">
                            <div class="result_items_included_section_title" ng-click="resultView.itemsPanelIncludedInPrice = !resultView.itemsPanelIncludedInPrice">
                                <div class="result_items_included_section_icon" ng-class="{result_items_included_open_icon: resultView.itemsPanelIncludedInPrice, result_items_included_hidden_icon: !resultView.itemsPanelIncludedInPrice}"></div>
                                <div class="result_items_included_section_title_text">Included in price</div>
                                <div class="clearer"></div>
                            </div>
                            <div class="result_items_included_section_content" ng-show="resultView.itemsPanelIncludedInPrice">
                                <div class="result_items_included_section_content_line" ng-repeat="fee in property_detail.included">
                                    <div class="items_included_line_left">
                                        <div class="items_included_line_item">[[fee.text]]</div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="items_included_line_item_value">[[fee.price]]</div>
                                    <div class="items_included_dashed_line"></div>
                                    <div class="clearer"></div>
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        
                        <div class="result_items_included_one_section">
                            <div class="result_items_included_section_title" ng-click="resultView.itemsPanelExtraCosts = !resultView.itemsPanelExtraCosts">
                                <div class="result_items_included_section_icon" ng-class="{result_items_included_open_icon: resultView.itemsPanelExtraCosts, result_items_included_hidden_icon: !resultView.itemsPanelExtraCosts}"></div>
                                <div class="result_items_included_section_title_text">Extra costs</div>
                                <div class="clearer"></div>
                            </div>
                            <div class="result_items_included_section_content result_items_included_section_content_excluded" ng-show="resultView.itemsPanelExtraCosts">
                                <div class="result_items_included_section_content_line" ng-repeat="fee in property_detail.excluded">
                                    <div class="items_included_line_left">
                                        <div class="items_included_line_item">[[fee.text]]</div>
                                        <div class="clearer"></div>
                                    </div>
                                    <div class="items_included_line_item_value" ng-bind-html="fee.price | get_html"></div>
                                    <div class="items_included_dashed_line"></div>
                                    <div class="clearer"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="clearer"></div>
            </div>

            
            <div class="clearer"></div>

        </div>
    </div>
</div>
<!-- Property View Page END -->


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

                <div id="inquire_form">
                    <div class="popup_content_title">Tell the owner when you would like to travel</div>
                    <div class="popup_content_field_row">
                        <input type="hidden" ng-model="contact.productId" />
                        <input type="text" ng-model="contact.checkInDate" datepicker datepicker-class="datepicker_popup_window" date-field-in-range="start" connected-date-field-id-array="contact.arrayOfCheckOutFieldsId" connected-date-field-value="contact.checkOutDate" class="popup_window_input_field popup_window_datepicker_field floater_left" id="contactCheckInDatepickerField" readonly />
                        <input type="text" ng-model="contact.checkOutDate" datepicker datepicker-class="datepicker_popup_window" date-field-in-range="end" connected-date-field-id-array="contact.arrayOfCheckInFieldsId" connected-date-field-value="contact.checkInDate" class="popup_window_input_field popup_window_datepicker_field floater_right" id="contactCheckOutDatepickerField" readonly />
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <div class="contact_pearson_number_div">
                            <div class="contact_pearson_number_label">Adults</div>
                            <select ng-model="contact.adultsnumber" ng-options="numberAdults for numberAdults in adultsNumberList" name="contactAdultsNumber" id="contactAdultsNumber" class="person_number_select_field"></select>
                            <div class="contact_pearson_number_label">Children</div>
                            <select ng-model="contact.childrennumber" ng-options="numberChildren for numberChildren in childrenNumberList" name="contactChildrenNumber" id="contactChildrenNumber" class="person_number_select_field"></select>

                            <div class="clearer"></div>
                        </div>
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="contact.firstname" name="contactFirstname" id="contactFirstname" type="text" class="popup_window_input_field floater_left" placeholder="First Name" />
                        <input required ng-model="contact.lastname" name="contactLastname" id="contactLastname" type="text" class="popup_window_input_field floater_right" placeholder="Last Name" />
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="contact.emailaddress" name="contactEmailaddress" id="contactEmailaddress" type="text" class="popup_window_input_field floater_left" placeholder="Email Address" />
                        <input required ng-model="contact.phonenumber" name="contactPhonenumber" id="contactPhonenumber" type="text" class="popup_window_input_field floater_right" placeholder="Phone Number" />
                        <div class="clearer"></div>
                    </div>

                    <!--
                    <div class="popup_content_field_row">
                        <select required="required" ng-model="contact.country" ng-change="changeInquireCountry()"  ng-options="c.id as c.name for c in countriesList" name="contactState1"   id="contactState1"   class="popup_window_select_field floater_left"></select>
                        <span ng-hide="contact.hideStates">
                        <select required="required" ng-model="contact.state"   ng-options="s.id as s.name for s in statesList" name="contactState"   id="contactState"   class="popup_window_select_field floater_right"></select>
                        </span>

                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="contact.address" name="contactAddress" id="contactAddress" type="text" class="popup_window_input_field floater_left" placeholder="Address" />
                        <input required ng-model="contact.city" name="contactCity" id="contactCity" type="text" class="popup_window_input_field floater_right" placeholder="City" />
                        <div class="clearer"></div>
                    </div>

                    <div class="popup_content_field_row">
                        <input required ng-model="contact.zip" name="contactZip" id="contactZip" type="text" class="popup_window_input_field floater_left" placeholder="Zip" />

                        <div class="floater_right">
                            <input required ng-model="contact.bdm" name="contactBdm" id="contactBdm" type="text" class="popup_window_input_field popup_window_input_field_md" placeholder="MM" />
                            <input required ng-model="contact.bdd" name="contactBdd" id="contactBdd" type="text" class="popup_window_input_field popup_window_input_field_md" placeholder="DD" />
                            <input required ng-model="contact.bdy" name="contactBdy" id="contactBdy" type="text" class="popup_window_input_field popup_window_input_field_yy" placeholder="YYYY" />
                        </div>

                        <div class="clearer"></div>
                    </div>
                    -->
                    <div class="popup_content_field_row">
                        <textarea ng-model="contact.messageText" id="contactMessagetext" class="popup_window_textarea" placeholder="Message to Owner"></textarea>
                    </div>
                    <!--
                    <div class="popup_content_field_row">
                        <input type="checkbox" ng-model="contact.flexibleDepartureDates" id="contactFlexibleDepartureDates" name="contactFlexibleDepartureDates" class="departure_dates_checkbox" />
                        <div class="popup_contact_flexible_departure_dates_text">My departure dates are flexible</div>
                        <div class="clearer"></div>
                    </div>
                    -->
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
<!-- POPUP Contact Owner END -->


<!-- POPUP Book Step1 START -->
<!--
<div class="popup_window_search_result" id="popup_window_book_step1" ng-show="showPopupBookStep1">
    <div class="popup_window_search_result_back"></div>
    <div class="popup_book_step1_wrapper">
        <div class="popup_window_heading">
            <div class="popup_heading_text">Tell us about your trip, then book it.</div>
        </div>
        <form name="popupBookStep1Form" class="search_result_form" novalidate>
            <div class="popup_book_step1_content_wrapper" ng-class="{true: 'error_validation'}[submittedBookStep1Form && !popupBookStep1Form.$valid]">
                <div class="popup_content_title">Your dates are <span class="popup_content_title_highlight">Available!</span></div>
                <div class="popup_book_step1_dates_row">
                    <input type="text" required ng-model="book.checkInDate" datepicker datepicker-class="datepicker_popup_window" date-field-in-range="start" connected-date-field-id-array="book.arrayOfCheckOutFieldsId" connected-date-field-value="book.checkOutDate" class="popup_window_grey_input_field popup_window_datepicker_field floater_left" id="popupBookCheckInDatepickerField" placeholder="Arrival" readonly />
                    <input type="text" required ng-model="book.checkOutDate" datepicker datepicker-class="datepicker_popup_window" date-field-in-range="end" connected-date-field-id-array="book.arrayOfCheckInFieldsId" connected-date-field-value="book.checkInDate" class="popup_window_grey_input_field popup_window_datepicker_field floater_right" id="popupBookCheckOutDatepickerField" placeholder="Departure" readonly />
                    <div class="clearer"></div>
                </div>
                <div class="book_person_number_row">
                    <div class="book_person_number_label">Adults</div>
                    <select ng-model="book.adultsNumber" ng-options="numberAdults for numberAdults in adultsNumberList" name="bookAdultsNumber" id="bookAdultsNumber" class="person_number_select_field">
                    </select>

                    <div class="book_person_number_label">Children</div>
                    <select ng-model="book.childrenNumber" ng-options="numberChildren for numberChildren in childrenNumberList" name="bookChildrenNumber" id="bookChildrenNumber" class="person_number_select_field">
                    </select>

                    <input type="checkbox" ng-model="book.pets" id="bookPets" name="bookPets" class="pets_checkbox" />
                    <div class="book_person_number_label">Pets</div>

                    <div class="clearer"></div>
                </div>

                <div class="popup_dashed_line"></div>

                <div class="popup_book1_table_regular_row">
                    <div class="popup_book1_table_label">Rental Amount (7 nights)</div>
                    <div class="popup_book1_table_value">$859.95</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_dashed_line"></div>

                <div class="popup_book1_table_regular_row">
                    <div class="popup_book1_table_label">Tax</div>
                    <div class="popup_book1_table_value">$0.0</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_dashed_line"></div>

                <div class="popup_book1_table_regular_row">
                    <div class="popup_book1_table_label">Refundable Damage Deposit</div>
                    <div class="popup_book1_table_value">$400.0</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_book1_table_totals_div">
                    <div class="popup_book1_table_totals_main_row">
                        <div class="popup_book1_table_totals_label floater_left">Rental Amount</div>
                        <div class="popup_book1_table_totals_value floater_right">$1,259.95</div>
                        <div class="clearer"></div>
                    </div>
                    <div class="popup_book1_table_totals_second_row">Total Includes $400 Damage Deposit</div>
                </div>

                <div class="popup_book1_table_regular_row">
                    <div class="popup_book1_table_label">Payment 1 Due: At time of booking approval</div>
                    <div class="popup_book1_table_value">$1,259.95</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_dashed_line"></div>

                <div class="popup_book1_table_cancellation_row">
                    <div class="popup_book1_table_label">Cancelation</div>
                    <div class="popup_book1_table_value">No refunds for cancellation made after payment is made.</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_contact_buttons_div">
                    <div class="popup_contact_buttons_wrapper">
                        <div class="popup_close_btn" ng-click="showPopupBookStep1=false">Close</div>
                        <div class="popup_submit_btn" ng-click="bookStep1FormSubmit()">Continue Booking</div>
                        <div class="clearer"></div>
                    </div>
                    <div class="clearer"></div>
                </div>
            </div>
        </form>
    </div>
</div>
-->
<!-- POPUP Book Step1 END -->



<!-- POPUP Book Step2 START-->
<!--
<div class="popup_window_search_result_payment" id="popup_window_book_step2" ng-show="showPopupBookStep2">
<div class="popup_window_search_result_back"></div>

<div class="popup_book_step2_wrapper">
<div class="popup_window_heading">
    <div class="popup_heading_text">Request a Reservation</div>
</div>

<div class="popup_book_step2_content_wrapper">

<div class="book_step2_info_img_div">
    <div class="book_step2_img_div">
        <div class="book_step2_img_wrapper">
            <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" set-image-size resolution-view="resolutionView" regular-min-height="90" regular-min-width="140" iframe-min-height="90" iframe-min-width="140" />
        </div>
    </div>
    <div class="book_step2_head_info_div">
        <div class="book_step2_head_info_title"><strong>Paris in Buenos Aires:</strong> Luxury 2 bedroom Apartment in the heart of Recoleta.</div>
        <div class="book_step2_head_info_text">
            <div class="book_step2_head_info_text_row">
                Arrival Date: <span class="book_step2_head_info_value margin_right_10">[[book.checkInDate]]</span>
                Departure Date: <span class="book_step2_head_info_value">[[ book.checkOutDate ]]</span>
            </div>
            <div class="book_step2_head_info_text_row">Travelers: <span class="book_step2_head_info_value">[[ book.adultsNumber ]] Adult(s), ([[ book.childrenNumber ]]) Children </span></div>
            <div class="book_step2_head_info_text_row book_step2_return_link" ng-click="bookStep2FormBackToEdit()">Edit Travel Details</div>
        </div>
    </div>
    <div class="clearer"></div>
</div>

<form name="popupBookStep2Form" class="search_result_form search_result_checkbox_highlight_form" novalidate>

<div class="book_step2_form_wrapper" ng-class="{true: 'error_validation'}[submittedBookStep2Form && !popupBookStep2Form.$valid]">
<div class="book_step2_form_heading_div book_step2_form_content_wrapper">
    <div class="book_step2_form_heading_title book_step2_field_text_wrapper">How it Works</div>
    <div class="popup_dashed_line "></div>
    <div class="book_step2_form_heading_text book_step2_field_text_wrapper">Submit your booking request below. The owner will then have 24 hours to accept your reservation request at which time your card will be charged.</div>
</div>

<div class="book_step2_form_subtitle_div">
    <div class="subtitle_text">Guest Information</div>
</div>

<div class="book_step2_form_content_section book_step2_form_content_wrapper book_step2_form_input_fields_section">
    <div class="book_step2_field_text_wrapper margin_bottom_10">
        <input required ng-model="book.firstName" name="bookFirstName" id="bookFirstName" type="text" class="popup_window_custom_input_field input_xlarge floater_left" placeholder="First Name*" />
        <input required ng-model="book.lastName" name="bookLastName" id="bookLastName" type="text" class="popup_window_custom_input_field input_xlarge floater_right" placeholder="Last Name*"  />
        <div class="clearer"></div>

    </div>

    <div class="book_step2_field_text_wrapper">
        <input required ng-model="book.emailAddress" name="bookEmailAddress" id="bookEmailAddress" type="email" class="popup_window_custom_input_field input_xlarge floater_left" placeholder="Email Address*" />
        <input required ng-model="book.phoneNumber" name="bookPhoneNumber" id="bookPhoneNumber" type="text" class="popup_window_custom_input_field input_xlarge floater_right" placeholder="Phone Number*"  />
        <div class="clearer"></div>
    </div>
</div>

<div class="book_step2_form_subtitle_div">
    <div class="subtitle_text floater_left">Add a Message to Owner </div>
    <div class="floater_left book_step2_form_subtitle_additional_text">(optional)</div>
    <div class="clearer"></div>
    <div class="textarea_character_left">[[ 3000 - book.messageText.length ]] characters left</div>
    <div class="clearer"></div>
</div>

<div class="book_step2_form_content_section book_step2_form_content_wrapper book_step2_form_input_fields_section">
    <div class="book_step2_field_text_wrapper">
        <textarea ng-model="book.messageText" maxlength="3000" class="popup_window_textarea" placeholder="Tell the owner more about your travel plans including who you are traveling with and the purpose of your trip. You can also ask any questions you might have."></textarea>
    </div>
</div>

<div class="book_step2_form_subtitle_div">
    <div class="subtitle_text">Protection Options from BookingPal</div>
</div>

<div class="book_step2_form_content_section book_step2_form_content_wrapper ">
    <div class="book_step2_content_table_row">
        <div class="book_step2_table_row_title">
            <div class="book_step2_table_row_title_label"><i>Before your trip</i>&nbsp;&nbsp;<strong>- Cancelation Protection</strong></div>
            <div class="book_step2_table_row_title_value">$0.00</div>
            <div class="popup_dashed_line"></div>
            <div class="clearer"></div>
        </div>

        <div class="book_step2_table_row_main_content">
            <div class="book_step2_content_table_row_info_div">
                <strong>Protect Your Investment Should You Have to Cancel</strong>
                <div class="show_details_link">Show Details</div>
            </div>
            <div class="book_step2_content_table_row_input_div">
                <div class="book_step2_content_table_row_input_left_option">
                    <input type="radio" ng-model="book.protectInvestement" name="bookProtectInvestement" value="true" class="book_step2_radio_btn">
                    <div class="book_step2_content_table_row_input_label">Protect</div>
                    <input ng-required="book.protectInvestement=='true'" ng-model="book.protectInvestementValue" name="bookProtectInvestementValue" id="bookProtectInvestementValue" type="text" class="popup_window_custom_input_field input_protect_investment" />
                    <div class="book_step2_content_table_row_input_label">for $39.95</div>

                    <div class="clearer"></div>
                </div>

                <div class="book_step2_content_table_row_input_right_option">
                    <input type="radio" ng-model="book.protectInvestement" name="bookProtectInvestement" value="false" class="book_step2_radio_btn">
                    <div class="book_step2_content_table_row_input_label">No Thanks</div>
                    <div class="clearer"></div>
                </div>

                <div class="clearer"></div>
            </div>

            <div class="clearer"></div>
        </div>
    </div>

    <div class="popup_regular_line"></div>

    <div class="book_step2_content_table_row">
        <div class="book_step2_table_row_title">
            <div class="book_step2_table_row_title_label"><i>On Arrival</i>&nbsp;&nbsp;<strong>- Carefree Rental Guarantee</strong></div>
            <div class="book_step2_table_row_title_value">$0.00</div>
            <div class="popup_dashed_line"></div>
            <div class="clearer"></div>
        </div>

        <div class="book_step2_table_row_main_content">
            <div class="book_step2_content_table_row_info_div">
                <strong>Protect Your Payment if the Rental is not as Described</strong>
                <div class="show_details_link">Show Details</div>
            </div>
            <div class="book_step2_content_table_row_input_div">
                <div class="book_step2_content_table_row_input_left_option">
                    <input type="radio" ng-model="book.protectPayment" name="bookProtectPayment" value="true" class="book_step2_radio_btn">
                    <div class="book_step2_content_table_row_input_label">Protect my payment for $39.00</div>
                    <div class="clearer"></div>
                </div>

                <div class="book_step2_content_table_row_input_right_option">
                    <input type="radio" ng-model="book.protectPayment" name="bookProtectPayment" value="false" class="book_step2_radio_btn">
                    <div class="book_step2_content_table_row_input_label">No Thanks</div>
                    <div class="clearer"></div>
                </div>

                <div class="clearer"></div>
            </div>

            <div class="clearer"></div>
        </div>
    </div>

    <div class="popup_regular_line"></div>

    <div class="book_step2_content_table_row">
        <div class="book_step2_table_row_title">
            <div class="book_step2_table_row_title_label"><i>During Your Stay</i>&nbsp;&nbsp;<strong>- Damage Protection</strong></div>
            <div class="book_step2_table_row_title_value">$0.00</div>
            <div class="popup_dashed_line"></div>
            <div class="clearer"></div>
        </div>

        <div class="book_step2_table_row_main_content">
            <div class="book_step2_content_table_row_info_div">
                <strong>Protect Against Damage to the Rental</strong>
                <div class="show_details_link">Show Details</div>
            </div>
            <div class="book_step2_content_table_row_input_div">
                <div class="book_step2_content_table_row_input_left_option">
                    <input type="radio" ng-model="book.protectDamage" name="bookProtectDamage" value="true" class="book_step2_radio_btn">
                    <select ng-model="book.protectDamageValue" ng-required="book.protectDamage=='true'" ng-options="damage.id as damage.name for damage in protectDamageValueList" name="bookProtectDamageValue" id="bookProtectDamageValue" class="popup_window_custom_select_field input_protect_damage">
                        <option value="">Select Coverage Amount</option>
                    </select>
                    <div class="clearer"></div>
                </div>

                <div class="book_step2_content_table_row_input_right_option">
                    <input type="radio" ng-model="book.protectDamage" name="bookProtectDamage" value="false" class="book_step2_radio_btn">
                    <div class="book_step2_content_table_row_input_label">No Thanks</div>
                    <div class="clearer"></div>
                </div>

                <div class="clearer"></div>
            </div>

            <div class="clearer"></div>
        </div>
    </div>

</div>

<div class="book_step2_form_subtitle_div">
    <div class="subtitle_text">Payment Schedule</div>
</div>


<div class="book_step2_form_payment_heading">
    <div class="payment_heading_first_row">
        <div class="payment_heading_label">Payment Due: At time of Owner Approval</div>
        <input ng-model="book.paymentTotalValue" readonly name="bookPaymentTotalValue" id="bookPaymentTotalValue" type="text" class="payment_total_input_field" />
        <div class="clearer"></div>
    </div>
    <div class="payment_heading_second_row">
        <div class="payment_heading_label">Payment Total <span class="show_details_link">Show Details</span>:</div>
        <div class="payment_heading_value_text">$1,259.95</div>
        <div class="clearer"></div>
    </div>
</div>

<div class="book_step2_form_payment_content">
    <div class="book_step2_form_payment_content_heading">
        <div class="book_step2_form_payment_content_heading_text">Credit Card</div>
        <div class="book_step2_form_payment_content_card_img"><img src="{{ url('img/result_view/payment_card_allowed.png') }}"></div>
        <div class="clearer"></div>
    </div>
    <div class="book_step2_form_content_section book_step2_form_payment_input_fields_section">
        <div class="payment_input_row">
            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">First Name</div>
                <input required ng-model="book.paymentFirstName" name="bookPaymentFirstName" id="bookPaymentFirstName" type="text" class="popup_window_custom_input_field input_large "/>
            </div>

            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">Last Name</div>
                <input required ng-model="book.paymentLastName" name="bookPaymentLastName" id="bookPaymentLastName" type="text" class="popup_window_custom_input_field input_large "/>
            </div>

            <div class="payment_input_row_field floater_right">
                <div class="payment_input_label">Card Type</div>
                <select ng-model="book.paymentCardType" ng-options="cardType.id as cardType.name for cardType in paymentCardTypeList" name="bookPaymentCardType" id="bookPaymentCardType" class="popup_window_custom_select_field input_medium">
                </select>
            </div>

            <div class="clearer"></div>
        </div>

        <div class="payment_input_row">
            <div class="payment_input_row_field floater_left">
                <div class="payment_input_label">Address</div>
                <input required ng-model="book.paymentAddress" name="bookPaymentAddress" id="bookPaymentAddress" type="text" class="popup_window_custom_input_field input_xxlarge "/>
            </div>

            <div class="payment_input_row_field floater_right">
                <div class="payment_input_label">Card Number</div>
                <input required ng-model="book.paymentCardNumber" name="bookPaymentCardNumber" id="bookPaymentCardNumber" type="text" class="popup_window_custom_input_field input_xxlarge "/>
            </div>

            <div class="clearer"></div>
        </div>

        <div class="payment_input_row">
            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">Country</div>
                <select ng-model="book.paymentCountry" ng-options="country.id as country.name for country in countriesList" name="bookPaymentCountry" id="bookPaymentCountry" class="popup_window_custom_select_field input_medium">
                </select>
            </div>

            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">State</div>
                <select ng-model="book.paymentState" ng-options="state.id as state.name for state in statesList" name="bookPaymentState" id="bookPaymentState" class="popup_window_custom_select_field input_medium">
                </select>
            </div>

            <div class="payment_input_row_field floater_left">
                <div class="payment_input_label">Expiration Date</div>
                <div>
                    <select ng-model="book.expirationDateMonth" ng-options="expirationMonth for expirationMonth in numberRange(1,12)" name="bookExpirationDateMonth" id="bookExpirationDateMonth" class="popup_window_custom_select_field input_small margin_right_5 floater_left">
                    </select>
                    <select ng-model="book.expirationDateYear" ng-options="expirationYear for expirationYear in numberRange(2014,2024)" name="bookExpirationDateYear" id="bookExpirationDateYear" class="popup_window_custom_select_field input_small floater_left">
                    </select>
                    <div class="clearer"></div>
                </div>
            </div>

            <div class="clearer"></div>
        </div>

        <div class="payment_input_row">
            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">City</div>
                <input required ng-model="book.paymentCity" name="bookPaymentCity" id="bookPaymentCity" type="text" class="popup_window_custom_input_field input_medium "/>
            </div>

            <div class="payment_input_row_field floater_left margin_right_7">
                <div class="payment_input_label">Postal code</div>
                <input required ng-model="book.paymentPostalCode" name="bookPaymentPostalCode" id="bookPaymentPostalCode" type="text" class="popup_window_custom_input_field input_medium "/>
            </div>

            <div class="payment_input_row_field floater_left">
                <div class="payment_input_label">Security Code</div>
                <input required ng-model="book.paymentSecurityCode" name="bookPaymentSecurityCode" id="bookPaymentSecurityCode" type="text" class="popup_window_custom_input_field input_medium "/>
            </div>

            <div class="clearer"></div>
        </div>

        <div class="payment_cancellation_policy_div payment_input_label">
            <div>Cancellation Policy</div>
            <div class="payment_cancellation_policy_second_row">No Refund</div>
        </div>
    </div>
</div>



<div class="popup_contact_buttons_div">
    <div class="popup_book_step2_agree_with_terms_div">
        <input required type="checkbox" ng-model="book.agreeWithTerms" id="bookAgreeWithTerms" name="bookAgreeWithTerms" class="floater_left" />
        <div class="popup_book_step2_agree_with_terms_label">
            I read and agree with the
            <span class="terms_link">Rental Agreement</span>,
            <span class="terms_link">Privacy Policy</span>
            and
            <span class="terms_link">Terms & Conditions</span>
            of the site. Certain policy restrictions may apply.
        </div>
    </div>
    <div class="popup_book_step2_submit_btn" ng-click="bookStep2FormSubmit()">Submit Payment</div>
    <div class="clearer"></div>

</div>

</div>

</form>

</div>
</div>
</div>
-->
<!-- POPUP Book Step2 END -->





<!-- POPUP Privacy Policy START -->
<!--
<div class="popup_window_privacy" id="popupWindowPrivacyPolicy" style="display: none;">
    <div class="popup_window_privacy_back"></div>

    <div class="popup_window_privacy_wrapper">
        <div class="popup_heading_with_close_div">
            <div class="popup_privacy_close_div">
                <div class="popup_privacy_close_btn" id="popupPrivacyCloseBtn"></div>
                <div class="clearer"></div>
            </div>
            <div class="popup_privacy_heading_div">
                <img src="{{ url('img/logo.png') }}" class="logo_center_img"/>
            </div>
        </div>
        <div class="popup_privacy_content_wrapper">
            <div class="popup_content_div" id="popupPrivacyContentDiv">

            </div>
        </div>
    </div>
</div>
-->
<!-- POPUP Privacy Policy END -->


<!-- POPUP Rental agreement START -->
<!--
<div class="popup_rental_agreement" id="popupWindowRentalAgreement" style="display: none;">
    <div class="popup_rental_agreement_back"></div>

    <div class="popup_rental_agreement_wrapper">
        <div class="popup_rental_agreement_heading">
            <div class="popup_rental_agreement_heading_text">Rental Agreement</div>
            <div class="popup_rental_agreement_close_btn" id="popupRentalAgreementCloseBtn"> </div>
            <div class="clearer"></div>
        </div>

        <div id="popupRentalAgreementContentForPrint">
            <div class="popup_rental_agreement_content_wrapper">
                <div class="popup_rental_agreement_title">Rental Agreement Summary</div>
                <div class="popup_rental_agreement_summary_content">
                    <div class="popup_rental_content_one_row">
                        <div class="popup_rental_content_one_row_section margin_bottom_10">
                            <div class="popup_rental_content_subtitle">Property Details:</div>
                            <div class="popup_rental_content_regular_row">Listing 140</div>
                        </div>
                        <div class="popup_rental_content_one_row_section margin_bottom_10">
                            <div class="popup_rental_content_subtitle">Owner:</div>
                        </div>
                        <div class="popup_rental_content_one_row_section margin_bottom_10">
                            <div class="popup_rental_content_subtitle">Traveler:</div>
                        </div>
                    </div>
                    <div class="popup_rental_content_one_row">
                        <div class="popup_rental_content_one_row_section margin_bottom_10">
                            <div class="popup_rental_content_subtitle">Traveler Dates:</div>
                            <div class="popup_rental_content_regular_row">Check-in <span id="popupRentalAgreementCheckInDateValue"></span></div>
                            <div class="popup_rental_content_regular_row">Check-out <span id="popupRentalAgreementCheckOutDateValue"></span></div>
                        </div>
                        <div class="popup_rental_content_one_row_section">
                            <div class="popup_rental_content_subtitle">Payment Schedule:</div>
                            <div class="popup_rental_content_regular_row">$3,622.99 due Feb 12, 2014</div>
                            <div class="popup_rental_content_regular_row">$3,573.99 due May 8, 2014</div>
                        </div>
                    </div>

                    <div class="popup_rental_content_last_row">
                        <div class="popup_rental_content_one_row_section">
                            <div class="popup_rental_content_subtitle">Rental Costs:</div>
                            <div class="popup_rental_content_regular_row">Rental Amount: $6,300.00</div>
                            <div class="popup_rental_content_regular_row">Tax: $847.98</div>
                            <div class="popup_rental_content_regular_row">Property Damage Protection: $49.00</div>
                            <div class="popup_rental_content_regular_row">Total: <span id="popupRentalAgreementTotalPriceValue"></span></div>
                        </div>
                    </div>

                    <div class="clearer"></div>
                </div>

                <div class="popup_rental_agreement_cancellation_policy">Cancellation Policy: <span id="popupRentalAgreementCancellationPolicyValue"></span></div>

                <div class="popup_rental_agreement_agreement_div">
                    <div class="popup_rental_agreement_title">Rental Agreement</div>
                    <div class="popup_rental_agreement_agreement_content_wrapper">
                        <div class="popup_rental_agreement_agreement_content" id=popupRentalAgreementAgreementTextContendDiv></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="popup_rental_bottom_div">
            <div class="popup_rental_print_btn" id="popupRentalAgreementPrintBtn">Print Rental Agreement</div>
            <div class="clearer"></div>
        </div>
    </div>
</div>
-->
<!-- POPUP Rental agreement END -->


</body>
</html>