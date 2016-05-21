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

				toastr.error(error.message);
			})
		}


		vm.loadBets = function () {

			vm.topForm = {};
			vm.topForm.winner = user.bets.winner;
			vm.topForm.topScorer = user.bets.topScorer;
		}


		vm.updateBet = function (bet, matchId) {

			betService.saveMatchBet(bet, matchId, user)
			.then((resp) => {

				vm.inputs[matchId] = false;
				vm.matchBet = undefined;
			})
			.catch((error) => {

				toastr.error(error.message);
				vm.inputs[matchId] = false;
				vm.matchBet = undefined;
			})
		}


		vm.submitBetOnEnter = function (event, bet, matchId) {

			if (event.keyCode === 13) {

				vm.updateBet(bet, matchId);
			}
		}


		vm.loadMatchBet = function (bet) {

			if (bet) {

				vm.matchBet = bet.home + " - " + bet.away;
			}
		}
	}
	
})();