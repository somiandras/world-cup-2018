(function () {

	'use strict';

	angular.module('appCore')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['userService', 'user'];

	function NavigationController (userService, user) {

		var vm = this;
		vm.userService = userService;
		vm.user = user;

		console.log(typeof user.admin);
	}

})();