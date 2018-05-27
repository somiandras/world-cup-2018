(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name worldCup2018App
   * @description
   * # worldCup2018App
   *
   * Main module of the application.
   */
  angular.module('worldCup2018App', ['appCore', 'myBets', 'user', 'admin']);

  angular.module('appCore', [
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'firebase',
    'angulartics',
    'angulartics.google.tagmanager']);

  angular.module('myBets', ['ui.bootstrap']);

  angular.module('user', []);

  angular.module('admin', []);
})();
