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


		vm.upload = function (matches, replace, form) {

			tour.uploadMatches(matches, replace)
			.then((matches) => {

				if (matches) {
					toastr.success('Meccsek feltöltve');
					vm.uploadForm = false;
					vm.reset(form);
				}
			})
			.catch((error) => {

				toastr.error(error.message);
			})
		}
	}

})();