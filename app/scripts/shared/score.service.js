(function () {

	'use strict';

	angular.module('appCore').factory('scoreService', scoreService);

	scoreService.$inject = ['$q', '$firebaseObject', '$firebaseRef', 'userService', 'APP_CONFIG'];

	function scoreService ($q, $firebaseObject, $firebaseRef, userService, APP_CONFIG) {

		let rules = APP_CONFIG.rules;

		let gameData = $firebaseObject($firebaseRef.game);


		return {
			updateUserScores: updateUserScores
		};


		function updateUserScores (match) {

			return userService.getUserList()
			.then((resp) => {

				let users = resp.map((user) => {

					return updateMatchScore(user, match);
				
				});


				return $q.all(users.map((user) => {

					return userService.saveUser(user)
					.then((resp) => {

						return $q.resolve(user);
					}); 

				}));

			})
			.then((users) => {

				let usersWithTotalScore = users.map((user) => {

					return getTotalScore(user);

				});


				return $q.all(usersWithTotalScore);

			})
			.then((users) => {

				return $q.all(users.map((user) => {

					return userService.saveUser(user)
					.then((resp) => {

						return $q.resolve(user);
					}); 

				}));
			})
			.then((users) => {

				return generatePublicScores(users);
			})
		}


		function updateMatchScore (user, match) {

			if (!user.bets || !user.bets.matches) {

				return user;
			}


			if (user.bets.matches[match.$id] && match.result) {

				user.bets.matches[match.$id].points = calculateScore(match.result, user.bets.matches[match.$id]);

			} else if (user.bets.matches[match.$id]) {

				user.bets.matches[match.$id].points = null;
			}


			return user;
		}


		function calculateScore (result, bet) {

			let score = 0;

			if (bet) {

				let matchWinner = decideWinner(result);
				let betWinner = decideWinner(bet);


				if (result.home === bet.home && result.away === bet.away) {

					score += rules.exactResult;
				
				}  

				if (matchWinner === betWinner) {

					score += rules.result;
				}
			}

			return score;
		}


		function decideWinner (result) {

			let winner;

			if (result.home > result.away) {

				winner = 'home';

			} else if (result.home < result.away) {

				winner = 'away';
			
			} else {

				winner = 'draw';
			} 

			return winner;
		}


		function getTotalScore (user) {

			if (!user.uid) {

				let error = new Error(user + 'has no uid!');

				return $q.reject(error);
			}

			return userService.getUserMatchBets(user.uid)
			.then((matches) => {

				let score = matches.reduce((prev,cur) => {

					if (cur.points) {

						prev += cur.points;
					}

					return prev;

				}, 0);

				user.totalScore = score;

				return $q.resolve(user);
			})
		}


		function generatePublicScores (users) {

			gameData.$loaded()
			.then((game) => {

				let scoreList = users.map((user) => {

					return {
						email: user.email,
						uid: user.uid,
						score: user.totalScore
					}
				})

				game.scores = scoreList;

				return game.$save();
			})
		}

	}

})();