(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.dataservices');

	module.service('ErrorService', ['$q', '$http', '$log', function($q, $http, $log) {
		this.handleErrorsFromResponse = function(response) {
			var errors;
			if (response && response.data && response.data.errors) {
				errors = response.data.errors.reduce(function (errorsObj, value, index) {
					errorsObj[value.field] = value.message;
					$log.log(errorsObj);
					return errorsObj;
				}, {});
			} else {
			  	errors = {general: 'An error occurred processing your request (' + response.status + ' - ' + response.statusText + ')'};
			}
			
			errors.getSummary = function() {
				return response.data.errors || [ 
				     {
				    	 field: 'general',
				    	 message: errors.general
				     }];
			};
			
			return errors;
		};
		
		this.handleErrorsFromErrorsArray = function(errorsArray) {
			var errors;
			
			if (errorsArray) {
				errors = errorsArray.reduce(function (errorsObj, value, index) {
					errorsObj[value.field] = value.message;
					$log.log(errorsObj);
					return errorsObj;
				}, {});
			}
			
			errors.getSummary = function() {
				return errorsArray;
			};
			
			return errors;
		};
	}]);
})();