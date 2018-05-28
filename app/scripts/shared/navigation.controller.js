(function() {
  'use strict';

  angular.module('appCore')
    .controller('NavigationController', NavigationController);

  NavigationController.$inject = ['$state', 'userService', 'user'];

  function NavigationController($state, userService, user) {
    var vm = this;
    vm.userService = userService;
    vm.user = user;
    vm.state = $state;
  }
})();
