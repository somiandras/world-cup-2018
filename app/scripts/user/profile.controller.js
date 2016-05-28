(function () {

	'use strict';

	angular.module('user').controller('ProfileController', ProfileController);

	ProfileController.$inject = ['user', 'userService'];

	function ProfileController (user, userService) {

		let vm = this;
		vm.user = user;
		vm.form = {};

		vm.editParam = function (param) {

			vm.form[param] = user[param];
		}

		vm.saveParam = function (param, newValue) {

			if (newValue && newValue !== user[param]) {

				user[param] = newValue;

				userService.saveUser(user)
				.then((resp) => {

					toastr.success('Elmentettük az új adatot');

				})
				.catch((error) => {

					toastr.error(error.message);
				});
			}

			vm.form[param] = false;
		}
	}
	
})();