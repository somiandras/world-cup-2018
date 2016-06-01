(function () {

	'use strict';

	angular.module('admin').controller('ParticipantsController', ParticipantsController);

	ParticipantsController.$inject = ['$window', 'userList', 'pendingList', 'userService', 'adminService'];

	function ParticipantsController ($window, userList, pendingList, userService, adminService) {

		let vm = this;
		vm.players = userList;
		vm.pending = pendingList;


		vm.makeUserAdmin = function (user) {

			user.admin = true;

			userService.saveUser(user)
			.then(() => {

				toastr.success(user.email + ' admin lett');
			})
			.catch((error) => {

				toastr.error(error);
			});
		};

		vm.addNewEmails = function (list) {

			if (list) {

				list = list.replace(/\n/g, '');
					
				let array = list.trim().split(',');

				adminService.addNewEmails(array, 'Basic')
				.then((resp) => {

					if (resp.length) {

						toastr.success(resp.length + ' új cím a várólistához adva');

						vm.form.newEmails = undefined;
						vm.showAddEmails = false;

					} else {

						toastr.warning(resp.length + ' új cím került a várólistára');
					}

				})
				.catch((error) => {

					console.error(error);
				});
			}
		};
	}

})();