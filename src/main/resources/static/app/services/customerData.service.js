(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.dataservices');
	
	module.service('customerDataService', ['$http', '$q', 'CustomerModel', 'ErrorService', function($http, $q, CustomerModel, ErrorService) {
		var endpointUrl = '/customer-ui/api/customer';
		
		this.createCustomer = function (newCustomer) {	
			var deferred = $q.defer();
				
			var customer = newCustomer.fromCustomerModel();

			$http.post(endpointUrl, customer).then(function(response) {
				deferred.resolve(new CustomerModel(response.data));
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			});
			return deferred.promise;
		};
		
		this.getCustomers = function () {
			var deferred = $q.defer();
			
			$http.get(endpointUrl).then(function (response) {
				deferred.resolve(response.data.map(function (customer) {
					return new CustomerModel(customer);
				}));
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			});
			return deferred.promise;
		};
		
		this.getCustomerById = function (id) {
			var deferred = $q.defer();
			
			var customerByIdEndpoint = endpointUrl + '/' + id;
			
			$http.get(customerByIdEndpoint).then(function(response) {
				deferred.resolve(new CustomerModel(response.data));
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			});
			return deferred.promise;
		}
		
		this.updateCustomer = function (customerModel) {
			var deferred = $q.defer();
			
			var customer = customerModel.fromCustomerModel();
			
			var updateCustomerEndpoint = endpointUrl + '/' + customerModel.id;
			
			$http.put(updateCustomerEndpoint, customer).then(function(response) {
				deferred.resolve(new CustomerModel(response.data));
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			});
			return deferred.promise;
		}
		
		this.deleteCustomer = function (id) {
			var deferred = $q.defer();
			
			var deleteCustomerEndpoint = endpointUrl + '/' + id;
			
			$http.delete(deleteCustomerEndpoint).then(function (response) {
				deferred.resolve();
			}, function(response) {
				deferred.reject(ErrorService.handleErrorsFromResponse(response));
			})
			return deferred.promise;
		}
	}]);
})();