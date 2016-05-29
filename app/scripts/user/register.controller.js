(function () {

	'use strict';

	angular.module('user').controller('UserRegisterController', UserRegisterController);

	UserRegisterController.$inject = ['userService'];

	function UserRegisterController (userService) {

		let vm = this;
		
		vm.registerUser = function (email, password) {

			vm.loading = true;

			let credentials = {
				email: email,
				password: password
			};

			userService.register(credentials)
			.catch((error) => {

				vm.loading = false;
				toastr.error(error.message);
			});
		};

	}

})();