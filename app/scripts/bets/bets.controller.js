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


		if (!user.bets || !user.bets.winner || !user.bets.topScorer) {

			vm.showTopForm = true;
		
		} else {

			vm.showTopForm = false;
		}


		vm.addWinnerAndScorer = function (data) {

			betService.saveWinner(data, user)
			.then((resp) => {

				toastr.success('Elmentettük a favoritjaidat');
				vm.showTopForm = false;

			})
			.catch((error) => {

				toastr.error(error);
			})
		}


		vm.loadBets = function () {

			vm.topForm = {};
			vm.topForm.winner = user.bets.winner;
			vm.topForm.topScorer = user.bets.topScorer;
		}
	}
	
})();