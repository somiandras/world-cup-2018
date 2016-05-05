(function () {

	'use strict';

	// ROUTING

	angular
	.module('appCore')
	.config(appRouting)
	.run(noAuth);

	appRouting.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function appRouting($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider
		.state('app', {
			abstract: true,
			url: '',
			views: {
				navigation: {
					templateUrl: 'views/navigation.html',
					controller: 'NavigationController',
					controllerAs: 'navigation'
				},
				content: {
					template: '<ui-view></ui-view>'
				}
			},
			resolve: {
				user: ($firebaseAuthService, userService) => {

					return $firebaseAuthService.$requireAuth()
					.then((data) => {

						return userService.getUser(data.uid);
					})
					.catch((error) => {

						console.error(error);
					});
				}
			}
		})
		.state('app.dashboard', {
			url: '/dashboard',
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController',
			controllerAs: 'dashboard'
		})
		.state('app.myBets', {
			url: '/mybets',
			templateUrl: 'views/bets.html',
			controller: 'BetsController',
			controllerAs: 'bets',
		});
	}


	noAuth.$inject = ['$rootScope', '$state'];

	function noAuth ($rootScope, $state) {

		$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {

		 	if (error === "AUTH_REQUIRED") {

				$state.go("login");
		  	}
		});
	}

})();