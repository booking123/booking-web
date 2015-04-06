'use strict';

var locationServices = angular.module('locationServices', ['ngResource']);

locationServices.factory('Location', ['$resource',
	function ($resource) {
		return $resource(SITE_API_URL + 'location/getlocations/', {location: 'location'}, {'get': {method: 'GET'}});
	}
]);
