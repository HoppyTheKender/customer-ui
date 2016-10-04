(function() {
	'use strict';

	angular.module('modernizationCloud.components')

	.component('confirmModal', {
		templateUrl : 'app/components/core/confirm/confirmModal.component.html',
		bindings : {
			title: '<',
			message: '<',
			confirmText: '<',
			cancelText: '<',
			close: '&',
			dismiss: '&'
		},
		controller : ConfirmModalController
	});

	function ConfirmModalController() {
		var $ctrl = this;
				
		this.$onInit = function() {
		};
	}
})();