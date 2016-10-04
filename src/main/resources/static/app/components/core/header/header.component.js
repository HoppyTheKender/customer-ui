(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('header', {
		templateUrl: 'app/components/core/header/header.component.html',
		controller: ['$state', HeaderController],
		replace: true
	});

	function HeaderController($state) {
		var $ctrl = this;
		
		this.$onInit = function () {
			
		};
	}
})();