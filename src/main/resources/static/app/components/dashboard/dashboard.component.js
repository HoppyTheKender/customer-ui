(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('dashboard', {
		templateUrl: 'app/components/dashboard/dashboard.component.html',
		controller: ['$state', DashboardController]
	});

	function DashboardController($state) {
		this.$onInit = function () {
			this.actions = [
     		    {name: 'Add Customer', type: 'link', image: 'glyphicon-plus', route: 'app.customerAdd', information: 'Add Customer Record.' },
     		    {name: 'View Customers', type: 'link', image: 'glyphicon-list', route: 'app.customerView', information: 'View Customer Records.' }
             ];
     		
     		// Exposed
     		this.navigateToAction = _navigateToAction;
     		
     		this.actions.forEach(function (action) {
     			if(action.type == 'workflow') {
     				action.workflow.initialize();	
     			}
     		});
		};
		
		// Internal  
		function _navigateToAction(action) {			
			
			switch (action.type) {
				case 'workflow':
					action.workflow.nextState();
					break;
					
				case 'link': {
					$state.go(action.route);
					break;
				}
			}
			
		}
	}
})(); 