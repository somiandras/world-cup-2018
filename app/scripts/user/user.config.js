(function () {

	'use strict';

	angular.module('user')
	.config(userRouting);

	// ROUTING

	userRouting.$inject = ['$stateProvider'];

	function userRouting ($stateProvider) {

		$stateProvider
		.state('app.profile', {
			url: '/profile',
			templateUrl: 'views/profile.html',
			controller: 'ProfileController',
			controllerAs: 'profile',
		})
		.state('login', {
			url: '/login',
			views: {
				content: {
					templateUrl: 'views/login.html',
					controller: 'LoginController',
					controllerAs: 'login'
				}
			}
		})
		.state('register', {
			url: '/register',
			views: {
				content: {
					templateUrl: 'views/register.html',
					controller: 'UserRegisterController',
					controllerAs: 'register'
				}
			}
		});
	}

})();