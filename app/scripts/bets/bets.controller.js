(function () {

	'use strict';

	angular.module('myBets')
		.controller('BetsController', BetsController);

	BetsController.$inject = ['tournamentService'];

	function BetsController (tournamentService) {

		let vm = this;
		vm.tour = tournamentService;
	
				
	}
	
})();