(function() {
  'use strict';

  angular.module('admin').controller('TeamDetailsController', TeamDetailsController);

  TeamDetailsController.$inject = ['team', 'tournamentService'];

  function TeamDetailsController(team, tournamentService) {
    let vm = this;

    let tour = tournamentService;

    vm.current = team;

    vm.data = tour.data;

    vm.addPlayers = function(team, players) {
      let playerArray = players.trim().split(',');

      tour.addPlayers(playerArray, team)
      .then(resp => {
        toastr.success(team.longName + ': ' + resp.length + ' játékos hozzáadva');
      })
      .catch(error => {
        toastr.error(error);
      });
    };

    vm.removePlayer = function(player) {
      tour.removePlayer(player)
      .then(() => {
        toastr.success(player.name + ' eltávolítva');
      })
      .catch(error => {
        toastr.error(error);
      });
    };

    vm.reset = function(form) {
      vm.form = {};

      form.$setPristine();
      form.$setUntouched();
    };
  }
})();
