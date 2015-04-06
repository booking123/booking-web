'use strict';
angular.module('channelPartnerServices', ['ngResource'])
	.factory('ChannelPartner', ['$resource',
	function ($resource) {
		return $resource(SITE_API_URL + 'location/getlocations/', {location: 'location'}, {'get': {method: 'GET'}});
	}
]);
