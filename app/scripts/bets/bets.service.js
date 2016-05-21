(function () {

	'use strict';

	angular.module('myBets').factory('betService', betService);

	betService.$inject = ['$q', 'userService'];

	function betService ($q, userService) {

		return {
			saveWinner: saveWinner,
			saveMatchBet: saveMatchBet
		};


		function saveWinner (bets, user) {

			user.bets = user.bets || {};
			user.bets.winner = bets.winner;
			user.bets.topScorer = bets.topScorer;

			return userService.saveUser(user);
		}


		function saveMatchBet (bet, matchID, user) {

			user.bets = user.bets || {};
			user.bets.matches = user.bets.matches || {};

			if (bet) {

				try {

					bet = parseBet(bet);
				
				} catch (error) {

					return $q.reject(error);

				}

				user.bets.matches[matchID] = bet;
			}

			return userService.saveUser(user);
		}


		function parseBet (bet) {

			let regexp = new RegExp('^[0-9].*[0-9]$');
			let home, away;

			bet = bet.trim();

			if (regexp.test(bet)) {

				bet = bet.split("");

				home = bet[0];
				away = bet[bet.length-1];

			} else {

				throw new Error('Nem értelmezhető a formátum');
			}

			return {
				home: home,
				away: away
			};
		}
	}

})();