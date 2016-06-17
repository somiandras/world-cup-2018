(function () {

	'use strict';

	angular.module('appCore').controller('MatchController', MatchController);

	MatchController.$inject = ['match', 'user', 'userService'];

	function MatchController (match, user, userService) {

		let vm = this;
		vm.current = match;
		vm.user = user;
		vm.users = userService.public;

		vm.userList = getUserList(match);

		if (user.league && user.league.length) {

			vm.leagueFilter = user.league[0];
		}

		function getUserList (match) {

			let prepArray = vm.users.map((thisUser) => {

				let prepUser = {};
				prepUser.name = thisUser.name;
				prepUser.league = thisUser.league;
				prepUser.uid = thisUser.uid;

				if (thisUser.bets && thisUser.bets.matches[match.$id]) {

					prepUser.home = thisUser.bets.matches[match.$id].home;
					prepUser.away = thisUser.bets.matches[match.$id].away;
					prepUser.points = thisUser.bets.matches[match.$id].points;

				} else {

					prepUser.points = 0;

				}

				return prepUser;
			});

			return prepArray;
		}
	}

})();