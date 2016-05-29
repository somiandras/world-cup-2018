(function() {

	'use strict';

	angular.module('appCore').controller('DashboardController', DashboardController);

	DashboardController.$inject = ['tournamentService', 'user', '$uibModal'];

	function DashboardController (tournamentService, user, $uibModal) {

		let vm = this;

		vm.tour = tournamentService;
		vm.user = user;

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

				toastr.error(error);
			})
		}

	}
	
})();