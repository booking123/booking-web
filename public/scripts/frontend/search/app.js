var app = angular.module('app', ['AngularGM'])
    .config(['$interpolateProvider', function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);

if (!!(window.history && history.pushState)){
    app.config(function ($locationProvider) {
        $locationProvider.html5Mode(false);
    });
}

/*
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/search', {
                controller: 'search'
            }).
            when('/search/:phoneId', {
                controller: 'search'
            });
    }]);
*/