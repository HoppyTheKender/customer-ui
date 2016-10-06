(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('footer', {
		templateUrl: 'app/components/core/footer/footer.component.html',
		controller: ['$state', FooterController]
	});

	function FooterController($state, EnvironmentService) {
		var $ctrl = this;
		
		this.$onInit = function () {
			this.version = '${version}';
			
		};
	}
})();