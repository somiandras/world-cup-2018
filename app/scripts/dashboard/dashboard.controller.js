(function() {

	'use strict';

	angular.module('appCore').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['tournamentService'];

	function DashboardController (tournamentService) {

		let vm = this;

		vm.tour = tournamentService;
	}
	
})();