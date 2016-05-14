(function () {

	'use strict';

	angular.module('admin').controller('TeamDetailsController', TeamDetailsController);

	TeamDetailsController.$inject = ['team', 'tournamentService'];

	function TeamDetailsController (team, tournamentService) {

		let vm = this;

		let tour = tournamentService;

		vm.current = team;

		vm.addPlayersForm = false;



		vm.addPlayers = function (team, players) {

			let playerArray = players.trim().split(',')

			team.players = team.players || [];

			team.players = team.players.concat(playerArray);

			tour.saveTeam(team)
			.then((resp) => {

				toastr.success('Játékosok hozzáadva');
			})
			.catch((error) => {

				toastr.error(error);
			});
		}


		vm.removePlayer = function (team, playerIndex) {

			team.players = team.players || [];

			let deletedPlayer = team.players.splice(playerIndex, 1);

			tour.saveTeam(team)
			.then((resp) => {

				toastr.success(deletedPlayer[0] + ' törölve');
			})
			.catch((error) => {

				toastr.error(error);
			});
		}


		vm.reset = function (form) {

			vm.form = {};

			form.$setPristine();
			form.$setUntouched();

		};

	}

})();