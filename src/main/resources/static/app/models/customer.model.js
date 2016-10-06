(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.models');
	
	module.factory('CustomerModel', function () {
		
		// Model Constructor
		var CustomerModel = function (customerData) {
			this.id = customerData.id;
			this.firstName = customerData.firstName;
			this.lastName = customerData.lastName;
			this.email = customerData.email;
		}; 
		
		CustomerModel.prototype.fromCustomerModel = function() {
			return {
				id 			: this.id,
				firstName 	: this.firstName,
				lastName 	: this.lastName,
				email 		: this.email
			};
		};
		
		CustomerModel.newCustomerModel = function() {
			return new CustomerModel({
				firstName: '',
				lastName: '',
				email: ''
			});
		};
		
		return CustomerModel;
	});
})();