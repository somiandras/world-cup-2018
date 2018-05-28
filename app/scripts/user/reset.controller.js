(function() {
  'use strict';

  angular.module('user').controller('ResetPasswordController', ResetPasswordController);

  ResetPasswordController.$inject = ['$state', 'userService'];

  function ResetPasswordController($state, userService) {
    let vm = this;

    vm.resetPassword = function(email) {
      userService.resetPassword({email: email})
      .then(resp => {
        toastr.success('Az új jelszavadat elküldtük emailben.');

        $state.go('login');
      })
      .catch(error => {
        if (error.message === 'The specified user does not exist.') {
          toastr.error('Ez az emailcím nincs nálunk regisztrálva');
        } else {
          console.error(error);
        }
      });
    };
  }
})();
