(function () {

	'use strict';

	angular.module('appCore').controller('MatchController', MatchController);

	MatchController.$inject = ['match', 'user', 'userService'];

	function MatchController (match, user, userService) {

		let vm = this;
		vm.users = userService.public;
		vm.current = match;
		vm.user = user;

		if (user.league && user.league.length) {

			vm.leagueFilter = user.league[0];
		}
	}

})();