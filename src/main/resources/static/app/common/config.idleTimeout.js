(function () {
	'use strict';

	var module = angular.module('modernizationCloud');

	module.config(['$httpProvider', function ($httpProvider) {
		var timeoutWarning;
		
		// HTTP Interceptor to redirect to login
		$httpProvider.interceptors.push(['$window', 'ngToast', function ($window, ngToast) {
			return {
				'response': function (response) {
					if (angular.isString(response.data) && response.data.indexOf('<html') > -1) {
						
						if (timeoutWarning == null) {
							timeoutWarning = ngToast.warning({
								content: '<i class="glyphicon glyphicon-exclamation-sign"></i> You have been logged out due to inactivity.  Please click here to re-authenticate.',
								onDismiss: function () {
									$window.location = $window.location;
								},
								dismissOnTimeout: false
							});
						}
					}
					
					return response;
				}
			};
		}]);
	}]);
})();