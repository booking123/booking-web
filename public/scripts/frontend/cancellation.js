var app = angular.module('myapp', [])
    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

app.controller('CancelationController', function($scope, $timeout, $log, $http){

    $scope.productCanceled = false;
    $scope.cancelError = false;
    $scope.noCancel = false;
    $scope.yesCancel = false;


    $scope.checkCode = function( code ){
        var reason = $('input[name="reason[]"]:checked').val();
        $http({method: 'GET', url:   API_URL + 'xml/services/json/reservation/cancel?reservationPos=' + code + '&reason=' + reason}).
            success(function (data, status, headers, config) {
                if ( data.cancel_reservation.is_error == true ){
                    $scope.cancelError = true;
                } else {
                    $scope.yesCancel = true;
                }
                $scope.productCanceled = true;
            });
    }
});