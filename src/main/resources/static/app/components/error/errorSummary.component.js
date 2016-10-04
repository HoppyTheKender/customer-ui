(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('errorSummary', {
		templateUrl: 'app/components/error/errorSummary.component.html',
		bindings: {
			errors: '<',
			scrollable: '<?'
		},
		controller: ErrorSummaryController
	});

	function ErrorSummaryController() {
		this.$onChanges = function(changes) {
			if (changes.errors.currentValue) {
				this.errorSummary = changes.errors.currentValue.getSummary();
			} else {
				this.errorSummary = [ ];
			}
		};
	}
})();