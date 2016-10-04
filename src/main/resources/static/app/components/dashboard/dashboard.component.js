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
     		    {name: 'MyAction', type: 'link', image: 'glyphicon-cog', route: 'app.home', information: 'Testing adding a button to dashboard.' }
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