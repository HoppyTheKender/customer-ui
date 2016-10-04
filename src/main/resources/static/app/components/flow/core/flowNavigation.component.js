(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('flowNavigation', {
		templateUrl: 'app/components/flow/core/flowNavigation.component.html',
		controller: [flowNavigationController],
		bindings: {
			next: '&',
			prev: '&',
			canShowNext: '<',
			canShowPrev: '<'
		}
	});

	function flowNavigationController() {
		var $ctrl = this;
		
		this.$onChanges = function (changes) {
			this.canShowNext = changes.canShowNext.currentValue;
			this.canShowPrev = changes.canShowPrev.currentValue;
		};
	};
})();