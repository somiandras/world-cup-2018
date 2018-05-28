(function() {
  'use strict';

  angular.module('appCore').controller('PasswordController', PasswordController);

  PasswordController.$inject = ['user', 'userService', '$uibModalInstance'];

  function PasswordController(user, userService, $uibModalInstance) {
    let vm = this;

    vm.changePassword = function(form) {
      let credentials = {
        email: user.email,
        newPassword: form.password,
        oldPassword: form.tempPassword
      };

      userService.changePassword(credentials)
      .then(resp => {
        $uibModalInstance.close('Elmentettük a jelszavadat!');
      })
      .catch(error => {
        console.error(error);
      });
    };
  }
})();
