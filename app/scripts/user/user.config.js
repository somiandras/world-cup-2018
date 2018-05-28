(function() {
  'use strict';

  angular.module('user')
  .config(userRouting);

  // ROUTING

  userRouting.$inject = ['$stateProvider'];

  function userRouting($stateProvider) {
    $stateProvider
    .state('app.profile', {
      url: '/profile',
      templateUrl: 'views/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile'
    })
    .state('app.public', {
      url: '/public/:uid',
      templateUrl: 'views/public_profile.html',
      controller: 'PublicController',
      controllerAs: 'public',
      params: {
        uid: null
      },
      resolve: {
        currentUser: function($stateParams, userService) {
          return userService.public.$loaded()
          .then(publicList => {
            return publicList.find(item => {
              return item.uid === $stateParams.uid;
            });
          });
        }
      }
    })
    .state('app.match', {
      url: '/match/:matchId',
      templateUrl: 'views/match.html',
      controller: 'MatchController',
      controllerAs: 'match',
      resolve: {
        match: function($stateParams, tournamentService) {
          return tournamentService.getMatch($stateParams.matchId);
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        content: {
          templateUrl: 'views/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        }
      }
    })
    .state('register', {
      url: '/register',
      views: {
        content: {
          templateUrl: 'views/register.html',
          controller: 'UserRegisterController',
          controllerAs: 'register'
        }
      }
    })
    .state('reset', {
      url: '/reset',
      views: {
        content: {
          templateUrl: 'views/reset.html',
          controller: 'ResetPasswordController',
          controllerAs: 'reset'
        }
      }
    });
  }
})();
