(function () {

	'use strict';

	angular.module('myBets')
		.controller('BetsController', BetsController);

	BetsController.$inject = ['tournamentService'];

	function BetsController (tournamentService) {

		let vm = this;
		let tour = tournamentService;
		
		vm.now = new Date();
		vm.data = tour.data;

				
	}
	
})();