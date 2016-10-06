(function() {
    'use strict';

    angular.module('modernizationCloud.components')

    .component('customerEditModal', {
        templateUrl: 'app/components/customer/editModal/customerEditModal.component.html',
        bindings: {
        	customer: '<?',
			close: '&',
			dismiss: '&'
        },
        controller: ['customerDataService', CustomerEditModal]
    });

    function CustomerEditModal(customerDataService) {
        var $ctrl = this;

        // Initialization
        this.$onInit = function() {
        	this.model = angular.copy(this.customer);
        };
        
        this.save = function () {
        	$ctrl.customerAddComponent.save().then(function (modifiedCustomer) {
        		$ctrl.close({ result: {
        			customer: modifiedCustomer
        		}});
        	}, function (errors) {
        		// Failed.  Errors shown in the component itself.
        	});
        };
    };
})();