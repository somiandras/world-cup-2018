(function () {

	'use strict';

	angular.module('myBets').factory('betService', betService);

	betService.$inject = ['userService'];

	function betService (userService) {

		return {
			saveWinner: saveWinner,
		};

		function saveWinner (bets, user) {

			user.bets = user.bets || {};
			user.bets.winner = bets.winner;
			user.bets.topScorer = bets.topScorer;

			return userService.saveUser(user);
		}
	}

})();