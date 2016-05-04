(function () {

	'use strict';

	// ROUTING

	angular.module('appCore').config(uiRouter);

	uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function uiRouter($stateProvider, $urlRouterProvider) {

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
				//...
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

})();