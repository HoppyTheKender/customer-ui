(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.dataservices');
	
	module.service('propertiesDataService', ['$http', '$q', 'CustomerModel', 'ErrorService', function($http, $q, CustomerModel, ErrorService) {
		var endpointUrl = '/customer-ui/rest/properties';
		
		this.getApplicationVersion = function () {
			var deferred = $q.defer();
			
			$http.get(endpointUrl).then(function (response) {
				deferred.resolve(response.data.applicationVersion);
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			});
			return deferred.promise;
		};
	}]);
})();