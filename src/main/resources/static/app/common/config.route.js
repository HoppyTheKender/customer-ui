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
			});
			/*
				.state('app.behaviorContractWorkflow.applicationOptions', workflowStateConfig({
					url: '/applicationOptions',
					template: '<application-options workflow-service="$ctrl.workflowService"></application-options>'
				}))
				.state('app.behaviorContractWorkflow.catalogSelect', workflowStateConfig({
					url: '/selectCatalog',
					template: '<catalog-select workflow-service="$ctrl.workflowService"></catalog-select>'
				}))
				.state('app.behaviorContractWorkflow.createBehaviorContract', workflowStateConfig({
					url: '/createBehaviorContract',
					template: '<create-behavior-contract workflow-service="$ctrl.workflowService"></create-behavior-contract>'
				}))
				.state('app.behaviorContractWorkflow.versionCreate', workflowStateConfig({
					url: '/behaviorVersionCreate',
					template: '<version-create workflow-service="$ctrl.workflowService" test-binding="false"></version-create>'
				}))
				.state('app.behaviorContractWorkflow.applicationAssign', workflowStateConfig({
					url: '/applicationAssign',
					template: '<behavior-contract-application-assign workflow-service="$ctrl.workflowService"></behavior-contract-application-assign>'
				}))
			.state('app.versionWorkflow', {
				abstract: true,
				url: '/versionWorkflow',
				template: '<ui-view></ui-view>',
				resolve: {
					parentWorkflowService: ['BehaviorVersionWorkflowService', function (BehaviorVersionWorkflowService) {
						return BehaviorVersionWorkflowService;
					}]
				}
			})
				.state('app.versionWorkflow.behaviorSelect', workflowStateConfig({
					url: '', // this makes it the default state for the abstract parent route above
					template: '<behavior-select workflow-service="$ctrl.workflowService"></behavior-select>'
				}))
				.state('app.versionWorkflow.versionSelect', workflowStateConfig({
					url: '/behaviorVersionSelect',
					template: '<version-select workflow-service="$ctrl.workflowService"></version-select>'
				}))
				.state('app.versionWorkflow.versionCreate', workflowStateConfig({
					url: '/behaviorVersionCreate',
					template: '<version-create workflow-service="$ctrl.workflowService"></version-create>'
				}))
				.state('app.versionWorkflow.applicationAssign', workflowStateConfig({
					url: '/applicationAssign',
					template: '<application-assign workflow-service="$ctrl.workflowService"></application-assign>'
				}))
			.state('app.copyFromEnvironmentWorkflow', {
				abstract: true,
				url: '/copyFromEnvironmentWorkflow',
				template: '<ui-view></ui-view>',
				resolve: {
					parentWorkflowService: ['CopyFromEnvironmentWorkflowService', function (CopyFromEnvironmentWorkflowService) {
						return CopyFromEnvironmentWorkflowService;
					}]
				}
			})
				.state('app.copyFromEnvironmentWorkflow.environmentSelect', workflowStateConfig({
					url: '', // this makes it the default state for the abstract parent route above
					template: '<environment-select workflow-service="$ctrl.workflowService"></environment-select>'
				}))
				.state('app.copyFromEnvironmentWorkflow.behaviorSelect', workflowStateConfig({
					url: '/behavior', // this makes it the default state for the abstract parent route above
					template: '<environment-behavior-select workflow-service="$ctrl.workflowService"></environment-behavior-select>'
				}))
				.state('app.copyFromEnvironmentWorkflow.versionSelect', workflowStateConfig({
					url: '/versionSelect', // this makes it the default state for the abstract parent route above
					template: '<environment-version-select workflow-service="$ctrl.workflowService"></environment-version-select>'
				}))
				.state('app.copyFromEnvironmentWorkflow.versionCreate', workflowStateConfig({
					url: '/behaviorVersionCreate',
					template: '<version-create workflow-service="$ctrl.workflowService"></version-create>'
				}))
				.state('app.copyFromEnvironmentWorkflow.applicationAssign', workflowStateConfig({
					url: '/applicationAssign',
					template: '<copy-version-application-assign workflow-service="$ctrl.workflowService"></copy-version-application-assign>'
				}));*/
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