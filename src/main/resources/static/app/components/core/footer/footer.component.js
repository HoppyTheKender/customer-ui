(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('footer', {
		templateUrl: 'app/components/core/footer/footer.component.html',
		controller: ['$state', 'propertiesDataService', FooterController]
	});

	function FooterController($state, propertiesDataService) {
		var $ctrl = this;
		
		this.$onInit = function () {
			
			propertiesDataService.getApplicationVersion().then(function (applicationVersion) {
				$ctrl.version = applicationVersion;
			});
		};
	}
})();