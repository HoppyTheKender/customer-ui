'use strict';

// Declare app level module which depends on views, and components
angular.module('modernizationCloud', [
  'ui.router',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ui.tree',
  'ngToast',
  'ngAnimate',
  'ui.sortable',
  'angular-loading-bar',
  'LocalStorageModule',
  'modernizationCloud.components',
  'modernizationCloud.dataservices',
  'modernizationCloud.models',
  'modernizationCloud.directives'
]).
config(['$locationProvider', '$httpProvider', 'localStorageServiceProvider', 'cfpLoadingBarProvider', function($locationProvider, $httpProvider, localStorageServiceProvider, cfpLoadingBarProvider) {
	  // See index.vm for the <base>, should be set to the servlet path of the application, this will be populated by maven.
	  $locationProvider.html5Mode({
		  enabled: true,
	  });
	  
	  cfpLoadingBarProvider.latencyThreshold = 300;

	  $.ajaxSetup({
	    beforeSend: function(jqXHR, settings) {
	    	// This will get populated by maven resource plugin.
	    	settings.url = '${build.finalName}/' + settings.url;
	    }
	  });
	  
	  // Disable GET caching
	  $httpProvider.defaults.cache = false;
	  if (!$httpProvider.defaults.headers.get) {
		  $httpProvider.defaults.headers.get = {};
	  }
	  
	  $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
}]);

//Create modules up front that belong to the application
angular.module('modernizationCloud.components', []);
angular.module('modernizationCloud.dataservices', []);
angular.module('modernizationCloud.models', []);
angular.module('modernizationCloud.directives', []);