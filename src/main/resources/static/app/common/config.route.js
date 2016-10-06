(function () {
	'use strict';

	var module = angular.module('modernizationCloud');

	module.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/customer-ui/');
		
		$stateProvider
			.state('styleguide', {
				url: '/customer-ui/styleguide',
				template: '<styleguide></styleguide>'
			})
			.state('app', {
				url: '/customer-ui/',
				abstract: true,
				views: {
					'header': {
						template: '<header></header>'
					},
					'': {
						template: '<ui-view></ui-view>'
					},
					'footer': {
						template: '<footer></footer>'
					}
				}
			})			
			.state('app.home', {
				url: '',
				template: '<dashboard></dashboard>'
			})
			.state('app.customerAdd', {
				url: 'addCustomer',
				template: '<customer-add></customer-add>'
			})
			.state('app.customerView', {
				url: 'viewCustomer',
				template: '<customer-view></customer-view>'
			});
		
			console.log($stateProvider);
	}]);
	
	function workflowStateConfig(options) {
		var stateOptions = angular.extend({}, options, {
			resolve: {
				workflowService: ['parentWorkflowService', function (parentWorkflowService) {
					return parentWorkflowService;
				}]
			},
			controller: ['workflowService', function (workflowService) {
				this.workflowService = workflowService;
			}],
			controllerAs: '$ctrl'
		});
		
		return stateOptions;
	}
})();