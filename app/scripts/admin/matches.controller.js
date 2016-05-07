(function () {

	'use strict';

	angular.module('admin').controller('MatchesController', MatchesController);

	MatchesController.$inject = ['tournamentService'];

	function MatchesController (tournamentService) {

		let vm = this;
		let tour = tournamentService;
		vm.uploadForm = false;
		vm.data = tour.data;

		vm.reset = function (form) {

			vm.form = {};

			form.$setPristine();
			form.$setUntouched();
		}


		vm.upload = function (matches, replace) {

			tour.uploadMatches(matches, replace)
			.then((matches) => {
				console.log(matches);
				if (matches) {
					toastr.success('Meccsek feltöltve');
					vm.uploadForm = false;
				}
			})
			.catch((error) => {

				toastr.error(error.message);
			})
		}
	}

})();