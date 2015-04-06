var SITE_URL = (window.SITE_URL || 'https://www.mybookingpal.com/'),
	API_URL  = (window.API_URL  || 'https://www.mybookingpal.com/');

var jQuery_1_9_1 = null;
var window_1 = '<div class="popup_window_search_result" id="popup_window_book_step1" style="display: none;"> <div class="popup_window_search_result_back"></div> <div class="popup_book_step1_wrapper"><div style="position:relative;"><a href="javascript:void(0);" onclick="Mybookingpal.close();" class="close">&nbsp;</a></div><div class="popup_window_heading"><div class="popup_heading_text">Tell us about your trip, then book it.</div> </div> <div class="nano"><div class="nano-content"> <form name="popupBookStep1Form" class="search_result_form" novalidate> <div class="popup_book_step1_content_wrapper"> <div class="popup_content_error"></div> <div class="popup_content_title">Your dates are <span class="popup_content_title_highlight" id="razor_step1_availability">Available!</span></div> <div class="popup_book_step1_dates_row"><input type="text" required class="popup_window_grey_input_field popup_window_datepicker_field floater_left" id="popupBookCheckInDatepickerField" readonly /><input type="text" required class="popup_window_grey_input_field popup_window_datepicker_field floater_right" id="popupBookCheckOutDatepickerField" readonly /> <div class="clearer"></div> </div> <div class="book_person_number_row"> <div class="book_person_number_label">Adults</div> <div class="wstylized_select_field"><div class="wstylized_select_showed_field" id="bookAdultsNumberView">1</div><input type="hidden" class="wstylized_select_hidden_field" id="bookAdultsNumber" /><ul class="wstylized_search_field_list"><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul></div> <div class="book_person_number_label">Children</div><div class="wstylized_select_field"><div class="wstylized_select_showed_field" id="bookChildrenNumberView">0</div><input type="hidden" class="wstylized_select_hidden_field" id="bookChildrenNumber" /><ul class="wstylized_search_field_list"><li>0</li><li>1</li><li>2</li><li>3</li><li>4</li><li>5</li><li>6</li><li>7</li><li>8</li><li>9</li><li>10</li></ul></div> <input type="checkbox" id="bookPets" name="bookPets" class="pets_checkbox" /> <div class="book_person_number_label">Pets</div> <div class="clearer"></div> </div>  <div class="error_hide_area"> <div class="popup_dashed_line"></div> <div class="popup_book1_table_regular_row"> <div class="popup_book1_table_label">Rental Amount (<span id="razor_step1_rental_nigths">7</span> night(s))</div> <div class="popup_book1_table_value" id="razor_step1_rental_amount">$859.95</div> <div class="clearer"></div> </div> <div class="popup_book1_table_regular_row" id="razor_step1_included_price"></div> <!--<div class="popup_book1_table_regular_row"><div class="popup_book1_table_label">Tax</div><div class="popup_book1_table_value" id="razor_step1_tax">$0.0</div><div class="clearer"></div></div>--> <div id="razor_step1_included"></div> <div id="razor_step1_excluded"></div><!--<div class="popup_dashed_line"></div><div class="popup_book1_table_regular_row"><div class="popup_book1_table_label">Refundable Damage Deposit</div><div class="popup_book1_table_value" id="razor_step1_damage_deposit">$400.0</div><div class="clearer"></div></div></div>--> <div id="popup_block1_cleaning_fee_block"> <div class="popup_dashed_line"></div> <div class="popup_book1_table_regular_row"> <div class="popup_book1_table_label">Cleening Fee</div> <div id="razor_step1_cleening_fee" class="popup_book1_table_value">$0.00</div> <div class="clearer"></div> </div> </div> <div class="popup_book1_table_totals_div"> <div class="popup_book1_table_totals_main_row"> <div class="popup_book1_table_totals_label floater_left">Rental Amount</div> <div class="popup_book1_table_totals_value floater_right" class="popup_book1_table_totals_div" id="razor_step1_rental_quote_amount">$1,259.95</div> <div class="clearer"></div> </div> <div class="popup_book1_table_totals_second_row" id="razor_step1_total_damage_deposit" style="display: none;">Total Includes <span id="razor_step1_total_damage_deposit_value">$400</span> Damage Deposit</div></div> <div class="popup_book1_table_regular_row" id="razor_step1_payment1_block"><div class="popup_book1_table_label">Payment 1 Due: At time of booking approval</div> <div class="popup_book1_table_value" id="razor_step1_payment1">$1,259.95</div> <div class="clearer"></div></div> <div class="popup_dashed_line"></div> <div id="razor_step1_payment2_block"><div class="popup_book1_table_regular_row"> <div class="popup_book1_table_label">Payment 2 Due: <span id="razor_step1_payment2_due_date">At time of booking approval</span></div> <div class="popup_book1_table_value" id="razor_step1_payment2">$1,259.95</div> <div class="clearer"></div> </div> <div class="popup_dashed_line"></div> </div> <div class="popup_book1_table_cancellation_row"> <div class="popup_book1_table_label">Cancelation</div> <div class="popup_book1_table_value" id="razor_step1_cacelation" style="max-width: 290px;">No refunds for cancellation made after payment is made.</div> <div class="clearer"></div> </div></div> <div class="popup_contact_buttons_div"> <div class="popup_contact_buttons_wrapper"> <div class="popup_close_btn">Close</div><div class="popup_submit_btn error_hide_area" id="popupBookStep2SubmitBtn">Continue Booking</div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> </div> </form> </div></div> </div></div></div>';
var window_2 = '<div class="popup_window_search_result_payment" id="popup_window_book_step2" style="display: none;"> <div class="popup_window_search_result_back"></div><div class="popup_book_step2_wrapper"><div style="position:relative;"><a href="javascript:void(0);" onclick="Mybookingpal.close();" class="close">&nbsp;</a></div><div class="popup_window_heading"><div class="popup_heading_text">Request a Reservation</div> </div> <div class="nano"><div class="nano-content"> <form name="popupBookStep2Form" class="popup_book_step2_content_form"><div class="popup_book_step2_content_wrapper"><div class="popup_content_error"></div><div class="book_step2_head_info_title"><span class="book_step2_head_info_title_main_part" id="razor_step2_property_name"></span></div> <div class="book_step2_content_top_div"> <div class="book_step2_info_img_div"> <div class="book_step2_img_div"> <div class="book_step2_img_wrapper"><img src="" id="razor_step2_property_image"/></div> </div> <div class="book_step2_head_info_text"> <div class="book_step2_head_info_text_row">Arrival Date: <span class="book_step2_head_info_value margin_right_10" id="razor_step2_arival_date"></span></div> <div class="book_step2_head_info_text_row">Departure Date: <span class="book_step2_head_info_value" id="razor_step2_departure_date"></span></div> <div class="book_step2_head_info_text_row">Travelers: <span class="book_step2_head_info_value"><span id="razor_step2_adults"></span> Adult(s), (<span id="razor_step2_children"></span>) Children </span></div> <div class="book_step2_head_info_text_row book_step2_return_link" onclick="Mybookingpal.goStep1();">Edit Travel Details</div> </div> </div> <div class="book_step2_info_guest_information_div"> <div class="book_step2_form_subtitle_div"> <div class="subtitle_text">Guest Information</div> </div> <div class="book_step2_info_guest_information_fields_div"> <div class="book_step2_guest_info_one_row"> <input required name="bookFirstName" id="bookFirstName" type="text" class="popup_window_custom_input_field floater_left two_per_line_field" placeholder="First Name*" /> <input required name="bookLastName" id="bookLastName" type="text" class="popup_window_custom_input_field two_per_line_field floater_right" placeholder="Last Name*" /> <div class="clearer"></div> </div> <div class="book_step2_guest_info_one_row"> <input required name="bookEmailAddress" id="bookEmailAddress" type="email" class="popup_window_custom_input_field one_per_line_field" placeholder="Email Address*" /> </div> <div class="book_step2_guest_info_one_row"> <input required name="bookPhoneNumber" id="bookPhoneNumber" type="text" class="popup_window_custom_input_field one_per_line_field " placeholder="Phone Number*" /> </div> </div> </div> <div class="clearer"></div> </div> <div class="book_step2_form_wrapper"> <div class="book_step2_form_heading_div book_step2_form_content_wrapper" style="display: none;"> <div class="book_step2_form_heading_title book_step2_field_text_wrapper">How it Works</div> <div class="popup_dashed_line "></div> <div class="book_step2_form_heading_text book_step2_field_text_wrapper">Submit your booking request below. The owner will then have 24 hours to accept your reservation request at which time your card will be charged.</div> </div> <div class="book_step2_form_subtitle_div"> <span class="subtitle_text">Add a Message to Owner</span>&nbsp;<span class="book_step2_form_subtitle_additional_text">(optional)</span> </div> <div class="book_step2_form_content_wrapper"> <div class="book_step2_field_text_wrapper"> <textarea id="bookTextareaNotes" maxlength="3000" class="popup_window_textarea" placeholder="Tell the owner more about your travel plans including who you are traveling with and the purpose of your trip. You can also ask any questions you might have."></textarea><div class="textarea_character_left"><span id="bookStep2TexareaNumberOfCharacterLeft">3000 characters left</span></div> <div class="clearer"></div> </div> </div> <div class="book_step2_form_subtitle_div" style="display: none;"> <div class="subtitle_text">Protection Options from BookingPal</div> </div> <div class="book_step2_form_content_section book_step2_form_content_wrapper" style="display: none;"> <div class="book_step2_content_table_row"> <div class="book_step2_table_row_title"> <div class="book_step2_table_row_title_label"><i>Before your trip</i>&nbsp;&nbsp;<strong>- Cancelation Protection</strong></div> <div class="book_step2_table_row_title_value">$0.00</div> <div class="popup_dashed_line"></div> <div class="clearer"></div> </div> <div class="book_step2_table_row_main_content"> <div class="book_step2_content_table_row_info_div"> <strong>Protect Your Investment Should You Have to Cancel</strong> <div class="show_details_link">Show Details</div> </div> <div class="book_step2_content_table_row_input_div"> <div class="book_step2_content_table_row_input_left_option"> <input type="radio" name="bookProtectInvestement" value="true" class="book_step2_radio_btn"> <div class="book_step2_content_table_row_input_label">Protect</div> <input name="bookProtectInvestementValue" id="bookProtectInvestementValue" type="text" class="popup_window_custom_input_field input_protect_investment" /> <div class="book_step2_content_table_row_input_label">for $39.95</div> <div class="clearer"></div> </div> <div class="book_step2_content_table_row_input_right_option"> <input type="radio" name="bookProtectInvestement" value="false" class="book_step2_radio_btn"> <div class="book_step2_content_table_row_input_label">No Thanks</div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> </div> <div class="popup_regular_line"></div> <div class="book_step2_content_table_row"> <div class="book_step2_table_row_title"> <div class="book_step2_table_row_title_label"><i>On Arrival</i>&nbsp;&nbsp;<strong>- Carefree Rental Guarantee</strong></div> <div class="book_step2_table_row_title_value">$0.00</div> <div class="popup_dashed_line"></div> <div class="clearer"></div> </div> <div class="book_step2_table_row_main_content"> <div class="book_step2_content_table_row_info_div"> <strong>Protect Your Payment if the Rental is not as Described</strong> <div class="show_details_link">Show Details</div> </div> <div class="book_step2_content_table_row_input_div"> <div class="book_step2_content_table_row_input_left_option"> <input type="radio" name="bookProtectPayment" value="true" class="book_step2_radio_btn"> <div class="book_step2_content_table_row_input_label">Protect my payment for $39.00</div> <div class="clearer"></div> </div> <div class="book_step2_content_table_row_input_right_option"> <input type="radio" name="bookProtectPayment" value="false" class="book_step2_radio_btn"> <div class="book_step2_content_table_row_input_label">No Thanks</div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> </div> <div class="popup_regular_line"></div> <div class="book_step2_content_table_row"> <div class="book_step2_table_row_title"> <div class="book_step2_table_row_title_label"><i>During Your Stay</i>&nbsp;&nbsp;<strong>- Damage Protection</strong></div> <div class="book_step2_table_row_title_value">$0.00</div> <div class="popup_dashed_line"></div> <div class="clearer"></div> </div> <div class="book_step2_table_row_main_content"> <div class="book_step2_content_table_row_info_div"> <strong>Protect Against Damage to the Rental</strong> <div class="show_details_link">Show Details</div> </div> <div class="book_step2_content_table_row_input_div"> <div class="book_step2_content_table_row_input_left_option"> <input type="radio" name="bookProtectDamage" value="true" class="book_step2_radio_btn"> <select name="bookProtectDamageValue" id="bookProtectDamageValue" class="popup_window_custom_select_field input_protect_damage"> <option value="">Select Coverage Amount</option> </select> <div class="clearer"></div> </div> <div class="book_step2_content_table_row_input_right_option"> <input type="radio" name="bookProtectDamage" value="false" class="book_step2_radio_btn"> <div class="book_step2_content_table_row_input_label">No Thanks</div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> </div> </div> <div class="book_step2_form_subtitle_div"> <div class="subtitle_text">Payment Schedule</div> </div> <div class="book_step2_form_payment_heading"> <div class="payment_heading_first_row"> <div class="payment_heading_label">Payment Due: At time of Owner Approval</div> <input readonly name="bookPaymentTotalValue" id="bookPaymentTotalValue" type="text" class="payment_total_input_field" /> <div class="clearer"></div> </div> <div class="payment_heading_second_row"> <div class="payment_heading_label">Payment Total <a href="javascript:void(0);" onclick="Mybookingpal.goStep1();" class="show_details_link">Show Details</a>:</div> <div class="payment_heading_value_text" id="razor_step2_payment_total">$1,259.95</div> <div class="clearer"></div> </div> </div> <div class="book_step2_form_payment_content"> <div class="book_step2_form_payment_content_heading"> <div class="book_step2_form_payment_content_heading_text">Credit Card</div> <div class="book_step2_form_payment_content_card_img"><img src="https://www.mybookingpal.com/img/credit_cards/mastercard.png" class="payment_card_img payment_card_img_0"> <img src="https://www.mybookingpal.com/img/credit_cards/visacard.png" class="payment_card_img payment_card_img_1"> <img src="https://www.mybookingpal.com/img/credit_cards/amecianexpresscard.png" class="payment_card_img payment_card_img_2"> <img src="https://www.mybookingpal.com/img/credit_cards/dines.jpg" class="payment_card_img payment_card_img_3"> <img src="https://www.mybookingpal.com/img/credit_cards/discovercard.png" class="payment_card_img payment_card_img_4"> <img src="https://www.mybookingpal.com/img/credit_cards/jcbcard.png" class="payment_card_img payment_card_img_5"> </div> <div class="clearer"></div> </div> <div class="book_step2_form_content_section book_step2_form_payment_input_fields_section"> <div class="payment_input_row"> <div class="payment_input_row_field floater_left margin_right_4"> <div class="payment_input_label">Card Type</div> <select name="bookPaymentCardType" id="bookPaymentCardType" class="popup_window_custom_select_field input_medium"> <option value="0">MASTER CARD</option> <option value="1">VISA</option> <option value="2">AMERICAN EXPRESS</option> </select> </div> <div class="payment_input_row_field floater_left margin_right_4"> <div class="payment_input_label">Card Number</div> <input required name="bookPaymentCardNumber" id="bookPaymentCardNumber" type="text" class="popup_window_custom_input_field input_medium "/> </div> <div class="payment_input_row_field floater_left margin_right_4"> <div class="payment_input_label">Expiration Date</div> <div> <select name="bookExpirationDateMonth" id="bookExpirationDateMonth" class="popup_window_custom_select_field input_xsmall margin_right_5 floater_left"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="11">11</option> <option value="12">12</option> </select> <select name="bookExpirationDateYear" id="bookExpirationDateYear" class="popup_window_custom_select_field input_xsmall floater_left"> <option value="2015">2015</option> <option value="2016">2016</option> <option value="2017">2017</option> <option value="2018">2018</option> <option value="2019">2019</option> <option value="2020">2020</option> <option value="2021">2021</option> <option value="2022">2022</option> <option value="2023">2023</option> <option value="2024">2024</option> </select> <div class="clearer"></div> </div> </div> <div class="payment_input_row_field floater_left"> <div class="payment_input_label">Security Code</div> <input required name="bookPaymentSecurityCode" id="bookPaymentSecurityCode" type="text" class="popup_window_custom_input_field input_small "/> </div> <div class="clearer"></div> </div> <div class="payment_input_row"> <div class="payment_input_row_field floater_left margin_right_2"> <div class="payment_input_label">Address</div> <input required name="bookPaymentAddress" id="bookPaymentAddress" type="text" class="popup_window_custom_input_field input_xxlarge "/> </div> <div class="payment_input_row_field floater_left margin_right_2"> <div class="payment_input_label">City</div> <input required name="bookPaymentCity" id="bookPaymentCity" type="text" class="popup_window_custom_input_field input_medium "/> </div> <div class="payment_input_row_field floater_left"> <div class="payment_input_label" id="razor_step2_postal_code">Postal code</div> <input required name="bookPaymentPostalCode" id="bookPaymentPostalCode" type="text" class="popup_window_custom_input_field input_medium "/> </div> <div class="clearer"></div> </div> <div class="payment_input_row"> <div class="payment_input_row_field floater_left margin_right_2"> <div class="payment_input_label">Country</div> <select name="bookPaymentCountry" id="bookPaymentCountry" class="popup_window_custom_select_field input_xxlarge"> <option value="0">Select Country</option> <option value="AF">Afghanistan</option> <option value="AL">Albania</option> <option value="DZ">Algeria</option> <option value="AS">American Samoa</option> <option value="AD">Andorra</option> <option value="AO">Angola</option> <option value="AI">Anguilla</option> <option value="AQ">Antarctica</option> <option value="AG">Antigua and Barbuda</option> <option value="AR">Argentina</option> <option value="AM">Armenia</option> <option value="AW">Aruba</option> <option value="AU">Australia</option> <option value="AT">Austria</option> <option value="AZ">Azerbaijan</option> <option value="BS">Bahamas</option> <option value="BH">Bahrain</option> <option value="BD">Bangladesh</option> <option value="BB">Barbados</option> <option value="BY">Belarus</option> <option value="BE">Belgium</option> <option value="BZ">Belize</option> <option value="BJ">Benin</option> <option value="BM">Bermuda</option> <option value="BT">Bhutan</option> <option value="BO">Bolivia</option> <option value="BA">Bosnia and Herzegovina</option> <option value="BW">Botswana</option> <option value="BV">Bouvet Island</option> <option value="BR">Brazil</option> <option value="IO">British Indian Ocean Territory</option> <option value="BN">Brunei Darussalam</option> <option value="BG">Bulgaria</option> <option value="BF">Burkina Faso</option> <option value="BI">Burundi</option> <option value="KH">Cambodia</option> <option value="CM">Cameroon</option> <option value="CA">Canada</option> <option value="CV">Cape Verde</option> <option value="KY">Cayman Islands</option> <option value="CF">Central African Republic</option> <option value="TD">Chad</option> <option value="CL">Chile</option> <option value="CN">China</option> <option value="CX">Christmas Island</option> <option value="CC">Cocos (Keeling) Islands</option> <option value="CO">Colombia</option> <option value="KM">Comoros</option> <option value="CG">Congo</option> <option value="CD">Congo, the Democratic Republic Of the</option> <option value="CK">Cook Islands</option> <option value="CR">Costa Rica</option> <option value="CI">Cote d\'ivoire</option> <option value="HR">Croatia</option> <option value="CU">Cuba</option> <option value="CY">Cyprus</option> <option value="CZ">Czech Republic</option> <option value="DK">Denmark</option> <option value="DJ">Djibouti</option> <option value="DM">Dominica</option> <option value="DO">Dominican Republic</option> <option value="EC">Ecuador</option> <option value="EG">Egypt</option> <option value="SV">El Salvador</option> <option value="GQ">Equatorial Guinea</option> <option value="ER">Eritrea</option> <option value="EE">Estonia</option> <option value="ET">Ethiopia</option> <option value="FK">Falkland Islands (Malvinas)</option> <option value="FO">Faroe Islands</option> <option value="FJ">Fiji</option> <option value="FI">Finland</option> <option value="FR">France</option> <option value="GF">French Guiana</option> <option value="PF">French Polynesia</option> <option value="TF">French Southern Territories</option> <option value="GA">Gabon</option> <option value="GM">Gambia</option> <option value="GE">Georgia</option> <option value="DE">Germany</option> <option value="GH">Ghana</option> <option value="GI">Gibraltar</option> <option value="GR">Greece</option> <option value="GL">Greenland</option> <option value="GD">Grenada</option> <option value="GP">Guadeloupe</option> <option value="GU">Guam</option> <option value="GT">Guatemala</option> <option value="GN">Guinea</option> <option value="GW">Guinea-Bissau</option> <option value="GY">Guyana</option> <option value="HT">Haiti</option> <option value="HM">Heard Island and Mcdonald Islands</option> <option value="VA">Holy See (Vatican City State)</option> <option value="HN">Honduras</option> <option value="HK">Hong Kong</option> <option value="HU">Hungary</option> <option value="IS">Iceland</option> <option value="IN">India</option> <option value="ID">Indonesia</option> <option value="IR">Iran, Islamic Republic Of</option> <option value="IQ">Iraq</option> <option value="IE">Ireland</option> <option value="IL">Israel</option> <option value="IT">Italy</option> <option value="JM">Jamaica</option> <option value="JP">Japan</option> <option value="JO">Jordan</option> <option value="KZ">Kazakhstan</option> <option value="KE">Kenya</option> <option value="KI">Kiribati</option> <option value="KP">Korea, Democratic People\'s Republic Of</option> <option value="KR">Korea, Republic Of</option> <option value="KW">Kuwait</option> <option value="KG">Kyrgyzstan</option> <option value="LA">Lao People\'s Democratic Republic</option> <option value="LV">Latvia</option> <option value="LB">Lebanon</option> <option value="LS">Lesotho</option> <option value="LR">Liberia</option> <option value="LY">Libyan Arab Jamahiriya</option> <option value="LI">Liechtenstein</option> <option value="LT">Lithuania</option> <option value="LU">Luxembourg</option> <option value="MO">Macao</option> <option value="MK">Macedonia, the Former Yugoslav Republic Of</option> <option value="MG">Madagascar</option> <option value="MW">Malawi</option> <option value="MY">Malaysia</option> <option value="MV">Maldives</option> <option value="ML">Mali</option> <option value="MT">Malta</option> <option value="MH">Marshall Islands</option> <option value="MQ">Martinique</option> <option value="MR">Mauritania</option> <option value="MU">Mauritius</option> <option value="YT">Mayotte</option> <option value="MX">Mexico</option> <option value="FM">Micronesia, Federated States Of</option> <option value="MD">Moldova, Republic Of</option> <option value="MC">Monaco</option> <option value="MN">Mongolia</option> <option value="MS">Montserrat</option> <option value="MA">Morocco</option> <option value="MZ">Mozambique</option> <option value="MM">Myanmar</option> <option value="NA">Namibia</option> <option value="NR">Nauru</option> <option value="NP">Nepal</option> <option value="NL">Netherlands</option> <option value="AN">Netherlands Antilles</option> <option value="NC">New Caledonia</option> <option value="NZ">New Zealand</option> <option value="NI">Nicaragua</option> <option value="NE">Niger</option> <option value="NG">Nigeria</option> <option value="NU">Niue</option> <option value="NF">Norfolk Island</option> <option value="MP">Northern Mariana Islands</option> <option value="NO">Norway</option> <option value="OM">Oman</option> <option value="PK">Pakistan</option> <option value="PW">Palau</option> <option value="PS">Palestinian Territory, Occupied</option> <option value="PA">Panama</option> <option value="PG">Papua New Guinea</option> <option value="PY">Paraguay</option> <option value="PE">Peru</option> <option value="PH">Philippines</option> <option value="PN">Pitcairn</option> <option value="PL">Poland</option> <option value="PT">Portugal</option> <option value="PR">Puerto Rico</option> <option value="QA">Qatar</option> <option value="RE">Reunion</option> <option value="RO">Romania</option> <option value="RU">Russian Federation</option> <option value="RW">Rwanda</option> <option value="SH">Saint Helena</option> <option value="KN">Saint Kitts and Nevis</option> <option value="LC">Saint Lucia</option> <option value="PM">Saint Pierre and Miquelon</option> <option value="VC">Saint Vincent and the Grenadines</option> <option value="WS">Samoa</option> <option value="SM">San Marino</option> <option value="ST">Sao Tome and Principe</option> <option value="SA">Saudi Arabia</option> <option value="SN">Senegal</option> <option value="CS">Serbia &amp; Montenegro</option> <option value="SC">Seychelles</option> <option value="SL">Sierra Leone</option> <option value="SG">Singapore</option> <option value="SK">Slovakia</option> <option value="SI">Slovenia</option> <option value="SB">Solomon Islands</option> <option value="SO">Somalia</option> <option value="ZA">South Africa</option> <option value="GS">South Georgia and the South Sandwich Islands</option> <option value="ES">Spain</option> <option value="LK">Sri Lanka</option> <option value="SD">Sudan</option> <option value="SR">Suriname</option> <option value="SJ">Svalbard and Jan Mayen</option> <option value="SZ">Swaziland</option> <option value="SE">Sweden</option> <option value="CH">Switzerland</option> <option value="SY">Syrian Arab Republic</option> <option value="TW">Taiwan, Province Of China</option> <option value="TJ">Tajikistan</option> <option value="TZ">Tanzania, United Republic Of</option> <option value="TH">Thailand</option> <option value="TL">Timor-Leste</option> <option value="TG">Togo</option> <option value="TK">Tokelau</option> <option value="TO">Tonga</option> <option value="TT">Trinidad and Tobago</option> <option value="TN">Tunisia</option> <option value="TR">Turkey</option> <option value="TM">Turkmenistan</option> <option value="TC">Turks and Caicos Islands</option> <option value="TV">Tuvalu</option> <option value="UG">Uganda</option> <option value="UA">Ukraine</option> <option value="AE">United Arab Emirates</option> <option value="GB">United Kingdom</option> <option value="US">United States</option> <option value="UM">United States Minor Outlying Islands</option> <option value="ZZ">Unknown</option> <option value="UY">Uruguay</option> <option value="UZ">Uzbekistan</option> <option value="VU">Vanuatu</option> <option value="VE">Venezuela</option> <option value="VN">Viet Nam</option> <option value="VG">Virgin Islands, British</option> <option value="VI">Virgin Islands, U.S.</option> <option value="WF">Wallis and Futuna</option> <option value="EH">Western Sahara</option> <option value="YE">Yemen</option> <option value="ZM">Zambia</option> <option value="ZW">Zimbabwe</option> </select> </div> <div class="payment_input_row_field floater_left margin_right_2" id="razor_step2_state_block" style="display: none;"> <div class="payment_input_label">State</div> <select name="bookPaymentState" id="bookPaymentState" class="popup_window_custom_select_field input_medium" style="width: 149px;"> <option value="">Select State</option><option value="AL">Alabama</option> <option value="AK">Alaska</option><option value="AZ">Arizona</option> <option value="AR">Arkansas</option> <option value="CA">California</option> <option value="CO">Colorado</option> <option value="CT">Connecticut</option> <option value="DE">Delaware</option> <option value="DC">District of Columbia</option> <option value="FL">Florida</option> <option value="GA">Georgia</option><option value="HI">Hawaii</option> <option value="ID">Idaho</option> <option value="IL">Illinois</option> <option value="IN">Indiana</option> <option value="IA">Iowa</option> <option value="KS">Kansas</option> <option value="KY">Kentucky</option> <option value="LA">Louisiana</option> <option value="ME">Maine</option> <option value="MD">Maryland</option> <option value="MA">Massachusetts</option> <option value="MI">Michigan</option> <option value="MN">Minnesota</option> <option value="MS">Mississippi</option> <option value="MO">Missouri</option> <option value="MT">Montana</option> <option value="NE">Nebraska</option> <option value="NV">Nevada</option> <option value="NH">New Hampshire</option> <option value="NJ">New Jersey</option> <option value="NM">New Mexico</option> <option value="NY">New York</option> <option value="NC">North Carolina</option> <option value="ND">North Dakota</option> <option value="OH">Ohio</option> <option value="OK">Oklahoma</option> <option value="OR">Oregon</option> <option value="PA">Pennsylvania</option> <option value="RI">Rhode Island</option> <option value="SC">South Carolina</option> <option value="SD">South Dakota</option> <option value="TN">Tennessee</option> <option value="TX">Texas</option> <option value="UT">Utah</option> <option value="VT">Vermont</option> <option value="VA">Virginia </option><option value="WA">Washington</option> <option value="WV">West Virginia</option> <option value="WI">Wisconsin</option> <option value="WY">Wyoming</option> </select> </div> <div class="payment_input_row_field payment_input_birthdate_field floater_left " id="razor_step2_birthdate_block"> <div class="payment_input_label">What\'s Your Birthdate?</div> <div class="floater_left"> <input name="bookBirthdateMonth" id="bookBirthdateMonth" type="text" class="popup_window_custom_input_field input_xxsmall "/> <div class="payment_input_birthdate_field_footnote_label">MM</div> </div> <span class="book_step2_birthdate_separator">/</span> <div class="floater_left"> <input name="bookBirthdateDay" id="bookBirthdateDay" type="text" class="popup_window_custom_input_field input_xxsmall"/> <div class="payment_input_birthdate_field_footnote_label">DD</div> </div> <span class="book_step2_birthdate_separator">/</span> <div class="floater_left"> <input name="bookBirthdateYear" id="bookBirthdateYear" type="text" class="popup_window_custom_input_field input_xxsmall"/> <div class="payment_input_birthdate_field_footnote_label">YYYY</div> </div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> <div class="payment_cancellation_policy_div"> <div>Cancelation Policy</div> <div class="payment_cancellation_policy_second_row" id="razor_step2_cacelation">No Refund</div> </div> </div> </div> <div class="popup_contact_buttons_div"> <div class="popup_book_step2_agree_with_terms_div"><span id="bookAgreeWithTermsError"><input required type="checkbox" id="bookAgreeWithTerms" name="bookAgreeWithTerms" class="floater_left" /></span><div class="popup_book_step2_agree_with_terms_label">I read and agree with the <span class="terms_link" id="popupBookStep2ShowRentalAgreementBtn" style="display: none !important;">Rental Agreement</span>&nbsp;<span class="terms_link" id="popupBookStep2ShowPrivacyBtn">Privacy Policy</span> and <span class="terms_link" id="popupBookStep2ShowTermsBtn">Terms & Conditions</span> of the site. Certain policy restrictions may apply.</div> </div> <!--<div class="popup_close_btn">Close</div>--> <div class="popup_book_step2_submit_btn">Submit Payment<img src="' + SITE_URL + 'img/preloader.png" style="position: absolute; right: 18px; top: 5px; display: none;" id="bp_widget_progress" alt="" /></div> <div class="clearer"></div> </div> </div> </div></form> </div></div> </div></div>';
var window_3 = '<div class="popup_window_search_result_payment_created" id="popup_window_book_step3" style="display: none;"> <div class="popup_window_search_result_back"></div> <div class="popup_book_step3_wrapper"> <div style="position:relative;"><a href="javascript:void(0);" onclick="Mybookingpal.close();" class="close">&nbsp;</a></div> <div class="popup_window_heading"><div class="popup_heading_text">Confirmation</div></div> <div class="nano"><div class="nano-content"> <div class="popup_book_step3_content_wrapper"> <p class="heading">Thanks <span id="razor_step3_username">Alex</span>! Your booking is now confirmed.</p> <ul class="confirm_list"> <li>We sent the confirmation email to <b id="razor_step3_userpass">alexayden@gmail.com</b></li> <li>We notified <b id="razor_step3_pmname">Name of property or Management</b> of your upcoming stay.</li> <li>We added your booking to our secure, online booking self service tool.</li> </ul> <p>&nbsp;</p> <p class="heading">Check your details</p> <div class="round-box"> <p><b id="razor_step3_pmname2">Name of property or Management</b></p> <table> <tr><th>Booking number</th><td id="razor_step3_bnumber">123.456.7890</td></tr><tr><th>Email</th><td id="razor_step3_email">123.456.7890</td></tr> <tr><th>Booking Details</th><td id="razor_step3_details">1 night, 1 room</td></tr> <tr><th>Check-in</th><td id="razor_step3_checkin">Thursday November 13, 2014 (from 3:00 PM)</td></tr> <tr><th>Check-out</th><td id="razor_step3_checkout">Friday November 14, 2014 (until 12:00 PM)</td></tr> <tr><th>Today you\'ll Pay</th><td><span id="razor_step3_firstpayment">$0</span></td></tr> <tr><th class="green">Total Rental Amount:</th><td class="trp"> <b class="green" id="razor_step3_totalprice">$299</b><!--<div class="razor_step3_taxlist"><small>Tax 14% not included</small><small>City Tax (1.50%) not included</small> </div>--></td> </tr></table></div></div></div></div></div></div></div>';

var privacyPopupWindow = '<div class="popup_window_privacy" id="popupWindowPrivacyPolicy" style="display: none;"> <div class="popup_window_privacy_back"></div> <div class="popup_window_privacy_wrapper"> <div class="popup_heading_with_close_div"> <div class="popup_privacy_close_div"> <div class="popup_privacy_close_btn" id="popupPrivacyCloseBtn"></div> <div class="clearer"></div> </div> <div class="popup_privacy_heading_div"> <img src="https://www.mybookingpal.com/img/logo.png" class="logo_center_img"/> </div> </div> <div class="popup_privacy_content_wrapper"> <div class="popup_content_div" id="popupPrivacyContentDiv"> </div> </div> </div></div>';
var rentalAgreementPopupWindow = '<div class="popup_rental_agreement" id="popupWindowRentalAgreement" style="display: none;"> <div class="popup_rental_agreement_back"></div> <div class="popup_rental_agreement_wrapper"> <div class="popup_rental_agreement_heading"> <div class="popup_rental_agreement_heading_text">Rental Agreement</div> <div class="popup_rental_agreement_close_btn" id="popupRentalAgreementCloseBtn"> </div> <div class="clearer"></div> </div> <div id="popupRentalAgreementContentForPrint"> <div class="popup_rental_agreement_content_wrapper"> <div class="popup_rental_agreement_title">Rental Agreement Summary</div> <div class="popup_rental_agreement_summary_content"> <div class="popup_rental_content_one_row"> <div class="popup_rental_content_one_row_section margin_bottom_10"> <div class="popup_rental_content_subtitle">Property Details:</div> <div class="popup_rental_content_regular_row">Listing 140</div> </div> <div class="popup_rental_content_one_row_section margin_bottom_10"> <div class="popup_rental_content_subtitle">Owner:</div> </div> <div class="popup_rental_content_one_row_section margin_bottom_10"> <div class="popup_rental_content_subtitle">Traveler:</div> </div> </div> <div class="popup_rental_content_one_row"> <div class="popup_rental_content_one_row_section margin_bottom_10"> <div class="popup_rental_content_subtitle">Traveler Dates:</div> <div class="popup_rental_content_regular_row">Check-in <span id="popupRentalAgreementCheckInDateValue"></span></div> <div class="popup_rental_content_regular_row">Check-out <span id="popupRentalAgreementCheckOutDateValue"></span></div> </div> <div class="popup_rental_content_one_row_section"> <div class="popup_rental_content_subtitle">Payment Schedule:</div> <div class="popup_rental_content_regular_row">$3,622.99 due Feb 12, 2014</div> <div class="popup_rental_content_regular_row">$3,573.99 due May 8, 2014</div> </div> </div> <div class="popup_rental_content_last_row"> <div class="popup_rental_content_one_row_section"> <div class="popup_rental_content_subtitle">Rental Costs:</div> <div class="popup_rental_content_regular_row">Rental Amount: $6,300.00</div> <div class="popup_rental_content_regular_row">Tax: $847.98</div> <div class="popup_rental_content_regular_row">Property Damage Protection: $49.00</div> <div class="popup_rental_content_regular_row">Total: <span id="popupRentalAgreementTotalPriceValue"></span></div> </div> </div> <div class="clearer"></div> </div> <div class="popup_rental_agreement_cancellation_policy">Cancelation Policy: <span id="popupRentalAgreementCancellationPolicyValue"></span></div> <div class="popup_rental_agreement_agreement_div"> <div class="popup_rental_agreement_title">Rental Agreement</div> <div class="popup_rental_agreement_agreement_content_wrapper"> <div class="popup_rental_agreement_agreement_content" id=popupRentalAgreementAgreementTextContendDiv></div> </div> </div> </div> </div> <div class="popup_rental_bottom_div"> <div class="popup_rental_print_btn" id="popupRentalAgreementPrintBtn">Print Rental Agreement</div> <div class="clearer"></div> </div> </div></div>';

var contactPopupWindow = '<div class="popup_window_search_result" id="popupWindowContactOwner" style="display:none;"> <div class="popup_window_search_result_back"></div> <div class="popup_window_contact_owner_wrapper"> <div class="popup_window_heading"> <div class="popup_heading_text">Contact the Owner</div> </div> <form name="popupContactForm" class="search_result_form" > <div class="popup_contact_owner_content_wrapper"> <div class="popup_content_title">Tell the owner when you would like to travel</div> <div class="popup_content_field_row"> <input type="text" required class="popup_window_input_field popup_window_datepicker_field floater_left" id="popupContactCheckInDatepickerField" placeholder="Arrival" readonly /> <input type="text" required class="popup_window_input_field popup_window_datepicker_field floater_right" id="popupContactCheckOutDatepickerField" placeholder="Departure" readonly /> <div class="clearer"></div> </div> <div class="popup_content_field_row"> <input type="checkbox" id="contactFlexibleDepartureDates" name="contactFlexibleDepartureDates" class="departure_dates_checkbox" /> <div class="popup_contact_flexible_departure_dates_text">My departure dates are flexible</div> <div class="clearer"></div> </div> <div class="popup_content_field_row"> <input required name="contactFirstName" id="contactFirstName" type="text" class="popup_window_input_field floater_left" placeholder="First Name*" /> <input required name="contactLastName" id="contactLastName" type="text" class="popup_window_input_field floater_right" placeholder="Last Name*" /> <div class="clearer"></div> </div> <div class="popup_content_field_row"> <input required name="contactEmailAddress" id="contactEmailAddress" type="email" class="popup_window_input_field floater_left" placeholder="Email Address*" /> <input required name="contactPhoneNumber" id="contactPhoneNumber" type="text" class="popup_window_input_field floater_right" placeholder="Phone Number*" /> <div class="clearer"></div> </div> <div class="popup_content_field_row"> <select name="contactCountry" id="contactCountry" class="popup_window_select_field floater_left"> <option value="1">US & Canada</option> <option value="2">Some other</option> </select> <div class="contact_pearson_number_div"> <div class="contact_pearson_number_label">Adults</div> <div class="wstylized_select_field"> <div class="wstylized_select_showed_field" id="contactAdultsNumberView">1</div> <input type="hidden" class="wstylized_select_hidden_field" id="contactAdultsNumber" /> <ul class="wstylized_search_field_list"> <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> <li>6</li> <li>7</li> <li>8</li> <li>9</li> <li>10</li> </ul> </div> <div class="contact_pearson_number_label">Children</div> <div class="wstylized_select_field"> <div class="wstylized_select_showed_field" id="contactChildrenNumberView">0</div> <input type="hidden" class="wstylized_select_hidden_field" id="contactChildrenNumber" /> <ul class="wstylized_search_field_list"> <li>0</li> <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> <li>6</li> <li>7</li> <li>8</li> <li>9</li> <li>10</li> </ul> </div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> <div class="popup_content_field_row"> <textarea id="contactMessageText" class="popup_window_textarea" placeholder="Message to Owner"></textarea> </div> <div class="popup_contact_terms_text"> By clicking "Send Email" you are agreeing to our <span id="popupContactShowPrivacyBtn">Terms & Conditions</span> </div> <div class="popup_dashed_line"></div> <div class="popup_contact_buttons_div"> <div class="popup_contact_buttons_wrapper"> <div class="popup_close_btn" id="popupContactClose">Close</div> <div class="popup_submit_btn" id="popupContactSendEmail">Send Email</div> <div class="clearer"></div> </div> <div class="clearer"></div> </div> </div> </form> </div></div>';

tempContentOfRentalAgreementTextForPopup='Optaquist, tem etur aut dolupturero optae ex et erum rem in rem. Itati ulparuptatem quaes dolo volo inis ent, ommolo ommolupti doluptasitat fugia voluptate eostiatur? Quiat alianda estrum quassum quia quae ese dolliquias dolut eum que voluptatur? Genditi umquae nos enduntium raecea sim sum lacidia porporro torrum hic tem fuga. Atinvento consequi quo dolorem quatese quodio inctusam lacerehent volupti que nusam quaturio ipsapit atiatur aboreptatur suntiis adi anis venihil lianitatate aut lab is serunt. Olorem arit utas volessime et es ea cullaborum et plibus accus, int lautemod que santi vent. Igenis aut pro endus ma isitam aperae inihit, quo ipsum voluptaspita velentor accuptature mo qui in pra sa vellatur ad modiate officiatur? In nobit quae cus moluptur Optaquist, tem etur aut dolupturero optae ex et erum rem in rem. Itati ulparuptatem quaes dolo volo inis ent, ommolo ommolupti doluptasitat fugia voluptate eostiatur? Quiat alianda estrum quassum quia quae ese dolliquias dolut eum que voluptatur? Genditi umquae nos enduntium raecea sim sum lacidia porporro torrum hic tem fuga. Atinvento consequi quo dolorem quatese quodio inctusam lacerehent volupti que nusam quaturio ipsapit atiatur aboreptatur suntiis adi anis venihil lianitatate aut lab is serunt. Olorem arit utas volessime et es ea cullaborum et plibus accus, int lautemod que santi vent. Igenis aut pro endus ma isitam aperae inihit, quo ipsum voluptaspita velentor accuptature mo qui in pra sa vellatur ad modiate officiatur? In nobit quae cus moluptur';

dateFormatConstant = 'mm/dd/yy';

var Mybookingpal = {

    paymentSupported: true,

    currency: {
        "AED": "AED",
        "AFN": "AFN",
        "ALL": "ALL",
        "AMD": "AMD",
        "ANG": "ANG",
        "AOA": "AOA",
        "ARS": "ARS",
        "AUD": "A$",
        "AWG": "AWG",
        "AZN": "AZN",
        "BAM": "BAM",
        "BBD": "BBD",
        "BDT": "BDT",
        "BGN": "BGN",
        "BHD": "BHD",
        "BIF": "BIF",
        "BMD": "BMD",
        "BND": "BND",
        "BOB": "BOB",
        "BRL": "R$",
        "BSD": "BSD",
        "BTN": "BTN",
        "BWP": "BWP",
        "BYR": "BYR",
        "BZD": "BZD",
        "CAD": "CA$",
        "CDF": "CDF",
        "CHF": "&#8355;",
        "CLP": "CLP",
        "CNY": "&#165;",
        "COP": "COP",
        "CRC": "CRC",
        "CUC": "CUC",
        "CUP": "CUP",
        "CVE": "CVE",
        "CZK": "CZK",
        "DJF": "DJF",
        "DKK": "kr.",
        "DOP": "DOP",
        "DZD": "DZD",
        "EGP": "EGP",
        "ERN": "ERN",
        "ETB": "ETB",
        "EUR": "&#128;",
        "FJD": "FJD",
        "FKP": "FKP",
        "GBP": "&#163;",
        "GEL": "GEL",
        "GGP": "GGP",
        "GHS": "GHS",
        "GIP": "GIP",
        "GMD": "GMD",
        "GNF": "GNF",
        "GTQ": "GTQ",
        "GYD": "GYD",
        "HKD": "HKD",
        "HNL": "HNL",
        "HRK": "HRK",
        "HTG": "HTG",
        "HUF": "HUF",
        "IDR": "IDR",
        "ILS": "&#8362;",
        "IMP": "IMP",
        "INR": "&#x20B9;",
        "IQD": "IQD",
        "IRR": "IRR",
        "ISK": "ISK",
        "JEP": "JEP",
        "JMD": "JMD",
        "JOD": "JOD",
        "JPY": "&#165;",
        "KES": "KES",
        "KGS": "KGS",
        "KHR": "KHR",
        "KMF": "KMF",
        "KPW": "&#8361;",
        "KRW": "KRW",
        "KWD": "KWD",
        "KYD": "KYD",
        "KZT": "KZT",
        "LAK": "LAK",
        "LBP": "LBP",
        "LKR": "LKR",
        "LRD": "LRD",
        "LSL": "LSL",
        "LTL": "LTL",
        "LYD": "LYD",
        "MAD": "MAD",
        "MDL": "MDL",
        "MGA": "MGA",
        "MKD": "MKD",
        "MMK": "MMK",
        "MNT": "MNT",
        "MOP": "MOP",
        "MRO": "MRO",
        "MUR": "MUR",
        "MVR": "MVR",
        "MWK": "MWK",
        "MXN": "Mex$",
        "MYR": "MYR",
        "MZN": "MZN",
        "NAD": "NAD",
        "NGN": "NGN",
        "NIO": "NIO",
        "NOK": "kr",
        "NPR": "NPR",
        "NZD": "NZD",
        "OMR": "OMR",
        "PAB": "PAB",
        "PEN": "PEN",
        "PGK": "PGK",
        "PHP": "PHP",
        "PKR": "PKR",
        "PLN": "PLN",
        "PYG": "PYG",
        "QAR": "QAR",
        "RON": "RON",
        "RSD": "RSD",
        "RUB": "₽",
        "RWF": "RWF",
        "SAR": "SAR",
        "SBD": "SBD",
        "SCR": "SCR",
        "SDG": "SDG",
        "SEK": "kr",
        "SGD": "S$",
        "SHP": "SHP",
        "SLL": "SLL",
        "SOS": "SOS",
        "SRD": "SRD",
        "STD": "STD",
        "SVC": "SVC",
        "SYP": "SYP",
        "SZL": "SZL",
        "THB": "฿",
        "TJS": "TJS",
        "TMT": "TMT",
        "TND": "TND",
        "TOP": "TOP",
        "TRY": "TRY",
        "TTD": "TTD",
        "TVD": "TVD",
        "TWD": "TWD",
        "TZS": "TZS",
        "UAH": "UAH",
        "UGX": "UGX",
        "TRL": "&#8366;",
        "USD": "$",
        "UYU": "UYU",
        "UZS": "UZS",
        "VEF": "VEF",
        "VND": "VND",
        "VUV": "VUV",
        "WST": "WST",
        "XAF": "XAF",
        "XCD": "XCD",
        "XDR": "XDR",
        "XOF": "XOF",
        "XPF": "XPF",
        "YER": "YER",
        "ZAR": "R",
        "ZMW": "ZMW",
        "ZWD": "ZWD"
    },

    settings: {
        'pos': '',
        'product_id': 0,
        'date_start': '',
        'date_end': '',
        'currency': 'USD',
        'adults': 2,
        'child': 0
    },

    formatPrice: function( price ){
        return parseFloat(price).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    init: function( ){
        // Append window popups
        if ( jQuery_1_9_1('#popup_window_book_step1').length == 0 ) jQuery_1_9_1('body').append( window_1 );
        if ( jQuery_1_9_1('#popup_window_book_step2').length == 0 ) jQuery_1_9_1('body').append( window_2 );
        if ( jQuery_1_9_1('#popup_window_book_step3').length == 0 ) jQuery_1_9_1('body').append( window_3 );
        if ( jQuery_1_9_1('#popupWindowPrivacyPolicy').length == 0 ) jQuery_1_9_1('body').append( privacyPopupWindow );
        if ( jQuery_1_9_1('#popupWindowRentalAgreement').length == 0 ) jQuery_1_9_1('body').append( rentalAgreementPopupWindow );
        if ( jQuery_1_9_1('#popupWindowContactOwner').length == 0 ) jQuery_1_9_1('body').append( contactPopupWindow );

        jQuery_1_9_1('#popupBookStep2SubmitBtn').click( Mybookingpal.goStep2 );
        jQuery_1_9_1('#popup_window_book_step1 .popup_close_btn, #popup_window_book_step2 .popup_close_btn').click( Mybookingpal.close );

        // jQuery_1_9_1('#popup_window_book_step2 .popup_book_step2_submit_btn').click( Mybookingpal.confirmBooking );
        jQuery_1_9_1('#popup_window_book_step2 .popup_book_step2_submit_btn').on('click', function(){
            Mybookingpal.confirmBooking();
        });

        //popup Privacy Policy
        jQuery_1_9_1('#popupBookStep2ShowPrivacyBtn').click(function () { Mybookingpal.goPrivacyPolicy(); });
        jQuery_1_9_1('#popupBookStep2ShowTermsBtn').click(function () { Mybookingpal.goTermsConditions(); });
        jQuery_1_9_1('#popupPrivacyCloseBtn, #popupWindowPrivacyPolicy .popup_window_privacy_back').click( Mybookingpal.closePrivacyPolicy );

        //popup Rental Agreement
        jQuery_1_9_1('#popupBookStep2ShowRentalAgreementBtn').click( Mybookingpal.goRentalAgreement );
        jQuery_1_9_1('#popupRentalAgreementPrintBtn').click( Mybookingpal.printRentalAgreement );
        jQuery_1_9_1('#popupRentalAgreementCloseBtn, #popupWindowRentalAgreement .popup_rental_agreement_back').click( Mybookingpal.closeRentalAgreement );

        // Close window when click on black background
        jQuery_1_9_1('#popup_window_book_step1 .popup_window_search_result_back, #popup_window_book_step2 .popup_window_search_result_back, #popup_window_book_step3 .popup_window_search_result_back').click( Mybookingpal.close );

        jQuery_1_9_1('#bookPaymentCountry').change( function(){
            if ( jQuery_1_9_1(this).val() == "US" ){
                jQuery_1_9_1('#razor_step2_state_block').show();
                jQuery_1_9_1('#razor_step2_postal_code').text("Zip code");
            } else {
                jQuery_1_9_1('#razor_step2_state_block').hide();
                jQuery_1_9_1('#razor_step2_postal_code').text("Postal code");
            }
        });

        jQuery_1_9_1('#bookAdultsNumber').change( function(){
            var tmp = Mybookingpal.settings.child;
            Mybookingpal.clearFields();
            Mybookingpal.setParams({'adults': jQuery_1_9_1('#bookAdultsNumber').val()});
            Mybookingpal.settings.child = tmp;
            Mybookingpal.runQuoteAPI();
        });

        jQuery_1_9_1('#bookChildrenNumber').change( function(){
            Mybookingpal.clearFields();
            Mybookingpal.setParams({'child': jQuery_1_9_1('#bookChildrenNumber').val()});
            Mybookingpal.runQuoteAPI();
        });

        //textarea character counter
        jQuery_1_9_1('#bookTextareaNotes').keyup(function () {
            var max = 3000;
            var len = jQuery_1_9_1(this).val().length;

            if (len >= max) {
                jQuery_1_9_1('#bookStep2TexareaNumberOfCharacterLeft').text('You have reached the limit');
            } else {
                var char = max - len;
                jQuery_1_9_1('#bookStep2TexareaNumberOfCharacterLeft').text(char + ' characters left');
            }
        });

        // Fix placeholders for ie9
        jQuery_1_9_1("#popup_window_book_step2 input, #popup_window_book_step2 textarea").each(
            function( ){
                if ( jQuery_1_9_1(this).val() == "" && jQuery_1_9_1(this).attr("placeholder") != "" && typeof jQuery_1_9_1(this).attr("placeholder") != "undefined" ){

                    jQuery_1_9_1(this).addClass('plchldr').val(jQuery_1_9_1(this).attr("placeholder"));

                    jQuery_1_9_1(this).keyup( function(){
                        if ( jQuery_1_9_1(this).val() != "" ){ jQuery_1_9_1(this).removeClass('plchldr'); } else {  jQuery_1_9_1(this).addClass('plchldr'); }
                    });
                    jQuery_1_9_1(this).focus(function(){
                        if(jQuery_1_9_1(this).val()==jQuery_1_9_1(this).attr("placeholder")) jQuery_1_9_1(this).val("");
                    });
                    jQuery_1_9_1(this).blur(function(){
                        if( jQuery_1_9_1(this).val()=="") jQuery_1_9_1(this).val(jQuery_1_9_1(this).attr("placeholder") );
                        if ( jQuery_1_9_1(this).val() == jQuery_1_9_1(this).attr('placeholder') ){ jQuery_1_9_1(this).addClass('plchldr'); }
                    });
                } else {
                    jQuery_1_9_1(this).removeClass('plchldr');
                }
            });

        jQuery_1_9_1.getScript( SITE_URL + "scripts/inc/jquery.simple-dtpicker.js", function(){

            jQuery_1_9_1('#test111').appendDtpicker({
                "dateFormat": "MM/DD/YYYY",
                "dateOnly": true,
                "closeOnSelected": true
            });

            jQuery_1_9_1('#popupBookCheckInDatepickerField').appendDtpicker({
                "dateFormat": "MM/DD/YYYY",
                "dateOnly": true,
                "closeOnSelected": true,
                "minDate": new Date(),
                "onSelectDate": function(){
                    Mybookingpal.clearFields();
                    Mybookingpal.setParams({'date_start': Mybookingpal.usa2mysql(jQuery_1_9_1('#popupBookCheckInDatepickerField').val())});
                    Mybookingpal.runQuoteAPI();
                }
            });

            jQuery_1_9_1('#popupBookCheckOutDatepickerField').appendDtpicker({
                "dateFormat": "MM/DD/YYYY",
                "dateOnly": true,
                "closeOnSelected": true,
                "minDate": new Date(),
                "onSelectDate": function(){
                    Mybookingpal.clearFields();
                    Mybookingpal.setParams({'date_end': Mybookingpal.usa2mysql(jQuery_1_9_1('#popupBookCheckOutDatepickerField').val())});
                    Mybookingpal.runQuoteAPI();
                }
            });
        });


        jQuery_1_9_1.getScript(SITE_URL + "scripts/inc/nano_scroller.js", function(){
            // jQuery_1_9_1("#popup_window_book_step1 .nano").nanoScroller();
        });

        jQuery_1_9_1('#popupContactClose').click( Mybookingpal.closeContactWindowPopup );
        jQuery_1_9_1('#popupContactSendEmail').click( Mybookingpal.contactWindowSendEmail );
        jQuery_1_9_1('#popupContactShowPrivacyBtn').click(function () { Mybookingpal.goPrivacyPolicy(); });

        Mybookingpal.initCustomSelectFieldOptions();

        // Hide pop-up's
        Mybookingpal.close();
    },

    setParams: function( params ){
        for (var k in params){
            this.settings[k] = params[k];
        }
    },

    processPopUp: function( i ){
        switch ( i ){
            case 1:
                if( jQuery_1_9_1('.popup_book_step1_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
                    jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
                } else {
                    jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': (jQuery_1_9_1('.popup_book_step1_content_wrapper').height() + 40) + 'px' });
                }
                jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').height() / 2 ) + 'px'});
                jQuery_1_9_1("#popup_window_book_step1 .nano").nanoScroller();

                /*
                if( jQuery_1_9_1('.popup_book_step1_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
                    jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
                } else {
                    jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': jQuery_1_9_1('.popup_book_step1_content_wrapper').height() + 'px' });
                }
                jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').height() / 2 ) + 'px'});
                jQuery_1_9_1("#popup_window_book_step1 .nano").nanoScroller();
                */
                break;
            case 2:
                if( jQuery_1_9_1('.popup_book_step2_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
                    jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
                } else {
                    jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': (jQuery_1_9_1('.popup_book_step2_content_wrapper').height() + 40) + 'px' });
                }
                jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').height() / 2 ) + 'px'});
                jQuery_1_9_1("#popup_window_book_step2 .nano").nanoScroller();
                /* if( jQuery_1_9_1('.popup_book_step2_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });} else {jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': jQuery_1_9_1('.popup_book_step2_content_wrapper').height() + 'px' });}jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').height() / 2 ) + 'px'});jQuery_1_9_1("#popup_window_book_step2 .nano").nanoScroller(); */
                break;
            case 3:
                if( jQuery_1_9_1('.popup_book_step3_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
                    jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
                } else {
                    jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': (jQuery_1_9_1('.popup_book_step3_content_wrapper').height() + 40) + 'px' });
                }
                jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').height() / 2 ) + 'px'});
                jQuery_1_9_1("#popup_window_book_step3 .nano").nanoScroller();
                /*if( jQuery_1_9_1('.popup_book_step3_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });} else {jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': jQuery_1_9_1('.popup_book_step3_content_wrapper').height() + 'px' });}jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').height() / 2 ) + 'px'}); jQuery_1_9_1("#popup_window_book_step3 .nano").nanoScroller();*/
                break;
        }
    },

    goStep1: function(){
        jQuery_1_9_1('#popup_window_book_step2').hide();
        jQuery_1_9_1('#popup_window_book_step3').hide();
        jQuery_1_9_1('#popup_window_book_step1').show();
        Mybookingpal.processPopUp( 1 ); Mybookingpal.processPopUp( 1 );

        /*
         if( jQuery_1_9_1('.popup_book_step1_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
         jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
         } else {
         jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': jQuery_1_9_1('.popup_book_step1_content_wrapper').height() + 'px' });
         }
         jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').height() / 2 ) + 'px'});
         jQuery_1_9_1("#popup_window_book_step1 .nano").nanoScroller();
         */

        /*
         if( jQuery_1_9_1('.popup_book_step1_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
         jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
         } else {
         jQuery_1_9_1('#popup_window_book_step1 .nano').css({'height': jQuery_1_9_1('.popup_book_step1_content_wrapper').height() + 'px' });
         }
         jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result .popup_book_step1_wrapper').height() / 2 ) + 'px'});
         jQuery_1_9_1("#popup_window_book_step1 .nano").nanoScroller();
         */
    },

    goStep2: function(){
        jQuery_1_9_1('#razor_step2_arival_date').text( jQuery_1_9_1('#popupBookCheckInDatepickerField').val() );
        jQuery_1_9_1('#razor_step2_departure_date').text( jQuery_1_9_1('#popupBookCheckOutDatepickerField').val() );

        jQuery_1_9_1('#razor_step2_adults').text( jQuery_1_9_1('#bookAdultsNumber').val() );
        jQuery_1_9_1('#razor_step2_children').text( jQuery_1_9_1('#bookChildrenNumber').val() );

        jQuery_1_9_1('#popup_window_book_step1').hide();
        jQuery_1_9_1('#popup_window_book_step3').hide();
        jQuery_1_9_1('#popup_window_book_step2').show();

        jQuery_1_9_1('#bp_widget_progress').hide();

        Mybookingpal.processPopUp(2); Mybookingpal.processPopUp(2);


        /*
         if( jQuery_1_9_1('.popup_book_step2_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
         jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
         } else {
         jQuery_1_9_1('#popup_window_book_step2 .nano').css({'height': jQuery_1_9_1('.popup_book_step2_content_wrapper').height() + 'px' });
         }
         jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment .popup_book_step2_wrapper').height() / 2 ) + 'px'});
         jQuery_1_9_1("#popup_window_book_step2 .nano").nanoScroller();
         */
    },

    goStep3: function(){
        jQuery_1_9_1('#popup_window_book_step1').hide();
        jQuery_1_9_1('#popup_window_book_step2').hide();
        jQuery_1_9_1('#popup_window_book_step3').show();
        Mybookingpal.processPopUp(3); Mybookingpal.processPopUp(3);

        /*
         if( jQuery_1_9_1('.popup_book_step3_content_wrapper').height() / jQuery_1_9_1(window).height() > 0.9 ){
         jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': Math.floor( jQuery_1_9_1(window).height() - 140 ) + 'px' });
         } else {
         jQuery_1_9_1('#popup_window_book_step3 .nano').css({'height': jQuery_1_9_1('.popup_book_step3_content_wrapper').height() + 'px' });
         }
         jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').css({'marginTop': '-' + Math.floor( jQuery_1_9_1('.popup_window_search_result_payment_created .popup_book_step3_wrapper').height() / 2 ) + 'px'});
         jQuery_1_9_1("#popup_window_book_step3 .nano").nanoScroller();
         */
    },

    goPrivacyPolicy: function(){
		var url = SITE_URL + 'privacy-policy/html',
			s = this;

		jQuery_1_9_1('#popupPrivacyContentDiv').load(url, function () {
			jQuery_1_9_1(this).find('.terms_popup_link').click(function () {
				s.goTermsConditions();
				return false;
			});
			jQuery_1_9_1('#popupWindowPrivacyPolicy').show();
		});
    },


    goTermsConditions: function(){
        var url = SITE_URL + 'terms-conditions/html',
			s = this;

		jQuery_1_9_1('#popupPrivacyContentDiv').load(url, function () {
			jQuery_1_9_1(this).find('.privacy_popup_link').click(function () {
				s.goPrivacyPolicy();

				return false;
			});
			jQuery_1_9_1('#popupWindowPrivacyPolicy').show();
		});
    },

    closePrivacyPolicy: function(){
        jQuery_1_9_1('#popupWindowPrivacyPolicy').hide();
    },

    goRentalAgreement: function(){
        jQuery_1_9_1('#popupRentalAgreementAgreementTextContendDiv').text(tempContentOfRentalAgreementTextForPopup);
        jQuery_1_9_1('#popupRentalAgreementCheckInDateValue').text(jQuery_1_9_1('#razor_step2_arival_date').text());
        jQuery_1_9_1('#popupRentalAgreementCheckOutDateValue').text(jQuery_1_9_1('#razor_step2_departure_date').text());
        jQuery_1_9_1('#popupRentalAgreementTotalPriceValue').text(jQuery_1_9_1('#razor_step2_payment_total').text());
        jQuery_1_9_1('#popupRentalAgreementCancellationPolicyValue').text(jQuery_1_9_1('#razor_step2_cacelation').text());
        jQuery_1_9_1('#popupWindowRentalAgreement').show();
    },

    printRentalAgreement: function(){
        if (jQuery_1_9_1('iframe#printf').size() == 0) {
            var dataContent = jQuery_1_9_1('#popupRentalAgreementContentForPrint').html();
            jQuery_1_9_1('body').append('<iframe id="printf" name="printf" width="1" height="0"></iframe>');  // an iFrame is added to the html content,

            var mywindow = window.frames["printf"];
            mywindow.document.write('<html><head><title>Rental Agreement</title><style>@page{margin: 25mm 5mm 25mm 5mm;}</style>'
                + '<link rel="stylesheet" type="text/css" href="../css/widget.css" />'
                + '</head><body><div>'
                + dataContent
                + '</div></body></html>'
            );

            mywindow.document.close();
            mywindow.focus();
            mywindow.print();

            setTimeout(function () {
                jQuery_1_9_1('iframe#printf').remove();
            }, 100);
        }
        return true;
    },

    closeRentalAgreement: function(){
        jQuery_1_9_1('#popupWindowRentalAgreement').hide();
    },

    contactWindowSendEmail: function(){
        var date_start = jQuery_1_9_1('#popupContactCheckInDatepickerField').val(),
            date_end = jQuery_1_9_1('#popupContactCheckOutDatepickerField').val(),
            flexible_departure_dates = jQuery_1_9_1('#contactFlexibleDepartureDates').val(),
            firstname = jQuery_1_9_1('#contactFirstName').val(),
            familyname = jQuery_1_9_1('#contactLastName').val(),
            emailaddress = jQuery_1_9_1('#contactEmailAddress').val(),
            phoneNumber = jQuery_1_9_1('#contactPhoneNumber').val(),
            country = jQuery_1_9_1('#contactCountry').val(),
            adultNumber = jQuery_1_9_1('#contactAdultsNumber').val(),
            childrenNumber = jQuery_1_9_1('#contactChildrenNumber').val(),
            messageText = jQuery_1_9_1('#contactMessageText').val();

        var error = false;

        if ( firstname == '' ){ jQuery_1_9_1('#contactFirstName').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#contactFirstName').removeClass('popup_window_red_input_field'); }
        if ( familyname == '' ){ jQuery_1_9_1('#contactLastName').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#contactLastName').removeClass('popup_window_red_input_field'); }
        if ( emailaddress == '' ){ jQuery_1_9_1('#contactEmailAddress').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#contactEmailAddress').removeClass('popup_window_red_input_field'); }
        if ( phoneNumber == '' ){ jQuery_1_9_1('#contactPhoneNumber').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#contactPhoneNumber').removeClass('popup_window_red_input_field'); }

        if ( error == true ) {
            return false;
        }

        //send email
        jQuery_1_9_1('#popupWindowContactOwner').hide();

    },

    closeContactWindowPopup: function(){
        jQuery_1_9_1('#popupWindowContactOwner').hide();
    },

    close: function(){
        jQuery_1_9_1('#popup_window_book_step1').hide();
        jQuery_1_9_1('#popup_window_book_step2').hide();
        jQuery_1_9_1('#popup_window_book_step3').hide();
    },

    setDatepickerCheckOutMinDate: function(fieldId,checkInSelectedDate){
        var endMinDate = new Date(checkInSelectedDate)
        endMinDate.setDate(endMinDate.getDate() + 1);
        jQuery_1_9_1("#"+fieldId).datepicker("option", "minDate", endMinDate);
    },

    setDatepickerCheckInMaxDate: function(fieldId, checkOutSelectedDate){
        var startMaxDate = new Date(checkOutSelectedDate)
        startMaxDate.setDate(startMaxDate.getDate() - 1);
        jQuery_1_9_1("#"+fieldId).datepicker("option", "maxDate", startMaxDate);
    },

    diff2dates: function(date_start, date_end){
        var date1 = new Date( date_start),
            date2 = new Date( date_end );
        date1.setHours(0); date1.setMinutes(0); date1.setSeconds(0);
        date2.setHours(0); date2.setMinutes(0); date2.setSeconds(0);
        return Math.round( (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) );
    },

    mysql2usa: function( date ){
        var tmp = date.split("-");
        return tmp[1] + '/' + tmp[2] +'/' + tmp[0];
    },

    usa2mysql: function( date ){
        var tmp = date.split("/");
        return tmp[2] + '-' + tmp[0] +'-' + tmp[1];
    },

    addDate: function( date, num, mysql ){
        if ( date.indexOf('-') == -1 ){
            var date = date.split('/');
        } else {
            var tmp = date.split('-');
            var date = [tmp[1], tmp[2], tmp[0]];
        }

        var tmp = new Date();
        tmp.setFullYear( date[2] );
        tmp.setMonth(parseInt(date[0]) - parseInt(1), parseInt(date[1]) + parseInt(num));
        tmp.setHours(0);
        tmp.setMinutes(0);
        tmp.setSeconds(0);

        if ( typeof mysql == 'undefined' ){
            return tmp.getFullYear() + '-' + ('0'+ (tmp.getMonth()+1) ).slice(-2) + '-' + ('0'+tmp.getDate()).slice(-2);
        } else {
            return ('0'+ (tmp.getMonth()+1) ).slice(-2) + '/' + ('0'+tmp.getDate()).slice(-2) + '/' + tmp.getFullYear();
        }
    },
    /*
     addDate: function( date, num, mysql ){
     var tmp = new Date( date );
     tmp.setHours(0);
     tmp.setMinutes(0);
     tmp.setSeconds(0);
     tmp.setMilliseconds(0);

     var result = new Date( tmp.getTime() + num * (1000 * 60 * 60 * 24) )

     if ( typeof mysql == 'undefined' ){
     return result.getFullYear() + '-' + ('0'+ (result.getMonth()+1) ).slice(-2) + '-' + ('0'+result.getDate()).slice(-2);
     } else {
     return ('0'+ (result.getMonth()+1) ).slice(-2) + '/' + ('0'+result.getDate()).slice(-2) + '/' + result.getFullYear();
     }
     },*/

    clearFields: function(){
        jQuery_1_9_1('#bookEmailAddress').val('');
        jQuery_1_9_1('#bookFirstName').val('');
        jQuery_1_9_1('#bookLastName').val('');
        jQuery_1_9_1('#bookPhoneNumber').val('');

        jQuery_1_9_1('#bookTextareaNotes').val('');

        jQuery_1_9_1('#bookPaymentCardNumber').val('');

        jQuery_1_9_1('#bookExpirationDateMonth').val(1);
        jQuery_1_9_1('#bookExpirationDateYear').val( 2015 );

        jQuery_1_9_1('#bookPaymentSecurityCode').val('');
        jQuery_1_9_1('#bookPaymentAddress').val('');
        jQuery_1_9_1('#bookPaymentCity').val('');
        jQuery_1_9_1('#bookPaymentPostalCode').val('');

        jQuery_1_9_1('#bookPaymentCountry').val(0);
        jQuery_1_9_1('#bookPaymentState').val(1);

        jQuery_1_9_1('#bookBirthdateMonth').val('');
        jQuery_1_9_1('#bookBirthdateDay').val('');
        jQuery_1_9_1('#bookBirthdateYear').val('');

        jQuery_1_9_1('#bookPets, #bookAgreeWithTerms').removeProp('checked');
        jQuery_1_9_1('#bookAgreeWithTermsError').removeClass('error');

        jQuery_1_9_1('#razor_step1_included, #razor_step1_excluded').empty();

        jQuery_1_9_1('#bookEmailAddress, #bookFirstName, #bookLastName, #bookPhoneNumber, #bookTextareaNotes, #bookPaymentCardNumber, #bookPaymentSecurityCode, #bookPaymentAddress, #bookPaymentCity, #bookPaymentPostalCode, #bookBirthdateMonth, #bookBirthdateDay, #bookBirthdateYear, #bookPaymentCountry').removeClass('popup_window_red_input_field');

        jQuery_1_9_1("#popup_window_book_step2 input, #popup_window_book_step2 textarea").each(function( ){
            if ( jQuery_1_9_1(this).val()=="" && jQuery_1_9_1(this).attr("placeholder") != "" && typeof jQuery_1_9_1(this).attr("placeholder") != "undefined" ){
                jQuery_1_9_1(this).addClass('plchldr').val(jQuery_1_9_1(this).attr("placeholder"));
            } else {
                jQuery_1_9_1(this).removeClass('plchldr');
            }});

        Mybookingpal.settings.child = 0;
    },

    confirmBooking: function(){
        var adult = jQuery_1_9_1('#bookAdultsNumber').val(),
            child = jQuery_1_9_1('#bookChildrenNumber').val(),
            emailaddress = encodeURIComponent(jQuery_1_9_1('#bookEmailAddress').val()),
            firstname = encodeURIComponent(jQuery_1_9_1('#bookFirstName').val()),
            familyname = encodeURIComponent(jQuery_1_9_1('#bookLastName').val()),

            cardnumber = encodeURIComponent(jQuery_1_9_1('#bookPaymentCardNumber').val()),
            cardmonth = encodeURIComponent(jQuery_1_9_1('#bookExpirationDateMonth').val()),
            cardyear = encodeURIComponent(jQuery_1_9_1('#bookExpirationDateYear').val()),
            cardtype = jQuery_1_9_1('#bookPaymentCardType').val(),

            telnumber = encodeURIComponent(jQuery_1_9_1('#bookPhoneNumber').val()),
            notes = ( jQuery_1_9_1('#bookTextareaNotes').val() == jQuery_1_9_1('#bookTextareaNotes').attr('placeholder') ) ? '' : encodeURIComponent(jQuery_1_9_1('#bookTextareaNotes').val()),

        // additional fields
        // payment_total_value = jQuery_1_9_1('#bookPaymentTotalValue').val(),
            cc_security_code = encodeURIComponent(jQuery_1_9_1('#bookPaymentSecurityCode').val()),
            cc_address = encodeURIComponent(jQuery_1_9_1('#bookPaymentAddress').val()),
            cc_country = jQuery_1_9_1('#bookPaymentCountry').val(),
            cc_state = jQuery_1_9_1('#bookPaymentState').val(),
            cc_city = encodeURIComponent(jQuery_1_9_1('#bookPaymentCity').val()),
            cc_zip = encodeURIComponent(jQuery_1_9_1('#bookPaymentPostalCode').val()),

            bd_m = encodeURIComponent(jQuery_1_9_1('#bookBirthdateMonth').val()),
            bd_d = encodeURIComponent(jQuery_1_9_1('#bookBirthdateDay').val()),
            bd_y = encodeURIComponent(jQuery_1_9_1('#bookBirthdateYear').val()),

            amount = jQuery_1_9_1('#bookPaymentTotalValue').val(),

            error = false;

        // If empty fields than set they value to 0
        if ( cc_city == '' ) cc_city = 0;
        if ( cc_address == '' ) cc_address = 0;
        if ( cc_state == '' ) cc_state = 0;
        if ( cc_country == '' ) cc_country = 0;
        if ( cc_security_code == '' ) cc_security_code = 0;
        if ( cardnumber == '' ) cardnumber = 0;
        if ( bd_m == '' ) bd_m = 0;
        if ( bd_d == '' ) bd_d = 0;
        if ( bd_y == '' ) bd_y = 0;
        if ( cc_zip == '' ) cc_zip = 0;

        if ( emailaddress == '' || emailaddress == jQuery_1_9_1('#bookEmailAddress').attr('placeholder') ){ jQuery_1_9_1('#bookEmailAddress').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookEmailAddress').removeClass('popup_window_red_input_field'); }
        if ( firstname == '' || firstname == jQuery_1_9_1('#bookFirstName').attr('placeholder') ){ jQuery_1_9_1('#bookFirstName').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookFirstName').removeClass('popup_window_red_input_field'); }
        if ( familyname == '' || familyname == jQuery_1_9_1('#bookLastName').attr('placeholder') ){ jQuery_1_9_1('#bookLastName').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookLastName').removeClass('popup_window_red_input_field'); }
        if ( telnumber == '' || telnumber == jQuery_1_9_1('#bookPhoneNumber').attr('placeholder') ){ jQuery_1_9_1('#bookPhoneNumber').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPhoneNumber').removeClass('popup_window_red_input_field'); }

        if ( Mybookingpal.paymentSupported ){
            if ( cardnumber == '' ){ jQuery_1_9_1('#bookPaymentCardNumber').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentCardNumber').removeClass('popup_window_red_input_field'); }
            if ( cc_security_code == '' ){ jQuery_1_9_1('#bookPaymentSecurityCode').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentSecurityCode').removeClass('popup_window_red_input_field'); }
            if ( cc_address == '' ){ jQuery_1_9_1('#bookPaymentAddress').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentAddress').removeClass('popup_window_red_input_field'); }
            if ( cc_city == '' ){ jQuery_1_9_1('#bookPaymentCity').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentCity').removeClass('popup_window_red_input_field'); }
            if ( cc_zip == '' ){ jQuery_1_9_1('#bookPaymentPostalCode').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentPostalCode').removeClass('popup_window_red_input_field'); }
            if ( cardnumber == '' ){ jQuery_1_9_1('#bookPaymentCardNumber').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentCardNumber').removeClass('popup_window_red_input_field'); }

            if ( cc_country == 0 ){ jQuery_1_9_1('#bookPaymentCountry').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookPaymentCountry').removeClass('popup_window_red_input_field'); }

            if ( bd_m == '' ){ jQuery_1_9_1('#bookBirthdateMonth').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookBirthdateMonth').removeClass('popup_window_red_input_field'); }
            if ( bd_d == '' ){ jQuery_1_9_1('#bookBirthdateDay').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookBirthdateDay').removeClass('popup_window_red_input_field'); }
            if ( bd_y == '' ){ jQuery_1_9_1('#bookBirthdateYear').addClass('popup_window_red_input_field'); error = true; } else { jQuery_1_9_1('#bookBirthdateYear').removeClass('popup_window_red_input_field'); }
        }

        if ( jQuery_1_9_1('#bookAgreeWithTerms:checked').length == 0 ){ jQuery_1_9_1('#bookAgreeWithTermsError').addClass('error'); alert('You need to read and agree with the Rental Agreement, Privacy Policy and Terms & Conditions.'); error = true; } else { jQuery_1_9_1('#bookAgreeWithTermsError').removeClass('error'); }

        if ( error == true ) {
            return false;
        }

        var additional_params = /* "&payment_total_value=" + payment_total_value + */ "&cc_security_code=" + cc_security_code + "&cc_address=" + cc_address + "&cc_country=" + cc_country + "&cc_state=" + cc_state + "&cc_zip=" + cc_zip + "&cc_city=" + cc_city + "&cc_bdm=" + bd_m + "&cc_bdd=" + bd_d + "&cc_bdy="+bd_y ;

        var url =  API_URL + "xml/services/json/reservation/payment/create?pos=" + Mybookingpal.settings.pos + "&productid=" + Mybookingpal.settings.product_id + "&fromdate=" + Mybookingpal.settings.date_start + "&todate=" + Mybookingpal.settings.date_end + "&currency=" + Mybookingpal.settings.currency + "&adult=" + adult + "&child=" + child + "&emailaddress=" + emailaddress + "&familyname=" + familyname + "&firstname=" + firstname + "&cardnumber=" + cardnumber + "&cardmonth=" + cardmonth + "&cardyear=" + cardyear + "&amount=" + amount + "&telnumber=" + telnumber + "&cardtype=" + cardtype + "&notes=" + notes + additional_params + "&jsonp=?";

        jQuery_1_9_1('#popup_window_book_step2 .popup_book_step2_submit_btn').off('click');
        jQuery_1_9_1('#bp_widget_progress').show();

        jQuery_1_9_1.getJSON(
            url,
            function( data ){
                Mybookingpal.parsePaymentCreateAPI( data );
            }
        );
    },

    parsePaymentCreateAPI: function( data ){
        var message = "Property booked successfully!";
        jQuery_1_9_1('#bp_widget_progress').hide();
        jQuery_1_9_1('#popup_window_book_step2 .popup_book_step2_submit_btn').on('click', function(){
            Mybookingpal.confirmBooking();
        });

        if ( data.reservation_response.is_error == true ){
            var message = data.reservation_response.message;
            if ( message.indexOf(':') != -1 ){
                message = message.split(':').slice(1).join('');
            }
            jQuery_1_9_1('#popup_window_book_step1 .popup_content_error, #popup_window_book_step2 .popup_content_error').text( message );
            return;
        } else {
            // Init data on pop-up
            jQuery_1_9_1('#razor_step3_username').text( jQuery_1_9_1('#bookFirstName').val() + ' ' + jQuery_1_9_1('#bookLastName').val() ); // FName & LName
            jQuery_1_9_1('#razor_step3_userpass').text( jQuery_1_9_1('#bookEmailAddress').val() ); // Email

            jQuery_1_9_1('#razor_step3_pmname').text( data.reservation_response.propertyManagerName );
            jQuery_1_9_1('#razor_step3_pmname2').text( data.reservation_response.propertyName + ' ' + data.reservation_response.propertyAddress )

            // -----------------------

            jQuery_1_9_1('#razor_step3_bnumber').text( data.reservation_response.reservation.id );
            jQuery_1_9_1('#razor_step3_email').text( data.reservation_response.propertyManagerEmail ); // Email
            jQuery_1_9_1('#razor_step3_details').text( Mybookingpal.diff2dates(Mybookingpal.settings.date_start, Mybookingpal.settings.date_end) + ' night(s)' );

            jQuery_1_9_1('#razor_step3_checkin').text( Mybookingpal.addDate(data.reservation_response.reservation.checkin, 0, false) );
            jQuery_1_9_1('#razor_step3_checkout').text( Mybookingpal.addDate(data.reservation_response.reservation.checkout, 0, false) );

            jQuery_1_9_1('#razor_step3_firstpayment').html( Mybookingpal.currency[data.reservation_response.reservation.currency] + ' ' + data.reservation_response.downPayment );
            jQuery_1_9_1('#razor_step3_totalprice').html( Mybookingpal.currency[data.reservation_response.reservation.currency] + ' ' + data.reservation_response.reservation.price );

            Mybookingpal.goStep3();
        }
    },

    fill2ndStep: function(){
        jQuery_1_9_1('#bookEmailAddress').val( "melnikov.roman@gmail.com" ),
            jQuery_1_9_1('#bookFirstName').val("Roman"),
            jQuery_1_9_1('#bookLastName').val("Melnykov"),

            jQuery_1_9_1('#bookPaymentCardNumber').val("4111111111111111"),
            jQuery_1_9_1('#bookExpirationDateMonth').val("11"),
            jQuery_1_9_1('#bookExpirationDateYear').val("2018"),
            jQuery_1_9_1('#bookPaymentCardType').val("visa"),

            jQuery_1_9_1('#bookPhoneNumber').val("0954978744"),
            jQuery_1_9_1('#bookNotes').val( "some test order notes" );
    },

    showContact: function(id, date1, date2){
        jQuery_1_9_1('#popupContactCheckInDatepickerField').val(date1);
        jQuery_1_9_1('#popupContactCheckOutDatepickerField').val(date2);

        Mybookingpal.setDatepickerCheckOutMinDate("popupContactCheckOutDatepickerField",date1);
        Mybookingpal.setDatepickerCheckInMaxDate("popupContactCheckInDatepickerField",date2);

        jQuery_1_9_1('#popupWindowContactOwner').show();
    },

    showQuote: function( id, date1, date2, adults ){
        // Clear form fields
        Mybookingpal.clearFields();
        var form_date1 = date1,
            form_date2 = date2;

        if ( date1.indexOf('/') != -1 ){
            date1 = date1.split("/");
            date1 = date1[2] + '-' + date1[0] + '-' + date1[1];
        }

        if ( date2.indexOf('/') != -1 ){
            date2 = date2.split("/");
            date2 = date2[2] + '-' + date2[0] + '-' + date2[1];
        }

        this.settings.product_id = id;
        this.settings.date_start = date1;
        this.settings.date_end = date2;
        if ( typeof adults != 'undefined' ){
            this.settings.adults = adults;
        } else {
            this.settings.adults = 2;
        }

        // Show adults and childs on pop-up
        jQuery_1_9_1('#bookAdultsNumberView').text( Mybookingpal.settings.adults );
        jQuery_1_9_1('#bookAdultsNumber').val( Mybookingpal.settings.adults );

        jQuery_1_9_1('#bookChildrenNumberView').text( Mybookingpal.settings.child );
        jQuery_1_9_1('#bookChildrenNumber').val( Mybookingpal.settings.child );

        Mybookingpal.runQuoteAPI( );
    },

    parseQuoteAPI: function( data ){
        // Desable button
        jQuery_1_9_1('.bp_product_detail_preloader').parent().removeAttr('disabled').find('img').hide();

        if ( data.quotes.is_error ){
            jQuery_1_9_1('#popup_window_book_step1 .error_hide_area').hide();
        } else {
            jQuery_1_9_1('#popup_window_book_step1 .error_hide_area').show();
        }

        jQuery_1_9_1('#popup_window_book_step1 .popup_content_error, #popup_window_book_step2 .popup_content_error').text( data.quotes.message );

        try {
            jQuery_1_9_1('#popupBookCheckInDatepickerField').val( Mybookingpal.mysql2usa(Mybookingpal.settings.date_start) );
            jQuery_1_9_1('#popupBookCheckOutDatepickerField').val( Mybookingpal.mysql2usa(Mybookingpal.settings.date_end) );

            jQuery_1_9_1('#popupBookCheckInDatepickerField').val( Mybookingpal.mysql2usa(Mybookingpal.settings.date_start) );
            jQuery_1_9_1('#popupBookCheckOutDatepickerField').val( Mybookingpal.mysql2usa(Mybookingpal.settings.date_end) );

            if (data.quotes.available == true){
                jQuery_1_9_1('#razor_step1_availability').text('Available!');
            } else {
                jQuery_1_9_1('#razor_step1_availability').text('Unavailable!');
            }

            jQuery_1_9_1('#razor_step1_rental_amount').html( Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice(data.quotes.price.toFixed(2)) );

            // Get count nights
            jQuery_1_9_1('#razor_step1_rental_nigths').text( Mybookingpal.diff2dates(Mybookingpal.settings.date_start, Mybookingpal.settings.date_end) );

            if ( typeof data.quotes.cleaningFee == 'undefined' || data.quotes.cleaningFee == 0 ){
                jQuery_1_9_1('#popup_block1_cleaning_fee_block').hide();
            } else {
                jQuery_1_9_1('#razor_step1_cleening_fee').html( Mybookingpal.currency[Mybookingpal.settings.currency] + data.quotes.cleaningFee.toFixed(2));
                jQuery_1_9_1('#popup_block1_cleaning_fee_block').show();
            }

            if ( data.quotes.is_error == true ){
                data.quotes.firstPayment = 0;
                data.quotes.secondPayment = 0;
            }

            jQuery_1_9_1('#razor_step1_rental_quote_amount').html( Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice( data.quotes.quote.toFixed(2) ) );

            if ( typeof data.quotes.damageInsurance == 'undefined' || data.quotes.damageInsurance == 0 ){
                jQuery_1_9_1('#razor_step1_total_damage_deposit').hide();
            } else {
                jQuery_1_9_1('#razor_step1_total_damage_deposit').show();
                jQuery_1_9_1('#razor_step1_total_damage_deposit_value').html( Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice(data.quotes.damageInsurance.toFixed(2)) );
            }

            if ( typeof data.quotes.cancellationItems == 'undefined' || data.quotes.cancellationItems.length == 0 ){
                jQuery_1_9_1('#razor_step1_cacelation, #razor_step2_cacelation').text("No refunds for cancellation made after payment is made.");
            } else {
                var tmp_cancelation = [];

                if ( typeof data.quotes.cancellationItems.length == "undefined" ){
                    data.quotes.cancellationItems = [data.quotes.cancellationItems];
                }

                // var tmp_date = Mybookingpal.settings.date_start;//new Date();
                // tmp_date = tmp_date.getFullYear() + '-' + ('0' + (tmp_date.getMonth()+1)).slice(-2) + '-' + ('0' + tmp_date.getDate()).slice(-2);

                // Sort by arival dates
                data.quotes.cancellationItems.sort( function(a, b){ return a.daysBeforeArrival < b.daysBeforeArrival; });

                for ( var i = 0; i < data.quotes.cancellationItems.length; i++ ){
                    /*if ( data.quotes.cancellationItems[i].cancellationAmount == 0 && data.quotes.cancellationItems[i].cancellationPercentage == 0 ) {
                     tmp_cancelation.push("If canceled before the date of arrival, 100 percent of the booking amount will be charged as cancellation fee.");
                     } else */
                    // Traveler can cancel up to 61 days prior to arrival and receive a refund of 100% less a $50 processing fee
                    if ( data.quotes.cancellationItems[i].daysBeforeArrival == 0 ){
                        tmp_cancelation.push("Traveler can cancel up to the day of arrival and receive a refund of " + data.quotes.cancellationItems[i].cancellationPercentage + "%.");
                    } else if ( data.quotes.cancellationItems[i].cancellationPercentage == 0 ){
                        tmp_cancelation.push("Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + " days prior to arrival and receive a refund of 0%");
                    } else if ( data.quotes.cancellationItems[i].daysBeforeArrival == 0 && data.quotes.cancellationItems[i].cancellationPercentage == 0 ) {
                        tmp_cancelation.push("Traveler can cancel up to the day of arrival and receive a refund of 0%.");
                        continue;
                    } else {
                        tmp_cancelation.push( "Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + ' days prior to arrival and receive a refund of  ' + data.quotes.cancellationItems[i].cancellationPercentage + '% ' + ( data.quotes.cancellationItems[i].transactionFee == 0 ? '' : 'less a ' + Mybookingpal.currency[Mybookingpal.settings.currency] + data.quotes.cancellationItems[i].transactionFee + ' processing fee' ) + '.' );
                    }
                    /*
                     if ( data.quotes.cancellationItems[i].cancellationAmount == 0 && data.quotes.cancellationItems[i].cancellationPercentage == 0 ) {
                     tmp_cancelation.push("If canceled before the date of arrival, 100 percent of the booking amount will be charged as cancellation fee.");
                     continue;
                     }
                     tmp_cancelation.push( "Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + ' days prior to arrival and receive a refund of  ' + data.quotes.cancellationItems[i].cancellationPercentage + '%.');// the transaction fee ' + Mybookingpal.currency[data.quotes.currency] + data.quotes.cancellationItems[i].cancellationAmount );
                     */
                }
                jQuery_1_9_1('#razor_step1_cacelation, #razor_step2_cacelation').html( tmp_cancelation.join('<br />') );
            }

            jQuery_1_9_1('#razor_step1_payment1').html(Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice(data.quotes.firstPayment.toFixed(2)) );
            if ( data.quotes.secondPayment == 0 ){
                jQuery_1_9_1('#razor_step1_payment1_block, #razor_step1_payment2_block').hide();
            } else {
                jQuery_1_9_1('#razor_step1_payment2').html(Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice(data.quotes.secondPayment.toFixed(2)) );
                // Output second payment date
                var tmp_date = data.quotes.secondPaymentDate.split("-");
                jQuery_1_9_1('#razor_step1_payment2_due_date').text( tmp_date[1] + '/' + tmp_date[2] + '/' + tmp_date[0] );
                // Show block
                jQuery_1_9_1('#razor_step1_payment1_block, #razor_step1_payment2_block').show();
            }


            // 2-nd popup
            jQuery_1_9_1('#razor_step2_payment_total').html( Mybookingpal.currency[Mybookingpal.settings.currency] + Mybookingpal.formatPrice(data.quotes.quote.toFixed(2)) );

            jQuery_1_9_1('#razor_step2_property_name').text( data.quotes.propertyName );
            /*
            if (data.quotes.image_urls == ""){
                data.quotes.image_urls = { image_url: []}
            }
            //jQuery_1_9_1('#razor_step2_property_image').attr('src', data.quotes.image_urls.image_url[0] );
            */
            jQuery_1_9_1('#razor_step2_property_image').attr('src', data.quotes.imageUrl );

            popupStep2PropertyImageMinHeight = 90;
            popupStep2PropertyImageMinWidth = 140;
            jQuery_1_9_1('#razor_step2_property_image').load(function(){
                ratio = this.height / popupStep2PropertyImageMinHeight;
                if ((this.width / ratio) < popupStep2PropertyImageMinWidth) {
                    jQuery_1_9_1(this).width(popupStep2PropertyImageMinWidth).height('auto');
                } else {
                    jQuery_1_9_1(this).width('auto').height(popupStep2PropertyImageMinHeight);
                }
            });

            //alert(data.quotes.firstPayment);

            jQuery_1_9_1('#bookPaymentTotalValue').val( Mybookingpal.formatPrice(data.quotes.firstPayment.toFixed(2)) );

            // data.quotes.paymentSupported = false;
            // data.quotes.propertyManagerSupportCC.none
            Mybookingpal.paymentSupported = (data.quotes.paymentSupported == true ) ? true : false;
            if ( Mybookingpal.paymentSupported == true ){
                jQuery_1_9_1('.book_step2_form_payment_content').show();
            } else {
                jQuery_1_9_1('.book_step2_form_payment_content').hide();
            }

            jQuery_1_9_1('#bookPaymentCardType').empty();

            if ( typeof data.quotes.propertyManagerSupportCC != 'undefined' ){
                if (data.quotes.propertyManagerSupportCC.supportMC == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="0">MASTER CARD</option>');
                    jQuery_1_9_1('.payment_card_img_0').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_0').hide();
                }

                if (data.quotes.propertyManagerSupportCC.supportVISA == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="1">VISA</option>');
                    jQuery_1_9_1('.payment_card_img_1').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_1').hide();
                }

                if (data.quotes.propertyManagerSupportCC.supportAE == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="2">AMERICAN EXPRESS</option>');
                    jQuery_1_9_1('.payment_card_img_2').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_2').hide();
                }

                if (data.quotes.propertyManagerSupportCC.supportDINERSCLUB == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="3">DINERS CLUB</option>');
                    jQuery_1_9_1('.payment_card_img_3').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_3').hide();
                }

                if (data.quotes.propertyManagerSupportCC.supportDISCOVER == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="4">DISCOVER</option>');
                    jQuery_1_9_1('.payment_card_img_4').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_4').hide();
                }

                if (data.quotes.propertyManagerSupportCC.supportJCB == true){
                    jQuery_1_9_1('#bookPaymentCardType').append('<option value="5">JBC</option>');
                    jQuery_1_9_1('.payment_card_img_5').show();
                } else {
                    jQuery_1_9_1('.payment_card_img_5').hide();
                }
            }

            var included = [];

            if ( typeof data.quotes.quote_details != 'undefined' && typeof data.quotes.quote_details.quoteDetails != "undefined"){

                if ( typeof data.quotes.quote_details.quoteDetails.length != 'number' ){
                    data.quotes.quote_details.quoteDetails = [data.quotes.quote_details.quoteDetails];
                }

                jQuery_1_9_1('#razor_step1_excluded').empty().append( '<div class="popup_dashed_line"></div><div class="popup_book1_table_regular_row"><div class="popup_book1_table_label">* Any extra cost will be charged by the host at the property\'s currency<br />** You will be charged in the local currency of this property. All converted amounts are estimates only and are subject to currency exchange.</div><div class="clearer"></div></div>' );
                jQuery_1_9_1('#razor_step1_included_price').empty();

                // output included
                for ( var i = 0; i < data.quotes.quote_details.quoteDetails.length; i++ ){
                    if ( data.quotes.quote_details.quoteDetails[i].included == true ){

                        if ( data.quotes.quote_details.quoteDetails[i].amount != 0 ){
                            jQuery_1_9_1('#razor_step1_included_price')
                                .append($('<div class="popup_book1_table_label">' + data.quotes.quote_details.quoteDetails[i].description + '</div>'))
                                .append(
                                    $('<div class="popup_book1_table_value">' + (data.quotes.quote_details.quoteDetails[i].currency + '  ' +  Mybookingpal.formatPrice( parseFloat(data.quotes.quote_details.quoteDetails[i].amount).toFixed(2) )) + '</div>')
                                ).append( jQuery_1_9_1('<div class="clearer"></div>') );
                            continue;
                        } else {
                            var tmp = data.quotes.quote_details.quoteDetails[i].description;
                            /*
                            if ( data.quotes.quote_details.quoteDetails[i].text != "" ){
                                tmp += " (" + data.quotes.quote_details.quoteDetails[i].text + ")";
                            }
                            */
                            included.push( tmp );
                        }
                    } else {
                        jQuery_1_9_1('#razor_step1_excluded').append( '<div class="popup_dashed_line"></div><div class="popup_book1_table_regular_row"><div class="popup_book1_table_label">' + data.quotes.quote_details.quoteDetails[i].description + /*'( ' + data.quotes.quote_details.quoteDetails[i].paymentInfo + ' )' + */ '</div><div class="popup_book1_table_value" id="razor_step1_tax">' + data.quotes.quote_details.quoteDetails[i].currency + '  ' +  Mybookingpal.formatPrice( parseFloat(data.quotes.quote_details.quoteDetails[i].amount).toFixed(2) ) + '</div><div class="clearer"></div></div>' );
                    }
                }
            }

            if ( included.length > 0 ){
                jQuery_1_9_1('#razor_step1_included').empty().append('<div class="popup_dashed_line"></div>').append('<b>Included fees:</b>&nbsp;').append( included.join(', ') );
            }
        } catch ( e ){
            console.log( e.message );
        }

        Mybookingpal.goStep1();
    },

    runQuoteAPI: function( ){
        var url = API_URL + "xml/services/json/reservation/quotes?pos=" + Mybookingpal.settings.pos + "&productid=" + Mybookingpal.settings.product_id + "&fromdate=" + Mybookingpal.settings.date_start + "&todate=" + Mybookingpal.settings.date_end + "&currency=" + Mybookingpal.settings.currency + "&adults="+Mybookingpal.settings.adults + "&child="+Mybookingpal.settings.child + "&jsonp=?";

        jQuery_1_9_1.getJSON(
            url,
            function( data ){
                Mybookingpal.parseQuoteAPI( data );
            }
        );

        // Delete after testing
        /*
         jQuery_1_9_1.ajax({
         //crossDomain: true,
         type: 'GET',
         dataType: "json",
         url: url,
         error: function(xhr, status, error) {
         var err = eval("(" + xhr.responseText + ")");
         alert( err.Message );
         },
         success: function( data ){
         alert('ok');
         }
         });
         */
    },

    initCustomSelectFieldOptions : function(){
        //set first option to be selected
        jQuery_1_9_1(".wstylized_select_field").each(function(){
            var firstOption = jQuery_1_9_1(this).find('.wstylized_search_field_list li').first();
            firstOption.addClass('wselected_option');
            jQuery_1_9_1(this).children('.wstylized_select_showed_field').text(firstOption.text());
            jQuery_1_9_1(this).children('.wstylized_select_hidden_field').val(firstOption.text());
        });

        jQuery_1_9_1('.wstylized_select_showed_field').click(function(){
            if(jQuery_1_9_1(this).parents('.wstylized_select_field').hasClass('open')){
                jQuery_1_9_1(this).parents('.wstylized_select_field').removeClass('open');
            }else{
                jQuery_1_9_1(this).parents('.wstylized_select_field').addClass('open');
            }

        });

        jQuery_1_9_1('.wstylized_select_field .wstylized_search_field_list li').click(function(){
            jQuery_1_9_1(this).parents(".wstylized_search_field_list").find("li").removeClass('wselected_option');
            jQuery_1_9_1(this).addClass('wselected_option');
            var value = jQuery_1_9_1(this).text();

            jQuery_1_9_1(this).parents('.wstylized_select_field').children('.wstylized_select_showed_field').text(value);
            jQuery_1_9_1(this).parents('.wstylized_select_field').children('.wstylized_select_hidden_field').val(value).trigger('change');
            jQuery_1_9_1(this).parents('.wstylized_select_field').removeClass('open');
        });

        jQuery_1_9_1('html').click(function(event){
            var cls = jQuery_1_9_1(event.target).attr('class');
            if(cls != undefined){
                var clickedElement = jQuery_1_9_1(event.target).get(0);
                jQuery_1_9_1(".wstylized_select_field.open").each(function(){
                    if(clickedElement !== jQuery_1_9_1(this).children('.wstylized_select_showed_field').get(0)){
                        jQuery_1_9_1(this).removeClass('open');
                    }
                });
            }
        });
    }
};

( function( d ) {
    // Include Mybookingpal widget css file
    var l  = d.createElement('link');
    l.rel  = 'stylesheet';
    l.type = 'text/css';
    l.href = SITE_URL + 'css/widget.css';
    l.media = 'all';
    d.getElementsByTagName('head')[0].appendChild( l );

    // Include GoogleFont for widget
    var l  = d.createElement('link');
    l.rel  = 'stylesheet';
    l.type = 'text/css';
    l.href = 'https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,800,700,600,300';
    d.getElementsByTagName('head')[0].appendChild( l );

    function getScript(url, success) {
        var script     = document.createElement('script');
        script.src = url;

        var head = document.getElementsByTagName('head')[0],
            done = false;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
                done = true;
                // callback function provided as param
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            };
        };
        head.appendChild(script);
    };

    getScript(SITE_URL + "scripts/inc/jquery-1.9.1.js", function() {
        if (typeof jQuery=='undefined') {
            // Super failsafe - still somehow failed...
        } else {
            jQuery_1_9_1 = jQuery.noConflict(true);
            Mybookingpal.init();
            /*
            // jQuery loaded! Make sure to use .noConflict just in case
            fancyCode();

            if (thisPageUsingOtherJSLibrary) {
                // Run your jQuery Code
            } else {
                // Use .noConflict(), then run your jQuery Code
            }
            */
        }
    });

    //if ( typeof jQuery === 'undefined' ){
        // Include jQuery library if we need this
        /*
        var s = d.createElement('script');
        s.src = SITE_URL + "scripts/inc/jquery-1.9.1.js";
        s.type = 'text/javascript';
        s.async = 1;

        if ( s.readyState ) { //IE
            s.onreadystatechange = function () {
                if (s.readyState == "loaded" || s.readyState == "complete") {
                    s.onreadystatechange = null;
                    var jQuery_1_9_1 = jQuery_1_9_1.noConflict(true);
                    Mybookingpal.init();
                }
            };
        } else { //Others
            s.onload = function () {
                var jQuery_1_9_1 = jQuery_1_9_1.noConflict(true);
                jQuery_1_9_1( document ).ready(function(){
                    Mybookingpal.init();
                });
            };
        }
        d.getElementsByTagName('head')[0].appendChild( s );
        */
    /*} else {
        Mybookingpal.init();
    }*/
})( document );