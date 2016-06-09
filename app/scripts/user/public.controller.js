(function () {

	'use strict';

	angular.module('user').controller('PublicController', PublicController);

	PublicController.$inject = ['currentUser', 'userService'];

	function PublicController (currentUser, userService) {

		let vm = this;

		vm.user = currentUser;
	}

})();