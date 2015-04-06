app.controller('search', function($scope, $http, mbp_helper){
	// debug param
	$scope.hide_description = false;
	$scope.debug = true;
	$scope.error = false;
	$scope.errorMessage = false;
	$scope.showCommission = false;

	// search Params
	$scope.params = {
		adults: 2,
		amenity: true,
		// 'checkInDate': '09/16/2014',
		// 'checkOutDate': '09/20/2014',
		checkInDate: '',
		checkOutDate: '',
		currency: 'USD',
		detailApiCount: 0,
		detailApiNum: 2,
		detailCheckInDate: '',
		detailsPeriod: 0,
		detailCheckOutDate: '',
        displayInquireOnly: false,
		execMatch: false,
		language: 'English',
		// 'locationID'  : 21980,
		// 'locationName': 'Paris',
		locationID: 0,
		locationName: '',
        locationNameOutput: '',
        logo: null,
		period: 0,
        periodOutput: 0,
		pos: '',
		product_id: 0,
		search_product: false,
		sort: 0,
		search_result_type: 'list'
	};

    // Currecies
    $scope.currency = {
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

	};


	$scope.currency_list = [
		{id: 'USD', name: 'USD'},
		{id: 'EUR', name: 'EUR'}
	];

	$scope.sort_list = {
		'0': {
			name: 'Any',
			type: 'Random'
		},
		'priceASC': {
			name: 'Price',
			type: 'Low - High'
		},
		'priceDESC': {
			name: 'Price',
			type: 'High - Low'
		},
		'bedroomsDESC': {
			name: 'Bedrooms',
			type: 'High - Low'
		},
		'bedroomsASC': {
			name: 'Bedrooms',
			type: 'Low - High'
		}
	};

	$scope.select = function(index) {
		$scope.selected = index;
	};

	$scope.adults = {
		"1": "1 Guest",
		"2": "2 Guests",
		"3": "3 Guests",
		"4": "4 Guests",
		"5": "5 Guests",
		"6": "6 Guests",
		"7": "7 Guests",
		"8": "8 Guests",
		"9": "9 Guests",
		"10": "10 Guests"
	};

	$scope.adults_list = [
		{id: '1', name: '1 Guest'},
		{id: '2', name: '2 Guests'},
		{id: '3', name: '3 Guests'},
		{id: '4', name: '4 Guests'},
		{id: '5', name: '5 Guests'},
		{id: '6', name: '6 Guests'},
		{id: '7', name: '7 Guests'},
		{id: '8', name: '8 Guests'},
		{id: '9', name: '9 Guests'},
		{id: '10', name: '10 Guests'}
	]

	$scope.product_info = {
		address:     null,
		amenities:   null,
		bathroom:    null,
		bedroom:     null,
		cancellationMessage: null,
		cc:          {
			amex:  false,
			dines: false,
			dscvr: false,
			jcb:   false,
			mc:    false,
			visa:  false
		},
		checkIn: null,
		checkOut: null,
		commission:  null,
		description: null,
		fees:        {
			included: [],
			excluded: []
		},
		id:          null,
		images:      null,
		inquire:     null,
		lat:         null,
		lng:         null,
		map:         null,
		message:     null,
		minstay:     null,
		name:        null,
		price:       null,
		prices:      [],
		propertyType:null,
		terms:       {
			type: null,
			url:  null
		}
	};

	$scope.clearProductInfo = function(){
		$scope.product_info.amenities = null;
		$scope.product_info.bathroom = null;
		$scope.product_info.bedroom = null;
		$scope.product_infocancellationMessage = null;
		$scope.product_info.cc = {
			amex:  false,
			dines: false,
			dscvr: false,
			jcb:   false,
			mc:    false,
			visa:  false
		};
		$scope.product_info.checkIn = null;
		$scope.product_info.checkOut = null;
		$scope.product_info.commission = null;
		$scope.product_info.description = null;
		$scope.product_info.fees = {
			included: [],
			excluded: []
		};
		$scope.product_info.id = null;
		$scope.product_info.images = null;
		$scope.product_info.inquire = null;
		$scope.product_info.map = null;
		$scope.product_info.message = null;
		$scope.product_info.minstay = null;

		$scope.product_info.price = null;
		$scope.product_info.prices = [];
		$scope.product_info.propertyType = null;
		$scope.product_info.terms = {
			type: null,
			url:  null
		};
	}

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
		'38': 'Convention Facility',
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

	$scope.products = {
		all: [],
		filtered: []
	};
	// $scope.products_filtered = [];
	$scope.action = ''; // Could be "search_process" (loading search), "search_no_result" (no search result), "search_result" (show product list), "product_detail" (show product detail)

	// Pagination params
	$scope.pagination = {
		current: null,
		pages:   null,
		perPage: 30,
        showLabels: false,
        labelState: -1,
		// Process pages
		processPagination: function(){
			$scope.pagination.pages = Math.ceil($scope.products.filtered.length / $scope.pagination.perPage);
			if ( $scope.pagination.current >= $scope.pagination.pages ) $scope.pagination.current = 0;
		},
		setPage: function(page){
			$scope.pagination.current = page;
            $scope.pagination.labelState = -1;

            var num_exact = 0,
                limit = ( ($scope.pagination.current + 1) * $scope.pagination.perPage > $scope.products.filtered.length ) ? $scope.products.filtered.length : ($scope.pagination.current + 1) * $scope.pagination.perPage,
                num_products = limit - $scope.pagination.current * $scope.pagination.perPage;

            for ( var i = $scope.pagination.current * $scope.pagination.perPage; i < limit; i++ ){
                if ( $scope.products.filtered[i].exactmatch == true ){
                    num_exact++;
                }
            }
            $scope.pagination.showLabels = (num_products != num_exact);
		},
        processLabel: function( exactmatch ){
            $scope.pagination.labelState = exactmatch;
        }
	}

	/**
	 * Convert date format
	 * @returns {string}
	 */
	$scope.convertDate = function( d, t ){
		return mbp_helper.convertDate(d, t);
	}

	/**
	 * Get dufferebt betweeb two dates
	 * @param start
	 * @param end
	 * @returns {number}
	 */
	$scope.diff2dates = function(start, end){
		var date1 = new Date( start),
			date2 = new Date( end );
		date1.setHours(0); date1.setMinutes(0); date1.setSeconds(0);
		date2.setHours(0); date2.setMinutes(0); date2.setSeconds(0);
		return Math.round( (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24) );
	}

	/**
	 * Select currency
	 * @param id
	 * @param name
	 */
	$scope.selectCurrency = function(id, name){
		$scope.params.currency = id;
		switch ( $scope.action ){
			case 'search_result':
				$scope.processSearch();
				break;

			case 'product_detail':
				$scope.runQuotesAPI();
                $scope.runPropertyPricesAPI();
				break;
		}
	}

	/**
	 * Select count of guests
	 * @param id
	 * @param name
	 */
	$scope.selectAdults = function(id, name){
		$scope.params.adults = id;
	}

	/**
	 * Initialize functionality
	 */
	$scope.init = function(){
		if ( window.location.href.indexOf('#/search') != -1 ){
            if ( $scope.params.locationID == 0 ){
                $scope.action = 'search_result';
                return false;
            }
			$scope.processSearch();
		}
		if ( window.location.href.indexOf('#/product') != -1 ){
			$scope.openProductDetail( $scope.params.product_id );
		}
	}

	$scope.sortExactmatch = function( result ){
		return result.sort( function(a, b){ return a.exactmatch < b.exactmatch; });
	};

	/**
	 * Sort products
	 */
	$scope.sortProducts = function(){
		// if ( $scope.search.sortBy.selectedId == 0 ) return;
		switch ( $scope.params.sort ){
			case "priceASC":
				$scope.products.filtered.sort( function(a,b){ return a.quote - b.quote;} );
				break;

			case "priceDESC":
				$scope.products.filtered.sort( function(a,b){ return b.quote - a.quote;} );
				break;

            case "bedroomsASC":
                $scope.products.filtered.sort( function(a,b){ return a.bedroom - b.bedroom;} );
                break;

			case "bedroomsDESC":
				$scope.products.filtered.sort( function(a,b){ return b.bedroom - a.bedroom;} );
				break;

			case "0":
				$scope.products.filtered = $scope.products.all;
				break;
		}
		$scope.products.filtered = $scope.sortExactmatch( $scope.products.filtered );
        //$scope.products.filtered.sort( function(a, b){ return a.exactmatch < b.exactmatch; });
	}

	/**
	 * Search input params validation.
	 * @returns {booleand} if there is error (true) or no errors (false)
	 */
	$scope.validateSearchParams = function(){
		var error = false,
            is_search_property = $scope.params.locationName.length == parseInt( $scope.params.locationName ).toString().length && !isNaN( parseInt( $scope.params.locationName ) );

		angular.element('.form-control', '.search-panel-wrapper').removeClass('error');

		if ( !$scope.params.locationID && !is_search_property ) {
			angular.element('#searchTextValue').addClass('error');
			error = true;
		}

		if (!$scope.params.checkInDate) {
			angular.element('#checkInDate').addClass('error');
			error = true;
		}

		if (!$scope.params.checkOutDate) {
			angular.element('#checkOutDate').addClass('error');
			error = true;
		}

		if (!$scope.params.adults) {
			angular.element('#guests_button').addClass('error');
			error = true;
		}

		return error;
	};

    $scope.backToSearch = function(){
        console.log( window.location.href.indexOf('/product') );
        if ( window.location.href.indexOf('/product') != -1 ){
            $scope.processSearch();
        } else {
            $scope.action = 'search_result';
        }
    }

	/**
	 * Clear error variables
	 */
	$scope.clearError = function(){
		$scope.error = false;
		$scope.errorMessage = "";
	}

	/**
	 * Set error variables
	 */
	$scope.setError = function( message ){
		$scope.error = true;
		$scope.errorMessage = message;
	}

	$scope.inquire = {
		adults: null,
		adultsList: ['1','2','3','4','5','6','7','8','9','10'],
		checkInDate: null,
		checkOutDate: null,
		child: null,
		childList: ['0','1','2','3','4','5','6','7','8','9','10'],
		emailaddress: null,
		firstname: null,
		lastname: null,
		messageText: null,
		phonenumber: null,
		productID: null
	};

	$scope.clearInquireDialog = function(){
		$scope.inquire.emailaddress = "";
		$scope.inquire.firstname = "";
		$scope.inquire.lastname = "";
		$scope.inquire.messageText = "";
		$scope.inquire.phonenumber = "";
	};

	$scope.showInquireDialog = function( check_in, check_out, adults, product_id ){
		// Clear fields
		$scope.clearInquireDialog();

		$scope.inquire.adults = $scope.params.adults;
		$scope.inquire.checkInDate = $scope.params.detailCheckInDate;
		$scope.inquire.checkOutDate = $scope.params.detailCheckOutDate,
			$scope.inquire.child = 0;
		$scope.inquire.productID = $scope.product_info.id;

		$scope.showPopupContact = true;

		$('#inquire_form').show();
		$('#inquire_confirmation').hide();
	}

	$scope.submitInquireDialog = function () {
		var error = false;

		if ( typeof $scope.inquire.productID == "undefined" ){ error = true; }
		if ( typeof $scope.inquire.checkInDate == "undefined" || $scope.inquire.checkInDate == angular.element('#contactCheckInDatepickerField').attr('placeholder') ){ angular.element('#contactCheckInDatepickerField').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactCheckInDatepickerField').removeClass('popup_window_red_input_field'); }
		if ( typeof $scope.inquire.checkOutDate == "undefined" || $scope.inquire.checkOutDate == angular.element('#contactCheckOutDatepickerField').attr('placeholder') ){ angular.element('#contactCheckOutDatepickerField').addClass('popup_window_red_input_field'); error = true; } else { angular.element('#contactCheckOutDatepickerField').removeClass('popup_window_red_input_field'); }

		if ( $scope.inquire.firstname == "" || $scope.inquire.firstname == angular.element('#contactFirstname').attr('placeholder') ){angular.element('#contactFirstname').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactFirstname').removeClass('popup_window_red_input_field');}
		if ( $scope.inquire.lastname == "" || $scope.inquire.lastname == angular.element('#contactLastname').attr('placeholder') ){angular.element('#contactLastname').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactLastname').removeClass('popup_window_red_input_field');}

		if ( $scope.inquire.emailaddress == "" || $scope.inquire.emailaddress == angular.element('#contactEmailaddress').attr('placeholder') ){angular.element('#contactEmailaddress').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactEmailaddress').removeClass('popup_window_red_input_field');}
		if ( $scope.inquire.phonenumber == "" || $scope.inquire.phonenumber == angular.element('#contactPhonenumber').attr('placeholder') ){angular.element('#contactPhonenumber').addClass('popup_window_red_input_field'); error = true;} else {angular.element('#contactPhonenumber').removeClass('popup_window_red_input_field');}


		if ( error == true ){
			return;
		}

		$http.get(API_URL + 'xml/services/json/reservation/inquiry?pos=' + $scope.params.pos + '&productid=' + $scope.inquire.productID + '&fromdate=' + mbp_helper.convertDate($scope.inquire.checkInDate, 'mysql') + '&todate=' + mbp_helper.convertDate($scope.inquire.checkOutDate, 'mysql') + '&firstname=' + $scope.inquire.firstname + '&familyname=' + $scope.inquire.lastname +'&emailaddress=' + $scope.inquire.emailaddress + '&telnumber=' + $scope.inquire.phonenumber + '&adult=' + $scope.inquire.adults + '&child=' + $scope.inquire.child + '&notes=' + $scope.inquire.messageText)
			.success($scope.parseInquireResponse)
			.error(function () {
				console.log('Server error.');
			});
	};

	$scope.parseInquireResponse = function (data, status, headers, config) {
		if (data.reservation_response.is_error){
			angular.element('.popup_content_error', '#popup_window_contact_owner').text(data.reservation_response.message);
			return;
		}

		angular.element('#inquire_form').hide();
		angular.element('#inquire_confirmation').show();

		angular.element('#inquiry_fn_ln').text($scope.inquire.firstname + ' ' + $scope.inquire.lastname);
	};

	/**
	 * Search products function.
	 */
	$scope.processSearch = function(){
		// Output debug info
		if ( $scope.debug ){console.log('$scope.processSearch');}
		$scope.clearError();
        if ( $scope.validateSearchParams() ){ return; }

		// Show progres loader
		$scope.action = 'search_process';
		// Init search by product param
		$scope.params.search_product = $scope.params.locationName.length == parseInt( $scope.params.locationName ).toString().length && !isNaN( parseInt( $scope.params.locationName ) );
		// Init detail check-in check-out dates
		$scope.params.detailCheckInDate = $scope.params.checkInDate;
		$scope.params.detailCheckOutDate = $scope.params.checkOutDate;
        //
        $scope.params.locationNameOutput = $scope.params.locationName,
        $scope.params.periodOutput = $scope.params.period;

		if ( !$scope.params.search_product ){
			// API ajax call
			$http.get( API_URL + "xml/services/json/reservation/products/" + $scope.params.locationID + "/" + mbp_helper.convertDate($scope.params.checkInDate, 'mysql') + "/" + mbp_helper.convertDate($scope.params.checkOutDate, 'mysql') + "?pos=" + $scope.params.pos + "&guests=" + $scope.params.adults + "&amenity="+ $scope.params.amenity + "&currency=" + $scope.params.currency + "&exec_match=" + $scope.params.execMatch + "&display_inquire_only=" + $scope.params.displayInquireOnly, {})
				.success(function (data, status, headers, config) {
					// Set error if there is error into API
					if ( data.search_response.is_error == true ){
						$scope.setError(data.search_response.message);
					}

					$scope.products.all = [];
					$scope.products.filtered = [];

					if (typeof data.search_response.search_quotes.quote == "object" && typeof data.search_response.search_quotes.quote.length == "number") {
						$scope.products.all = data.search_response.search_quotes.quote;
					} else if (typeof data.search_response.search_quotes.quote == "object" && typeof data.search_response.search_quotes.quote.length == "undefined") {
						$scope.products.all.push(data.search_response.search_quotes.quote);
					}

					// Count price per night
					for (var k in $scope.products.all){
						// $scope.products[k].currency = Mybookingpal.currency[ $scope.products[k].currency ];
						$scope.products.all[k].pricePerNight = $scope.products.all[k].rack/$scope.params.period;

						//images filters
						var img_path = $scope.products.all[k].pictureLocation;

						var reg =  /\.(?=gif)|\.(?=png)|\.(?=jpg)|\.(?=jpeg)/i;
						var standard = /\/raz\//i;

						if (img_path.search(reg) == -1&&img_path.search(standard) == -1&&img_path.search('mybookingpal') != -1) {
							img_path += 'Standard';
						} else if (img_path.search(standard) == -1&&img_path.search(reg) != -1&&img_path.search('mybookingpal') != -1){
							img_path = img_path.replace(reg,'Standard.');
						}
						else {
							continue;
						}
						$scope.products.all[k].pictureLocation = img_path;// = 'http://pro-fish.com.ua/wp-content/uploads/2014/10/tern_main.jpg';

					}

					// Process pagination
					$scope.products.filtered = $scope.products.all;

                    // Auto Filtering results
                    $scope.advancedSearch.apply();

					$scope.pagination.processPagination();
					$scope.pagination.setPage(0);

					// Show search result content
					$scope.action = 'search_result';


				}).error(function (data, status, headers, config) {
					$scope.status = status;
				});
		} else {
			$scope.runPropertyDetailSearchAPI($scope.params.locationName, '', '');
		}
	}

	/**
	 * Show product detail page.
	 * @param product_id - id of product into mybookingpa
	 * @param check_in   - check in date
	 * @param check_out  - check out date
	 */
	$scope.openProductDetail = function( product_id, check_in, check_out ){
		// Clear product fields
		// $scope.clearProductInfo();

		$scope.action = 'product_detail';
		$scope.clearError();

		$scope.params.detailApiCount = 0;
		$scope.params.product_id = product_id;

		// Run property detail API
		$scope.runPropertyDetailAPI();
		$scope.runQuotesAPI();
		$scope.runPropertyPricesAPI();

		$scope.inlineDetailCalendar.changeBookedDate();
	};

	$scope.processCarousel = function( images ){
		$('.large-img').removeClass('slick-initialized slick-slider').children().remove();
		$('.images-block').removeClass('slick-initialized slick-slider').children().remove();

		$('.images-block').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			asNavFor: '.large-img',
			centerMode: false,
			arrows: false
		});
		$('.large-img').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			asNavFor: '.images-block',
			centerMode: false,
			arrows: true
		});
		var imagesSt = [],
		 imagesThumb = [],
		 reg =  /\.(?=gif)|\.(?=png)|\.(?=jpg)|\.(?=jpeg)/i,
		 standard = /\/raz\//i,
		 sliders_amount,
		 preloadThumb = [],
		 hide_buttons = false,
		 preloadSt = [];

		for (var i = 0; i < images.length; i++) {
			if (images[i].search(reg) == -1&&images[i].search(standard) == -1&&images[i].search('mybookingpal') != -1) {
				imagesThumb[i] = images[i] + 'Thumb';
			} else if (images[i].search(standard) == -1&&images[i].search(reg) != -1&&images[i].search('mybookingpal') != -1) {
				imagesThumb[i] = images[i].replace(reg,'Thumb.');
			} else {
				imagesThumb[i] = images[i];
			}
		}

		for (var i = 0; i < images.length; i++) {
			if (images[i].search(reg) == -1&&images[i].search(standard) == -1&&images[i].search('mybookingpal') != -1) {
				imagesSt[i] = images[i] + 'Standard';
			}  else if (images[i].search(standard) == -1&&images[i].search(reg) != -1&&images[i].search('mybookingpal') != -1) {
				imagesSt[i] = images[i].replace(reg,'Standard.');
			} else {
				imagesSt[i] = images[i];
			}
		}

		 sliders_amount = imagesSt.length;

		if (sliders_amount<=4) {
			preloadThumb = imagesThumb.slice(0, sliders_amount);
			preloadSt = imagesSt.slice(0, sliders_amount);
			hide_buttons = true;

		} else {
			preloadThumb = imagesThumb.slice(0, 4);
			preloadSt = imagesSt.slice(0, 4);
		}

		for (var i = 0; i < preloadSt.length; i++) {
			$('.large-img').slickAdd('<div><span class="line-up"></span><img class="img-responsive" src="' + preloadSt[i] + '"></div>');
			$('.images-block').slickAdd('<div><span class="line-up"></span><img class="img-responsive" src="' + preloadThumb[i] + '"></div>');
		}

		$('.large-img').off("click", '.slick-next');
		$('.large-img').off("click", '.slick-prev');

		$('.large-img').on('click', '.slick-next', function() {
			addSlide(sliders_amount);
		});
		$('.large-img').on('click', '.slick-prev', function() {
			addSlide(sliders_amount);
		});


		function addSlide(sliders_amount) {

			var last_slide = $('.large-img .slick-track .slick-slide').last().attr('index');

			if (last_slide==sliders_amount-1) {

				return false;
			}

			last_slide++;

			$('.images-block').slickAdd('<div><span class="line-up"></span><img class="img-responsive" src="' + imagesThumb[last_slide] + '"></div>');
			$('.large-img').slickAdd('<div><span class="line-up"></span><img class="img-responsive" src="' + imagesSt[last_slide] + '"></div>');

		}
		if (hide_buttons) {
			$('.slick-next').remove();
			$('.slick-prev').remove();
		}
	};

	/**
	 * Run xml/services/json/product/xxxx/propertydetail API
	 */
	$scope.runPropertyDetailAPI = function(){
		// Output debug info
		if ( $scope.debug ){console.log('$scope.runPropertyDetailAPI');}

		$scope.product_info.amenities = [];

		$http({method: 'GET', url: API_URL + 'xml/services/json/product/' + $scope.params.product_id + '/propertydetail?pos=' + $scope.params.pos + '&test=true&currency=' + $scope.params.currency + "&date=" + mbp_helper.convertDate($scope.params.detailCheckInDate, 'mysql') + "&toDate=" + mbp_helper.convertDate($scope.params.detailCheckOutDate, 'mysql') }).
			success( function (data, status, headers, config){
				// Increment processed API count
				$scope.params.detailApiCount++;

				// Set error if there is error into API
				if ( data.property_response.is_error == true ){
					$scope.setError( data.property_response.message );
				}

				$scope.product_info.address = data.property_response.property.physicaladdress;
				$scope.product_info.bathroom = data.property_response.property.bathroom;
				$scope.product_info.bedroom = data.property_response.property.bedroom;
				$scope.product_info.commission = data.property_response.property.agentCommissionValue;
				$scope.product_info.id = data.property_response.property.id;
				$scope.product_info.inquire = data.property_response.property.inquiryOnly;
				$scope.product_info.name = data.property_response.property.name;
				$scope.product_info.minstay = data.property_response.property.minstay;
				$scope.product_info.person = data.property_response.property.person;
				$scope.product_info.propertyType = "";

				$scope.product_info.lat = data.property_response.property.latitude;
				$scope.product_info.lng = data.property_response.property.longitude;

				$scope.gogleMap.setCenter($scope.product_info.lat, $scope.product_info.lng);

				// Fix Prodct images array
				if (data.property_response.property.images == ""){
					data.property_response.property.images = {image: []};
				}
				data.property_response.property.images.image = mbp_helper.normalizeArray( data.property_response.property.images.image );

				// @todo: Reinit product-detail carousel.
				$scope.processCarousel( data.property_response.property.images.image );

				$scope.product_info.images = data.property_response.property.images.image;
				// Reinit carousel
				$('.images-block').delegate();
				$(window).resize();



				// Make list from description
				$scope.product_info.description = '<li>' + data.property_response.property.description.replace(/<[^>]*>?/gm, '').replace(/\. /gi, '.</li><li>') + '</li>';
				$scope.product_info.description = $scope.product_info.description.replace(/\<li\>\<\/li\>/gi, "");

				// Get property class type
				if ( typeof data.property_response.property.attributes.attribute == "object" && typeof data.property_response.property.attributes.attribute.length == "number" ){
					i = 0;
					for ( var k in data.property_response.property.attributes.attribute ){
						if ( data.property_response.property.attributes.attribute[i].key == "Property Type" ){
							if ( typeof data.property_response.property.attributes.attribute[i].values.value == "string" ){
								$scope.product_info.propertyType = data.property_response.property.attributes.attribute[i].values.value;
							} else {
								$scope.product_info.propertyType = data.property_response.property.attributes.attribute[i].values.value[0];
							}
						}

						//if ( ["Ages Allowed","Bed Type","Beverage","Communication Options","Facilities","Grading","Group Preferences","General Amenities","Location Category","Property Preferences","Property Type","Travel with Pets","Pets Policy","Physically Challenged Requirement","Physically Challenged Feature","Room Amenities","Amenity Preferences","Destination Attributes","Recreation Preference"].indexOf(data.property_response.property.attributes.attribute[i].key) != -1 ){
                        if ( typeof data.property_response.property.attributes.attribute[i].values.value != 'undefined' && data.property_response.property.attributes.attribute[i].values.value != '' ){
                            if ( typeof data.property_response.property.attributes.attribute[i].values.value == "string" ){
                                $scope.product_info.amenities = $scope.product_info.amenities.concat(data.property_response.property.attributes.attribute[i].values.value);
                            } else {
                                for ( key in data.property_response.property.attributes.attribute[i].values.value ){
                                    if ( $scope.product_info.amenities.indexOf(data.property_response.property.attributes.attribute[i].values.value[key]) == -1 ){
                                        $scope.product_info.amenities = $scope.product_info.amenities.concat( data.property_response.property.attributes.attribute[i].values.value[key] );
                                    }
                                }
                                /*for ( ameniti_key in data.property_response.property.attributes.attribute[i].values.value ){
                                    $scope.product_info.amenities = $scope.product_info.amenities.concat(data.property_response.property.attributes.attribute[i].values.value[ameniti_key]);
                                }*/
                            }
						}

						i++;
					}
				} else {
					$scope.product_info.propertyType = data.property_response.property.attributes.attribute.values.value;
				}
			}).
			error(function (data, status, headers, config) {

			});
	}

	/**
	 * Run xml/services/json/reservation/quotes API
	 */
	$scope.runQuotesAPI = function(){
		// Output debug info
		if ( $scope.debug ){console.log('$scope.runQuotesAPI');}
		// Make calculating label
		$scope.product_info.price = 0;

		$http({method: 'GET', url: API_URL + 'xml/services/json/reservation/quotes?pos=' + $scope.params.pos + '&productid=' + $scope.params.product_id + '&fromdate=' + mbp_helper.convertDate($scope.params.detailCheckInDate, 'mysql') + '&todate=' + mbp_helper.convertDate($scope.params.detailCheckOutDate, 'mysql') + '&currency=' + $scope.params.currency + '&adults=' + $scope.params.adults }).
			success( function (data, status, headers, config ){
				// Increment processed API count
				$scope.params.detailApiCount++;

				// Set error if there is error into API
				if ( data.quotes.is_error == true ){
					$scope.setError(data.quotes.message);
					$scope.product_info.message = "This property is no longer available.";
					return;
				}

				$scope.product_info.fees.included = [];
				$scope.product_info.fees.excluded = [];

				// Price and currency
				$scope.product_info.currency = $scope.currency[ data.quotes.currency ];
				$scope.product_info.price = data.quotes.quote;

				// Credit card acceptance
				$scope.product_info.cc.amex = data.quotes.propertyManagerSupportCC.supportAE;
				$scope.product_info.cc.dines = data.quotes.propertyManagerSupportCC.supportDINERSCLUB;
				$scope.product_info.cc.dscvr = data.quotes.propertyManagerSupportCC.supportDISCOVER;
				$scope.product_info.cc.jcb = data.quotes.propertyManagerSupportCC.supportJCB;
				$scope.product_info.cc.mc = data.quotes.propertyManagerSupportCC.supportMC;
				$scope.product_info.cc.visa = data.quotes.propertyManagerSupportCC.supportVISA;

				// Property Check In, Check Out time
				$scope.product_info.checkIn = data.quotes.fromTime;
				$scope.product_info.checkOut = data.quotes.toTime;

				// Terms link
				$scope.product_info.terms.url = data.quotes.termsLink;
				$scope.product_info.terms.type = (data.quotes.termsLink.slice(-4) == '.pdf') ? 'pdf' : 'html';

				// Noramlize quotedetails
				if ( typeof data.quotes.quote_details.quoteDetails == "undefined" ){
					data.quotes.quote_details = {
						'quoteDetails': []
					};
				}
				data.quotes.quote_details.quoteDetails = mbp_helper.normalizeArray( data.quotes.quote_details.quoteDetails );

				// Collect feeses
				for ( var i = 0; i < data.quotes.quote_details.quoteDetails.length; i++ ){
					if ( data.quotes.quote_details.quoteDetails[i].included == true ){
                        var tmp = {
                            currency: '',
                            price:    'Included',
                            text:     data.quotes.quote_details.quoteDetails[i].description
                        }
                        if ( data.quotes.quote_details.quoteDetails[i].amount != 0 ){
                            tmp.currency = $scope.currency[data.quotes.quote_details.quoteDetails[i].currency];
                            tmp.price = data.quotes.quote_details.quoteDetails[i].amount;
                        }
						$scope.product_info.fees.included.push( tmp );
					} else {
						var tmp = {
							currency: $scope.currency[data.quotes.quote_details.quoteDetails[i].currency],
							price:    data.quotes.quote_details.quoteDetails[i].amount,
							text:     data.quotes.quote_details.quoteDetails[i].description
						}
						$scope.product_info.fees.excluded.push( tmp );
					}
				}

				if ( data.quotes.cancellationDate == "" ){
					$scope.product_info.cancellationMessage = "No refunds for cancellation made after payment is made.";
				} else {
					var tmp_cancelation = [],
						tmp_date = $scope.params.checkInDate;

					data.quotes.cancellationItems = mbp_helper.normalizeArray( data.quotes.cancellationItems );

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
                            tmp_cancelation.push( "Traveler can cancel up to " + data.quotes.cancellationItems[i].daysBeforeArrival + ' days prior to arrival and receive a refund of  ' + data.quotes.cancellationItems[i].cancellationPercentage + '% ' + ( data.quotes.cancellationItems[i].transactionFee == 0 ? '' : 'less a ' + $scope.currency[$scope.params.currency] + data.quotes.cancellationItems[i].transactionFee + ' processing fee' ) + '.' );
						}
					}
					$scope.product_info.cancellationMessage = tmp_cancelation.join('<br /><div class="space"></div>');
				}
			}).
			error(function (data, status, headers, config) {

			});
	}

	/**
	 * Run xml/services/json/product/xxxx/propertydetail API
	 */
	$scope.runPropertyDetailSearchAPI = function(product_id, check_in, check_out){
		// Output debug info
		if ( $scope.debug ){console.log('$scope.runPropertyDetailSearchAPI');}

		$http({method: 'GET', url: API_URL + 'xml/services/json/product/' + product_id + '/propertydetail?pos=' + $scope.params.pos + '&test=true&currency=' + $scope.params.currency + "&date=" + mbp_helper.convertDate($scope.params.checkInDate, 'mysql') + "&toDate=" + mbp_helper.convertDate($scope.params.checkOutDate, 'mysql') }).
			success(function (data, status, headers, config) {

				// Fix Prodct images array
				if (data.property_response.property.images == ""){
					data.property_response.property.images = {image: []};
				}

                data.property_response.property.images.image = mbp_helper.normalizeArray( data.property_response.property.images.image );

                var pct = '';
                // Get property class type
                if ( typeof data.property_response.property.attributes.attribute == "object" && typeof data.property_response.property.attributes.attribute.length == "number" ){
                    i = 0;
                    for ( var k in data.property_response.property.attributes.attribute ){
                        if ( data.property_response.property.attributes.attribute[i].key == "Property Type" ){
                            if ( typeof data.property_response.property.attributes.attribute[i].values.value == "string" ){
                                pct = data.property_response.property.attributes.attribute[i].values.value;
                            } else {
                                pct = data.property_response.property.attributes.attribute[i].values.value[0];
                            }
                        }
                        i++;
                    }
                } else {
                    pct = data.property_response.property.attributes.attribute.values.value;
                }

                //console.log( pct );

				$scope.products.all = [{
					address: data.property_response.property.physicaladdress,
					bathroom: data.property_response.property.bathroom,
					bedroom: data.property_response.property.bedroom,
					currency: data.property_response.property.currency,
					exactmatch: true,
					guests: '', // ????
					managerName: '', // ???
					minstay: data.property_response.property.minstay, // ???
					pictureLocation: data.property_response.property.images.image[0],
					picturesQuantity: data.property_response.property.images.image.length,
					pricePerNight: '0', // ????
					productid: data.property_response.property.id,
					productname: data.property_response.property.name,
					productClassType: pct, // ???
					quote: 0,
					rack: 0
				}];





				$scope.products.filtered = $scope.products.all;

				$scope.action = 'search_result';
			}).
			error(function (data, status, headers, config) {

			});
	}

	$scope.runPropertyPricesAPI = function(){
		$http({method: 'GET', url: API_URL + 'xml/services/json/reservation/prices?pos=' + $scope.params.pos + '&productid=' + $scope.params.product_id + '&fromdate=' + mbp_helper.convertDate($scope.params.detailCheckInDate, 'mysql') + '&todate=' + mbp_helper.convertDate($scope.params.detailCheckOutDate, 'mysql') + '&currency=' + $scope.params.currency}).
			success( function(data, status, headers, config){
				$scope.params.detailApiCount++;

				$scope.product_info.prices = [];

                if ( typeof data.ranges.range != "undefined" ){
                    data.ranges.range = mbp_helper.normalizeArray(data.ranges.range);

                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    for (var i = 0; i < data.ranges.range.length; i++ ){
                        // Transform date from mysql format to normal view format
                        var tmp = data.ranges.range[i].startDate.split('-');
                        var d = new Date(tmp[0], tmp[1] - 1, tmp[2]);
                        var date_start = d.getDate() + ' ' + months[d.getMonth()];
                        d.setDate( d.getDate() + 7 );
                        var date_end = d.getDate() + ' ' + months[d.getMonth()];
                        /*
                         tmp = {
                         date_start: date_start,
                         date_end:   date_end,
                         minstay:    data.ranges.range[i].minstay,
                         price:      $scope.currency[Mybookingpal.settings.currency] + ' ' + data.ranges.range[i].minPrice + ' / ' + $scope.currency[Mybookingpal.settings.currency] + ' ' + data.ranges.range[i].maxPrice

                         }*/


                        tmp = {
                            date_start: date_start,
                            date_end:   date_end,
                            minstay:    data.ranges.range[i].minstay,
                            price:      $scope.currency[$scope.params.currency] + ' ' + data.ranges.range[i].minPrice + ' / ' + $scope.currency[$scope.params.currency] + ' ' + data.ranges.range[i].maxPrice

                        };

                        $scope.product_info.prices.push( tmp );
                    }
                }
			});

	}


	// TODO: Optimisation set date picker. @Kostjantin
	/**
	 * Looking at change in main date picker
	 *
	 * @param scope			- local scope from directives
	 * @param element		- element
	 * @param attrs			- .
	 * @param ngModelCtrl	- Model in scope
	 */
	$scope.mainDatepickerChanges = function (scope, element, attrs, ngModelCtrl) {
		var Calendar = new CaledarController({
			inputIn: element,
			inputOut: $('#' + scope.dpCheckOut)
		});

		scope.$parent.$watch('params.checkInDate', function(oldValue, newValue) {
			Calendar.setDate('checkIn', oldValue || newValue);
		});
		scope.$parent.$watch('params.checkOutDate', function(oldValue, newValue) {
			Calendar.setDate('checkOut', oldValue || newValue);
		});

		Calendar.setCallback(function (checkIn, checkOut, period) {
			scope.$apply(function () {
				scope.$parent.params.checkInDate = checkIn;
				scope.$parent.params.checkOutDate = checkOut;
				scope.$parent.params.period = period;
			});
		});

		Calendar.errorTrigger(function ($el) {
			//console.log('Error', $el);
		});
	};

	/**
	 * Looking at change in detail date picker
	 *
	 * @param scope			- local scope from directives
	 * @param element		- element
	 * @param attrs			- .
	 * @param ngModelCtrl	- Model in scope
	 */
	$scope.detailDatepickerChanges = function (scope, element, attrs, ngModelCtrl) {
		var Calendar = new CaledarController({
			inputIn: element,
			inputOut: $('#' + scope.dpCheckOut)
		});

		scope.$parent.$watch('params.detailCheckInDate', function(oldValue, newValue) {
			var date = oldValue || newValue;
			Calendar.setDate('checkIn', date);
			//scope.$parent.inlineDetailCalendar.setStartDate(date);
		});
		scope.$parent.$watch('params.detailCheckOutDate', function(oldValue, newValue) {
			Calendar.setDate('checkOut', oldValue || newValue);
		});

		Calendar.setCallback(function (checkIn, checkOut, period) {
			scope.$apply(function () {
				scope.$parent.params.detailCheckInDate = checkIn;
				scope.$parent.params.detailCheckOutDate = checkOut;

				scope.$parent.openProductDetail(scope.$parent.product_info.id);

				//scope.$parent.
				//$scope.params.period = period;
			});
		});
	};

	$scope.inquireDatepickerChanges = function (scope, element, attrs, ngModelCtrl) {
		var Calendar = new CaledarController({
			inputIn: element,
			inputOut: $('#' + scope.dpCheckOut)
		});

		scope.$parent.$watch('inquire.checkInDate', function(oldValue, newValue) {
			Calendar.setDate('checkIn', oldValue || newValue);
		});
		scope.$parent.$watch('inquire.checkOutDate', function(oldValue, newValue) {
			Calendar.setDate('checkOut', oldValue || newValue);
		});

		Calendar.setCallback(function (checkIn, checkOut, period) {
			scope.$apply(function () {
				scope.$parent.inquire.checkInDate = checkIn;
				scope.$parent.inquire.checkOutDate = checkOut;
			});
		});
	};

	$scope.showBookingWidget = function(){
        //angular.element('#btn_book_now_detail').attr('disabled', 'disabled').trigger('click').trigger('hover');
        //angular.element('#btn_book_now_detail').find('img').show();
		// showPopup(property_detail.id, book.checkInDate, book.checkOutDate)
		Mybookingpal.setParams({'child': 0, 'currency': $scope.params.currency});
		Mybookingpal.showQuote($scope.product_info.id, $scope.params.detailCheckInDate, $scope.params.detailCheckOutDate, $scope.params.adults);
	};


	// $scope.inquire = {};

	/**
	 * @todo this should be refactor;
	 **/
	//$scope.clearInquireDialog = function(){
	//	/*
	//	 $scope.contact.productId = "";
	//	 $scope.contact.checkInDate = "";
	//	 $scope.contact.checkOutDate = "";
	//	 $scope.contact.firstname = angular.element("#contactFirstname").attr('placeholder');//"veniamin";
	//	 $scope.contact.lastname = angular.element("#contactLastname").attr('placeholder');//"stadnikov";
	//	 $scope.contact.emailaddress = angular.element("#contactEmailaddress").attr('placeholder');//"veniamins@ukr.net";
	//	 $scope.contact.phonenumber = angular.element("#contactPhonenumber").attr('placeholder');//"0951231231234";
	//
	//	 $scope.contact.adultsnumber = 0;
	//	 $scope.contact.childrenNumber = 0;
	//
	//	 $scope.contact.messageText = angular.element("#contactMessagetext").attr('placeholder');//"some message";
	//	 angular.element('#contactFlexibleDepartureDates').removeAttr('checked');
	//	 // Dump of old id's fields
	//	 // #contactState1, #contactState, #contactAddress, #contactCity, #contactZip, #contactBdm, #contactBdd, #contactBdy
	//	 angular.element('#contactFirstname, #contactLastname, #contactEmailaddress, #contactPhonenumber').removeClass('popup_window_red_input_field').addClass('plchldr');
	//	 angular.element('#contactState1, #contactState').removeClass('plchldr');
	//	 angular.element('#popup_window_contact_owner .popup_content_error').text("");
	//	 */
	//}

	//$scope.showInquireDialog = function(){
	//	// Clear fields
	//	$scope.clearInquireDialog();
	//
	//	/*
	//	 $scope.contact.checkInDate = check_in;
	//	 $scope.contact.checkOutDate = check_out;
	//	 $scope.contact.adultsnumber = adults;
	//	 $scope.contact.productId = product_id;
	//	 */
	//
	//	$scope.showPopupContact = true;
	//
	//	$('#inquire_form').show();
	//	$('#inquire_confirmation').hide();
	//}


	/**
	 * Object for work with Advanced Search.
	 *
	 */
	$scope.advancedSearch = {
		default: {
			propertyType: 0,
			numOfBedrooms: 0,
			numOfBathrooms: 0,
			minPriceValue: null,
			maxPriceValue: null,
			propertyID: null,
			options: ['include_properties'],
			ammenities: []
		},

		propertyType : {
			active: {id: 'PCT1', name: '- Select -'},
			list: [
				{id: 'PCT1', name: '- Select -'},
				{id: 'PCT3', name: 'Apartment'},
				{id: 'PCT5', name: 'Bungalow'},
				{id: 'PCT5', name: 'Cabin'},
				{id: 'PCT7', name: 'Chalet'},
				{id: 'PCT8', name: 'Condominium'},
				{id: 'PCT38', name: 'Convention Facility'},
				{id: 'PCT46', name: 'Efficiency/studio'},
				{id: 'PCT20', name: 'Hotel'},
				{id: 'PCT22', name: 'Lodge'},
				{id: 'PCT35', name: 'Villa'}
			],
			select: function (item) {
				this.active = item;
			},
			getActive: function () {
				return this.active.name;
			}
		},

		numOfBedrooms: {
			active: {id: 0, name: "- Select -"},
			list: [
				{id: 0, name: "- Select -"},
				{id: 1, name: "1"},
				{id: 2, name: "2"},
				{id: 3, name: "3"},
				{id: 4, name: "4"},
				{id: 5, name: "5"},
				{id: 6, name: "6+"}
			],
			select: function (item) {
				this.active = item;
			}
		},

		numOfBathrooms: {
			active: {id: 0, name: "- Select -"},
			list: [
				{id: 0, name: "- Select -"},
				{id: 1, name: "1"},
				{id: 2, name: "2"},
				{id: 3, name: "3"},
				{id: 4, name: "4"},
				{id: 5, name: "5"},
				{id: 6, name: "6+"}
			],
			select: function (item) {
				this.active = item;
			}
		},
		minPriceValue: {
			active: null,
			list: [
				0,
				75,
				100,
				150,
				200,
				300,
				500,
				600
			],
			select: function (item) {
				this.active = item;
			}
		},
		maxPriceValue: {
			active: null,
			list: [
				0,
				75,
				100,
				150,
				200,
				300,
				500,
				600
			],
			select: function (item) {
				this.active = item;
			}
		},

		propertyID: null,

		options: {
			list: [
				{ id: 'instant_booking', name: 'Show Only Units with Online Booking' }
				//{ id: 'include_properties', name: 'Include Properties that require a Saturday arrival?' }
			],
			listChecked: ['include_properties'],
			toggleCheck: function (id) {
				var idx = this.listChecked.indexOf(id);

				if (idx > -1) {
					this.listChecked.splice(idx, 1);
				} else {
					this.listChecked.push(id);
				}
			}
		},

		ammenities: {
			list: [
				//{ id: '1', keys: 'HAC96', name: 'Dry Cleaning' },
				{ id: '2', keys: 'PHY55,PHY56,HAC33,RLT1,RLT10,PHY42', name: 'Elevator Access' },
				{ id: '3', keys: 'RMA41', name: 'Fireplace' },
				{ id: '4', keys: 'HAC138', name: 'Free Breakfast' },
				{ id: '5', keys: 'HAC223', name: 'Free Internet' },
				{ id: '6', keys: 'HAC262,RMA61,PHP7,PHY7,RMA59,RMA60', name: 'Kitchen' },//{ id: 'RMA59', name: 'Kitchen' },
				{ id: '7', keys: 'PHY50,SEC30,RCC7,HAC63,SEC78,PHY8,PHP8,HAC171,HAC42,HAC53,HAC186,HAC64,HAC65,AIC4,HAC75,SEC34,SCY4,CSC15,AIC5', name: 'Parking' },//{ id: 'HAC68', name: 'Parking' },
				{ id: '8', keys: 'RST129,HAC48,CBF86,FAC5,REC30,HAC49,RST122,REC20,RST123,REC25,HAC71,FAC8,RST75,HAC54,HAC66,PIC3,RMP245,RMA245,FAC9,HAC253,RST106,REC33,RST100,CBF23', name: 'Pool' }, //{ id: 'HAC71', name: 'Pool' },
				{ id: '9', keys: 'SEC86,MRC131,RMA246,MRC178,MRC179,RMP210,RMA210,FSC6,PHY74,RMA90,RMP90,PHY47,PHY45', name: 'TV' },//{ id: 'RMA251', name: 'TV' },
				{ id: '10', keys: 'RMA149,RMA31', name: 'Washer/Dryer' },
				{ id: '11', keys: 'BUS35,RMA123,HAC221,EQP55', name: 'Wireless Internet' }
				//, { id: '12', keys: 'ACC41,CSC14,PIC4,REF27,RES,RPC,RSI', name: 'Restaurant on premises' }
			],
			listChecked: [],
			toggleCheck: function (id) {
				var idx = this.listChecked.indexOf(id);

				if (idx > -1) {
					this.listChecked.splice(idx, 1);
				} else {
					this.listChecked.push(id);
				}
			},
			getKeysByID: function (id) {
				for (var i = 0, c= this.list.length; i < c; i++ ) {
					if (this.list[i].id == id) {
						return this.list[i].keys.split(',');
					}
				}

				return null;
			}
		},


		/**
		 * Generate advanced search object.
		 *
		 * @returns {{propertyType: *, numOfBedrooms: *, numOfBathrooms: *, minPrice: Number, maxPrice: Number, options: *, ammenities: *}}
		 */
		getParams: function () {

			this.propertyID = $.isNumeric(this.propertyID) ? parseInt(this.propertyID, 10) : this.default.propertyID;

			var min = $.isNumeric(this.minPriceValue.active) ? parseFloat(this.minPriceValue.active) : this.default.minPriceValue,
				max = $.isNumeric(this.maxPriceValue.active) ? parseFloat(this.maxPriceValue.active) : this.default.maxPriceValue;


			if (max && min > max) {
				max = min;
			}

			//this.minPrice = (min || max) ? min : null;
			//this.maxPrice = (max || min) ? max : null;
			//this.minPriceValue.active = (min || max) ? min : null;
			//this.maxPriceValue.active = (max || min) ? max : null;

			return {
				propertyType: this.propertyType.active.id,
				numOfBedrooms: this.numOfBedrooms.active.id,
				numOfBathrooms: this.numOfBathrooms.active.id,
				minPrice: min,
				maxPrice: max,
				propertyID: this.propertyID,
				options: this.options.listChecked,
				ammenities: this.ammenities.listChecked
			};
		},

		/**
		 * Set in filter data.
		 *
		 * @param params object - all filters for filtering search result
		 * params =
		 * 	property_type	- string to int
		 * 	num_bed	- string to int
		 * 	num_bath	- string to int
		 * 	min 			- string to int
		 * 	max				- string to int
		 * 	property		- string to int
		 * 	ammenities		- string to array separated with ','
		 * 	options			- string to array separated with ','
		 */
		setParams: function (params) {

			this.propertyType.active = searchInArrayByID(this.propertyType.list, params.property_type) || this.propertyType.list[this.default.propertyType];
			this.numOfBedrooms.active = searchInArrayByID(this.numOfBedrooms.list, params.num_bed) || this.numOfBedrooms.list[this.default.numOfBedrooms];
			this.numOfBathrooms.active = searchInArrayByID(this.numOfBathrooms.list, params.num_bath) || this.numOfBathrooms.list[this.default.numOfBathrooms];
			//this.minPriceValue.active = searchInArrayByName(this.minPriceValue.list, params.min) || this.minPriceValue.list[this.default.minPriceValue];
			//this.maxPriceValue.active = searchInArrayByName(this.maxPriceValue.list, params.max) || this.maxPriceValue.list[this.default.maxPriceValue];
			//console.log(this.minPriceValue.active);
			//console.log(this.maxPriceValue.active);
			this.propertyID = $.isNumeric(params.property) ? parseInt(params.property, 10) : this.default.propertyID;

			this.minPriceValue.active = $.isNumeric(params.min) ? parseInt(params.min, 10) : this.default.minPriceValue;
			this.maxPriceValue.active = $.isNumeric(params.max) ? parseInt(params.max, 10) : this.default.maxPriceValue;
			console.log('Test', params.min, params.max, this.minPriceValue.active, this.maxPriceValue.active);

			this.ammenities.listChecked = params.ammenities.length ? params.ammenities.split(',') : this.default.ammenities;
			this.options.listChecked = params.options.length ? params.options.split(',') : this.default.options;

			function searchInArrayByID(arr, id) {
				for (var i = 0, c = arr.length; i < c; i++) {

					if (arr[i].id == id) {
						return arr[i];
					}
				}
				return null;
			}
		},

		/**
		 * Generate advanced link and go to search result page.
		 */
		go: function () {

			if ( !$scope.validateSearchParams() ){
				var advancedSearch = this.getParams();
				window.location.href = SITE_URL + 'search/?location=' + $scope.params.locationName
                + ( $scope.params.pos == "" ? "" : '&pos=' + $scope.params.pos )
				+ '&checkin=' + mbp_helper.convertDate($scope.params.checkInDate, 'mysql')
				+ '&period=' + $scope.params.period
				+ '&adults=' + $scope.params.adults
                + (($scope.params.logo != null) ? '&logo=' + $scope.params.logo : '')

				+ ((advancedSearch.propertyType && advancedSearch.propertyType != 'PCT1') ? '&property_type=' + advancedSearch.propertyType : '')
				+ ((advancedSearch.numOfBedrooms) ? '&num_bed=' + advancedSearch.numOfBedrooms : '')
				+ ((advancedSearch.numOfBathrooms) ? '&num_bath=' + advancedSearch.numOfBathrooms : '')
				+ ((advancedSearch.minPrice) ? '&min=' + advancedSearch.minPrice : '')
				+ ((advancedSearch.maxPrice) ? '&max=' + advancedSearch.maxPrice : '')
				+ ((advancedSearch.propertyID) ? '&property=' + advancedSearch.propertyID : '')
				+ ((advancedSearch.options.length) ? '&options=' + advancedSearch.options.join(',') : '')
				+ ((advancedSearch.ammenities.length) ? '&ammenities=' + advancedSearch.ammenities.join(',') : '')

					//+ '&num_bath=' + advancedSearch.numOfBathrooms
					//+ '&min=' + advancedSearch.minPrice
					//+ '&max=' + advancedSearch.maxPrice
					//+ '&property=' + advancedSearch.propertyID
					//+ '&options=' + advancedSearch.options.join(',')
					//+ '&ammenities=' + advancedSearch.ammenities.join(',')
				+ '#/search/';
			}
		},

		/**
		 * Apply filter for search result.
		 *
		 * TODO: Need add function for auto start apply when change "Instant booking" from user panel.
		 */
		apply: function () {
			if ($scope.validateSearchParams()) {
				return;
			}

            $scope.products.filtered = [];
			var products = $scope.products.all;

			$scope.products.filtered = [];
			for (var i = 0, c = products.length; i < c; i++) {
				if ( this.filter(products[i]) ){
					$scope.products.filtered.push(products[i]);
				}
			}

            $scope.sortProducts();
            $scope.pagination.processPagination();
		},

		/**
		 * Check product for compliance with the rules
		 *
		 * @param product
		 * @returns {boolean}
		 */
		filter: function (product) {
			var asParams = this.getParams();

			if (asParams.propertyType && asParams.propertyType != "PCT1" && product.productClassType != asParams.propertyType) {
				return false;
			}

			if (asParams.numOfBedrooms) {
				if (asParams.numOfBedrooms == 6 && product.bedroom >= asParams.numOfBedrooms) {
					// nothing
				} else if (product.bedroom != asParams.numOfBedrooms){
					return false;
				}

			}

			if (asParams.numOfBathrooms) {
				if (asParams.numOfBathrooms == 6 && product.bathroom >= asParams.numOfBathrooms) {
					// nothing
				} else if (product.bathroom != asParams.numOfBathrooms){
					return false;
				}

			}

			if (asParams.minPrice && product.pricePerNight <= asParams.minPrice) {
				return false;
			}

			if (asParams.maxPrice && product.pricePerNight >= asParams.maxPrice) {
				return false;
			}

			if (asParams.propertyID && product.productid != asParams.propertyID){
				return false;
			}

			if (asParams.options.instant_booking && asParams.options.instant_booking != product.inquiryOnly) {
				return false;
			}

			var instant_booking = asParams.options.indexOf('instant_booking');
			if (~instant_booking && asParams.options[instant_booking] && product.inquiryOnly != false) {
				return false;
			}

			if (asParams.ammenities && asParams.ammenities.length) {
				for (var i = 0, ci = asParams.ammenities.length; i < ci; i++) {
					var amm_keys = this.ammenities.getKeysByID(asParams.ammenities[i]),
						isAmm = true;

					if (!amm_keys) {
						continue;
					}

					for (var j = 0, cj = amm_keys.length; j <cj; j++) {
						if (~product.attributes.indexOf(amm_keys[j])) {
							isAmm = true;
							break;
						}
						isAmm = false
					}

					if (!isAmm) {
						return false;
					}
				}
			}


			return true;
		}
	};

	/**
	 * Google Map service settings
	 *
	 * @type {{options: {center: google.maps.LatLng, zoom: number, mapTypeId: *}, markers: Array, setCenter: Function, resize: Function}}
	 */
	if ( window.google ) {
		$scope.gogleMap = {
			options: {
				center: new google.maps.LatLng(48, -121),
				zoom: 18,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			},
			markers: [],
			setCenter: function (lat, lng) {
				this.resize('googleMap');

				this.markers = [{
					lat: $scope.product_info.lat,
					lng: $scope.product_info.lng
				}];

				$scope.googleMapCenter = new google.maps.LatLng(lat, lng);
				$scope.googleMapZoom = 18;
			},
			resize: function (map_name) {
				$scope.$broadcast('gmMapResize', map_name);
			}
		};
	} else {
		if ($scope.debug) console.log('Warning: googleMap function isn`t started. Don`t have google map object');
	}

	/**
	 * Inline calendar parameters and functions
	 */
	$scope.inlineDetailCalendar = {

		startDate: new Date(),
		oldProduct: 0,
		opened: [],
		booked: [],

		getIntervalsFromMonths: function (startDate, endDate, calback) {
			this.runDetailCalendarAPI(startDate, endDate, calback);
		},

		runDetailCalendarAPI: function (startDate, endDate, calback) {
			$http({
				method: 'GET',
				url: API_URL + 'xml/services/json/reservation/available_calendar?pos=' + $scope.params.pos
				+ '&productid=' + $scope.params.product_id
				+ '&fromdate=' + mbp_helper.convertDate(startDate, 'mysql')
				+ '&todate=' + mbp_helper.convertDate(endDate, 'mysql')
			}).success(function(data, status, headers, config) {
				if (data.is_error) {
					if ($scope.debug) console.log('Error in  available_calendar:', data.message);
					return;
				}

				$scope.inlineDetailCalendar.opened = mbp_helper.normalizeArray(data.availability_calendar.items) || [];
				calback();
			});
		},

		changeBookedDate: function () {
			this.setStartDate($scope.params.detailCheckInDate);
			this.booked = [{ startDate: $scope.params.detailCheckInDate, endDate: $scope.params.detailCheckOutDate}];
		},



		setStartDate: function (date) {
			var parser_date = date.split('/');

			if (parser_date.length > 2) {
				date = new Date(parser_date[2], parser_date[0] - 1, parser_date[1], 0, 0, 0);
			} else {
				parser_date = date.split('-');

				if (parser_date.length > 2) {
					date = new Date(parser_date[0], parser_date[1] - 1, parser_date[2], 0, 0, 0);
				}
			}

			this.startDate = date;
		}
	};
});
