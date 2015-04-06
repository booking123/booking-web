'use strict';
/* Controllers */
var regControllers = angular.module('regControllers', []);

regControllers.controller('MainCtrl', ['$scope', '$rootScope', '$http', '$location', '$routeParams',
	function ($scope, $rootScope, $http, $location) {
		//Global default value
		$rootScope.netRate = 0;
		$rootScope.percent = null;

		$http.get(SITE_URL + 'registration/user/')
			.success(function (resp) {
				if (resp.error) {
					alert('Error get information from user');
					return;
				}
				$rootScope.netRate = +resp.item.net_rate;
				// For set position pages
				if ($location.path().length < 2) {
					$location.path('/step' + (resp.item.registration_step_id || 1));
				}
			})
			.error(function (e) {
				alert(e);
			});

		// Buttons
		$scope.breadcrumbValues = [
			{link: '#step1', name: '1. Information', id: 1},
			{link: '#step2', name: '2. Partners', id: 2},
			{link: '#step3', name: '3. Payment', id: 3},
			{link: '#step4', name: '4. Agreement', id: 4},
			{link: '#step5', name: '5. Confirm', id: 5}
		];

		$scope.breadcrumbCreateClass = function (row) {
			var styleClass = [];

			if (row.id < $rootScope.numberStep) {
				return 'active';
			}

			if (row.id == $rootScope.numberStep) {
				return 'active current';
			}

			return styleClass.join(' ');
		};

		$scope.breadcrumbIsActive = function (row) {
			return (row.id <= $rootScope.numberStep);
		};

		$scope.nextPage = function () {
			return '#step' + $rootScope.nextPage;
		};

		$scope.prevPage = function () {
			return '#step' + $rootScope.prevPage;
		};
	}
]);

regControllers.controller('RegStep1Ctrl', ['$scope', '$rootScope',
	function ($scope, $rootScope) {
		$rootScope.prevPage = 1;
		$rootScope.nextPage = 1;
		$rootScope.numberStep = 1;

		$scope.commissionBased = function (val) {
			$rootScope.netRate = val;
			$rootScope.nextPage = val ? 1.3 : 1.2;
		};

		$scope.commissionBased($rootScope.netRate);
	}
]);

regControllers.controller('RegStep1_2Ctrl', ['$scope', '$rootScope',
	function ($scope, $rootScope) {
		$rootScope.prevPage = 1;
		$rootScope.nextPage = 1.3;
		$rootScope.numberStep = 1;

		$scope.percents = {
			list: [
				{
					name: '6',
					range: [0, 6],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '8',
					range: [6, 8],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '10',
					range: [8, 10],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '12',
					range: [10, 12],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '14',
					range: [12, 14],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '15',
					range: [14, 15],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '18',
					range: [15, 18],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				},
				{
					name: '23',
					range: [18, 23],
					channels: ['Channel 0', 'Channel 1','Channel 2','Channel 3', 'Channel 4', 'Channel 5']
				}
			],
			select: function (item) {
				$rootScope.percent = item;
			}
		};

		$scope.openListChannels = function (percent) {

		}
	}
]);

regControllers.controller('RegStep1_3Ctrl', ['$scope', '$rootScope',
	function ($scope, $rootScope) {
		$rootScope.prevPage = $rootScope.netRate ? 1 : 1.2;
		$rootScope.nextPage = 2;
		$rootScope.numberStep = 1;
	}
]);

regControllers.controller('RegStep2Ctrl', ['$scope', '$rootScope', '$routeParams', '$http',
	function ($scope, $rootScope, $routeParams, $http) {
		$rootScope.prevPage = 1.3;
		$rootScope.numberStep = 2;
		$rootScope.nextPage = 3;
		$scope.selectAll = false;

		$scope.channelsList = [];

		var sGetQuery = '?from=0&to=6';
		if ($rootScope.netRate) {

			sGetQuery = '';
		}
		$http.get(SITE_URL + 'registration/channels/' + sGetQuery)
			.success(function (resp) {
				if (resp.error) {
					alert('Error get information from user');
					return;
				}

				$scope.channelsList = resp.items;
			})
			.error(function (e) {
				console.log(e);
			});

		$scope.toggleSelectAll = function (status) {
			$scope.selectAll = status;

			angular.forEach($scope.channelsList, function (channel) {
				channel.selected = $scope.selectAll;
			});
		};

		$scope.selectAnyChanel = function (el) {
			el.selected = !el.selected;

			var count_selected = 0;
			angular.forEach($scope.channelsList, function (channel) {
				if (channel.selected) {
					count_selected++
				}
			});

			if (count_selected == $scope.channelsList.length) {
				$scope.selectAll = false;
			}
		};

		//$scope.checkStatus = function (status) {
		//	if (status == 'false') {
		//		$scope.status = 'true'
		//	} else {
		//		$scope.status = 'false'
		//	}
		//	return $scope.status;
		//};
		//
		//$scope.setStyle = function (style) {
		//	if (style == 'true' || $scope.selectAll == 'true') {
		//		return 'selected';
		//	} else {
		//		return '';
		//	}
		//}
	}
]);

regControllers.controller('RegStep3Ctrl', ['$scope', '$rootScope', '$routeParams',
	function ($scope, $rootScope) {
		$rootScope.prevPage = 2;
		$rootScope.numberStep = 3;
		$rootScope.nextPage = 4;
	}
]);

regControllers.controller('RegStep4Ctrl', ['$scope', '$rootScope', '$routeParams',
	function ($scope, $rootScope, $routeParams) {
		$rootScope.prevPage = 3.1;
		$rootScope.numberStep = 4;
		$rootScope.nextPage = 5;
	}
]);

regControllers.controller('RegStep5Ctrl', ['$scope', '$rootScope', '$routeParams',
	function ($scope, $rootScope, $routeParams) {
		$rootScope.prevPage = 4;
		$rootScope.numberStep = 5;
		$rootScope.nextPage = 0;
	}
]);

