(function () {

	'use strict';

	angular
	.module('admin')
	.config(adminRouting);


	// ROUTING
	
	adminRouting.$inject = ['$stateProvider', '$urlRouterProvider'];

	function adminRouting ($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('app.admin', {
			url: '/admin',
			templateUrl: 'views/admin.html',
			controller: 'AdminController',
			controllerAs: 'admin',
		})
		.state('app.admin.teams', {
			url: '/teams',
			templateUrl: 'views/teams.html',
			controller: 'TeamsController',
			controllerAs: 'teams'
		})
		.state('app.admin.matches', {
			url: '/matches',
			templateUrl: 'views/matches.html',
			controller: 'MatchesController',
			controllerAs: 'matches'
		})
		.state('app.admin.participants', {
			url: '/participants',
			templateUrl: 'views/participants.html',
			controller: 'ParticipantsController',
			controllerAs: 'participants'
		});
	}

})();