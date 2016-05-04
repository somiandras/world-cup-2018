(function () {

	'use strict';

	// CONSTANTS

	angular.module('user')
	.constant('FB_URL', 'https://kbceuro2016.firebaseio.com/')
	.constant('DEPARTMENTS', [
		'Brókerek és Sec Services',
		'Elemzők és Marketing',
		'Mid-Office és Back-Office',
		'IT',
		'Könyvelés, Jog és Compliance',
		'Corporate Finance',
		'Office Management',
		'Market és Op Risk',
		'Nem tudom eldönteni...',
		]);


	// FIREBASE
	
	angular.module('user')
	.config(firebase)
	.config(userRouting);

	firebase.$inject = ['$firebaseRefProvider', 'FB_URL'];

	function firebase ($firebaseRefProvider, FB_URL) {

		$firebaseRefProvider.registerUrl({
			default: FB_URL,
			users: FB_URL + 'users'
		});
	}

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