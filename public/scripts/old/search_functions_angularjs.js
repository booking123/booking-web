var app = angular.module('myapp', ['AngularGM'])
	.config(['$interpolateProvider', function ($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	}]);

if (!!(window.history && history.pushState)){
    app.config(function ($locationProvider) {
        // working
        $locationProvider.html5Mode(false);
    });
}

var dateFormatConstant = 'mm/dd/yy';
showHomePage = "home_page"
showSearchPage = "search_page"
showResultPage = "result_page";

resultImagesBottomShowFloatingMenuPixelValue = 320;
resultTabFixedSectionTopValue = 200;

regularResBoxesPerRow = 3,
iframeResBoxesPerRow = 2,
regularResBoxesViewLastColumn = 2,
iframeResBoxesViewLastColumn = 1;

var imageArray = new Array(),
    currentPropertyImage = null,
    invalidDates = [],
    detailPrevDate = "";

app.controller('SearchController', function ($scope, $window, $location, $http, $timeout, $anchorScroll) {

    $scope.showCommission = false;
    $scope.checkInDate = false;

    $scope.init = function(iframe, checkin, period, location, location_id, currency, adults, product_id, page, per_page, display_inquire){
        // Test code
        // @todo: delete after testing
        // $scope.showInquireDialog('07/18/2014', '07/25/2014', '5', '12345');
        $scope.search.display_inquire = display_inquire;

        if ( iframe ){
            $scope.resolutionView = 'iframe';
            $scope.boxViewResultPerRow = iframeResBoxesPerRow;
            $scope.boxViewLastColumnInRow = iframeResBoxesViewLastColumn;
        }

        if ( typeof per_page != 'undefined' ){ $scope.paginator.per_page = per_page; }
        if ( typeof page != 'undefined' ){
            $scope.paginator.cur_page = page - 1;
        }

        if (currency){
            $scope.search.currency.select(currency);
        }

        if ( window.location.href.indexOf('#/product') != -1 ){
            $scope.showPage = '';
            $scope.search.searchValue = location;
            $scope.search.searchLocationID = location_id;
            $('#searchLocationID').val( location_id );
            $scope.search.checkInDate = checkin;
            $scope.checkInDate = checkin;
            $scope.search.lengthStay.select(period);
            $scope.search.checkOutDate = $scope.addDate(checkin, period, true);
            $scope.search.guests.select(adults);
            // $scope.search.currency.select(currency);
            // Open details
            $scope.openResultView(product_id, $scope.search.checkInDate, $scope.search.checkOutDate);
        }

        if ( window.location.href.indexOf('#/search') != -1 ){
            $scope.showPage = '';
            $scope.search.searchValue = location;
            $scope.search.searchLocationID = location_id;
            $('#searchLocationID').val( location_id );
            $scope.search.checkInDate = checkin;
            $scope.checkInDate = checkin;
            $scope.search.lengthStay.select(period);
            $scope.search.checkOutDate = $scope.addDate(checkin, period, true);
            $scope.search.guests.select(adults);

            $scope.processSearch( $scope.paginator.cur_page );
        }

        if ( window.location.href.indexOf('commission=true') != -1 ){
            $scope.showCommission = true;
        }
    }

    /*
    $scope.changeInquireCountry = function(){
        if ( $scope.contact.country == "US" ){
            $scope.contact.hideStates = false;
            angular.element('#contactState').removeClass('popup_window_red_input_field');
        } else {
            $scope.contact.hideStates = true;
        }
    }
    */

    $scope.clearInquireDialog = function(){
        $scope.contact.productId = "";
        $scope.contact.checkInDate = "";
        $scope.contact.checkOutDate = "";
        $scope.contact.firstname = angular.element("#contactFirstname").attr('placeholder');//"veniamin";
        $scope.contact.lastname = angular.element("#contactLastname").attr('placeholder');//"stadnikov";
        $scope.contact.emailaddress = angular.element("#contactEmailaddress").attr('placeholder');//"veniamins@ukr.net";
        $scope.contact.phonenumber = angular.element("#contactPhonenumber").attr('placeholder');//"0951231231234";

        $scope.contact.adultsnumber = 0;
        $scope.contact.childrenNumber = 0;

        /*
        $scope.contact.country = "0";//"UA";
        $scope.contact.state = 0;

        $scope.contact.address = angular.element("#contactAddress").attr('placeholder');//"my address";
        $scope.contact.city = angular.element("#contactCity").attr('placeholder');//"chernivtsi";

        $scope.contact.zip = angular.element("#contactZip").attr('placeholder');//"92612";

        $scope.contact.bdm = angular.element("#contactBdm").attr('placeholder');//"02";
        $scope.contact.bdd = angular.element("#contactBdd").attr('placeholder');//"11";
        $scope.contact.bdy = angular.element("#contactBdy").attr('placeholder');//"1986";
        */
        $scope.contact.messageText = angular.element("#contactMessagetext").attr('placeholder');//"some message";
        angular.element('#contactFlexibleDepartureDates').removeAttr('checked');
        // Dump of old id's fields
        // #contactState1, #contactState, #contactAddress, #contactCity, #contactZip, #contactBdm, #contactBdd, #contactBdy
        angular.element('#contactFirstname, #contactLastname, #contactEmailaddress, #contactPhonenumber').removeClass('popup_window_red_input_field').addClass('plchldr');
        angular.element('#contactState1, #contactState').removeClass('plchldr');
        angular.element('#popup_window_contact_owner .popup_content_error').text("");
    }

    $scope.contact = {
        adultsnumber: 0,
        childrennumber: 0,
        state:0,
        country: "0",
        hideStates: true
    };

    $scope.showInquireDialog = function( check_in, check_out, adults, product_id ){
        // Clear fields
        $scope.clearInquireDialog();

        $scope.contact.checkInDate = check_in;
        $scope.contact.checkOutDate = check_out;
        $scope.contact.adultsnumber = adults;
        $scope.contact.productId = product_id;

        $scope.showPopupContact = true;

        $('#inquire_form').show();
        $('#inquire_confirmation').hide();
    }

    $scope.submitInquireDialog = function(){
        var error = false;

        if ( typeof $scope.contact.productId == "undefined" ){ error = true; }
        if ( typeof $scope.contact.checkInDate == "undefined" || $scope.contact.checkInDate == angular.element('#contactCheckInDatepickerField').attr('placeholder') ){ angular.element('#contactCheckInDatepickerField').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactCheckInDatepickerField').removeClass('popup_window_red_input_field'); }
        if ( typeof $scope.contact.checkOutDate == "undefined" || $scope.contact.checkOutDate == angular.element('#contactCheckOutDatepickerField').attr('placeholder') ){ angular.element('#contactCheckOutDatepickerField').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactCheckOutDatepickerField').removeClass('popup_window_red_input_field'); }

        if ( $scope.contact.firstname == "" || $scope.contact.firstname == angular.element('#contactFirstname').attr('placeholder') ){angular.element('#contactFirstname').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactFirstname').removeClass('popup_window_red_input_field');}
        if ( $scope.contact.lastname == "" || $scope.contact.lastname == angular.element('#contactLastname').attr('placeholder') ){angular.element('#contactLastname').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactLastname').removeClass('popup_window_red_input_field');}

        if ( $scope.contact.emailaddress == "" || $scope.contact.emailaddress == angular.element('#contactEmailaddress').attr('placeholder') ){angular.element('#contactEmailaddress').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactEmailaddress').removeClass('popup_window_red_input_field');}
        if ( $scope.contact.phonenumber == "" || $scope.contact.phonenumber == angular.element('#contactPhonenumber').attr('placeholder') ){angular.element('#contactPhonenumber').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactPhonenumber').removeClass('popup_window_red_input_field');}

        /*
        if ( $scope.contact.country == "0" ){ angular.element('#contactState1').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactState1').removeClass('popup_window_red_input_field'); }
        if ( $scope.contact.country == "US" && $scope.contact.state == "0" ){ angular.element('#contactState').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactState').removeClass('popup_window_red_input_field'); }

        if ( $scope.contact.address == "" || $scope.contact.address == angular.element('#contactAddress').attr('placeholder') ){ angular.element('#contactAddress').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactAddress').removeClass('popup_window_red_input_field'); }
        if ( $scope.contact.city == "" || $scope.contact.city == angular.element('#contactCity').attr('placeholder') ){ angular.element('#contactCity').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactCity').removeClass('popup_window_red_input_field'); }

        if ( $scope.contact.zip == "" || $scope.contact.zip == angular.element('#contactZip').attr('placeholder') ){ angular.element('#contactZip').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactZip').removeClass('popup_window_red_input_field'); }

        if ( $scope.contact.bdm == "" || $scope.contact.bdm == angular.element('#contactBdm').attr('placeholder') ){ angular.element('#contactBdm').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactBdm').removeClass('popup_window_red_input_field'); }
        if ( $scope.contact.bdd == "" || $scope.contact.bdd == angular.element('#contactBdd').attr('placeholder') ){ angular.element('#contactBdd').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactBdd').removeClass('popup_window_red_input_field'); }
        if ( $scope.contact.bdy == "" || $scope.contact.bdy == angular.element('#contactBdy').attr('placeholder') ){ angular.element('#contactBdy').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactBdy').removeClass('popup_window_red_input_field'); }
        */

        if ( error == true ){
            return;
        }

        var url = API_URL + 'xml/services/json/reservation/inquiry?pos=' + Mybookingpal.settings.pos + '&productid=' + $scope.contact.productId + '&fromdate=' + Mybookingpal.usa2mysql($scope.contact.checkInDate) + '&todate=' + Mybookingpal.usa2mysql($scope.contact.checkOutDate) + '&firstname=' + $scope.contact.firstname + '&familyname=' + $scope.contact.lastname +'&emailaddress=' + $scope.contact.emailaddress + '&telnumber=' + $scope.contact.phonenumber + '&adult=' + $scope.contact.adultsnumber + '&child=' + $scope.contact.childrennumber + '&notes=' + $scope.contact.messageText /* + '&country=' + $scope.contact.country + '&state=' + $scope.contact.state + '&address=' + $scope.contact.address + '&city=' + $scope.contact.city + '&zip=' + $scope.contact.zip + '&bdm=' + $scope.contact.bdm + '&bdd=' + $scope.contact.bdd + '&bdy=' + $scope.contact.bdy*/;
        $.getJSON(
            url,
            function( data ){
                $scope.parseInquireResponse( data );
            }
        );
    };

    $scope.parseInquireResponse = function( data ){
        var message = "Property booked successfully!";

        if ( data.reservation_response.is_error == true ){
            $('#popup_window_contact_owner .popup_content_error').text( data.reservation_response.message );
            return;
        } else {
            $('#inquire_form').hide();
            $('#inquire_confirmation').show();
            $('#inquiry_fn_ln').text($scope.contact.firstname + ' ' + $scope.contact.lastname);

            /*
            $scope.showPopupContact = false;
            $scope.$apply();

            // Init data on pop-up
            $('#razor_step3_username').text( $scope.contact.firstname + ' ' + $scope.contact.lastname ); // FName & LName
            $('#razor_step3_userpass').text( $scope.contact.emailaddress ); // Email

            $('#razor_step3_pmname').text( data.reservation_response.propertyManagerName );
            $('#razor_step3_pmname2').text( data.reservation_response.propertyName + ' ' + data.reservation_response.propertyAddress );

            $('#razor_step3_bnumber').text( data.reservation_response.reservation.id );
            $('#razor_step3_email').text( data.reservation_response.propertyManagerEmail ); // Email
            $('#razor_step3_details').text( Mybookingpal.diff2dates($scope.contact.checkInDate, $scope.contact.checkOutDate) + ' night(s)' );

            var d = new Date( data.reservation_response.fromDate );
            $('#razor_step3_checkin').text( ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear() );
            var d = new Date( data.reservation_response.toDate );
            $('#razor_step3_checkout').text( ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear() );

            $('#razor_step3_firstpayment').html( Mybookingpal.currency[data.reservation_response.reservation.currency] + ' ' + '???' );

            $('#razor_step3_totalprice').html( Mybookingpal.currency[data.reservation_response.reservation.currency] + ' ' + data.reservation_response.reservation.price );


            // $('#popup_window_book_step3').show();

            Mybookingpal.processPopUp(3);
            */
        }
    }

	$scope.GoogleMap = {
		options: {
			map: {
				center: new google.maps.LatLng(48, -121),
				zoom: 12,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			mapViewProduct: {
				center: new google.maps.LatLng(48, -121),
				zoom: 18,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		},

		triggerOpenInfoWindow: function (item) {
			$scope.markerEvents = [{
			    event: 'openinfowindow',
				ids: [item.productid]
			}];
		},

		setCenter: function (lat, lng) {
			$scope.center = new google.maps.LatLng(lat, lng);
		},

		resize: function (map_name) {
			$scope.$broadcast('gmMapResize', map_name);
		}
	};

	$scope.triggerTabs = function (tab_name) {
		if (tab_name == 'map_view') {
			$timeout(function () {
				$scope.GoogleMap.resize('GoogleMapListProducts');

				if ($scope.search.products_filtered.length) {
					$scope.GoogleMap.setCenter($scope.search.products_filtered[0].latitude, $scope.search.products_filtered[0].longitude);
				}
			}, 100);
		}
        
		$scope.searchResultsTabView = tab_name;
	};

    $scope.triggerProductTabs = function (tab_name, section_id) {
		if (tab_name == 'map_tab') {
			$timeout(function () {
				$scope.GoogleMap.resize('GoogleMapProduct');

				if ($scope.property_detail_map.length) {
					$scope.GoogleMap.setCenter($scope.property_detail_map[0].latitude, $scope.property_detail_map[0].longitude);
				}
			}, 100);
		}
        else if(tab_name == 'rates_tab') {
            jQuery("#datesAvailabilityCalendar").datepicker("refresh");
        }

		$scope.resultViewSelectedTab = tab_name;
        
        /*
        $location.hash(section_id);
        $anchorScroll();
        */
        var elementTopMove = resultImagesBottomShowFloatingMenuPixelValue;
        if($scope.resultView.showFixedHeader){
            elementTopMove = resultTabFixedSectionTopValue;   
        }
        
        $('html, body').animate({
            scrollTop: ($("#"+section_id).offset().top - elementTopMove)
        }, 700);
	};

	$scope.viewTab = function (tab_name) {
		return ($scope.searchResultsTabView == tab_name);
	};


	//resolution can be regular and iframe
	$scope.resolutionView = 'regular';
	//$scope.resolutionView = 'iframe';

	$scope.boxViewResultPerRow = regularResBoxesPerRow;
	$scope.boxViewLastColumnInRow = regularResBoxesViewLastColumn;

	setResolutionOnPageOpen($scope, $location, $http);

	$scope.showPage = showHomePage;

    $scope.currentProduct = 0;

	//popups
	$scope.showPopupContact = false;
//	$scope.showPopupBookStep1 = false;
//	$scope.showPopupBookStep2 = false;
//	$scope.showPrivacyPopup = false;
//	$scope.showRentalAgreementPopup = false;

	//for validation
	$scope.submittedContactForm = false;
//	$scope.submittedBookStep1Form = false;
//	$scope.submittedBookStep2Form = false;

    $scope.load_detail = 0;

    $scope.page = {
        is_error: false,
        message: "",
        show_exact: false,
        show_suggested: false
    }

	$scope.search = {
		'products': [],
		'products_filtered': [],

        'noResult': false,

        searchValue: '',

        'display_inquire': 1,
        'onlyBooking': false,


        'searchLocationID': 0,
        'checkInDate': "",
        'checkOutDate': "",
        
        'checkboxShowAllAvailableProperties': "true",
        'checkboxExecMatch': "false",

        'checkboxBabySitting': "false",
        'checkboxElevators': "false",
        'checkboxChildrensPool': "false",

        'checkboxHeaterPool': "false",
        'checkboxServicedDaily': "false",
        'checkboxServicedWeekly': "false",

        'checkboxPoolIndoors': "false",
        'checkboxJacuzzi': "false",
        'checkboxParking': "false",

        'checkboxPool': "false",
        'checkboxRoomService': "false",
        'checkboxSauna': "false",

        'checkboxSteamBath': "false",
        'checkboxDryCleaning': "false",
        'chckboxWakeupService': "false",

        'checkboxLaundrySelfService': "false",
        'checkboxDirectDialPhone': "false",
        'chckboxBarbequeGrill': "false",

        'checkboxButlerService': "false",
        'checkboxCoffeeTeaInRoom': "false",
        'checkboxBreakfastFree': "false",

        'checkboxGroceryShoppingService': "false",
        'checkboxLoungeBar': "false",
        'checkboxChildrensArea': "false",

        'checkboxNonsmokingRooms': "false",
        'checkboxWiFiHotspot': "false",
        'checkboxInternetFree': "false",

        'checkboxPrivatePool': "false",
        'checkboxInternetFee': "false",
        'checkboxBathShower': "false",

        'checkboxBath': "false",
        'checkboxShower': "false",

        // ---------------------------
        'checkboxCribCot': "false",
        'checkboxWashingMachine': "false",
        'checkboxDishwasher': "false",

        'checkboxFireplace': "false",
        'checkboxKitchen': "false",
        'checkboxKitchenette': "false",

        'checkboxMicrowave': "false",
        'checkboxOven': "false",
        'checkboxRefrigerator': "false",

        'checkboxTV': "false",
        'checkboxTelephone': "false",
        'checkboxTableTennis': "false",

        'checkboxDVDplayer': "false",
        'checkboxSatelliteTV': "false"
	};

	$scope.resultView = {
        'ratesSectionIncludedInPrice' : true,
        'ratesSectionExtraCosts' : true,
        'ratesSectionAdditionalServices' : false,
        'itemsPanelIncludedInPrice' : true,
        'itemsPanelExtraCosts' : true,
        'itemsPanelAdditionalServices' : false,
        'showFixedHeader' : false
    };
	$scope.book = {};

    $scope.book.checkInDate = '';
    $scope.book.checkOutDate = '';
    $scope.book.invalidDates = [];

	$scope.search.arrayOfCheckInFieldsId = ['searchCheckInDatepickerField', 'resultSearchCheckInDatepickerField', 'bookCheckInDatepickerField', 'contactCheckInDatepickerField'];
	$scope.search.arrayOfCheckOutFieldsId = ['searchCheckOutDatepickerField', 'resultSearchCheckOutDatepickerField', 'bookCheckOutDatepickerField', 'contactCheckOutDatepickerField'];

	/*
	 $scope.resultView.arrayOfCheckInFieldsId = ['resultSearchCheckInDatepickerField'];
	 $scope.resultView.arrayOfCheckOutFieldsId = ['resultSearchCheckOutDatepickerField'];
	 */

	$scope.book.arrayOfCheckInFieldsId = ['bookCheckInDatepickerField', 'popupContactCheckInDatepickerField', 'popupBookCheckInDatepickerField'];
	$scope.book.arrayOfCheckOutFieldsId = ['bookCheckOutDatepickerField', 'popupContactCheckOutDatepickerField', 'popupBookCheckOutDatepickerField'];

    $scope.contact.arrayOfCheckInFieldsId= ['contactCheckInDatepickerField', ''];
    $scope.contact.arrayOfCheckOutFieldsId = ['contactCheckOutDatepickerField', ''];

	$scope.numberRange = function (start, end) {
		var result = [];
		for (var i = start; i <= end; i++) {
			result.push(i);
		}
		return result;
	};

	//some setup default values
	$scope.searchResultsDefaultView = 'list_view';
	$scope.searchResultsTabView = $scope.searchResultsDefaultView;

	$scope.resultViewDefaultTab = 'overview_tab';
	$scope.resultViewSelectedTab = $scope.resultViewDefaultTab;

	$scope.showAdvancedSearchOption = false;
	$scope.showAdvancedSearchOtherCheckboxes = true;

    $scope.search.lengthStay = {
            defaultName: "Length of Stay",
            selectedName: this.defaultName,
            selectedId: 0,
            view: false,
            lengthStayList: [
                {id: 7, name: "1 Week"},
                {id: 14, name: "2 Weeks"},
                {id: 21, name: "3 Weeks"},
                {id: 28, name: "4 Weeks"},
                {id: 1, name: "1 Night"},
                {id: 2, name: "2 Nights"},
                {id: 3, name: "3 Nights"},
                {id: 4, name: "4 Nights"},
                {id: 5, name: "5 Nights"},
                {id: 6, name: "6 Nights"},
                {id: 7, name: "7 Nights"},
                {id: 8, name: "8 Nights"},
                {id: 9, name: "9 Nights"},
                {id: 10, name: "10 Nights"},
                {id: 11, name: "11 Nights"},
                {id: 12, name: "12 Nights"},
                {id: 13, name: "13 Nights"},
                {id: 14, name: "14 Nights"},
                {id: 15, name: "15 Nights"},
                {id: 16, name: "16 Nights"},
                {id: 17, name: "17 Nights"},
                {id: 18, name: "18 Nights"},
                {id: 19, name: "19 Nights"},
                {id: 20, name: "20 Nights"},
                {id: 21, name: "21 Nights"},
                {id: 22, name: "22 Nights"},
                {id: 23, name: "23 Nights"},
                {id: 24, name: "24 Nights"},
                {id: 25, name: "25 Nights"},
                {id: 26, name: "26 Nights"},
                {id: 27, name: "27 Nights"},
                {id: 28, name: "28 Nights"},
                {id: 29, name: "29 Nights"},
                {id: 30, name: "30 Nights"}
            ],
            showNameValue: function () {
                return (this.view || this.selectedId==0)? this.defaultName : this.selectedName;
            },
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.defaultName;
                angular.forEach(this.lengthStayList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(this.view){
                    this.selectedId = 0;
                    this.selectedName = this.defaultName;    
                } else{
                    $window.onclick = function (event) {
                        $scope.search.lengthStay.view = false;
                        $scope.$apply();
                    };
                }
                this.view = !this.view;
            },
            
            clickOutside: function(){
                this.view = false;
            }
    };
    
    
    $scope.search.guests = {
            defaultName: "Guests",
            selectedName: this.defaultName,
            selectedId: 0,
            view: false,
            guestList: [
                {id: 1, name: "1+"},
                {id: 2, name: "2+"},
                {id: 3, name: "3+"},
                {id: 4, name: "4+"},
                {id: 5, name: "5+"},
                {id: 6, name: "6+"},
                {id: 7, name: "7+"},
                {id: 8, name: "8+"},
                {id: 9, name: "9+"},
                {id: 10, name: "10+"}
            ],

            showNameValue: function () {
                return (this.view || this.selectedId==0)? this.defaultName : this.selectedName;
            },
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;

                Mybookingpal.settings.adults = currentSelectedId;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.defaultName;
                angular.forEach(this.guestList, function (guestRow) {
                    if (guestRow.id==selectedId) {
                        tempSelectedName = guestRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(this.view){
                    this.selectedId = 0;
                    this.selectedName = this.defaultName;    
                }else{
                    $window.onclick = function (event) {
                        $scope.search.guests.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            }
    };

    $scope.search.currency = {
            selectedName: "USD",
            selectedId: "USD",
            view: false,
            currencyList: [
                {id: 'USD', name: "USD"},
                {id: 'EUR', name: "EUR"}
            ],
            
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;
                // Change currency for widgets
                Mybookingpal.setParams({'currency': this.selectedName});

                // Reload data if we need it
                if ( $scope.showPage == 'search_page' ){
                    $scope.processSearch();
                } else if ( $scope.showPage == 'result_page' ){
                    $scope.openResultView( $scope.currentProduct, $scope.book.checkInDate, $scope.book.checkOutDate );
                }

            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.selectedName;
                angular.forEach(this.currencyList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(!this.view){
                    $window.onclick = function (event) {
                        $scope.search.currency.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            }
    };
    
    $scope.search.propertyType = {
            selectedName: "All suite",
            selectedId: "PCT1",
            view: false,
            propertyTypeList: [
                {id: 'PCT1', name: 'All suite'},
        //        {id: 'PCT2', name: 'All-Inclusive resort'},
                {id: 'PCT3', name: 'Apartment'},
        //        {id: 'PCT4', name: 'Bed and breakfast'},
                {id: 'PCT5', name: 'Cabin'},
                {id: 'PCT5', name: 'Bungalow'},
        //        {id: 'PCT6', name: 'Campground'},
                {id: 'PCT7', name: 'Chalet'},
                {id: 'PCT8', name: 'Condominium'},
        //        {id: 'PCT9', name: 'Conference center'},
        //        {id: 'PCT10', name: 'Corporate'},
        //        {id: 'PCT11', name: 'Corporate business transient'},
        //        {id: 'PCT12', name: 'Cruise'},
        //        {id: 'PCT13', name: 'Extended stay'},
        //        {id: 'PCT14', name: 'Ferry'},
        //        {id: 'PCT15', name: 'Guest farm'},
        //        {id: 'PCT16', name: 'Guest house limited service'},
        //        {id: 'PCT17', name: 'Health spa'},
        //        {id: 'PCT18', name: 'Holiday resort'},
        //        {id: 'PCT19', name: 'Hostel'},
                {id: 'PCT20', name: 'Hotel'},
        //        {id: 'PCT21', name: 'Inn'},
                {id: 'PCT22', name: 'Lodge'},
        //        {id: 'PCT23', name: 'Meeting resort'},
        //        {id: 'PCT24', name: 'Meeting/Convention'},
        //        {id: 'PCT25', name: 'Mobile-home'},
        //        {id: 'PCT26', name: 'Monastery'},
        //        {id: 'PCT27', name: 'Motel'},
        //        {id: 'PCT28', name: 'Ranch'},
        //        {id: 'PCT29', name: 'Residential apartment'},
        //        {id: 'PCT30', name: 'Resort'},
        //        {id: 'PCT31', name: 'Sailing ship'},
        //        {id: 'PCT32', name: 'Self catering accommodation'},
        //        {id: 'PCT33', name: 'Tent'},
        //        {id: 'PCT34', name: 'Vacation home'},
                {id: 'PCT35', name: 'Villa'},
        //        {id: 'PCT36', name: 'Wildlife reserve'},
        //        {id: 'PCT37', name: 'Castle'},
                {id: 'PCT38', name: 'Convention Network Property'},
        //        {id: 'PCT39', name: 'Golf'},
        //        {id: 'PCT40', name: 'Pension'},
        //        {id: 'PCT41', name: 'Ski'},
        //        {id: 'PCT42', name: 'Spa'},
        //        {id: 'PCT43', name: 'Time share'},
        //        {id: 'PCT44', name: 'Boatel'},
        //        {id: 'PCT45', name: 'Boutique'},
                {id: 'PCT46', name: 'Efficiency/studio'}
        //        {id: 'PCT47', name: 'Full service'},
        //        {id: 'PCT48', name: 'Historical'},
        //        {id: 'PCT49', name: 'Limited service'},
        //        {id: 'PCT50', name: 'Recreational vehicle park'},
        //        {id: 'PCT51', name: 'Charm hotel'},
        //        {id: 'PCT52', name: 'Manor'},
        //        {id: 'PCT53', name: 'Vacation rental'},
        //        {id: 'PCT54', name: 'Economy'},
        //        {id: 'PCT55', name: 'Midscale'},
        //        {id: 'PCT56', name: 'Upscale'},
        //        {id: 'PCT57', name: 'Luxury'},
        //        {id: 'PCT58', name: 'Union'},
        //        {id: 'PCT59', name: 'Leisure'},
        //        {id: 'PCT60', name: 'Wholesale'},
        //        {id: 'PCT61', name: 'Transient'}
            ],
            
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.selectedName;
                angular.forEach(this.propertyTypeList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(!this.view){
                    $window.onclick = function (event) {
                        $scope.search.propertyType.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            },
    };
    
    
    $scope.search.bedroomNumber = {
            selectedName: "- select -",
            selectedId: 0,
            view: false,
            bedroomNumberList: [
                {id: 0, name: "- select -"},
                {id: 1, name: "1"},
                {id: 2, name: "2"},
                {id: 3, name: "3"},
                {id: 4, name: "4"},
                {id: 5, name: "5"},
                {id: 6, name: "6+"}
            ],
            
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.selectedName;
                angular.forEach(this.bedroomNumberList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(!this.view){
                    $window.onclick = function (event) {
                        $scope.search.bedroomNumber.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            },
    };
    
    $scope.search.bathroomNumber = {
            selectedName: "- select -",
            selectedId: 0,
            view: false,
            bathroomNumberList: [
                {id: 0, name: "- select -"},
                {id: 1, name: "1"},
                {id: 2, name: "2"},
                {id: 3, name: "3"},
                {id: 4, name: "4"},
                {id: 5, name: "5"},
                {id: 6, name: "6+"}
            ],
            
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                this.view = false;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.selectedName;
                angular.forEach(this.bathroomNumberList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(!this.view){
                    $window.onclick = function (event) {
                        $scope.search.bathroomNumber.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            }
    };
    
    $scope.search.sortBy = {
            selectedName: "- select -",
            selectedId: 0,
            view: false,
            sortByList: [
                {id: '0', name: "- select -"},
                {id: 'priceASC', name: "Price: Low to High"},
                {id: 'priceDESC', name: "Price: High to Low"},
                {id: 'bedroomsDESC', name: "Bedrooms: Most to Least"},
                {id: 'bedroomsASC', name: "Bedrooms: Least to Most"}
            ],
            
            select: function (currentSelectedId) {
                $window.onclick = null;
                this.selectedId = currentSelectedId;
                this.selectedName = this.getSelectedName(currentSelectedId);
                $scope.sortProducts();
                this.view = false;
            },
            getSelectedName: function(selectedId){
                var tempSelectedName = this.selectedName;
                angular.forEach(this.sortByList, function (oneRow) {
                    if (oneRow.id==selectedId) {
                        tempSelectedName = oneRow.name;
                    }
                });  
                return tempSelectedName; 
            },
            toggle: function () {
                $window.onclick = null;
                $scope.closeOtherCustomDropbopes(this);
                if(!this.view){
                    $window.onclick = function (event) {
                        $scope.search.sortBy.view = false;
                        $scope.$apply();
                    };
                } 
                this.view = !this.view;
            }
    };
    
   
    
    $scope.customDropboxArray = [$scope.search.guests, $scope.search.lengthStay, $scope.search.currency,
                                $scope.search.propertyType, $scope.search.bedroomNumber, $scope.search.bathroomNumber,
                                $scope.search.sortBy];
    
    $scope.closeOtherCustomDropbopes = function(notClose){
        angular.forEach($scope.customDropboxArray, function (customDropbox) {
            if (customDropbox!=notClose) {
                customDropbox.view = false;    
            }
        });
    }
    
   

	/********************************************/
	/******* Variables start values START *******/
	/********************************************/
    

	$scope.adultsNumberList = $scope.numberRange(1, 10);
	$scope.childrenNumberList = $scope.numberRange(0, 10);

	$scope.contact.adultsNumber = $scope.adultsNumberList[0];
	$scope.contact.childrenNumber = $scope.childrenNumberList[0];
	$scope.book.adultsNumber = $scope.adultsNumberList[0];
	$scope.book.childrenNumber = $scope.childrenNumberList[0];

	$scope.book.expirationDateMonth = $scope.numberRange(1, 12)[0];
	$scope.book.expirationDateYear = $scope.numberRange(2014, 2024)[0];

    $scope.setPagination = function( page ){

        $scope.paginator.cur_page = page;
        var num_exact = 0,
            show_suggested = false,
            limit = ( ($scope.paginator.cur_page + 1) * $scope.paginator.per_page > $scope.search.products_filtered.length ) ? $scope.search.products_filtered.length : ($scope.paginator.cur_page + 1) * $scope.paginator.per_page,
            num_products = limit - $scope.paginator.cur_page * $scope.paginator.per_page;

        for ( var i = $scope.paginator.cur_page * $scope.paginator.per_page; i < limit; i++ ){
            if ( $scope.search.products_filtered[i].exactmatch == true ){
                num_exact++;
            }
            if ( $scope.search.products_filtered[i].exactmatch == false ){
                show_suggested = true;
            }
        }
        $scope.page.show_exact = num_exact != num_products && num_exact != 0 ;
        $scope.page.show_suggested = show_suggested;
    }
     
    $scope.getSortByTypesListName = function (selectedId) {
        var nameSelected = $scope.sortByTypes[0].name;
        angular.forEach($scope.sortByTypes, function (sortByType) {
            if (sortByType.id==selectedId) {
                nameSelected = sortByType.name;
            }
        });
        return nameSelected;
    };
    
    $scope.getPropertyTypesListName = function (selectedId) {
        var nameSelected = $scope.propertyTypesList[0].name;
        angular.forEach($scope.propertyTypesList, function (propertyType) {
            if (propertyType.id==selectedId) {
                nameSelected = propertyType.name;
            }
        });
        return nameSelected;
    };

    $scope.propertyTypesList = {
        '1': 'All suite',
        '2': 'All-Inclusive resort',
        '3': 'Apartment',
        '4': 'Bed and breakfast',
        '5': 'Cabin or bungalow',
        '6': 'Campground',
        '7': 'Chalet',
        '8': 'Condominium',
        '9': 'Conference center',
        '10': 'Corporate',
        '11': 'Corporate business transient',
        '12': 'Cruise',
        '13': 'Extended stay',
        '14': 'Ferry',
        '15': 'Guest farm',
        '16': 'Guest house limited service',
        '17': 'Health spa',
        '18': 'Holiday resort',
        '19': 'Hostel',
        '20': 'Hotel',
        '21': 'Inn',
        '22': 'Lodge',
        '23': 'Meeting resort',
        '24': 'Meeting/Convention',
        '25': 'Mobile-home',
        '26': 'Monastery',
        '27': 'Motel',
        '28': 'Ranch',
        '29': 'Residential apartment',
        '30': 'Resort',
        '31': 'Sailing ship',
        '32': 'Self catering accommodation',
        '33': 'Tent',
        '34': 'Vacation home',
        '35': 'Villa',
        '36': 'Wildlife reserve',
        '37': 'Castle',
        '38': 'Convention Network Property',
        '39': 'Golf',
        '40': 'Pension',
        '41': 'Ski',
        '42': 'Spa',
        '43': 'Time share',
        '44': 'Boatel',
        '45': 'Boutique',
        '46': 'Efficiency/studio',
        '47': 'Full service',
        '48': 'Historical',
        '49': 'Limited service',
        '50': 'Recreational vehicle park',
        '51': 'Charm hotel',
        '52': 'Manor',
        '53': 'Vacation rental',
        '54': 'Economy',
        '55': 'Midscale',
        '56': 'Upscale',
        '57': 'Luxury',
        '58': 'Union',
        '59': 'Leisure',
        '60': 'Wholesale',
        '61': 'Transient'
    };
	
    /*
	$scope.numberOfBedsList = [
		{id: 1, name: "1"},
		{id: 2, name: "2"},
		{id: 3, name: "3"},
		{id: 4, name: "4"},
		{id: 5, name: "5"}
	];
	$scope.search.numberBeds = $scope.numberOfBedsList[1].id;
    */
    /*
	$scope.neighborhoodList = [
		{id: 1, name: "Neigh1"},
		{id: 2, name: "Neigh2"}
	];
	$scope.search.neighborhood = $scope.neighborhoodList[0].id;
    */
    $scope.search.minPrice = "";
    $scope.search.maxPrice = "";

	$scope.approximateEquivalentCurrencyList = [
		{id: 1, name: "USD"},
		{id: 2, name: "EUR"}
	];


	$scope.countriesList= [
        {id: "0",  name: "Select Country"},
        {id: "AF", name: "Afghanistan"},
        {id: "AL", name: "Albania"},
        {id: "DZ", name: "Algeria"},
        {id: "AS", name: "American Samoa"},
        {id: "AD", name: "Andorra"},
        {id: "AO", name: "Angola"},
        {id: "AI", name: "Anguilla"},{id: "AQ", name: "Antarctica"},{id: "AG", name: "Antigua and Barbuda"},{id: "AR", name: "Argentina"},{id: "AM", name: "Armenia"},{id: "AW", name: "Aruba"},{id: "AU", name: "Australia"},{id: "AT", name: "Austria"},{id: "AZ", name: "Azerbaijan"},{id: "BS", name: "Bahamas"},{id: "BH", name: "Bahrain"},{id: "BD", name: "Bangladesh"},{id: "BB", name: "Barbados"},{id: "BY", name: "Belarus"},{id: "BE", name: "Belgium"},{id: "BZ", name: "Belize"},{id: "BJ", name: "Benin"},{id: "BM", name: "Bermuda"},{id: "BT", name: "Bhutan"},{id: "BO", name: "Bolivia"},{id: "BA", name: "Bosnia and Herzegovina"},{id: "BW", name: "Botswana"},{id: "BV", name: "Bouvet Island"},{id: "BR", name: "Brazil"},{id: "IO", name: "British Indian Ocean Territory"},{id: "BN", name: "Brunei Darussalam"},{id: "BG", name: "Bulgaria"},{id: "BF", name: "Burkina Faso"},{id: "BI", name: "Burundi"},{id: "KH", name: "Cambodia"},{id: "CM", name: "Cameroon"},{id: "CA", name: "Canada"},{id: "CV", name: "Cape Verde"},{id: "KY", name: "Cayman Islands"},{id: "CF", name: "Central African Republic"},{id: "TD", name: "Chad"},{id: "CL", name: "Chile"},{id: "CN", name: "China"},{id: "CX", name: "Christmas Island"},{id: "CC", name: "Cocos (Keeling) Islands"},{id: "CO", name: "Colombia"},{id: "KM", name: "Comoros"},{id: "CG", name: "Congo"},{id: "CD", name: "Congo, the Democratic Republic Of the"},{id: "CK", name: "Cook Islands"},{id: "CR", name: "Costa Rica"},{id: "CI", name: "Cote d'ivoire"},{id: "HR", name: "Croatia"},{id: "CU", name: "Cuba"},{id: "CY", name: "Cyprus"},{id: "CZ", name: "Czech Republic"},{id: "DK", name: "Denmark"},{id: "DJ", name: "Djibouti"},{id: "DM", name: "Dominica"},{id: "DO", name: "Dominican Republic"},{id: "EC", name: "Ecuador"},{id: "EG", name: "Egypt"},{id: "SV", name: "El Salvador"},{id: "GQ", name: "Equatorial Guinea"},{id: "ER", name: "Eritrea"},{id: "EE", name: "Estonia"},{id: "ET", name: "Ethiopia"},{id: "FK", name: "Falkland Islands (Malvinas)"},{id: "FO", name: "Faroe Islands"},{id: "FJ", name: "Fiji"},{id: "FI", name: "Finland"},{id: "FR", name: "France"},{id: "GF", name: "French Guiana"},{id: "PF", name: "French Polynesia"},{id: "TF", name: "French Southern Territories"},{id: "GA", name: "Gabon"},{id: "GM", name: "Gambia"},{id: "GE", name: "Georgia"},{id: "DE", name: "Germany"},{id: "GH", name: "Ghana"},{id: "GI", name: "Gibraltar"},{id: "GR", name: "Greece"},{id: "GL", name: "Greenland"},{id: "GD", name: "Grenada"},{id: "GP", name: "Guadeloupe"},{id: "GU", name: "Guam"},{id: "GT", name: "Guatemala"},{id: "GN", name: "Guinea"},{id: "GW", name: "Guinea-Bissau"},{id: "GY", name: "Guyana"},{id: "HT", name: "Haiti"},{id: "HM", name: "Heard Island and Mcdonald Islands"},{id: "VA", name: "Holy See (Vatican City State)"},{id: "HN", name: "Honduras"},{id: "HK", name: "Hong Kong"},{id: "HU", name: "Hungary"},{id: "IS", name: "Iceland"},{id: "IN", name: "India"},{id: "ID", name: "Indonesia"},{id: "IR", name: "Iran, Islamic Republic Of"},{id: "IQ", name: "Iraq"},{id: "IE", name: "Ireland"},{id: "IL", name: "Israel"},{id: "IT", name: "Italy"},{id: "JM", name: "Jamaica"},{id: "JP", name: "Japan"},{id: "JO", name: "Jordan"},{id: "KZ", name: "Kazakhstan"},{id: "KE", name: "Kenya"},{id: "KI", name: "Kiribati"},{id: "KP", name: "Korea, Democratic People's Republic Of"},{id: "KR", name: "Korea, Republic Of"},{id: "KW", name: "Kuwait"},{id: "KG", name: "Kyrgyzstan"},{id: "LA", name: "Lao People's Democratic Republic"},{id: "LV", name: "Latvia"},{id: "LB", name: "Lebanon"},{id: "LS", name: "Lesotho"},{id: "LR", name: "Liberia"},{id: "LY", name: "Libyan Arab Jamahiriya"},{id: "LI", name: "Liechtenstein"},{id: "LT", name: "Lithuania"},{id: "LU", name: "Luxembourg"},{id: "MO", name: "Macao"},{id: "MK", name: "Macedonia, the Former Yugoslav Republic Of"},{id: "MG", name: "Madagascar"},{id: "MW", name: "Malawi"},{id: "MY", name: "Malaysia"},{id: "MV", name: "Maldives"},{id: "ML", name: "Mali"},{id: "MT", name: "Malta"},{id: "MH", name: "Marshall Islands"},{id: "MQ", name: "Martinique"},{id: "MR", name: "Mauritania"},{id: "MU", name: "Mauritius"},{id: "YT", name: "Mayotte"},{id: "MX", name: "Mexico"},{id: "FM", name: "Micronesia, Federated States Of"},{id: "MD", name: "Moldova, Republic Of"},{id: "MC", name: "Monaco"},{id: "MN", name: "Mongolia"},{id: "MS", name: "Montserrat"},{id: "MA", name: "Morocco"},{id: "MZ", name: "Mozambique"},{id: "MM", name: "Myanmar"},{id: "NA", name: "Namibia"},{id: "NR", name: "Nauru"},{id: "NP", name: "Nepal"},{id: "NL", name: "Netherlands"},{id: "AN", name: "Netherlands Antilles"},{id: "NC", name: "New Caledonia"},{id: "NZ", name: "New Zealand"},{id: "NI", name: "Nicaragua"},{id: "NE", name: "Niger"},{id: "NG", name: "Nigeria"},{id: "NU", name: "Niue"},{id: "NF", name: "Norfolk Island"},{id: "MP", name: "Northern Mariana Islands"},{id: "NO", name: "Norway"},{id: "OM", name: "Oman"},{id: "PK", name: "Pakistan"},{id: "PW", name: "Palau"},{id: "PS", name: "Palestinian Territory, Occupied"},{id: "PA", name: "Panama"},{id: "PG", name: "Papua New Guinea"},{id: "PY", name: "Paraguay"},{id: "PE", name: "Peru"},{id: "PH", name: "Philippines"},{id: "PN", name: "Pitcairn"},{id: "PL", name: "Poland"},{id: "PT", name: "Portugal"},{id: "PR", name: "Puerto Rico"},{id: "QA", name: "Qatar"},{id: "RE", name: "Reunion"},{id: "RO", name: "Romania"},{id: "RU", name: "Russian Federation"},{id: "RW", name: "Rwanda"},{id: "SH", name: "Saint Helena"},{id: "KN", name: "Saint Kitts and Nevis"},{id: "LC", name: "Saint Lucia"},{id: "PM", name: "Saint Pierre and Miquelon"},{id: "VC", name: "Saint Vincent and the Grenadines"},{id: "WS", name: "Samoa"},{id: "SM", name: "San Marino"},{id: "ST", name: "Sao Tome and Principe"},{id: "SA", name: "Saudi Arabia"},{id: "SN", name: "Senegal"},{id: "CS", name: "Serbia &amp; Montenegro"},{id: "SC", name: "Seychelles"},{id: "SL", name: "Sierra Leone"},{id: "SG", name: "Singapore"},{id: "SK", name: "Slovakia"},{id: "SI", name: "Slovenia"},{id: "SB", name: "Solomon Islands"},{id: "SO", name: "Somalia"},{id: "ZA", name: "South Africa"},{id: "GS", name: "South Georgia and the South Sandwich Islands"},{id: "ES", name: "Spain"},{id: "LK", name: "Sri Lanka"},{id: "SD", name: "Sudan"},{id: "SR", name: "Suriname"},{id: "SJ", name: "Svalbard and Jan Mayen"},{id: "SZ", name: "Swaziland"},{id: "SE", name: "Sweden"},{id: "CH", name: "Switzerland"},{id: "SY", name: "Syrian Arab Republic"},{id: "TW", name: "Taiwan, Province Of China"},{id: "TJ", name: "Tajikistan"},{id: "TZ", name: "Tanzania, United Republic Of"},{id: "TH", name: "Thailand"},{id: "TL", name: "Timor-Leste"},{id: "TG", name: "Togo"},{id: "TK", name: "Tokelau"},{id: "TO", name: "Tonga"},{id: "TT", name: "Trinidad and Tobago"},{id: "TN", name: "Tunisia"},{id: "TR", name: "Turkey"},{id: "TM", name: "Turkmenistan"},{id: "TC", name: "Turks and Caicos Islands"},{id: "TV", name: "Tuvalu"},{id: "UG", name: "Uganda"},{id: "UA", name: "Ukraine"},{id: "AE", name: "United Arab Emirates"},{id: "GB", name: "United Kingdom"},{id: "US", name: "United States"},{id: "UM", name: "United States Minor Outlying Islands"},{id: "ZZ", name: "Unknown"},{id: "UY", name: "Uruguay"},{id: "UZ", name: "Uzbekistan"},{id: "VU", name: "Vanuatu"},{id: "VE", name: "Venezuela"},{id: "VN", name: "Viet Nam"},{id: "VG", name: "Virgin Islands, British"},{id: "VI", name: "Virgin Islands, U.S."},{id: "WF", name: "Wallis and Futuna"},{id: "EH", name: "Western Sahara"},{id: "YE", name: "Yemen"},{id: "ZM", name: "Zambia"},{id: "ZW", name: "Zimbabwe"}
	];
	//$scope.contact.country = $scope.contactCountrylist[0].id;

    
	$scope.protectDamageValueList = [
		{id: 1, name: "Select 1"},
		{id: 2, name: "Select 2"}
	];

	$scope.book.messageText = "";

	$scope.paymentCardTypeList = [
		{id: 1, name: "Visa"},
		{id: 2, name: "Maestro"}
	];
	$scope.book.paymentCardType = $scope.paymentCardTypeList[0].id;


	$scope.book.protectInvestement = 'false';
	$scope.book.protectPayment = 'false';
	$scope.book.protectDamage = 'false';

    /*
	$scope.countriesList = [
		{id: "RS", name: "Serbia"},
		{id: "US", name: "United States"},
		{id: "UK", name: "Ukraine"}
	];
	$scope.book.paymentCountry = $scope.countriesList[0].id;
    */
	/*
	 $http({
	 url: countryApiUrl,
	 method: "GET"
	 //   data: "id: 'something'",
	 //   headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
	 //   headers: {'Content-Type': 'application/json;charset=utf-8'}
	 }).success(function (data) {
	 $scope.countriesList = data.countries.item;
	 $scope.book.paymentCountry = $scope.countriesList[0].id;
	 }).error(function (data, status, headers, config) {
	 });
	 */

	$scope.statesList = [
        {id: 0, name: "Select State"},
		{id: 1, name: "Alabama"},
		{id: 2, name: "Alaska"},
		{id: 3, name: "American Samoa"},
		{id: 4, name: "Arizona"},
		{id: 5, name: "Arkansas"},
		{id: 6, name: "California"},
		{id: 7, name: "Colorado"},
		{id: 8, name: "Connecticut"},
		{id: 9, name: "Delaware"},
		{id: 10, name: "District of Columbia"},
		{id: 11, name: "Florida"},
		{id: 12, name: "Georgia"},
		{id: 13, name: "Guam"},
		{id: 14, name: "Hawaii"},
		{id: 15, name: "Idaho"},
		{id: 16, name: "Illinois"},
		{id: 17, name: "Indiana"},
		{id: 18, name: "Iowa"},
		{id: 19, name: "Kansas"},
		{id: 20, name: "Kentucky"},
		{id: 21, name: "Louisiana"},
		{id: 22, name: "Maine"},
		{id: 23, name: "Maryland"},
		{id: 24, name: "Massachusetts"},
		{id: 25, name: "Michigan"},
		{id: 26, name: "Minnesota"},
		{id: 27, name: "Mississippi"},
		{id: 28, name: "Missouri"},
		{id: 29, name: "Montana"},
		{id: 30, name: "Nebraska"},
		{id: 31, name: "Nevada"},
		{id: 32, name: "New Hampshire"},
		{id: 33, name: "New Jersey"},
		{id: 34, name: "New Mexico"},
		{id: 35, name: "New York"},
		{id: 36, name: "North Carolina"},
		{id: 37, name: "North Dakota"},
		{id: 38, name: "Northern Marianas Islands"},
		{id: 39, name: "Ohio"},
		{id: 40, name: "Oklahoma"},
		{id: 41, name: "Oregon"},
		{id: 42, name: "Pennsylvania"},
		{id: 43, name: "Puerto Rico"},
		{id: 44, name: "Rhode Island"},
		{id: 45, name: "South Carolina"},
		{id: 46, name: "South Dakota"},
		{id: 47, name: "Tennessee"},
		{id: 48, name: "Texas"},
		{id: 49, name: "Utah"},
		{id: 50, name: "Vermont"},
		{id: 51, name: "Virginia "},
		{id: 52, name: "Virgin Islands "},
		{id: 53, name: "Washington"},
		{id: 54, name: "West Virginia"},
		{id: 55, name: "Wisconsin"},
		{id: 56, name: "Wyoming"}
	];
	//$scope.book.paymentState = $scope.statesList[0].id;

	/********************************************/
	/******* Variables start valu∂es END *********/
	/********************************************/

	$scope.book.paymentTotalValue = "$1,234.56";

	//jqSliderStep2();

	$scope.property_detail = {
        address: "",
        amenities: [],
        prices: [],
        included: [],
        excluded: [],
        cc: {
            mc: false,
            visa: false,
            amex: false,
            dscvr: false,
            jcb: false,
            dines: false
        },
        popupBookCheckInDatepickerField: '',
        terms_url: '',
        commission: 0
    };

    $scope.openTerms = function( url ){
        window.open( url, 'Privacty Policy');
    };

	$scope.openResultView = function( property, check_in, check_out ){
        $scope.load_detail = 0;
        var detail_recount = false;

        if ( check_in == '' && check_out == '' ){
            check_in = $scope.checkInDate; // this.search.checkInDate;
            check_out = (this.search.checkOutDate == "aN/aN/NaN") ? "" : this.search.checkOutDate;
        } else {
            detail_recount = true;
        }

        if ( detail_recount == true && (check_in == '' || check_out == '') ){
            return false;
        }

        // Clear price values
        $scope.property_detail.currency = "";
        $scope.property_detail.quote = "";
        $scope.property_detail.amenities = [];
        $scope.currentProduct = property;

        var is_search_property = this.search.searchValue.length == parseInt( this.search.searchValue ).toString().length && !isNaN( parseInt( this.search.searchValue ) );

        var tmp_dates = '';
        if ( !is_search_property ){
            tmp_dates = '&date=' + check_in.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") + '&toDate=' + check_out.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
        }

		$http({method: 'GET', url: API_URL + 'xml/services/json/product/' + property + '/propertydetail?pos=' + Mybookingpal.settings.pos + '&test=true&currency=' + Mybookingpal.settings.currency + tmp_dates }).
			success(function (data, status, headers, config) {
                $scope.load_detail++;

				$scope.property_detail.id = data.property_response.property.id;
				$scope.property_detail.name = data.property_response.property.name;
                $scope.property_detail.minstay = data.property_response.property.minstay;
                $scope.property_detail.inquire = data.property_response.property.inquiryOnly;
                $scope.property_detail.commission = data.property_response.property.agentCommissionValue;

                if (data.property_response.property.images == ""){
                    data.property_response.property.images = {
                        image: []
                    };
                }

                $('.images-block').delegate('img','click', function(){
                    $('.large-img').attr('src',$(this).attr('src').replace('small','big'));
                });

                if ( typeof data.property_response.property.images.image == 'string' ){
                    data.property_response.property.images.image = [data.property_response.property.images.image];
                }

                var tmp_images = typeof data.property_response.property.images.image == 'undefined' ? [] : data.property_response.property.images.image;
                initializePropertyImages( tmp_images );
				/*
                $scope.property_detail.image = data.product.images.image[0];

				$scope.property_detail.thumbs = [];
				for (var i = 0; i < data.product.images.image.length; i++) {
					$scope.property_detail.thumbs.push(data.product.images.image[i]);
				}
                */

				$scope.property_detail.description = '<ul><li>' + data.property_response.property.description.replace(/\./gi, '.</li><li>') + '</li></ul>';
                // remove empty <li></li>
                $scope.property_detail.description = $scope.property_detail.description.replace(/\<li\>\<\/li\>/gi, "");
				$scope.property_detail.bedroom = data.property_response.property.bedroom;
				$scope.property_detail.bathroom = data.property_response.property.bathroom;
				$scope.property_detail.propertytype = "";
                $scope.property_detail.address = data.property_response.property.physicaladdress;//data.property_response.property.city + ', ' + data.property_response.property.country;
                // $scope.property_detail.currency = data.product.currency;

                if ( typeof data.property_response.property.attributes.attribute == "object" && typeof data.property_response.property.attributes.attribute.length == "number" ){
                    i = 0;
                    for ( var k in data.property_response.property.attributes.attribute ){
                        if ( data.property_response.property.attributes.attribute[i].key == "Property Type" ){
                            if ( typeof data.property_response.property.attributes.attribute[i].values.value == "string" ){
                                $scope.property_detail.propertytype = data.property_response.property.attributes.attribute[i].values.value;
                            } else {
                                $scope.property_detail.propertytype = data.property_response.property.attributes.attribute[i].values.value[0];
                            }
                        }

                        if ( ["Ages Allowed","Bed Type","Beverage","Communication Options","Facilities","Grading","Group Preferences","General Amenities","Location Category","Property Preferences","Property Type","Travel with Pets","Pets Policy","Physically Challenged Requirement","Physically Challenged Feature","Room Amenities","Amenity Preferences","Destination Attributes","Recreation Preference"].indexOf(data.property_response.property.attributes.attribute[i].key) != -1 ){
                            $scope.property_detail.amenities = $scope.property_detail.amenities.concat(data.property_response.property.attributes.attribute[i].values.value);
                        }

                        i++;
                    }
                } else {
                    $scope.property_detail.propertytype = data.property_response.property.attributes.attribute.values.value;
                }


                $scope.property_detail.person = data.property_response.property.person;
                /*
                $scope.property_detail.prices = [];

                if ( typeof data.property_response.property.pricetable.price.length == "undefined" ){
                    data.property_response.property.pricetable.price = [ data.property_response.property.pricetable.price ];
                }

                for ( k in data.property_response.property.pricetable.price ){
                    var tmp = {
                        'date_start': data.property_response.property.pricetable.price[k].date,
                        'date_end':   data.property_response.property.pricetable.price[k].todate,
                        'minstay':    data.property_response.property.pricetable.price[k].minStay,
                        'price':      data.property_response.property.pricetable.price[k][Mybookingpal.settings.currency]
                    }
                    $scope.property_detail.prices.push( tmp );
                }
                */

                $scope.property_detail_map = [{
					latitude: data.property_response.property.latitude,
					longitude: data.property_response.property.longitude,
					id: data.property_response.property.longitude,
					name: data.property_response.property.name
				}];//if ( check_in == '' && check_out == '' ){

				$scope.resultViewSelectedTab = 'overview_tab';

                $scope.book.checkInDate = check_in;//$scope.search.checkInDate;
                $scope.book.checkOutDate = check_out;//$scope.search.checkOutDate;

                var endMinDate = new Date( check_in )
                endMinDate.setDate(endMinDate.getDate() + 1);
                $('#bookCheckOutDatepickerField').datepicker("option", "minDate", endMinDate);

                $scope.resultView.showFixedHeader  = false;
				$scope.showPage = showResultPage;
                
                
                //scroll to top of page - set logo img
                /*
                $location.hash('pageHeaderWithLogo');
                $anchorScroll();
                */
                $('html, body').scrollTop(0);

				// For centering marker in Google map
				$timeout(function () {
					$scope.GoogleMap.resize('GoogleMapProduct');

					if ($scope.property_detail_map.length) {
						$scope.GoogleMap.setCenter($scope.property_detail_map[0].latitude, $scope.property_detail_map[0].longitude);
					}
				}, 100);

                // Set datepicker start date
                // console.log( 'propertydetail refresh');
                jQuery("#datesAvailabilityCalendar").datepicker("setDate", new Date( check_in ));
                jQuery("#datesAvailabilityCalendar").datepicker("refresh");
			}).
			error(function (data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});

        $http({method: 'GET', url: API_URL + 'xml/services/json/reservation/prices?pos=' + Mybookingpal.settings.pos + '&productid=' + property + '&fromdate=' + check_in.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") + '&todate=' + check_out.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") + '&currency=' + Mybookingpal.settings.currency}).
            success( function(data, status, headers, config){
                $scope.load_detail++;

                // Clear product details prices
                $scope.property_detail.prices = [];

                // Transform data when we have only one element and not array
                if ( typeof data.ranges.range == "object" && typeof data.ranges.range.length == "undefined" ){
                    data.ranges.range = [ data.ranges.range ];
                }

                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                for (var i = 0; i < data.ranges.range.length; i++ ){
                    // Transform date from mysql format to normal view format
                    var tmp = data.ranges.range[i].startDate.split('-');
                    var d = new Date(tmp[0], tmp[1] - 1, tmp[2]);
                    var date_start = d.getDate() + ' ' + months[d.getMonth()];
                    d.setDate( d.getDate() + 7 );
                    var date_end = d.getDate() + ' ' + months[d.getMonth()];
                    tmp = {
                        date_start: date_start,
                        date_end:   date_end,
                        minstay:    data.ranges.range[i].minstay,
                        price:      Mybookingpal.currency[Mybookingpal.settings.currency] + ' ' + data.ranges.range[i].minPrice + ' / ' + Mybookingpal.currency[Mybookingpal.settings.currency] + ' ' + data.ranges.range[i].maxPrice
                    }
                    $scope.property_detail.prices.push( tmp );
                }
            });
        // https://www.mybookingpal.com/xml/services/json/reservation/prices?pos=834a55a7680c79fe&productid=95420&fromdate=2014-02-01&todate=2014-03-02&currency=EUR

        if ( !is_search_property || detail_recount ){
            $scope.property_detail.currency = "Calculating...";

            $('#product_detail_number_nights').text( Mybookingpal.diff2dates(check_in, check_out) );

            Mybookingpal.setParams({'adults': $scope.search.guests.selectedId});

            $http({method: 'GET', url: API_URL + 'xml/services/json/reservation/quotes?pos=' + Mybookingpal.settings.pos + '&productid=' + property + '&fromdate=' + check_in.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") + '&todate=' + check_out.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2") + '&currency=' + Mybookingpal.settings.currency + '&adults=' + Mybookingpal.settings.adults }).
                success( function (data, status, headers, config ){
                    $scope.load_detail++;

                    // Reset error and error_message variables
                    $scope.page.is_error = data.quotes.is_error;
                    $scope.page.message = data.quotes.message;

                    $scope.property_detail.included = [];
                    $scope.property_detail.excluded = [];
                    $scope.property_detail.excluded.push({
                        text: "*Any extra cost will be charged by the host at the property's currency<br />** You will be charged in the local currency of this property. All converted amounts are estimates only and are subject to currency exchange.",
                        price: ""
                    });
                    $scope.property_detail.cancelation_message = "";

                    if ( data.quotes.is_error == true ){
                        $scope.property_detail.currency = "Not available";
                        $scope.property_detail.quote = "";
                        $scope.page.is_error = data.quotes.is_error;
                        $scope.page.message = data.quotes.message;
                    } else {
                        $scope.property_detail.quote = Math.ceil(data.quotes.quote);//.toFixed( 2 );
                        $scope.property_detail.currency = Mybookingpal.currency[ data.quotes.currency ];

                        // CC images on detail page
                        $scope.property_detail.cc.mc = data.quotes.propertyManagerSupportCC.supportMC;
                        $scope.property_detail.cc.visa = data.quotes.propertyManagerSupportCC.supportVISA;
                        $scope.property_detail.cc.amex = data.quotes.propertyManagerSupportCC.supportAE;
                        $scope.property_detail.cc.dscvr = data.quotes.propertyManagerSupportCC.supportDISCOVER;
                        $scope.property_detail.cc.jcb = data.quotes.propertyManagerSupportCC.supportJCB;
                        $scope.property_detail.cc.dines = data.quotes.propertyManagerSupportCC.supportDINERSCLUB;

                        $scope.property_detail.check_in = data.quotes.fromTime;
                        $scope.property_detail.check_out = data.quotes.toTime;

                        $scope.property_detail.terms_url = data.quotes.termsLink;
                        $scope.property_detail.terms = (data.quotes.termsLink.slice(-4) == '.pdf') ? 'pdf' : 'html';

                        // Kostul for quotedetails
                        if ( typeof data.quotes.quote_details.quoteDetails != "undefined"){

                            if ( typeof data.quotes.quote_details.quoteDetails.length != 'number' ){
                                data.quotes.quote_details.quoteDetails = [data.quotes.quote_details.quoteDetails];
                            }

                            /*
                            $scope.property_detail.excluded.push( {
                                text: "*Any extra cost will be charged by the host at the property's currency",
                                price: ""
                            });
                            */

                            // Form included excluded
                            for ( var i = 0; i < data.quotes.quote_details.quoteDetails.length; i++ ){
                                if ( data.quotes.quote_details.quoteDetails[i].included == true ){
                                    var tmp = {
                                        text: data.quotes.quote_details.quoteDetails[i].description,
                                        price: 'Included'
                                    }
                                    $scope.property_detail.included.push( tmp );
                                } else {
                                    var tmp = {
                                        text: data.quotes.quote_details.quoteDetails[i].description /*+ '( ' + data.quotes.quote_details.quoteDetails[i].paymentInfo + ' )'*/,
                                        price: data.quotes.quote_details.quoteDetails[i].currency + '  ' +  Mybookingpal.formatPrice( parseFloat(data.quotes.quote_details.quoteDetails[i].amount).toFixed(2) )
                                    }
                                    $scope.property_detail.excluded.push( tmp );
                                }
                            }
                        }

                        if ( data.quotes.cancellationDate == "" ){
                            $scope.property_detail.cancelation_message = "No refunds for cancellation made after payment is made.";
                        } else {
                            var tmp_cancelation = [],
                                tmp_date = $scope.search.checkInDate;//new Date();

                            if ( typeof data.quotes.cancellationItems != "undefined"){
                                if ( typeof data.quotes.cancellationItems.length == "undefined" ){
                                    data.quotes.cancellationItems = [data.quotes.cancellationItems];
                                }

                                // Sort by arival dates
                                data.quotes.cancellationItems.sort( function(a, b){ return a.daysBeforeArrival < b.daysBeforeArrival; });

                                for ( var i = 0; i < data.quotes.cancellationItems.length; i++ ){
                                    if ( data.quotes.cancellationItems[i].daysBeforeArrival == 0 ){
                                        tmp_cancelation.push("Traveler can cancel up to the day of arrival and receive a refund of " + data.quotes.cancellationItems[i].cancellationPercentage + "%.");
                                    } else if ( data.quotes.cancellationItems[i].cancellationPercentage == 0 ){
                                        tmp_cancelation.push("Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + " days prior to arrival and receive a refund of 0%");
                                    } else if ( data.quotes.cancellationItems[i].daysBeforeArrival == 0 && data.quotes.cancellationItems[i].cancellationPercentage == 0 ) {
                                        tmp_cancelation.push("Traveler can cancel up to the day of arrival and receive a refund of 0%.");
                                        continue;
                                    } else {
                                        tmp_cancelation.push( "Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + ' days prior to arrival and receive a refund of  ' + data.quotes.cancellationItems[i].cancellationPercentage + '%.');
                                    }
                    }
                }
            $scope.property_detail.cancelation_message = tmp_cancelation.join('<br />');
        }
                    }
                    jQuery("#datesAvailabilityCalendar").datepicker("refresh");
                });
        }

        var tmp_dates = '',
            d = new Date();
            // tmp_dates = '&date=' + d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-01',
            fromdate = d.getFullYear() + '-' + ( '0' + (d.getMonth()+1) ).slice(-2) + '-01',
            todate = (d.getFullYear() + 1 ) + '-' + ( '0' + (d.getMonth()+1) ).slice(-2) + '-01';


        // Old method
        /*
        $http({method: 'GET', url: API_URL + 'xml/services/json/reservation/calendar?pos=' + Mybookingpal.settings.pos + '&productid=' + property + tmp_dates }).
            success( function(data, status, headers, config){
                invalidDates = [];
                if ( typeof data.calendar.items != 'undefined' ){

                    if ( typeof data.calendar.items.lenght == 'number' ){
                        data.calendar.items = [data.calendar.items];
                    }

                    for( k in data.calendar.items ){
                        if ( data.calendar.items[k].state == "Cancelled" || data.calendar.items[k].state == "Final"){ continue; }

                        var tmp = data.calendar.items[k].date.split('-');
                        // $scope.property_detail.invalidDates.push( tmp[1] + '/' + tmp[2] + '/' + tmp[0] );
                        invalidDates.push( tmp[1] + '/' + tmp[2] + '/' + tmp[0] );
                    }
                }
                $("#datesAvailabilityCalendar").datepicker("refresh");
            });
        */

        $http({
            method: 'GET',
            url: API_URL + 'xml/services/json/reservation/available_calendar?pos=' + Mybookingpal.settings.pos + '&productid=' + property + '&fromdate=' + fromdate + '&todate=' + todate
        })
            .success( function( data, status, headers, config){
                $scope.load_detail++;

                invalidDates = [];
                if ( typeof data.availability_calendar.items != 'undefined' ){

                    // Transform data when we have only one element and not array
                    if ( typeof data.availability_calendar.items == "object" && typeof data.availability_calendar.items.length == "undefined" ){
                        data.availability_calendar.items = [ data.availability_calendar.items ];
                    }

                    // Array of available dates
                    var available = [];

                    // Collect all available dates into array
                    for (var i = 0; i < data.availability_calendar.items.length; i++){
                        var tmp = data.availability_calendar.items[i].endDate.split('-');
                        var end = new Date( tmp[0], parseInt(tmp[1])-1, parseInt(tmp[2]) );
                        tmp = data.availability_calendar.items[i].startDate.split('-');

                        for ( var d = new Date( tmp[0], parseInt(tmp[1])-1, parseInt(tmp[2]) ); d <= end; d.setDate(d.getDate() + 1) ){
                            tmp[0] = d.getFullYear();
                            tmp[1] = ('0' + d.getMonth()).slice( -2 );
                            tmp[2] = ('0' + d.getDate()).slice( -2 );

                            available.push( d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2) )
                        }
                    }

                    // Prepare dates date before loop
                    var tmp = todate.split('-');
                    var end = new Date( tmp[0], tmp[1]-1, tmp[2] );
                    tmp = fromdate.split('-');

                    // Go loop for all period for checking if date not into available[] array than add it into invalidDates[] array
                    for ( var d = new Date( tmp[0], tmp[1]-1, tmp[2] ); d <= end; d.setDate(d.getDate() + 1) ){
                        tmp[0] = d.getFullYear();
                        tmp[1] = ('0' + (d.getMonth()+1)).slice(-2);
                        tmp[2] = ('0' + d.getDate()).slice( -2 );

                        if ( available.indexOf(d.getFullYear() + '-' + ('0'+(d.getMonth()+1)).slice(-2) + '-' + ('0'+d.getDate()).slice(-2)) == -1 ){
                            invalidDates.push( ('0'+(d.getMonth()+1)).slice(-2) + '/' + ('0'+d.getDate()).slice(-2) + '/' + d.getFullYear() );
                        }
                    }
                    // invalidDates = ['09/09/2014', '09/10/2014', '09/11/2014', '09/12/2014', '10/31/2014'];

                    $("#datesAvailabilityCalendar").datepicker("refresh");
                }
            });

        jQuery("#datesAvailabilityCalendar").datepicker("refresh");
	};

	$scope.showPopup = function (id, date_start, date_end) {
        if ( $scope.page.is_error == true ) return false;
        try {
            // Init childs and guests
            // Mybookingpal.setParams({'adults': $scope.search.guests.selectedId});
            Mybookingpal.setParams({'child': 0});
		    Mybookingpal.showQuote(id, date_start, date_end, $scope.search.guests.selectedId);
        } catch ( e ){
            $scope.page.is_error = true;
            $scope.page.message = e.name;
        }
	};
    
    $scope.showContact = function (id, date_start, date_end) {
        Mybookingpal.showContact(id, date_start, date_end);
    };

	$scope.backToSearchView = function () {
		/*
		 var searchViewUrl = "search.html";
		 if($scope.resolutionView == 'iframe'){
		 searchViewUrl += "?iframe=yes";
		 }
		 window.location.href = searchViewUrl;
		*/

        if ( window.location.href.indexOf('#product') != -1 ){
            $scope.processSearch();
        } else {
            $scope.showPage = showSearchPage;
        }
		//$scope.showPage = showSearchPage;
        /*
        $location.hash('pageHeaderWithLogo');
        $anchorScroll();
        */
        $('html, body').scrollTop(0);
        
	};

    /*
	$scope.contactFormSubmit = function () {
		$scope.submittedContactForm = true;
		if ($scope.popupContactForm.$valid) {
			$scope.showPopupContact = false;
		}
	};
    */

    /*
	$scope.bookStep1FormSubmit = function () {
		$scope.submittedBookStep1Form = true;
		if ($scope.popupBookStep1Form.$valid) {
			$scope.showPopupBookStep1 = false;
			$scope.showPopupBookStep2 = true;
		}

	};

	$scope.bookStep2FormSubmit = function () {
		$scope.submittedBookStep2Form = true;
		if ($scope.popupBookStep2Form.$valid) {
			$scope.showPopupBookStep2 = false;
		}

	};
    */

    /*
	$scope.bookStep2FormBackToEdit = function () {
		$scope.showPopupBookStep2 = false;
		$scope.showPopupBookStep1 = true;
	};
    */

    /*
	$scope.showDatepickerPopup = function (datePickerFieldId) {
		jQuery('#' + datePickerFieldId).datepicker("show");
	};
    */

    /*
	$scope.showPrivacyPopupClick = function () {
		jQuery('#popupPrivacyContentDiv').load(privacyPolicyPageUrl);
		$scope.showPrivacyPopup = true;
	};
    */
    /*
	$scope.showRentalAgreementPopupClick = function () {
		$scope.showRentalAgreementPopup = true;
	};
    */

	$scope.paginator = {
		cur_page: 0,
		per_page: 30,
		pages: 0
	};

	$scope.pageRange = function (num) {
		var input = [];
		for (var i = 1; i <= num; i++) input.push(i);
		return input;
	};
    
    $scope.onLogoClick = function(){
        $scope.search.noResult = false;
        $scope.showPage = showHomePage;    
    }

    $scope.addDate = function( date, num, mysql ){
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
    }

    $scope.clearLocation = function () {
        $scope.search.searchValue = "";
        $scope.search.searchLocationID = 0;
        $('#clear_location').fadeOut('show');
    }

	$scope.processSearch = function ( cur_page ) {
        // Clear errors when process new search.
        $scope.page.is_error = false;
        $scope.page.message = "";

        // Input data validation
        var is_error = false,
            is_search_property = this.search.searchValue.length == parseInt( this.search.searchValue ).toString().length && !isNaN( parseInt( this.search.searchValue ) );

        if ( !is_search_property ){
            if ( this.search.searchLocationID == 0 ){$('#searchTextValue').addClass('input_required'); is_error = true; } else { $('#searchTextValue').removeClass('input_required'); }
            if ( this.search.checkInDate == "" ){ $('#checkIn').addClass('input_required'); is_error = true; } else { $('#checkIn').removeClass('input_required'); }
            if ( $scope.search.lengthStay.selectedId == 0 ){is_error = true; $('.search_lengthStay_select_field').addClass('input_required');} else {$('.search_lengthStay_select_field').removeClass('input_required');}
            if ( $scope.search.guests.selectedId == 0 ){ is_error = true; $('.search_guest_select_field').addClass('input_required');} else { $('.search_guest_select_field').removeClass('input_required'); }
        }
        if (is_error == true) return;

        // Hide all products and show loading progress bar.
        $scope.search.products_filtered = [];
        $('#search_loading').show();

        // Save date when press on search button
        $scope.checkInDate = $scope.search.checkInDate;

		var search_date_start = this.search.checkInDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2");
		var search_date_end = $scope.addDate( $scope.checkInDate, $scope.search.lengthStay.selectedId );
        $scope.search.checkOutDate = $scope.addDate( $scope.checkInDate, $scope.search.lengthStay.selectedId, true );
		var location = $('#searchLocationID').val();

        var exec_match =  ( this.search.checkboxShowAllAvailableProperties == "false" ) ? true : false;;
		$('#results_main_title_location').text( $('#searchTextValue').val() );

        // Clear boxes
        $scope.showPage = "search_page";

        // If there is a
        if ( is_search_property  ){
            $http({method: 'GET', url: API_URL + 'xml/services/json/product/' + this.search.searchValue + '/propertydetail?pos=' + Mybookingpal.settings.pos + '&test=true&currency=' + Mybookingpal.settings.currency }).
                success(function (data, status, headers, config) {
                    if (data.property_response.property.images == "" ){
                        data.property_response.property.images = {
                            image: []
                        };
                    }

                    $scope.search.products = [{
                        productid: data.property_response.property.id,
                        pictureLocation: (data.property_response.property.images.length > 0 ) ? data.property_response.property.images.image[0] : '',
                        picturesQuantity: data.property_response.property.images.image.length,
                        productname: data.property_response.property.name,
                        address: data.property_response.property.physicaladdress,
                        currency: data.property_response.property.currency,
                        pricePerNight: '0', // ????
                        guests: '', // ????
                        bedroom: data.property_response.property.bedroom,
                        bathroom: '', // ???
                        minstay: '', // ???
                        productClassType: '', // ???
                        managerName: '', // ???
                        rack: '0',
                        exactmatch: true
                    }];

                    $scope.search.products_filtered = $scope.search.products;

                    $scope.processPages();
                    $scope.showPage = showSearchPage;
                    //$scope.paginator.cur_page = 0;
                    $scope.setPagination(0);
                    $scope.search.noResult = ( $scope.search.products_filtered.length == 0 ) ? true : false;

                    $('#search_loading').hide();
                    // $('#search_button').removeClass('process');
                });
        } else {
            $http.get( API_URL + "xml/services/json/reservation/products/" + location + "/" + search_date_start + "/" + search_date_end + "?pos=" + Mybookingpal.settings.pos + "&guests=" + $scope.search.guests.selectedId + "&amenity=true&currency=" + Mybookingpal.settings.currency + '&exec_match=' + exec_match + '&display_inquire=' + $scope.search.display_inquire , {})
                .success(function (data, status, headers, config) {
                    $scope.search.products = [];
                    $scope.search.products_filtered = [];

                    /*
                    if ( typeof data.search_response.search_quotes.quote != "undefined" ){

                    }
                    */

                    // Костыль для проверки data.search_quotes.quote это массив или один эллемент
                    if (typeof data.search_response.search_quotes.quote == "object" && typeof data.search_response.search_quotes.quote.length == "number") {
                        $scope.search.products = data.search_response.search_quotes.quote;
                    } else if (typeof data.search_response.search_quotes.quote == "object" && typeof data.search_response.search_quotes.quote.length == "undefined") {
                        $scope.search.products.push(data.search_response.search_quotes.quote);
                    }

                    for (var k in $scope.search.products){
                        $scope.search.products[k].currency = Mybookingpal.currency[ $scope.search.products[k].currency ];
                        $scope.search.products[k].pricePerNight = $scope.pricePerNight( search_date_start, search_date_end, $scope.search.products[k].rack );
                    }

                    $scope.filterProducts();
                    $scope.processPages();

                    $scope.showPage = showSearchPage;

                    var tmp = ( cur_page >= $scope.paginator.pages) ? (($scope.paginator.pages - 1 < 0 ) ? $scope.paginator.pages : 1)  : (cur_page < 0 ) ? 0 : cur_page;

                    $scope.setPagination( (typeof cur_page == "undefined" ) ? 0 : tmp );
                    $scope.search.noResult = ( $scope.search.products_filtered.length == 0 ) ? true : false;

                    $('#search_loading').hide();
                }).error(function (data, status, headers, config) {
                    $scope.status = status;
                });
        }
	};
    
    $scope.cancelAdvancedSearchFilters = function () {
        $scope.showAdvancedSearchOption = false;
        hideSearchAdvancedPanel();
    }

	$scope.filterProducts = function () {
        if($scope.showAdvancedSearchOption){
            $scope.showAdvancedSearchOption = false;
            hideSearchAdvancedPanel();
        }
        
		var products = $scope.search.products,
			conditions = $scope.collectFilters(),
			result = [];

		if (conditions.length > 0) {
			for (var key in products) {
				var product = products[key];
				var condition = "if ( " + conditions.join(' && ') + "){ result.push( product ); }";
				eval(condition);
			}
		} else {
			result = products;
		}

        // Sort result by ExactMathch
        result = $scope.sortExactmatch( result );

        // Apply currency
        var i = 0, j = 0;
        for ( var key in result ){
            if ( result[key].exactmatch == true ){
                result[key].viewindex = i;
                i++;
            } else {
                result[key].viewindex = j;
                j++;
            }
        }

		$scope.search.products_filtered = result;
        $scope.search.noResult = $scope.search.products_filtered.length == 0;
		$scope.processPages();
	};

    $scope.sortExactmatch = function( result ){
        return result.sort( function(a, b){ return a.exactmatch < b.exactmatch; });
    };

    $scope.sortProducts = function(){
        if ( $scope.search.sortBy.selectedId == 0 ) return;
        switch ( $scope.search.sortBy.selectedId ){
            case "priceASC":
                $scope.search.products_filtered.sort( function(a,b){ return a.quote - b.quote;} );
                break;

            case "priceDESC":
                $scope.search.products_filtered.sort( function(a,b){ return b.quote - a.quote;} );
                break;

            case "bedroomsDESC":
                $scope.search.products_filtered.sort( function(a,b){ return b.bedroom - a.bedroom;} );
                break;

            case "bedroomsASC":
                $scope.search.products_filtered.sort( function(a,b){ return a.bedroom - b.bedroom;} );
                break;
            default :
                break;
        }
        //$scope.search.products_filtered =
        $scope.sortExactmatch( $scope.search.products_filtered );
    }

	$scope.getLocation = function(){
        var location = encodeURI($('#searchTextValue').val());

        if ( location.length == parseInt( location ).toString().length ) return;
        if ( location.length == 0 ) return;

		$http.get("/api/location/getinfo?location=" + location, {})
			.success(function (data, status, headers, config) {
				// alert( data.error == false );
                $scope.page.is_error = data.error;
                $scope.page.message = data.error_message;
				if ( data.error == true ){
                    $('#searchTextValue').addClass('input_required');
				} else {
                    $scope.search.searchLocationID = data.data.ID;
                    $('#searchTextValue').removeClass('input_required');
					$("#searchLocationID").val(data.data.ID);
				}
			});
	};

    $scope.collectFilters = function () {
        var filters = [];
        // Property type
        if ($scope.search.propertyType.selectedId != "PCT1") {
            filters.push('product.productClassType == "' + $scope.search.propertyType.selectedId + '"');
        }

        // Bedrooms
        if ($scope.search.bedroomNumber.selectedId != 0) {
            filters.push('product.bedroom == "' + $scope.search.bedroomNumber.selectedId + '"');
        }

        // Bahtrooms
        if ($scope.search.bathroomNumber.selectedId != 0) {
            filters.push('product.bathroom == "' + $scope.search.bathroomNumber.selectedId + '"');
        }

        // Min price
        if ($scope.search.minPrice != "" && $scope.search.minPrice != null) {
            filters.push('product.pricePerNight >= "' + parseFloat($scope.search.minPrice) + '"');
        }

        // Max price
        if ($scope.search.maxPrice != "" && $scope.search.maxPrice != null) {
            filters.push('product.pricePerNight <= "' + parseFloat($scope.search.maxPrice) + '"');
        }

        // Only booking
        if ($scope.search.onlyBooking != false) {
            filters.push('product.inquiryOnly == false');
        }

        // Main options
        if ( $scope.search.checkboxBabySitting != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxBabySitting + '") != -1');}
        if ( $scope.search.checkboxElevators != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxElevators + '") != -1');}
        if ( $scope.search.checkboxChildrensPool != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxChildrensPool + '") != -1');}

        if ( $scope.search.checkboxHeaterPool != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxHeaterPool + '") != -1');}
        if ( $scope.search.checkboxServicedDaily != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxServicedDaily + '") != -1');}
        if ( $scope.search.checkboxServicedWeekly != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxServicedWeekly + '") != -1');}

        if ( $scope.search.checkboxPoolIndoors != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxPoolIndoors + '") != -1');}
        if ( $scope.search.checkboxJacuzzi != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxJacuzzi + '") != -1');}
        if ( $scope.search.checkboxParking != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxParking + '") != -1');}

        if ( $scope.search.checkboxPool != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxPool + '") != -1');}
        if ( $scope.search.checkboxRoomService != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxRoomService + '") != -1');}
        if ( $scope.search.checkboxSauna != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxSauna + '") != -1');}

        if ( $scope.search.checkboxSteamBath != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxSteamBath + '") != -1');}
        if ( $scope.search.checkboxDryCleaning != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxDryCleaning + '") != -1');}
        if ( $scope.search.chckboxWakeupService != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.chckboxWakeupService + '") != -1');}

        if ( $scope.search.checkboxLaundrySelfService != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxLaundrySelfService + '") != -1');}
        if ( $scope.search.checkboxDirectDialPhone != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxDirectDialPhone + '") != -1');}
        if ( $scope.search.chckboxBarbequeGrill != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.chckboxBarbequeGrill + '") != -1');}

        if ( $scope.search.checkboxButlerService != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxButlerService + '") != -1');}
        if ( $scope.search.checkboxCoffeeTeaInRoom != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxCoffeeTeaInRoom + '") != -1');}
        if ( $scope.search.checkboxBreakfastFree != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxBreakfastFree + '") != -1');}

        if ( $scope.search.checkboxGroceryShoppingService != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxGroceryShoppingService + '") != -1');}
        if ( $scope.search.checkboxLoungeBar != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxLoungeBar + '") != -1');}
        if ( $scope.search.checkboxChildrensArea != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxChildrensArea + '") != -1');}

        if ( $scope.search.checkboxNonsmokingRooms != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxNonsmokingRooms + '") != -1');}
        if ( $scope.search.checkboxWiFiHotspot != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxWiFiHotspot + '") != -1');}
        if ( $scope.search.checkboxInternetFree != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxInternetFree + '") != -1');}

        if ( $scope.search.checkboxPrivatePool != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxPrivatePool + '") != -1');}
        if ( $scope.search.checkboxInternetFee != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxInternetFee + '") != -1');}
        if ( $scope.search.checkboxBathShower != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxBathShower + '") != -1');}

        if ( $scope.search.checkboxBath != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxBath + '") != -1');}
        if ( $scope.search.checkboxShower != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxShower + '") != -1');}

        // Additional options
        if ( $scope.search.checkboxCribCot != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxCribCot + '") != -1');}
        if ( $scope.search.checkboxWashingMachine != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxWashingMachine + '") != -1');}
        if ( $scope.search.checkboxDishwasher != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxDishwasher + '") != -1');}

        if ( $scope.search.checkboxFireplace != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxFireplace + '") != -1');}
        if ( $scope.search.checkboxKitchen != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxKitchen + '") != -1');}
        if ( $scope.search.checkboxKitchenette != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxKitchenette + '") != -1');}

        if ( $scope.search.checkboxMicrowave != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxMicrowave + '") != -1');}
        if ( $scope.search.checkboxOven != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxOven + '") != -1');}
        if ( $scope.search.checkboxRefrigerator != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxRefrigerator + '") != -1');}

        if ( $scope.search.checkboxTV != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxTV + '") != -1');}
        if ( $scope.search.checkboxTelephone != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxTelephone + '") != -1');}
        if ( $scope.search.checkboxTableTennis != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxTableTennis + '") != -1');}

        if ( $scope.search.checkboxDVDplayer != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxDVDplayer + '") != -1');}
        if ( $scope.search.checkboxSatelliteTV != "false" ){filters.push('product.attributes.indexOf("' + $scope.search.checkboxSatelliteTV + '") != -1');}

        // Product ID
        if ( $scope.search.productID != "" && $scope.search.productID != null && typeof $scope.search.productID != 'undefined' ){
            // 22.04.2014
            // Property ID on Search and display page
            // Need change it to search only by ID without other params
            // filters = [];
            filters.push('product.productid == "' + parseInt($scope.search.productID) + '"');
        }

        return filters;
    };

	// search.pages.total_products
	$scope.processPages = function () {
		$scope.paginator.pages = Math.ceil($scope.search.products_filtered.length / $scope.paginator.per_page);
        if ($scope.paginator.cur_page >= $scope.paginator.pages) $scope.paginator.cur_page = 0;
	};

	$scope.pricePerNight = function (date_checkin, date_checkout, rack) {
        if ( typeof date_checkin == 'undefined' && typeof date_checkout == 'undefined' ) return false;

		var dt1 = date_checkin.split('-'),
			dt2 = date_checkout.split('-');

		var date1 = new Date(dt1[0], dt1[1] - 1, dt1[2]);
		var date2 = new Date(dt2[0], dt2[1] - 1, dt2[2]);

        // old value
		return Math.ceil( rack / ((date2 - date1) / (1000 * 60 * 60 * 24)) );
        // new value with coma value
        // return ( rack / ((date2 - date1) / (1000 * 60 * 60 * 24))).toFixed(2);
	};


	$scope.diff2dates = function (date_start, date_end) {
        var date1 = new Date( date_start),
            date2 = new Date( date_end );
        date1.setHours(0); date1.setMinutes(0); date1.setSeconds(0);
        date2.setHours(0); date2.setMinutes(0); date2.setSeconds(0);
        return Math.round( (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) );
	};

	$scope.fillTestData = function () {
		$scope.search.searchValue = "Paris, France";
		$scope.search.searchLocationID = "21980";
		$scope.search.checkInDate = "10/13/2014";
        $scope.search.lengthStay.select( 14 );
        $scope.search.guests.select( 2 );
		$scope.processSearch();
	}
    
    
    
    $scope.showHideAdvancedSearchOption = function(){
        if($scope.showAdvancedSearchOption){
            hideSearchAdvancedPanel();    
        }else{
            showSearchAdvancedPanel();    
        }
        $scope.showAdvancedSearchOption = !$scope.showAdvancedSearchOption;
    }

    $scope.priceFormat = function( price, ceil ){
        price = ( typeof ceil == 'undefined' ) ? price : Math.ceil(price);
        return (price + '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    /* $scope.propertyPageShowSelectedImage = function(thumbSrc){
        var image = $("#propertyPageMainImage");
        image.fadeOut(80, function () {
            image.attr('src', thumbSrc);
            image.fadeIn(120);
        });
    } */
    
    //preload background of datepickers dropbox
    preloadImage("../img/search_datepicker_bcg.png")
    
    $('body').show();
                                           
    /*****************************************************/
    /* Property detail view - Calculate and show section */
    /*****************************************************/
    imagesResultSectionDiv = document.getElementById('imagesResultSection');
    overviewResultSectionDiv = document.getElementById('overviewResultSection');
    mapResultSectionDiv = document.getElementById('mapResultSection');
    ratesResultSectionDiv = document.getElementById('ratesResultSection');
    amenitiesResultSectionDiv = document.getElementById('amenitiesResultSection');
    //nearbyPoiResultSectionDiv = document.getElementById('nearbyPoiResultSection');
    
    $(window).on('DOMContentLoaded load resize scroll', function(){
        if($scope.showPage == showResultPage){
            var rectSectionRect = imagesResultSectionDiv.getBoundingClientRect();

            if ( isElementInViewport(imagesResultSectionDiv) || rectSectionRect.top>0) {
                $scope.resultView.showFixedHeader  = false;
                $scope.resultViewSelectedTab = 'overview_tab';
                $scope.$apply();
            } else {
                if(!$scope.resultView.showFixedHeader){
                    if(rectSectionRect.bottom > resultImagesBottomShowFloatingMenuPixelValue){
                        $scope.resultView.showFixedHeader  = false;
                        $scope.resultViewSelectedTab = 'overview_tab';
                        $scope.$apply();
                    }else {
                        $scope.resultView.showFixedHeader  = true;
                        $scope.$apply();
                    }
                }else{
                    if(rectSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultView.showFixedHeader  = false;
                        $scope.resultViewSelectedTab = 'overview_tab';
                        $scope.$apply();
                    }
                }
                
                if($scope.resultView.showFixedHeader){
                    var overviewSectionRect = overviewResultSectionDiv.getBoundingClientRect();
                    var mapSectionRect = mapResultSectionDiv.getBoundingClientRect();
                    var ratesSectionRect = ratesResultSectionDiv.getBoundingClientRect();
                    var amenitiesSectionRect = amenitiesResultSectionDiv.getBoundingClientRect();
                    //var nearbyPoiSectionRect = nearbyPoiResultSectionDiv.getBoundingClientRect();
                    
                    if(overviewSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultViewSelectedTab = 'overview_tab';
                    } else if(mapSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultViewSelectedTab = 'map_tab';
                        jQuery("#datesAvailabilityCalendar").datepicker("refresh");
                    } else if(ratesSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultViewSelectedTab = 'rates_tab';
                    } else if(amenitiesSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultViewSelectedTab = 'amenities_tab';
                    } /*else if(nearbyPoiSectionRect.bottom > resultTabFixedSectionTopValue){
                        $scope.resultViewSelectedTab = 'nearby_points_tab';
                    }*/ else{
                        $scope.resultViewSelectedTab = 'reviews_tab';
                    }  
                    $scope.$apply();        
                }
                
            }
        }
    }); 
});


function isElementInViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}


wrapperWidthThumbImageRegularRes = 620;
thumbImageRegularResMinHeight = 72;
thumbImageRegularResMinWidth = 120;  
thumbImageRegularResRightMargin = 5;

mainImageRegularResMinHeight = 337;
mainImageRegularResMinWidth = 620;  

var widthThumbsDiv = 0;
animateThumbScrollTime = 200;

moveThumbsDivValue = thumbImageRegularResMinWidth + thumbImageRegularResRightMargin;

function initializePropertyImages(imageDataArray){
    imageArray = new Array();
    imageArray = imageDataArray;
     
    if( imageArray.length > 0 ){
        currentPropertyImage = 0;
        //$scope.property_detail.image = data.product.images.image[0];
        jQuery("#propertyPageMainImage").attr('src', imageArray[0]);
        jQuery('#propertyPageMainImage').load(function(){
            ratio = this.height / mainImageRegularResMinHeight;
            if ((this.width / ratio) < mainImageRegularResMinWidth) {
                jQuery(this).width(mainImageRegularResMinWidth).height('auto');
            } else {
                jQuery(this).width('auto').height(mainImageRegularResMinHeight);
            }              
        });
    }
    
    setMainPropertyImageNavigationVisibility();
    
    widthThumbsDiv = 0;
    jQuery("#propertyThumbImagesDiv").empty();
    for (var currImg = 0; currImg < imageArray.length; currImg++) { 
        var imageIdName = 'propertyThumb'+currImg;
        var marginRightClass = "";
        if(currImg+1 < imageArray.length){
            marginRightClass = "thumb_image_margin_right";    
        }
        var oneImageBlock = '<div class="result_small_image_wrapper '+marginRightClass+'">'+
                                '<img id="'+imageIdName+'" src="'+imageArray[currImg]+'" onclick="propertyPageShowSelectedImage(\''+currImg+'\')" class="result_thumb_image" />'+
                            '</div>';
        jQuery("#propertyThumbImagesDiv").append(oneImageBlock); 
        
        jQuery('#'+imageIdName).load(function(){
            var imageClass = "";
            ratio = this.height / thumbImageRegularResMinHeight;
            if ((this.width / ratio) < thumbImageRegularResMinWidth) {
                //imageClass = "image_set_width";
                jQuery(this).width(thumbImageRegularResMinWidth).height('auto');
            } else {
                //imageClass = "image_set_height";
                jQuery(this).width('auto').height(thumbImageRegularResMinHeight);
            }  
            
            //jQuery(this).addClass(imageClass);
        });
        
        widthThumbsDiv += thumbImageRegularResMinWidth + thumbImageRegularResRightMargin;
        
    } 
    if(imageArray.length>0){
        widthThumbsDiv -= thumbImageRegularResRightMargin;
    } 
    
    jQuery("#propertyThumbImagesDiv").append('<div class="clearer"></div>'); 
    jQuery("#propertyThumbImagesDiv").width(widthThumbsDiv);
    jQuery("#propertyThumbImagesDiv").css({left: 0});
    

}

function propertyPageShowSelectedImage(showImage){
    arrayKey = parseInt(showImage);
    if(currentPropertyImage!=arrayKey){
        var image = jQuery("#propertyPageMainImage");
        currentPropertyImage = arrayKey;
        //image.attr('src', imageArray[arrayKey]);

        image.fadeOut(50, function () {
            image.attr('src', imageArray[arrayKey]);
            image.fadeIn(80);
            setMainPropertyImageNavigationVisibility();
        });  
        
        
    }
}

function setMainPropertyImageNavigationVisibility(){
    if(currentPropertyImage+1==imageArray.length){
        jQuery("#propertyPageMainImageRightButton").removeClass("result_main_image_right_button");    
    }else{
        jQuery("#propertyPageMainImageRightButton").addClass("result_main_image_right_button");
    }
    if(currentPropertyImage==0){
        jQuery("#propertyPageMainImageLeftButton").removeClass("result_main_image_left_button");   
    }else{
        jQuery("#propertyPageMainImageLeftButton").addClass("result_main_image_left_button");
    }   
}

function showNextPropertyImage(){
    var nextImageKey = currentPropertyImage + 1;
    if(nextImageKey<imageArray.length){
        propertyPageShowSelectedImage(nextImageKey);
        rightMoveThumbs();
    }
}

function showPreviousPropertyImage(){
    var previousImageKey = currentPropertyImage - 1;
    if(previousImageKey>=0){
        propertyPageShowSelectedImage(previousImageKey);
        leftMoveThumbs();
        
    }
}


function leftMoveThumbs(){
    currentLeftPosition = parseInt(jQuery("#propertyThumbImagesDiv").css("left"));        
     
    if(currentLeftPosition<0){
        newPosition = currentLeftPosition + moveThumbsDivValue; 
        if(newPosition<0){
            jQuery("#propertyThumbImagesDiv").animate({"left": newPosition+"px"},animateThumbScrollTime); 
        }else{
            jQuery("#propertyThumbImagesDiv").animate({"left": 0+"px"},animateThumbScrollTime); 
        } 
    }        
    
}

function rightMoveThumbs(){
    currentLeftPosition = parseInt(jQuery("#propertyThumbImagesDiv").css("left"));
   /* widthTimeline = jQuery("#timelineTabContent").width() + timelineContentPadding;*/
    minLeft = wrapperWidthThumbImageRegularRes - widthThumbsDiv;
        
    if(currentLeftPosition>minLeft){
        newPosition = currentLeftPosition - moveThumbsDivValue; 
        if(newPosition>minLeft){
            jQuery("#propertyThumbImagesDiv").animate({"left": newPosition+"px"},animateThumbScrollTime); 
        }else{
            jQuery("#propertyThumbImagesDiv").animate({"left": minLeft+"px"},animateThumbScrollTime); 
        }    
    }        
            
}





function showSearchAdvancedPanel(){
    jQuery("#searchAdvancedPanelDiv").slideDown(300);   
}

function hideSearchAdvancedPanel(){
    jQuery("#searchAdvancedPanelDiv").slideUp(200);   
}

function jqSliderStep2(){
	var initialValue = 400;
	var minValue = 5;
	var maxValue = 1000;

	var sliderPriceRangeTooltip = function (event, ui) {
		var curValue = ui.value || initialValue;
		/* var curValue = ui.value || $scope.sliderStep2.selectedValue; */
		var target = ui.handle || jQuery('.ui-slider-handle');
		var tooltip = '<div class="search_price_range_slider_tooltip">$' + curValue + '</div>';
		jQuery(target).html(tooltip);
	};

	jQuery("#searchPriceRangeSlider").slider({
		value: initialValue,
		min: minValue,
		max: maxValue,
		step: 1,
		create: sliderPriceRangeTooltip,
		slide: function (event, ui) {
			jQuery(".search_price_range_slider_tooltip", this).html("$" + ui.value);
		},
		change: function (event, ui) {
			jQuery(".search_price_range_slider_tooltip", this).html("$" + ui.value);
			/*
			 $scope.sliderStep2.selectedValue = ui.value;
			 setSliderStep2DependingValues($scope);

			 if(!$scope.$$phase) {
			 $scope.$apply();
			 }
			 */
		}
	});
}


/*
 * dateFieldInRange - can be start or end
 */
app.directive('datepicker', function ($rootScope) {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			datepickerClass: '@',
			dateFieldInRange: '@',
			connectedDateFieldIdArray: '=',
			connectedDateFieldValue: '=',
            reloadDetailPage: '@'
		},
		link: function (scope, element, attrs, ngModelCtrl) {

			$(function () {
				var minDateValue = 0;
                if(scope.dateFieldInRange == 'end'){
                    minDateValue = 1;   
                }
                
				if (scope.dateFieldInRange == 'end' && scope.connectedDateFieldValue
					&& scope.connectedDateFieldValue != 'CHECK-IN' && scope.connectedDateFieldValue != '') {
                    var endMinDateValue = new Date(scope.connectedDateFieldValue)
                    endMinDateValue.setDate(endMinDateValue.getDate() + 1);    
					minDateValue = endMinDateValue;
				}

                // scope.openResultView( Mybookingpal.settings.product_id, '06/12/2014', '06/18/2014' );

				element.datepicker({
					dateFormat: dateFormatConstant,
					showOtherMonths: true,
					selectOtherMonths: true,
					firstDay: 1,
					showAnim: '',
					minDate: minDateValue,
                    
					beforeShow: function (input, inst) {
						inst.dpDiv.addClass(scope.datepickerClass);
                        if ( $('#bookCheckInDatepickerField').val() != "" ){
                            detailPrevDate = $('#bookCheckInDatepickerField').val();
                        }
					},
                    // highlight day in week
                    beforeShowDay: function (date) {
                        //jQuery(".ui-datepicker-calendar").after("<div>test</div>");
                        if (scope.dateFieldInRange == 'start' && date.getDay()==6) {
                            return [true , "highlight_recommended_day"];
                        }
                        return[true,""]
                    },
					onClose: function (input, inst) {
						inst.dpDiv.removeClass(scope.datepickerClass);
					},
					onSelect: function (selectedDate) {
						scope.$apply(function () {
							ngModelCtrl.$setViewValue(selectedDate);
						});

						if (scope.datepickerClass == 'datepicker_book_panel' || scope.datepickerClass == 'datepicker_popup_window') {
							jQuery("#datesAvailabilityCalendar").datepicker("refresh");
						}

						/* adding minDate and maxDate option to coresponding date range field */
						if (scope.dateFieldInRange == 'start') {
                            /*
                            if ( scope.datepickerClass == "datepicker_search_search_panel" ){
                                scope.dateCheckin = selectedDate;
                                scope.$apply();
                            }
                            */

                            var endMinDate = new Date( selectedDate )
                            endMinDate.setDate(endMinDate.getDate() + 1);
							for (var index = 0; index < scope.connectedDateFieldIdArray.length; ++index) {
                                if ( $(this).attr('id') != "searchCheckInDatepickerField" ){
								    angular.element("#" + scope.connectedDateFieldIdArray[index]).datepicker("option", "minDate", endMinDate);
                                }
							}
						} else if (scope.dateFieldInRange == 'end') {
                            var startMaxDate = new Date(selectedDate)
                            startMaxDate.setDate(startMaxDate.getDate() - 1);

							for ( index = 0; index < scope.connectedDateFieldIdArray.length; ++index) {
                                if ( scope.reloadDetailPage != "bookCheck"  ){
								    angular.element("#" + scope.connectedDateFieldIdArray[index]).datepicker("option", "maxDate", startMaxDate);
                                }
							}
						}

                        if ( $(this).attr('id') == "bookCheckInDatepickerField" && detailPrevDate != "" ){
                            var tmp = Mybookingpal.addDate( scope.connectedDateFieldValue, Mybookingpal.diff2dates( detailPrevDate, selectedDate ), false );
                            scope.connectedDateFieldValue = tmp;
                            scope.$apply();
                        }

                        if ( typeof scope.reloadDetailPage != 'undefined' ){
                            $('#reload_detail').click();
                        }
                    }
				}).bind("click focus" ,function() {
                    if( scope.dateFieldInRange == 'start' ){
                        jQuery(".recommended_day_div").remove(); 
                        jQuery('#ui-datepicker-div').append('<div class="recommended_day_div">Recommended arrival day: <strong>Saturday</strong> = largest choice </div>');
                    }
                });
			});
		}
	}
});



app.directive('datepickerInline', function () {
	return {
		restrict: 'A',
		scope: {
			bookCheckInDate: '=',
			bookCheckOutDate: '='
		},
		link: function (scope, element, attrs) {
			$(function () {
				//just for showing until API do not work
				var arrayInvalidDates = invalidDates;//["04/01/2014", "04/04/2014", "04/06/2014"];
				// var arraySelectedDates = ["01/26/2014","01/25/2014"];
				$( element ).datepicker({
					dateFormat: dateFormatConstant,
					showOtherMonths: true,
					numberOfMonths: 3,
					firstDay: 1,
                    // defaultDate: '-2m',
					beforeShowDay: function (date) {
						var arraySelectedDates = getDatesArrayFromRange(scope.bookCheckInDate, scope.bookCheckOutDate);
						var currentDateString = jQuery.datepicker.formatDate(dateFormatConstant, date);

                        arrayInvalidDates = invalidDates;

						if ( arrayInvalidDates.indexOf(currentDateString) >= 0 ) {
							return [ false , "non_available_date"];
						} else if (scope.bookCheckInDate && scope.bookCheckInDate == currentDateString) {
							return [ false , "selected_date_start"];
						} else if (scope.bookCheckOutDate && scope.bookCheckOutDate == currentDateString) {
							return [ false , "selected_date_end"];
						} else if (arraySelectedDates.indexOf(currentDateString) >= 0) {
							return [ false , "selected_date"];
						} else {
							return [ false , "available_date"];
						}
					}
				});
			});
		}
	}
});


app.directive('setImageSize', function () {
	return {
		restrict: 'A',
		scope: {
			resolutionView: '=',
			regularMinHeight: '@',
			regularMinWidth: '@',
			iframeMinHeight: '@',
			iframeMinWidth: '@'
		},
		link: function (scope, element, attrs) {
			element.bind("load", function (e) {

				//alert("Image height="+element[0].naturalHeight+ ", image width="+element[0].naturalWidth);
				if (scope.resolutionView == "iframe") {
					var ratio = element[0].naturalHeight / scope.iframeMinHeight;
					if ((element[0].naturalWidth / ratio) < scope.iframeMinWidth) {
						//alert("setWidth");
						element.addClass("image_set_width");
					} else {
						//alert("setheight");
						element.addClass("image_set_height");
					}
				} else {
					ratio = element[0].naturalHeight / scope.regularMinHeight;
					if ((element[0].naturalWidth / ratio) < scope.regularMinWidth) {
						//alert("setWidth");
						element.addClass("image_set_width");
					} else {
						//alert("setheight");
						element.addClass("image_set_height");
					}
				}
			});
		}
	}
});


Date.prototype.addDays = function (days) {
	var dat = new Date(this.valueOf())
	dat.setDate(dat.getDate() + days);
	return dat;
}

function getDatesArrayFromRange(startDateString, stopDateString) {
	var resultDateArray = new Array();

	//this logic is when dateForamt is mm/dd/yy

	if (startDateString && stopDateString) {
		var tempStartDateArray = startDateString.split("/");
		var startDate = new Date(tempStartDateArray[2], tempStartDateArray[0] - 1, tempStartDateArray[1]);

		var tempStopDateArray = stopDateString.split("/");
		var stopDate = new Date(tempStopDateArray[2], tempStopDateArray[0] - 1, tempStopDateArray[1]);


		var currentDate = startDate;
		while (currentDate <= stopDate) {
			//resultDateArray.push( new Date (currentDate) )
			resultDateArray.push(jQuery.datepicker.formatDate(dateFormatConstant, currentDate))
			currentDate = currentDate.addDays(1);
		}
	}
	return resultDateArray;
}


function setResolutionOnPageOpen($scope, $location, $http) {
	/* here we check is there parameter iframe='yes' in URL */
	var iframeParameterValue = $location.search().size;
	if (iframeParameterValue == 'yes') {
		$scope.resolutionView = 'iframe';
		$scope.boxViewResultPerRow = iframeResBoxesPerRow;
		$scope.boxViewLastColumnInRow = iframeResBoxesViewLastColumn;
	}

}

app.filter('startFrom', function () {
	return function (input, start) {
		start = +start; //parse to int
		return input.slice(start);
	}
});

app.filter('range', function () {
	return function (input, total) {
		total = parseInt(total);
		for (var i = 0; i < total; i++)
			input.push(i);
		return input;
	};
});

app.filter('get_html', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

function preloadImage(url){
    var img=new Image();
    img.src=url;
}

/*
'use strict';

app.directive('printDiv', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function (evt) {
				evt.preventDefault();
				PrintElem(attrs.printDiv);
			});

			function PrintElem(elem) {
				PrintWithIframe($(elem).html());
			}

			function PrintWithIframe(data) {
				if (jQuery('iframe#printf').size() == 0) {
					jQuery('body').append('<iframe id="printf" name="printf" width="1" height="0"></iframe>');  // an iFrame is added to the html content,

					var mywindow = window.frames["printf"];
					mywindow.document.write('<html><head><title>Rental Agreement</title><style>@page {margin: 25mm 5mm 25mm 5mm;}</style>'
						+ '<link rel="stylesheet" type="text/css" href="../css/styleSearch.css" />'
						+ '</head><body><div>'
						+ data
						+ '</div></body></html>'
					);

					mywindow.document.close();

					mywindow.focus();
					mywindow.print();

					setTimeout(function () {
						jQuery('iframe#printf').remove();
					}, 100);

				}

				return true;
			}
		}
	};
});
*/
/*
function printRentalAgreementFromPopup(){
    if ($('iframe#printf').size() == 0) {
        var dataContent = $('#popupRentalAgreementContentForPrint').html();
        $('body').append('<iframe id="printf" name="printf" width="1" height="0"></iframe>');  // an iFrame is added to the html content,

        var mywindow = window.frames["printf"];
        mywindow.document.write('<html><head><title>Rental Agreement</title><style>@page {margin: 25mm 5mm 25mm 5mm;}</style>'
            + '<link rel="stylesheet" type="text/css" href="../css/widget.css" />'
            + '</head><body><div>'
            + dataContent
            + '</div></body></html>'
        );

        mywindow.document.close();

        mywindow.focus();
        mywindow.print();
         
        setTimeout(function () {
            $('iframe#printf').remove();
        }, 100);
        
    }

    return true;    
}
*/