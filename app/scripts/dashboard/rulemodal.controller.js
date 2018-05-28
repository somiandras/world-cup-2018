(function() {
  'use strict';

  angular.module('appCore').controller('RuleModalController', RuleModalController);

  RuleModalController.$inject = ['$uibModalInstance', 'userService', 'user'];

  function RuleModalController($uibModalInstance, userService, user) {
    let vm = this;
    vm.user = user;

    vm.turnOffAlert = function(user) {
      user.alerts = user.alers || {};
      user.alerts.ruleAlert = true;

      userService.saveUser(user)
      .then(user => {
        $uibModalInstance.close('Ok! Nem kapsz már több értesítést erről.');
      });
    };

    vm.closeAlert = function() {
      $uibModalInstance.close();
    };
  }
})();
