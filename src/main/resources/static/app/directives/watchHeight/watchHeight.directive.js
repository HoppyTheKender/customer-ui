(function () {
	'use strict';
	
	var module = angular.module('modernizationCloud.directives');
	
	module.directive('watchHeight', function () {
		return {
			scope: {
				'watchHeight': '='
			},
			link: function (scope, element, attributes) {
				scope.$watch(function () { return element.height(); }, function (newVal, oldVal) {
					scope.watchHeight = newVal;
				});
			}
		};
	});
})();