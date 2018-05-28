(function() {
  'use strict';

  angular.module('appCore').controller('MatchController', MatchController);

  MatchController.$inject = ['match', 'user', 'userService', 'APP_CONFIG'];

  function MatchController(match, user, userService, APP_CONFIG) {
    let vm = this;
    vm.current = match;
    vm.user = user;
    vm.users = userService.public;

    vm.userList = getUserList(match);

    vm.now = new Date().getTime();

    if (user.league && user.league.length) {
      vm.leagueFilter = user.league[0];
    }

    if (vm.now < match.datetime - APP_CONFIG.timeLimit) {
      match.status = "open";

      vm.sort = 'name';
      vm.reverse = false;
    } else if (!match.result) {
      match.status = "running";

      vm.sort = 'name';
      vm.reverse = false;
    } else {
      match.status = "closed";

      vm.sort = 'points';
      vm.reverse = true;
    }

    function getUserList(match) {
      let prepArray = vm.users.map(thisUser => {
        let prepUser = {};
        prepUser.name = thisUser.name;
        prepUser.league = thisUser.league;
        prepUser.uid = thisUser.uid;

        if (thisUser.bets && thisUser.bets.matches[match.$id]) {
          prepUser.home = thisUser.bets.matches[match.$id].home;
          prepUser.away = thisUser.bets.matches[match.$id].away;
          prepUser.points = thisUser.bets.matches[match.$id].points;
        } else {
          prepUser.points = 0;
        }

        return prepUser;
      });

      return prepArray;
    }
  }
})();
