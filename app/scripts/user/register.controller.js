(function () {

	'use strict';

	angular.module('user').controller('UserRegisterController', UserRegisterController);

	UserRegisterController.$inject = ['userService'];

	function UserRegisterController (userService) {

		let vm = this;
		
		vm.registerUser = function (email, password) {

			email = email + '@kbcsecurities.hu';

			let credentials = {
				email: email,
				password: password
			};

			userService.register(credentials);
		};

	}

})();