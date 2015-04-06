{{ stylesheet_link('css/styleResultView.css') }}
<script type="text/javascript">
    jQuery(document).ready(function() {
        jQuery('#searchCheckInBtn').click(function (){
            jQuery('#checkIn').datepicker("show");
        });
        jQuery('#searchCheckOutBtn').click(function (){
            jQuery('#checkOut').datepicker("show");
        });
    });
</script>


        <div class="search_panel">
            <div class="search_panel_wrapper">
                <input ng-model="resultView.searchValue" name="searchTextValue" id="searchTextValue" type="text" class="search_main_text_field" placeholder="Destination, ID or Keywords. Over 495,000 Properties to Choose from."/>

                <input type="text" ng-model="resultView.searchCheckInDate" datepicker datepicker-class="datepicker_search_panel" class="search_calendar_btn search_input_btn" id="searchCheckInDatepickerField" style="display: none;" />
                <div class="search_calendar_btn search_input_btn" id="searchCheckInBtn">
                    <div class="search_input_btn_text">
                        <span ng-show="resultView.searchCheckInDate==''">CHECK-IN</span>
                        <span ng-show="resultView.searchCheckInDate!=''">{{resultView.searchCheckInDate}}</span>
                    </div>
                </div>

                <input type="text" ng-model="resultView.searchCheckOutDate" datepicker datepicker-class="datepicker_search_panel" class="search_calendar_btn search_input_btn" id="searchCheckOutDatepickerField" style="display: none;"/>
                <div class="search_calendar_btn search_input_btn" id="searchCheckOutBtn">
                    <div class="search_input_btn_text">
                        <span ng-show="resultView.searchCheckOutDate==''">CHECK-OUT</span>
                        <span ng-show="resultView.searchCheckOutDate!=''">{{resultView.searchCheckOutDate}}</span>
                    </div>
                </div>

                <div class="search_btn_div" ng-show="resolutionView=='regular'"></div>
                <div class="clearer"></div>

                <div class="search_panel_text_info">
                    <div class="search_panel_back_link"><a href="#">Back to Search</a></div>
                    <div class="search_panel_text_path">
                        World >
                        USA >
                        Washington DC >
                        Capital Hill >
                        Rental 857692906
                    </div>
                    <div class="clearer"></div>
                </div>

                <div class="search_btn_div" ng-show="resolutionView=='iframe'"></div>
                <div class="clearer"></div>
            </div>
        </div>

        <div class="result_view_title">Capital Hill: Walk to Everything . Bikes Parking. We Have Two Units.</div>

        <div class="result_images_and_infos_panel">
            <div class="result_images_panel">
                <div class="result_main_image_wrapper">
                    <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_main_image" />
                </div>

                <div class="result_thumb_images">
                    <div class="result_small_image_wrapper thumb_image_margin_right">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_small_image" />
                    </div>

                    <div class="result_small_image_wrapper thumb_image_margin_right">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_small_image" />
                    </div>

                    <div class="result_small_image_wrapper" ng-class="{thumb_image_margin_right: resolutionView=='regular'}">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_small_image" />
                    </div>

                    <div class="result_small_image_wrapper thumb_image_margin_right">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_small_image" />
                    </div>

                    <div class="result_small_image_wrapper">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="result_small_image" />
                    </div>

                    <div class="clearer"></div>

                </div>

            </div>

            <div class="result_book_and_info_panel">
                <div class="result_book_panel">
                    <div class="result_book_panel_content_wrapper">
                        <div class="result_price_div">$2,870</div>
                        <div class="result_book_row_div">14 night total <span class="detail_price_book_label">Detailed Price</span></div>
                        <div class="result_book_row_div">Your dates are <span class="available_dates_book_label">Available!</span></div>

                        <div class="result_book_date_fields">
                            <input type="text" ng-model="book.checkInDate" datepicker datepicker-class="datepicker_book_panel"  class="result_book_date_input_field floater_left" id="bookCheckInDatepickerField" />
                            <input type="text" ng-model="book.checkOutDate" datepicker datepicker-class="datepicker_book_panel" class="result_book_date_input_field floater_right" id="bookCheckOutDatepickerField" />
                            <div class="clearer"></div>
                        </div>

                        <div class="result_book_it_now_btn result_book_panel_btn" ng-click="showPopupBookStep1=true" >Book it Now</div>
                        <div class="result_email_owner_btn result_book_panel_btn">
                            <div class="result_email_owner_icon_and_text" ng-click="showPopupContact=true">Email Owner</div>
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
                    <div class="result_info_one_row result_info_odd_row">
                        <div class="result_info_label">Sleeps</div>
                        <div class="result_info_value">6</div>
                        <div class="clearer"></div>
                    </div>

                    <div class="result_info_one_row">
                        <div class="result_info_label">Bedrooms</div>
                        <div class="result_info_value">2</div>
                        <div class="clearer"></div>
                    </div>

                    <div class="result_info_one_row result_info_odd_row">
                        <div class="result_info_label">Bathrooms</div>
                        <div class="result_info_value">1</div>
                        <div class="clearer"></div>
                    </div>

                    <div class="result_info_one_row">
                        <div class="result_info_label">Property Type</div>
                        <div class="result_info_value">apartment</div>
                        <div class="clearer"></div>
                    </div>

                    <div class="result_info_one_row result_info_odd_row">
                        <div class="result_info_label">Minimum Stay</div>
                        <div class="result_info_value">3 nights</div>
                        <div class="clearer"></div>
                    </div>

                </div>

            </div>
            <div class="clearer"></div>
        </div>


        <div class="result_tabs_panel">
            <div class="result_tabs_header">
                <div ng-click="resultViewSelectedTab='description_tab'" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='description_tab', result_tab_not_selected_btn: resultViewSelectedTab!='description_tab'}" class="result_tab_description result_tab_btn">Description</div>
                <div class="result_tab_separator"></div>
                <div ng-click="resultViewSelectedTab='map_tab'" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='map_tab', result_tab_not_selected_btn: resultViewSelectedTab!='map_tab'}" class="result_tab_map result_tab_btn result_tab_not_selected_btn">Map</div>
                <div class="result_tab_separator"></div>
                <div ng-click="resultViewSelectedTab='rates_tab'" ng-class="{result_tab_selected_btn: resultViewSelectedTab=='rates_tab', result_tab_not_selected_btn: resultViewSelectedTab!='rates_tab'}" class="result_tab_rates result_tab_btn result_tab_not_selected_btn">Rates & Availability</div>
                <div class="result_tab_right_fill_bottom_border"></div>
                <div class="clearer"></div>

            </div>

            <div class="result_tabs_content">
                <div ng-show="resultViewSelectedTab=='description_tab'" class="result_tabs_content_description"><p>Drionemo luptatem eaquatur maio berecab orporem rae rem volorep uditem cuptatem arion et untorehent quatus aut optasin ullorro mo molenet pre es simporem vero cusam eat.</p>
                    <p>Litae nonse officipsum et labo. Ecaborit et ut aut la velique vero tem re num ium labor sinciatio dolut lia destrunt ent eliquas ero occus volor a ant omnitas pident, te sequam ius, sequas dolume dolest ullandem ex et, atem intotatati non nihiciis eatem quaestisciet ea dolupta quam nobit vernam, serfero runtis et eaquibus, samet ipid quia debis secese nis repre pelit, ulleceped maio. Ut ma dolorepe et voluptat laccum qui cusda et untem si sequi corat.</p>
                    <p>Ure, conest, et ex eum entis net faccus eicitatiur assite vel enis venihitem sitiume pero verspero magniminctas dolutem quostium est ist, id quam, ipic tem verepud itatiis venis quo cuptatibus sit, consectumque nosae eos ped moleniendam, veniasi mpercipsam et rehent, officiduntur suntemos eium volupta temqui quideriae ratem con custium fugitiisim as peratis est eaturi to everis as a plabori busandia animini squiam, seroribearum qui numquo cum quis apita dolore non natemped quatus quam delique nos seque nis volutat vel molupiet vendaes ediosam quibust latem quodicte rem et rest arum ne consedis explandus pa nis magnit quas posam adici te maio. Uptiis eate omni rerum et, quae siti blab imporia natia voluptas esequibus sit.</p>
                </div>

                <div ng-show="resultViewSelectedTab=='map_tab'" class="result_tabs_content_description"><p>Mrionemo luptatem eaquatur maio berecab orporem rae rem volorep uditem cuptatem arion et untorehent quatus aut optasin ullorro mo molenet pre es simporem vero cusam eat.</p>
                    <p>Litae nonse officipsum et labo. Ecaborit et ut aut la velique vero tem re num ium labor sinciatio dolut lia destrunt ent eliquas ero occus volor a ant omnitas pident, te sequam ius, sequas dolume dolest ullandem ex et, atem intotatati non nihiciis eatem quaestisciet ea dolupta quam nobit vernam, serfero runtis et eaquibus, samet ipid quia debis secese nis repre pelit, ulleceped maio. Ut ma dolorepe et voluptat laccum qui cusda et untem si sequi corat.</p>
                    <p>Ure, conest, et ex eum entis net faccus eicitatiur assite vel enis venihitem sitiume pero verspero magniminctas dolutem quostium est ist, id quam, ipic tem verepud itatiis venis quo cuptatibus sit, consectumque nosae eos ped moleniendam, veniasi mpercipsam et rehent, officiduntur suntemos eium volupta temqui quideriae ratem con custium fugitiisim as peratis est eaturi to everis as a plabori busandia animini squiam, seroribearum qui numquo cum quis apita dolore non natemped quatus quam delique nos seque nis volutat vel molupiet vendaes ediosam quibust latem quodicte rem et rest arum ne consedis explandus pa nis magnit quas posam adici te maio. Uptiis eate omni rerum et, quae siti blab imporia natia voluptas esequibus sit.</p>
                </div>

                <div ng-show="resultViewSelectedTab=='rates_tab'" class="result_tabs_content_rates">

                    <div class="tab_rates_availability_calendar_div">
                        <div id="datesAbailabilityCalendar" datepicker-inline book-check-in-date='book.checkInDate' book-check-out-date='book.checkOutDate' ></div>
                        <div class="availability_calendar_legend_row">
                            <div class="availability_calendar_update_div">
                                <div class="availability_calendar_legend_label">Update:</div>
                                <div class="availability_calendar_update_value">Dec. 10, 2013.</div>
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

                    <div class="tab_rates_rates_div">
                        <div class="tab_rates_rates_heading_div">
                            <div class="tab_rates_rental_info_div">
                                <div class="tab_rates_rental_info_row"><strong>Rental Basic:</strong> Per property</div>
                                <div class="tab_rates_rental_info_row"><strong>Rental Rates Quoted in:</strong> USD</div>
                            </div>

                            <div class="tab_rates_approximate_equivalent_div">
                                <div class="tab_rates_approximate_equivalent_label">Approximate equivalent in</div>
                                <select ng-model="resultView.approximateEquivalentCurrency" ng-options="currency.id as currency.name for currency in approximateEquivalentCurrencyList" name="resultApproximateEquivalentCurrency" id="resultApproximateEquivalentCurrency" class="tab_rates_approximate_equivalent_select">
                                    <option value="">Select Currency</option>
                                </select>
                            </div>

                            <div class="clearer"></div>
                        </div>

                        <table class="tab_rates_rates_table">
                            <thead>
                            <tr class="heading_row">
                                <td class="first_column">Rate Period</td>
                                <td>Nightly</td>
                                <td>Weekend Night</td>
                                <td>Weekly</td>
                                <td>Monthly*</td>
                                <td>Event Minimum Stay</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="data_row">
                                <td class="first_column"><span>Sept. - Oct 13</span></td>
                                <td><span>$200</span></td>
                                <td><span></span></td>
                                <td><span>$1200</span></td>
                                <td><span>$5000</span></td>
                                <td class="last_column">2 nights</td>
                            </tr>

                            <tr class="data_row">
                                <td class="first_column"><span>Sept. - Oct 13</span></td>
                                <td><span>$200</span></td>
                                <td><span></span></td>
                                <td><span>$1200</span></td>
                                <td><span>$5000</span></td>
                                <td class="last_column">2 nights</td>
                            </tr>

                            <tr class="data_row">
                                <td class="first_column"><span>Sept. - Oct 13</span></td>
                                <td><span>$200</span></td>
                                <td><span></span></td>
                                <td><span>$1200</span></td>
                                <td><span>$5000</span></td>
                                <td class="last_column">2 nights</td>
                            </tr>

                            <tr class="data_row">
                                <td class="first_column"><span>Sept. - Oct 13</span></td>
                                <td><span>$200</span></td>
                                <td><span></span></td>
                                <td><span>$1200</span></td>
                                <td><span>$5000</span></td>
                                <td class="last_column">2 nights</td>
                            </tr>
                            </tbody>
                        </table>

                        <div class="rates_table_additional_info_div">
                            <div class="additional_info_text_highlight">Additional Information about rental rates</div>
                            <div class="additional_info_rates_value">Rates are subject to change until reservation is confirmed</div>
                            <div class="additional_info_text_highlight">*Additional monthly rate. Actual rate will depend on the days of the month you stay.</div>
                            <div class="additional_info_text">Payment is usually accepted in the quoted currency (USD) unless the currency and the amount is specifically agreed in advance with the owner / advertiser.</div>

                            <div class="rates_cancellation_policy_title">Cancelation Policy</div>
                            <div class="additional_info_cancellation_policy_value">Rates are subject to change until reservation is confirmed</div>
                        </div>

                    </div>


                </div>
            </div>

            <div class="result_tab_rates_buttons_div" ng-show="resultViewSelectedTab=='rates_tab'">
                <div class="rates_tab_email_owner_btn rates_tab_content_btn">
                    <div class="rates_tab_email_owner_icon_and_text" ng-click="showPopupContact=true">Email Owner</div>
                </div>
                <div class="rates_tab_book_it_now_btn rates_tab_content_btn" ng-click="showPopupBookStep1=true" >Book it Now</div>
                <div class="clearer"></div>
            </div>
            <div class="clearer"></div>
        </div>

        <div class="result_simillar_properties_panel">
            <div class="result_simillar_properties_panel_content">
                <div class="result_simillar_properties_title">Similar Properties</div>

                <div class="one_simillar_properties_div one_simillar_properties_margin_right">
                    <div class="one_simillar_properties_img_wrapper">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="one_simillar_properties_img" />
                    </div>
                    <div class="one_simillar_properties_text_div">
                        <div class="one_simillar_properties_regular_text">Beautiful house at Acapulco Bay</div>
                        <div class="one_simillar_properties_highlight_text">From US $349/night</div>
                    </div>
                    <div class="clearer"></div>
                </div>

                <div ng-show="resolutionView=='regular'" class="result_simillar_properties_separator">&nbsp;</div>

                <div class="one_simillar_properties_div ">
                    <div class="one_simillar_properties_img_wrapper">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="one_simillar_properties_img" />
                    </div>
                    <div class="one_simillar_properties_text_div">
                        <div class="one_simillar_properties_regular_text">Beautiful house at Acapulco Bay</div>
                        <div class="one_simillar_properties_highlight_text">From US $349/night</div>
                    </div>
                    <div class="clearer"></div>
                </div>

                <div ng-show="resolutionView=='iframe'" class="clearer"></div>

                <div class="result_simillar_properties_separator">&nbsp;</div>

                <div class="one_simillar_properties_div">
                    <div class="one_simillar_properties_img_wrapper">
                        <img src="{{ url('img/search_results_temp/result_image_1.jpg') }}" class="one_simillar_properties_img" />
                    </div>
                    <div class="one_simillar_properties_text_div">
                        <div class="one_simillar_properties_regular_text">Beautiful house at Acapulco Bay</div>
                        <div class="one_simillar_properties_highlight_text">From US $349/night</div>
                    </div>
                    <div class="clearer"></div>
                </div>


                <div class="clearer"></div>

            </div>
        </div>

        <div class="clearer"></div>


<!-- POPUP Contact Owner-->
<div class="popup_window_search_result" id="popup_window_contact_owner" ng-show="showPopupContact">
    <div class="popup_window_search_result_back"></div>

    <div class="popup_window_contact_owner_wrapper">
        <div class="popup_window_heading">
            <div class="popup_heading_text">Contact the Owner</div>
        </div>

        <form name="popupContactForm" class="search_result_form" novalidate>
            <div class="popup_contact_owner_content_wrapper" ng-class="{true: 'error_validation'}[submittedContactForm && !popupContactForm.$valid]">
                <div class="popup_content_title">Tell the owner when you would like to travel</div>
                <div class="popup_content_field_row">
                    <input type="text" ng-model="book.checkInDate" datepicker datepicker-class="datepicker_popup_window"  class="popup_window_input_field popup_window_datepicker_field floater_left" id="popupContactCheckInDatepickerField" placeholder="Arrival" />
                    <input type="text" ng-model="book.checkOutDate" datepicker datepicker-class="datepicker_popup_window" class="popup_window_input_field popup_window_datepicker_field floater_right" id="popupContactCheckOutDatepickerField" placeholder="Departure" />
                    <div class="clearer"></div>
                </div>

                <div class="popup_content_field_row">
                    <input type="checkbox" ng-model="contact.flexibleDepartureDates" id="contactFlexibleDepartureDates" name="contactFlexibleDepartureDates" class="departure_dates_checkbox" />
                    <div class="popup_contact_flexible_departure_dates_text">My departure dates are flexible</div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_content_field_row">
                    <input required ng-model="contact.firstName" name="contactFirstName" id="contactFirstName" type="text" class="popup_window_input_field floater_left" placeholder="First Name*" />
                    <input required ng-model="contact.lastName" name="contactLastName" id="contactLastName" type="text" class="popup_window_input_field floater_right" placeholder="Last Name*"  />
                    <div class="clearer"></div>
                </div>

                <div class="popup_content_field_row">
                    <input required ng-model="contact.emailAddress" name="contactEmailAddress" id="contactEmailAddress" type="text" class="popup_window_input_field floater_left" placeholder="Email Address*" />
                    <input required ng-model="contact.phoneNumber" name="contactPhoneNumber" id="contactPhoneNumber" type="text" class="popup_window_input_field floater_right" placeholder="Phone Number*"  />
                    <div class="clearer"></div>
                </div>

                <div class="popup_content_field_row">
                    <select ng-model="contact.country" ng-options="country.id as country.name for country in contactCountryList" name="contactCountry" id="contactCountry" class="popup_window_select_field floater_left">
                    </select>
                    <div class="contact_pearson_number_div">
                        <div class="contact_pearson_number_label">Adults</div>
                        <select ng-model="contact.adultsNumber" ng-options="numberAdults for numberAdults in numberRange(0,10)" name="contactAdultsNumber" id="contactAdultsNumber" class="person_number_select_field">
                        </select>

                        <div class="contact_pearson_number_label">Children</div>
                        <select ng-model="contact.childrenNumber" ng-options="numberChildren for numberChildren in numberRange(0,10)" name="contactChildrenNumber" id="contactChildrenNumber" class="person_number_select_field">
                        </select>

                        <div class="clearer"></div>
                    </div>
                    <div class="clearer"></div>
                </div>

                <div class="popup_content_field_row">
                    <textarea class="popup_window_textarea" placeholder="Message to Owner"></textarea>
                </div>

                <div class="popup_contact_terms_text">
                    By clicking “Send Email” you are agreeing to our <a href="#">Terms & Conditions</a>
                </div>

                <div class="popup_dashed_line"></div>

                <div class="popup_contact_buttons_div">
                    <div class="popup_contact_buttons_wrapper">
                        <div class="popup_close_btn" ng-click="showPopupContact=false">Close</div>
                        <div class="popup_submit_btn" ng-click="contactFormSubmit()">Send Email</div>
                        <div class="clearer"></div>
                    </div>
                    <div class="clearer"></div>
                </div>
            </div>
        </form>

    </div>
</div>



<!-- POPUP Book Step1-->
<div class="popup_window_search_result" id="popup_window_contact_owner" ng-show="showPopupBookStep1">
    <div class="popup_window_search_result_back"></div>

    <div class="popup_book_step1_wrapper">
        <div class="popup_window_heading">
            <div class="popup_heading_text">Tell us about your trip, then book it.</div>
        </div>

        <form name="popupBookStep1Form" class="search_result_form" novalidate>
            <div class="popup_book_step1_content_wrapper" ng-class="{true: 'error_validation'}[submittedBookStep1Form && !popupBookStep1Form.$valid]">
                <div class="popup_content_title">Your dates are <span class="popup_content_title_highlight">Available!</span></div>
                <div class="popup_book_step1_dates_row">
                    <input type="text" required ng-model="book.checkInDate" datepicker datepicker-class="datepicker_popup_window"  class="popup_window_grey_input_field popup_window_datepicker_field floater_left" id="popupBookCheckInDatepickerField" placeholder="Arrival" />
                    <input type="text" required ng-model="book.checkOutDate" datepicker datepicker-class="datepicker_popup_window" class="popup_window_grey_input_field popup_window_datepicker_field floater_right" id="popupBookCheckOutDatepickerField" placeholder="Departure" />
                    <div class="clearer"></div>
                </div>

                <div class="book_person_number_row">
                    <div class="book_person_number_label">Adults</div>
                    <select ng-model="book.adultsNumber" ng-options="numberAdults for numberAdults in numberRange(0,10)" name="bookAdultsNumber" id="bookAdultsNumber" class="person_number_select_field">
                    </select>

                    <div class="book_person_number_label">Children</div>
                    <select ng-model="book.childrenNumber" ng-options="numberChildren for numberChildren in numberRange(0,10)" name="bookChildrenNumber" id="bookChildrenNumber" class="person_number_select_field">
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
                    <div class="popup_book1_table_label">Cancellation</div>
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