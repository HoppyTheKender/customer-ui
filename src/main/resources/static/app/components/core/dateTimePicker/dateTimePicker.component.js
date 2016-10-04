(function () {
	'use strict';

	var module = angular.module('modernizationCloud.components');

	module.component('dateTimePicker', {
		templateUrl: 'app/components/core/dateTimePicker/dateTimePicker.component.html',
		controller: ['$q', 'dateTimeService', DateTimeController],
	    bindings: {
	    	componentDisabled: '<',
	    	dateTimeString: '<',
	    	dateLabel: '<',
	    	dateTimeError: '<',

	    	onDateTimeChanged: '&?'
	    }
	});

	function DateTimeController($q, dateTimeService) {
		var $ctrl = this;
		
		this.$onInit = function() {
			this.datePickerOptions = {
				dateDisabled: false,
				maxDate: new Date(2020, 5, 22),
				showWeeks: false
			};
			
			this.timePickerOptions = {
				showSeconds: true
			};
			
			this.invalidDateValue = 'Invalid Date';
			this.isDateValid = false;
			this.timeZoneNames = moment.tz.names();
			this.localTimeZoneName = moment.tz.guess();
			
			this.updateModelFromString();
			
			if (this.dateTimeString != null && this.dateTimeString != '') {
				dateTimeService.getTimeZoneNameForOffset(this.dateTimeString).then(function (timeZoneName) {
					$ctrl.selectedTimeZoneName = timeZoneName;
					$ctrl.timeZoneChanged();
				}, function () {
					$ctrl.selectedTimeZoneName = moment.tz.guess();
					$ctrl.timeZoneChanged();
				});
			} else {
				$ctrl.selectedTimeZoneName = moment.tz.guess();
			}
		};
		
		this.$onChanges = function(changes) {
			if (changes.componentDisabled) {
				this.dateTimeDisabled = angular.copy(changes.componentDisabled.currentValue);
				this.datePickerOpen = false;
			}
			
			if (changes.dateTimeError) {
				this.dateTimeError = angular.copy(changes.dateTimeError.currentValue);
			}
		};
		
		this.updateModelFromString = function () {
			var dateTimeMoment = moment(this.dateTimeString || undefined);
			if (dateTimeMoment.isValid()) {
				this.selectedDate = dateTimeMoment.toDate();
				this.selectedTime = dateTimeMoment.toDate();
				this.updateModel();
			}
		};
		
		this.updateModel = function () {
			var datetime;
			
			if (this.selectedDate != null && this.selectedTime != null) {
				datetime = new Date(this.selectedDate.getFullYear(),
						this.selectedDate.getMonth(),
						this.selectedDate.getDate(),
						this.selectedTime.getHours(),
						this.selectedTime.getMinutes(),
						this.selectedTime.getSeconds());
			}
			
			var dateTimeMoment = moment(datetime);
			
			if (datetime != null && dateTimeMoment.isValid()) {
				var localDateTime = moment.tz(dateTimeMoment, this.localTimeZoneName);
				this.timeZonedDateTimeString = localDateTime.clone().tz(this.selectedTimeZoneName || moment.tz.guess()).format();
				
				// Call up for server validation, since the local validation succeeded.
				dateTimeService.isValidDateTimeString(this.timeZonedDateTimeString).then(function (result) {
					if (result == false) {
						$ctrl.timeZonedDateTimeString = $ctrl.invalidDateValue;
					}
					
					$ctrl.bubbleDateTimeChange(result);
				});
			} else {
				// We already know this is an invalid date, so don't bother with the server call.
				this.timeZonedDateTimeString = $ctrl.invalidDateValue;
				$ctrl.bubbleDateTimeChange(false);
			}
		};
		
		this.bubbleDateTimeChange = function (isValid) {
			if ($ctrl.onDateTimeChanged != null) {
				$ctrl.onDateTimeChanged({
					result: {
						valid: isValid,
						dateTimeString: angular.copy($ctrl.timeZonedDateTimeString) 
					}
				});
			}
		};
		
		this.dateChanged = function () {
			this.updateModel();
		};
		
		this.timeZoneChanged = function () {
			this.updateModel();
		};
		
		this.getTimeZone = function () {
			return angular.copy(this.selectedTimeZoneName);
		};
	};
})();