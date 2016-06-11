(function() {

	'use strict';

	angular.module('appCore').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$state', '$interval', 'userService', 'tournamentService', 'user', '$uibModal', 'APP_CONFIG'];

	function DashboardController ($state, $interval, userService, tournamentService, user, $uibModal, APP_CONFIG) {

		let vm = this;

		vm.tour = tournamentService;
		vm.user = user;
		vm.users = userService.public;
		vm.timeLimit = APP_CONFIG.timeLimit;

		vm.now = new Date().getTime();

		$interval(() => {

			vm.now = new Date().getTime();
		}, 10000);

		if (user.league && user.league.length) {

			vm.leagueFilter = user.league[0];
		}




		if ($state.params.temporary) {

			let tempModal = $uibModal.open({
				templateUrl: 'views/password_modal.html',
				controller: 'PasswordController',
				controllerAs: 'password',
				animation: true,
				backdrop: 'static',
				keyboard: false,
				size: 'sm',
				resolve: {
					user: function () {

						return user;
					}
				}
			});

			tempModal.result.then((result) => {

				toastr.success(result);
			})
			.catch((error) => {

				console.error(error);
			});
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
			});
		}

	}
	
})();