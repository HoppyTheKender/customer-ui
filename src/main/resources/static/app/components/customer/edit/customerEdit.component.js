(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('customerEdit', {
		templateUrl: 'app/components/customer/edit/customerEdit.component.html',
		bindings: {
			component: '=?',
			customerModel: '<?'
		},
		controller: ['$q', 'customerDataService', 'CustomerModel', CustomerEditController]
	});

	function CustomerEditController($q, customerDataService, CustomerModel) {
		var $ctrl = this;
		
		this.$onInit = function () {
			this.component = this;
			this.editMode = false;
			
			if (this.customerModel) { // edit
				this.model = angular.copy(this.customerModel);
				this.editMode = true;
			} else { // new
				this.model = CustomerModel.newCustomerModel();
			}
		};
		
		this.save = function() {
			return $q(function (resolve, reject) {
				var serviceToCall = $ctrl.editMode == true ?
						customerDataService.updateCustomer :
						customerDataService.createCustomer;
				
				serviceToCall($ctrl.model).then(function(customerModel) {
					$ctrl.model = customerModel;
					resolve(customerModel);
				}, function(errors) {
					$ctrl.errors = errors;
					reject(errors);
				});
			});
		};
	}
})();