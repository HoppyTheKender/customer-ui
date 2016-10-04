(function() {
	var module = angular.module('modernizationCloud');

	module.config(function() {
		// Array.findIndex
		if (!Array.prototype.findIndex) {
			Array.prototype.findIndex = function(predicate) {
				if (this === null) {
					throw new TypeError(
							'Array.prototype.findIndex called on null or undefined');
				}
				if (!angular.isFunction(predicate)) {
					throw new TypeError('predicate must be a function');
				}
				var list = Object(this);
				var length = list.length >>> 0;
				var thisArg = arguments[1];
				var value;

				for (var i = 0; i < length; i++) {
					value = list[i];
					if (predicate.call(thisArg, value, i, list)) {
						return i;
					}
				}
				return -1;  
			};
		}
		
		// string formatting (printf)
		if (!String.prototype.format) {
		    String.prototype.format = function() {
		        var str = this.toString();
		        
		        if (!arguments.length) {
		            return str;
		        }
		        
		        var args = typeof arguments[0],
		            args = (('string' == args || 'number' == args) ? arguments : arguments[0]);
		        
		        for (var arg in args) {
		            str = str.replace(RegExp('\\{' + arg + '\\}', 'gi'), args[arg]);
		        }
		        
		        return str;
		    };
		}
	});
})();