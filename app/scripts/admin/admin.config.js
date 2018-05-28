(function() {
  'use strict';

  angular
  .module('admin')
  .config(adminRouting);

  // ROUTING

  adminRouting.$inject = ['$stateProvider'];

  function adminRouting($stateProvider) {
    $stateProvider
    .state('app.admin', {
      url: '/admin',
      templateUrl: 'views/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      resolve: {
        admin: ($q, user) => {
          if (user.admin) {
            return $q.resolve(true);
          }
          return $q.reject('Nincs admin jogod!');
        }
      }
    })
    .state('app.admin.teamList', {
      url: '/teams',
      templateUrl: 'views/teams.html',
      controller: 'TeamsController',
      controllerAs: 'teams'
    })
    .state('app.admin.teamDetails', {
      url: '/teams/:team',
      templateUrl: 'views/teamdetails.html',
      controller: 'TeamDetailsController',
      controllerAs: 'team',
      resolve: {
        team: (tournamentService, $stateParams) => {
          return tournamentService.getTeam($stateParams.team);
        }
      }
    })
    .state('app.admin.matches', {
      url: '/matches',
      templateUrl: 'views/matches.html',
      controller: 'MatchesController',
      controllerAs: 'matches'
    })
    .state('app.admin.participants', {
      url: '/participants',
      templateUrl: 'views/participants.html',
      controller: 'ParticipantsController',
      controllerAs: 'participants',
      resolve: {
        userList: userService => {
          return userService.getUserList();
        },
        pendingList: adminService => {
          return adminService.getPendingList();
        }
      }
    });
  }
})();
