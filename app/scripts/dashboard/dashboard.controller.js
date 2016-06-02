(function() {

	'use strict';

	angular.module('appCore').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['userService', 'tournamentService', 'user', '$uibModal'];

	function DashboardController (userService, tournamentService, user, $uibModal) {

		let vm = this;

		vm.tour = tournamentService;
		vm.user = user;
		vm.users = userService.public;

		if (user.league && user.league.length) {

			vm.leagueFilter = user.league[0];
		}

		if (!user.name) {

			let modalInstance = $uibModal.open({
				templateUrl: 'views/welcome_modal.html',
				controller: 'modalController',
				controllerAs: 'modal',
				animation: true,
				backdrop: 'static',
				keyboard: false,
				resolve: {
					user: function () {

						return user;
					}
				}
			});

			modalInstance.result.then((result) => {

				toastr.success(result);
			})
			.catch((error) => {

				console.error(error);
			})
		}

	}
	
})();