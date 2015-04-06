'use strict';
var appAdminPM = angular.module('appAdminPM', [
	'ngRoute',
	'ReservationsController'
]);

appAdminPM.config(
	['$routeProvider', function ($routeProvider) {
		//$routeProvider.
		//	when('/step1', {
		//		templateUrl: 'steps/s1.html',
		//		controller: 'RegStep1Ctrl'
		//	});
	}],

	['$interpolateProvider', function ($interpolateProvider) {
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
	}]
);


/* App Module */
var regApp = angular.module('regApp', [
	'ngRoute',

	'regControllers',
	'locationServices'
]);

regApp.config(['$interpolateProvider', function ($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
}]);

regApp.config(
	['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {})
			.when('/step1', {
				templateUrl: SITE_URL + 'registration/step1',
				controller: 'RegStep1Ctrl'
			})
			.when('/step1.2', {
				templateUrl: SITE_URL + 'registration/step1_2',
				controller: 'RegStep1_2Ctrl'
			})
			.when('/step1.3', {
				templateUrl: SITE_URL + 'registration/step1_3',
				controller: 'RegStep1_3Ctrl'
			})
			.when('/step2', {
				templateUrl: SITE_URL + 'registration/step2',
				controller: 'RegStep2Ctrl'
			})
			.when('/step3', {
				templateUrl: SITE_URL + 'registration/step3',
				controller: 'RegStep3Ctrl'
			})
			.when('/step4', {
				templateUrl: SITE_URL + 'registration/step4',
				controller: 'RegStep4Ctrl'
			})
			.when('/step5', {
				templateUrl: SITE_URL + 'registration/step5',
				controller: 'RegStep5Ctrl'
			})

			.when('/#popup', {
				templateUrl: SITE_URL + 'registration/popup',
				controller: 'PopUpCtrl'
			})

			.otherwise({
				redirectTo: '/step1'
			});
	}]
);