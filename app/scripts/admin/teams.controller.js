(function () {

	'use strict';

	angular.module('admin').controller('TeamsController', TeamsController);

	TeamsController.$inject = ['tournamentService'];

	function TeamsController (tournamentService) {

		let vm = this;
		let tour = tournamentService;

		vm.data = tour.data;

		vm.addTeamForm = false;


		vm.addTeam = function (team) {

			if (team.players) {

				team.players = team.players.split(',');
			}

			tour.addTeam(team)
			.then((newTeam) => {
				
				toastr.success(newTeam.longName + ' sikeresen hozzáadva');
				vm.addTeamForm = false;
			})
			.catch((error) => {

				toastr.error(error.message);
			});
		};


		vm.removeTeam = function (team) {

			tour.removeTeam(team)
			.then(() => {

				toastr.success(team.longName + ' sikeresen törölve');
			})
			.catch((error) => {

				toastr.error(error.message);
			});
		};


		vm.showTeam = function (team) {

			vm.teamHighlight = team;
		};


		vm.reset = function (form) {

			vm.form = {};

			form.$setPristine();
			form.$setUntouched();

		};
	}

})();