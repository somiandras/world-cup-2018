(function () {

	'use strict';

	angular.module('user').controller('PublicController', PublicController);

	PublicController.$inject = ['currentUser', 'userService', 'tournamentService'];

	function PublicController (currentUser, userService, tournamentService) {

		let vm = this;
		let tour = tournamentService;

		vm.user = currentUser;
		vm.matches = tour.data.matches;
	}

})();