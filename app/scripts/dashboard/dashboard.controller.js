(function() {

	'use strict';

	angular.module('appCore').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['tournamentService', 'user'];

	function DashboardController (tournamentService, user) {

		let vm = this;

		vm.tour = tournamentService;
		vm.user = user;
	}
	
})();