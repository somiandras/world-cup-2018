(function() {
  'use strict';

  angular.module('user').controller('PublicController', PublicController);

  PublicController.$inject = ['currentUser', 'userService', 'tournamentService', 'APP_CONFIG'];

  function PublicController(currentUser, userService, tournamentService, APP_CONFIG) {
    let vm = this;
    let tour = tournamentService;

    vm.user = currentUser;
    vm.matches = tour.data.matches;
    vm.now = new Date().getTime();
    vm.start = APP_CONFIG.startTime;
  }
})();
