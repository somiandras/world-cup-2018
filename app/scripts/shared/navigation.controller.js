(function () {

	'use strict';

	angular.module('appCore')
		.controller('NavigationController', NavigationController);

	NavigationController.$inject = ['userService'];

	function NavigationController (userService) {

		var vm = this;

		vm.user = userService;
	}

})();