(function() {
    'use strict';

    angular.module('modernizationCloud.components')

    .component('customerView', {
        templateUrl: 'app/components/customer/view/customerView.component.html',
        bindings: {
        },
        controller: ['$uibModal', 'customerDataService', 'ngToast', CustomerViewController]
    });

    function CustomerViewController($uibModal, customerDataService, ngToast) {
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
        
        this.editCustomer = function(customer, index) {
        	var modal = $uibModal.open({
				template: '<customer-edit-modal customer="$ctrl.customer" close="$close(result)" dismiss="$dismiss()"></customer-edit-modal>',
				controller: function () {
					this.customer = customer;
				},
				controllerAs: '$ctrl'
			});
        	
        	modal.result.then(function (result) {
        		var targetIndex = $ctrl.model.customers.findIndex(function (editedCustomer) {
        			return editedCustomer.id === customer.id;
        		});
        		
        		$ctrl.model.customers.splice(targetIndex, 1, result.customer); // replace it in the list
        	});
        }
        
        this.addCustomer = function () {
        	var modal = $uibModal.open({
				template: '<customer-edit-modal close="$close(result)" dismiss="$dismiss()"></customer-edit-modal>',
				controller: function () {
				},
				controllerAs: '$ctrl'
			});
        	
        	modal.result.then(function (result) {
        		$ctrl.model.customers.push(result.customer);
        	});
        };
        
        this.deleteCustomer = function(customer) {
        	var confirmText = 'Are you sure you want to delete ' + customer.firstName + ' ' + customer.lastName + ' ?';
			var title = 'Are you sure?';
			
			var deleteCustomerModal = $uibModal.open({
				template: '<delete-customer-modal customer="$ctrl.customer" title="$ctrl.title" confirm-text="$ctrl.confirmText" close="$close(result)" dismiss="$dismiss()"></delete-customer-modal>',
				controller: function () {
					this.customer = customer;
					this.confirmText = confirmText;
					this.title = title;
				},
				controllerAs: '$ctrl'
			});
			
			deleteCustomerModal.result.then(function (resultCustomer) {
				if(resultCustomer) {
					var targetIndex = $ctrl.model.customers.findIndex(function (c) {
						return c.id == resultCustomer.id;
					});
					$ctrl.model.customers.splice(targetIndex, 1);
					
					ngToast.create('"' + customer.firstName + ' ' + customer.lastName + '" deleted successfully.');
				}
			}, function () {
				// canceled.
			});
        };
    }
})();