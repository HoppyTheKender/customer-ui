(function() {
    'use strict';

    angular.module('modernizationCloud.components')

    .component('customerAdd', {
        templateUrl: 'app/components/customer/add/customerAdd.component.html',
        bindings: {
        },
        controller: ['$uibModal', 'customerDataService', 'CustomerModel', 'ngToast', CustomerAddController]
    });

    function CustomerAddController($uibModal, customerDataService, CustomerModel, ngToast) {
        var $ctrl = this;

        // Initialization
        this.$onInit = function() {
        	
        	this.model = CustomerModel.newCustomerModel();

        };
        
        this.addCustomer = function () {
        	
        	var customer = angular.copy(this.model);
        	
        	customerDataService.createCustomer(customer).then(function (createdCustomer){
        		ngToast.create('"' + createdCustomer.firstName + ' ' + createdCustomer.lastName + '" customer contact created successfully.');
        		$ctrl.model = CustomerModel.newCustomerModel();
        	},
        	function(error) {
        		
        	});
        };
    }
})();