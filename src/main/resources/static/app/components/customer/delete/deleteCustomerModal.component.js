(function() {
	'use strict';

	angular.module('modernizationCloud.components')

	.component('deleteCustomerModal', {
		templateUrl : 'app/components/customer/delete/deleteCustomerModal.component.html',
		bindings : {
			customer: '<',
			title: '<',
			confirmText: '<',
			close: '&',
			dismiss: '&'
		},
		controller : ['customerDataService', DeleteCustomerModalController]
	});

	function DeleteCustomerModalController(customerDataService) {
		var $ctrl = this;
				
		this.$onInit = function() {
		};
		
		this.delete = function () {
			customerDataService.deleteCustomer(this.customer.id).then(function (response) {
				$ctrl.close({ result: $ctrl.customer });
			}, function (errors) {
				$ctrl.errors = errors;
			});
		};
	}
})();