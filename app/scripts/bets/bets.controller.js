(function () {

	'use strict';

	angular.module('myBets')
		.controller('BetsController', BetsController);

	BetsController.$inject = ['tournamentService', 'user', 'betService'];

	function BetsController (tournamentService, user, betService) {

		let vm = this;
		let tour = tournamentService;

		vm.now = new Date();
		vm.data = tour.data;
		vm.user = user;


		if (user.bets.winner && user.bets.topScorer) {

			vm.showTopForm = false;
		
		} else {

			vm.showTopForm = true;
		}



		vm.addWinnerAndScorer = function (data) {

			betService.saveWinner(data, user)
			.then((resp) => {

				toastr.success('Elmentettük a tippedet');
				vm.showTopForm = false;

			})
			.catch((error) => {

				toastr.error(error);
			})
		}
	}
	
})();