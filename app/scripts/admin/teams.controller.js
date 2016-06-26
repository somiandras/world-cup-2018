(function () {

  'use strict';

  angular.module('admin').controller('TeamsController', TeamsController);

  TeamsController.$inject = ['tournamentService'];

  function TeamsController (tournamentService) {

    let vm = this;
    let tour = tournamentService;

    vm.data = tour.data;

  }

})();