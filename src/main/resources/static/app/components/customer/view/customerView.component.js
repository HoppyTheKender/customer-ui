(function() {
    'use strict';

    angular.module('modernizationCloud.components')

    .component('customerView', {
        templateUrl: 'app/components/customer/view/customerView.component.html',
        bindings: {
        },
        controller: ['$uibModal', 'customerDataService', CustomerViewController]
    });

    function CustomerViewController($uibModal, customerDataService) {
        var $ctrl = this;

        // Initialization
        this.$onInit = function() {
        	
        	this.model = {
        		customers: undefined
        	};
        	
        	customerDataService.getCustomers().then(function (customers) {
        		$ctrl.model.customers = customers;
        	});
        };
        
        this.deleteCustomer = function() {
        	
        };
    }
})();