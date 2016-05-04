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
	angular.module('euro2016App', ['appCore', 'myBets', 'user']);

	angular.module('appCore',['ngMessages','ngResource','ngSanitize', 'ui.router']);  

	angular.module('myBets', []);

	angular.module('user', ['firebase']);

	angular.module('admin', []);

})();
