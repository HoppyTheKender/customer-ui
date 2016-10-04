(function () {
	var module = angular.module('modernizationCloud.dataservices');
	
	module.service('confirmModalService', ['$uibModal', '$q', function($uibModal, $q) {
		this.showConfirm = function (options) {
			var defaultOptions = {
				title: 'Are you sure?',
				message: 'Are you sure you want to do this?',
				confirmText: 'OK',
				cancelText: 'Cancel'
			};
			
			options = angular.extend(defaultOptions, options);
			
			var confirmModal = $uibModal.open({
				template: '<confirm-modal title="$ctrl.title" message="$ctrl.message" confirm-text="$ctrl.confirmText" cancel-text="$ctrl.cancelText" close="$close()" dismiss="$dismiss()"></confirm-modal>',
				controller: function () {
					this.title = options.title;
					this.message = options.message;
					this.confirmText = options.confirmText;
					this.cancelText = options.cancelText;
				},
				controllerAs: '$ctrl'
			});
			
			return confirmModal.result;
		};
	}]);
})();