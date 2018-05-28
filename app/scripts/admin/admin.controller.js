(function() {
  'use strict';

  angular.module('admin').controller('AdminController', AdminController);

  AdminController.$inject = ['$state'];

  function AdminController($state) {
    let vm = this;

    vm.state = $state;
  }
})();
