(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.models');
	
	module.factory('WorkflowContextModel', [function () {
			
		var WorkflowContextModel = function () {
			this.currentState = null;
		};
		    
		WorkflowContextModel.prototype.changeState = function (newState) {
			this.currentState = newState;
		};
		    
		WorkflowContextModel.prototype.nextState = function(parameters) {
	    	this.currentState.nextState(parameters);
		};
		
		WorkflowContextModel.prototype.prevState = function(parameters) {
	    	this.currentState.prevState(parameters);
		};
		    
		WorkflowContextModel.prototype.getCurrentStateName = function() {
	    	return this.currentState.getStateName();
	    };
	    
	    WorkflowContextModel.prototype.canShowNext = function() {
	    	return this.currentState.canShowNext();
	    };
	    
	    WorkflowContextModel.prototype.canShowPrev = function() {
	    	return this.currentState.canShowPrev();
	    };
	    
	    return WorkflowContextModel;
	}]);
})();
		