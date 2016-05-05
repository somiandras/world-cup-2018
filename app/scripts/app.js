(function() {

	'use strict';

	/**
	 * @ngdoc overview
	 * @name euro2016App
	 * @description
	 * # euro2016App
	 *
	 * Main module of the application.
	 */
	angular.module('euro2016App', ['appCore', 'myBets', 'user', 'admin']);

	angular.module('appCore',['ngMessages','ngResource','ngSanitize', 'ui.router', 'firebase']);  

	angular.module('myBets', []);

	angular.module('user', []);

	angular.module('admin', []);

})();
