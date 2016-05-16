(function () {

	'use strict';

	angular.module('myBets')
		.controller('BetsController', BetsController);

	BetsController.$inject = ['tournamentService', 'user'];

	function BetsController (tournamentService, user) {

		let vm = this;
		let tour = tournamentService;

		vm.now = new Date();
		vm.data = tour.data;

		console.log(user);

		vm.addWinner = function (data) {

			console.log(data);
		}
	}
	
})();