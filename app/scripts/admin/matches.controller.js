(function () {

	'use strict';

	angular.module('admin').controller('MatchesController', MatchesController);

	MatchesController.$inject = ['tournamentService'];

	function MatchesController (tournamentService) {

		let vm = this;
		let tour = tournamentService;
		vm.uploadForm = false;
		vm.data = tour.data;
		vm.table = {};
		vm.table.sortColumn = 'datetime';
		vm.table.reverse = false;
		vm.table.editResult = false;


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

		vm.updateResult = function (match, result) {

			tour.updateResult(match, result)			
			.then((resp) => {

				if (result) {

					toastr.success(match.home.longName + '-' + match.away.longName + ' meccs eredménye ' + match.result.home + ':' + match.result.away);
					vm.table.result[match.$id] = null;
						
				} else {

					toastr.success(match.home.longName + '-' + match.away.longName + ' meccs eredménye törölve');
				}

				vm.table.editResult = false;
			})
			.catch((error) => {

				toastr.error(error.message);
			});
		}
	}

})();