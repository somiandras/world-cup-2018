(function () {

	'use strict';

	angular.module('admin').controller('TeamDetailsController', TeamDetailsController);

	TeamDetailsController.$inject = ['team'];

	function TeamDetailsController (team) {

		let vm = this;

		vm.current = team;
	}

})();