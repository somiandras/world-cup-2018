(function () {

	'use strict';

	angular.module('admin').controller('ParticipantsController', ParticipantsController);

	ParticipantsController.$inject = ['userList', 'userService'];

	function ParticipantsController (userList, userService) {

		let vm = this;
		vm.players = userList;

		vm.makeUserAdmin = function (user) {

			user.admin = true;

			userService.saveUser(user)
			.then((resp) => {

				toastr.success(user.email + ' admin lett');
			})
			.catch((error) => {

				toastr.error(error);
			})
		};
	}

})();